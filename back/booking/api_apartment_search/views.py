from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import render
from django.db.models import Q, Count, ExpressionWrapper, F, FloatField, Avg

from django.db.models.functions.comparison import NullIf
from django.utils.dateparse import parse_date
from rest_framework import viewsets, filters, permissions, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView, exception_handler

from . import models
from . import serializers

from .api_auth_views import RegistrationAPIView, LoginAPIView, LogoutAPIView, ResetTokenAPIView

# для JWT-токена
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken

from .models import ReservationModel
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.authentication import authentication


# ===============


# Create your views here.
# class CitiesViewSet(viewsets.ModelViewSet):
#     queryset = models.CityModel.objects.all()
#     serializer_class = serializers.CitySerializer
#     filter_backends = (filters.SearchFilter,)

class CountryViewSet(viewsets.ModelViewSet):
    queryset = models.CountryModel.objects.all()
    serializer_class = serializers.CountrySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class RegionViewSet(viewsets.ModelViewSet):
    queryset = models.RegionModel.objects.all()
    serializer_class = serializers.RegionSerializer


class UpdateRatingViewSet(APIView):  # TODO переписать на новую систему оценок
    serializer_class = serializers.UpdateRatingObjectSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def patch(self, request):

        # room_pk = request.data.get('pk')
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            room_pk = serializer.validated_data.get('id')
            rating_value = serializer.validated_data.get('rating_value')
            if room_pk:
                if rating_value and room_pk:
                    room_object = models.ObjectRoomModel.objects.get(pk=room_pk)
                    room_object.votes += 1
                    room_object.rating_sum += rating_value
                    room_object.rating = round(room_object.rating_sum / room_object.votes, 4)
                    room_object.save()
                    return Response({'success': f'Rating is update, pk={room_pk}'})
            else:
                return Response({'error': f'id is invalid, id={room_pk}'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class SearchMainPageViewSet(viewsets.ModelViewSet):
class SearchMainPageViewSet(viewsets.ReadOnlyModelViewSet):
    # queryset = models.CityModel.objects.all()
    serializer_class = serializers.ObjectRoomSerializer
    filter_backends = (filters.SearchFilter,)
    permission_classes = (permissions.AllowAny,)
    # search_fields = ['country', 'region', 'city', 'name']
    search_fields = ('title', 'city__name', 'city__country__name')

    def get_queryset(self):
        # Проверка токена происходит под капотом. За счет permissions.IsAuthenticated
        # request_token = self.request.META.get('HTTP_AUTHORIZATION', None)
        # if request_token:
        #     ...
        #     authentication.authenticate(request_token=request_token)
        # else:
        #     return Response({'error': 'Не предоставлены данные для авторизации'}, status=status.HTTP_401_UNAUTHORIZED)

        # выполнение дойдет до этого места и далее, если токен будет валиден
        pk = self.kwargs.get('pk', None)
        if pk and pk.isdigit():

            result = models.ObjectRoomModel.objects.filter(pk=int(pk))
            if result:
                return result
            else:
                return models.ObjectRoomModel.objects.none()  # TODO проработать вариант выдачи своего сообщение вместо стандартного

        elif not pk:
            search = self.request.query_params.get('search', None)
            arrive = parse_date(a) if (a := self.request.query_params.get('arrive', None)) else None
            departure = parse_date(a) if (a := self.request.query_params.get('departure', None)) else None
            reservations = []
            if not search:
                return models.ObjectRoomModel.objects.none()
            if arrive and departure:
                reservations = models.ReservationModel.objects.filter(
                    Q(is_confirmed=True) &
                    (
                            (
                                    Q(start_date__range=(arrive, departure)) |
                                    Q(end_date__range=(arrive, departure))
                            ) |
                            (
                                    Q(start_date__lte=arrive) &
                                    Q(start_date__lt=departure) &
                                    Q(end_date__gt=arrive) &
                                    Q(end_date__gte=departure)

                            ) |
                            (
                                    Q(start_date__gt=arrive) &
                                    Q(start_date__lte=departure) &
                                    Q(end_date__gt=arrive) &
                                    Q(end_date__lte=departure)
                            )
                    )
                )
            room_id_list = [reservation.room_id for reservation in reservations]
            result = models.ObjectRoomModel.objects.select_related('city', 'building_info', 'general_info').filter(
                (Q(title__icontains=search) | Q(city__name__icontains=search) | Q(
                    city__country__name__icontains=search) & Q(is_published=True))
            ).exclude(pk__in=room_id_list)
            return result
        else:
            # return Response({'error': f'pk is not valid value. Need integer, but your value is {pk}'}, status=status.HTTP_400_BAD_REQUEST)
            return models.ObjectRoomModel.objects.none()


class ReviewsViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ReviewsSerializer
    permission_classes = (permissions.AllowAny,)

    # filter_backends = (filters.OrderingFilter,)
    # ordering_fields = '__all__'  # TODO нужны для возможности сортировки отзывов

    def get_queryset(self, *args, **kwargs):
        object_id = self.kwargs.get('room_object_id', None)
        print(kwargs)
        if object_id and object_id.isdigit():

            result = models.ReviewsModel.objects.filter(room_object_id=int(object_id))

            if result:
                return result
            else:
                return models.ObjectRoomModel.objects.none()  # TODO проработать вариант выдачи своего сообщение вместо стандартного

        else:
            return models.ReviewsModel.objects.all()

    def retrieve(self, request, pk=None):  # TODO узнать для чего этот метод
        queryset = models.ReviewsModel.objects.filter(room_object_id=pk)
        serializer = serializers.ReviewsSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AllStarsObjectRoomViewSet(viewsets.ReadOnlyModelViewSet):
    # serializer_class = serializers.AllStarsObjectRoomSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = models.RatingModel.objects.all()

    # def get_queryset(self):
    #     object_id = self.kwargs.get('room_object_id', None)
    #     print(object_id)
    #     if object_id:
    #         result = models.RatingModel.objects.filter(obje=object_id)
    #         if result:
    #             return result
    #         else:
    #             return models.RatingModel.objects.none()
    #     else:
    #         return models.RatingModel.objects.none()

    def retrieve(self, request, pk=None):  # TODO узнать для чего этот метод
        queryset = models.RatingModel.objects.filter(room_object=pk).aggregate(
            Avg("cleanliness", default=0),
            Avg("conformity_to_photos", default=0),
            Avg("timeliness_of_check_in", default=0),
            Avg("price_quality", default=0),
            Avg("location", default=0),
            Avg("quality_of_service", default=0),
        )
        return Response(queryset, status=status.HTTP_200_OK)


class GetCountOfReviewViewset(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.ReviewsSerializer
    permission_classes = (permissions.AllowAny,)

    # filter_backends = (filters.OrderingFilter,)
    # ordering_fields = '__all__'  # TODO нужны для возможности сортировки отзывов

    def get_queryset(self):
        object_id = self.kwargs.get('room_object_id', None)

        if object_id and object_id.isdigit():

            result = models.ReviewsModel.objects.filter(room_object_id=int(object_id))

            if result:
                print(object_id, result)
                return result
            else:
                return models.ObjectRoomModel.objects.none()  # TODO проработать вариант выдачи своего сообщение вместо стандартного

        else:
            return models.ReviewsModel.objects.all()

    def retrieve(self, request, pk=None):  # TODO узнать для чего этот метод
        queryset = models.ReviewsModel.objects.filter(room_object_id=pk).count()
        return Response({"reviews_count": queryset}, status=status.HTTP_200_OK)


class BookingViewSet(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.ReservationSerializer

    def get(self, *args, **kwargs):
        object_id = self.kwargs.get('id', None)
        arrive = parse_date(a) if (a := self.kwargs.get('arrive', None)) else None
        departure = parse_date(a) if (a := self.kwargs.get('departure', None)) else None
        if object_id:
            if arrive and departure:
                return Response({'success': 'забронированы даты...'}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Пожалуйста, введите валидные даты!"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Не предоставлен ID объекта'}, status=status.HTTP_400_BAD_REQUEST)

        # reservations = []
        # if object_id:
        #     if arrive and departure:
        #         reservations = models.ReservationModel.objects.filter(
        #             Q(is_confirmed=True) &
        #             (
        #                     (
        #                             Q(start_date__range=(arrive, departure)) |
        #                             Q(end_date__range=(arrive, departure))
        #                     ) |
        #                     (
        #                             Q(start_date__lt=arrive) &
        #                             Q(start_date__lt=departure) &
        #                             Q(end_date__gt=arrive) &
        #                             Q(end_date__gt=departure)
        #
        #                     ) |
        #                     (
        #                             Q(start_date__gt=arrive) &
        #                             Q(start_date__lt=departure) &
        #                             Q(end_date__gt=arrive) &
        #                             Q(end_date__lt=departure)
        #                     )
        #             )
        #         )
        #     print(reservations)
        #     room_id_list = [reservation.room_id for reservation in reservations]
        #     print(room_id_list)

        # else:
        #     return Response({'error': 'не предоставлен ID объекта'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        object_id = self.kwargs.get('id', None)
        arrive = parse_date(a) if (a := request.data.get('arrive', None)) else a
        departure = parse_date(a) if (a := request.data.get('departure', None)) else a
        tenant = str(a) if (a := request.data.get('tenant', None)) else a
        date_now = datetime.now().date()
        if object_id:
            if arrive and departure and tenant:
                if arrive > departure:
                    return Response({'error': f'Дата заезда {arrive} позже чем дата отъезда {departure}!'},
                                    status=status.HTTP_400_BAD_REQUEST)
                elif arrive < date_now and departure < date_now:
                    return Response(
                        {
                            'error': f'Дата заезда {arrive} и отъезда {departure} уже прошли! Текущая дата {date_now.strftime("%d-%m-%Y")}!'},
                        status=status.HTTP_400_BAD_REQUEST)
                elif arrive < date_now:
                    return Response(
                        {'error': f'Дата заезда {arrive} уже прошла! Текущая дата {date_now.strftime("%d-%m-%Y")}!'},
                        status=status.HTTP_400_BAD_REQUEST)
                elif departure < date_now:
                    return Response(
                        {
                            'error': f'Дата заезда {departure} уже прошла! Текущая дата {date_now.strftime("%%d-%m-%Y")}!'},
                        status=status.HTTP_400_BAD_REQUEST)
                elif arrive == departure:
                    return Response(
                        {
                            'error': f'Дата заезда {arrive} и отъезда {departure} совпадают! Отличие должно быть минимум на 1 день!'},
                        status=status.HTTP_400_BAD_REQUEST)

                serializer = serializers.ReservationSerializer(
                    data={'tenant': tenant, 'room': object_id, 'start_date': arrive, 'end_date': departure,
                          'is_confirmed': True})
                if serializer.is_valid():

                    reservations = models.ReservationModel.objects.filter(
                        Q(is_confirmed=True) &
                        (
                                (
                                        Q(start_date__range=(arrive, departure)) |
                                        Q(end_date__range=(arrive, departure))
                                ) |
                                (
                                        Q(start_date__lte=arrive) &
                                        Q(start_date__lt=departure) &
                                        Q(end_date__gt=arrive) &
                                        Q(end_date__gte=departure)

                                ) |
                                (
                                        Q(start_date__gt=arrive) &
                                        Q(start_date__lte=departure) &
                                        Q(end_date__gt=arrive) &
                                        Q(end_date__lte=departure)
                                )
                        )
                    )

                    room_id_list = set((reservation.room_id for reservation in reservations))
                    if serializer.validated_data.get("room").id in room_id_list:
                        return Response({'error': f'Указанные даты заняты!'}, status=status.HTTP_400_BAD_REQUEST)
                    serializer.save()
                    return Response({'success': 'Дата забронирована!'}, status=status.HTTP_200_OK)
                else:
                    # print(serializer.errors)
                    return Response({'error': f'SERIALIZER: Указанные даты заняты!'},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Пожалуйста укажите валидные данные формы!"},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Пожалуйста укажите валидные данные формы!"}, status=status.HTTP_400_BAD_REQUEST)


class ImagesViewSet(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.ImagesSerializer

    def get(self, *args, **kwargs):
        object_id = self.kwargs.get('room_object_id', None)
        if object_id and object_id.isdigit():
            queryset = models.ImagesModel.objects.filter(room_object_id=int(object_id))
            serializer = serializers.ImagesSerializer(queryset, many=True)
            return Response({"images": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'не предоставлен или указан неверный ID объекта'},
                            status=status.HTTP_400_BAD_REQUEST)


class FavoriteViewSet(APIView):
    # permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.FavoriteSerializer

    def get(self, *args, **kwargs):
        return Response({'method GET': "success, in development"})

    def post(self, request, *args, **kwargs):
        object_id = request.data.get('room_object', None)
        user = request.data.get('user', None)
        if object_id:
            if user:
                serializer = serializers.FavoriteSerializer(data=request.data)
                if serializer.is_valid():

                    serializer.save()
                    return Response({'success': "Добавлено в избранное!"}, status=status.HTTP_200_OK)
                else:
                    models.FavoritesModel.objects.filter(user_id=user, room_object_id=object_id).delete()
                    # models.FavoritesModel.objects.get(Q(user_id=user) & Q(room_object_id=object_id)).delete()
                    print(serializer.errors.get('non_field_errors', 'Ошибка валидации данных сериализатора.')[0])
                    return Response({"success": "Объект удален из избранного!"}, status=status.HTTP_200_OK)

            else:
                return Response({'error': "Неверный формат id пользователя"})
        else:
            return Response({'error': "Неверный формат id объекта"})


class SendCommentViewSet(APIView):
    permission_classes = (permissions.AllowAny,)

    def __check_value(self, value):
        """
        проверка валидности принятой оценки. Должен быть диапазон 0-10. Если переданное значение выходит за указанный
        диапазон, то метод вернет либо 0, либо 10. В зависимости от того за какую границу выходит принятое значение.
        """
        if value is None:
            return None
        value = int(value)
        check_value_10 = 10
        check_value_0 = 0
        if value > 10:
            return check_value_10
        elif value < 0:
            return check_value_0
        return value

    def post(self, request, *args, **kwargs):
        # TODO передать id юзера достать из jwt токена!

        cleanliness = self.__check_value(request.data.get('cleanliness', None))
        timeliness_of_check_in = self.__check_value(request.data.get('timeliness_of_check_in', None))
        location = self.__check_value(request.data.get('location', None))
        conformity_to_photos = self.__check_value(request.data.get('conformity_to_photos', None))
        price_quality = self.__check_value(request.data.get('price_quality', None))
        quality_of_service = self.__check_value(request.data.get('quality_of_service', None))

        positive_comment = request.data.get('positive_comment', "")
        negative_comment = request.data.get('negative_comment', "")

        room_object_id = request.data.get('room_object', None)
        user_id = request.data.get('tenant', None)
        print(request.data)
        if all(
                (
                        cleanliness,
                        timeliness_of_check_in,
                        location,
                        conformity_to_photos,
                        price_quality,
                        quality_of_service,
                        room_object_id,
                        # review_text,
                        user_id,
                )
        ):
            serializer_rating = serializers.RatingSerializer(
                data={
                    "cleanliness": cleanliness,
                    "timeliness_of_check_in": timeliness_of_check_in,
                    "location": location,
                    "conformity_to_photos": conformity_to_photos,
                    "price_quality": price_quality,
                    "quality_of_service": quality_of_service,
                    "room_object": room_object_id,
                }
            )

            if serializer_rating.is_valid():
                print(serializer_rating.validated_data)
                # {
                #     'ratings': {
                #         'non_field_errors': [
                #             ErrorDetail(string='Недопустимые данные. Ожидался dictionary, но был получен str.',
                #                         code='invalid')
                #         ]
                #     },
                #     'user': {
                #         'non_field_errors': [
                #             ErrorDetail(string='Недопустимые данные. Ожидался dictionary, но был получен str.',
                #                         code='invalid')
                #         ]
                #     },
                #     'review_updated': [
                #         ErrorDetail(string='Обязательное поле.', code='required')
                #     ],
                #     'review_created': [
                #         ErrorDetail(string='Обязательное поле.', code='required')
                #     ]
                # }
                try:
                    review_item = models.ReviewsModel.objects.get(room_object=room_object_id, user=user_id)
                    print("review_item", review_item)
                    return Response({"error": "Вы уже оставляли комментарий. Желаете его отредактировать?"}, status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    rating_save = serializer_rating.save()

                    serializer_review = serializers.DefaultReviewSerializer(
                        data={
                            "positive_comment": positive_comment,
                            "negative_comment": negative_comment,
                            "room_object": room_object_id,
                            "user": user_id,
                            "ratings": rating_save.id,
                        }
                    )
                    serializer_review.is_valid()
                    serializer_review.save()

                    print('review_serlz', serializer_review.validated_data, serializer_review.errors)

                    return Response({"success": "TEST SendComment created"}, status=status.HTTP_200_OK)
            else:
                print('ERROR', serializer_rating.errors)
                return Response({"error": "TEST SendComment_serializator"}, status=status.HTTP_400_BAD_REQUEST)

            # ReviewsModel - поместить тест комментария review_text; room_object; user; ratings

        else:
            return Response({"error": "TEST SendComment"}, status=status.HTTP_400_BAD_REQUEST)
