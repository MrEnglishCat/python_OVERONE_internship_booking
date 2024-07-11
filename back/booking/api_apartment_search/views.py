from django.shortcuts import render
from django.db.models import Q, Count, ExpressionWrapper, F, FloatField
from django.db.models.functions.comparison import NullIf
from rest_framework import viewsets, filters, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView, exception_handler

from . import models
from . import serializers

from decimal import Decimal


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


class UpdateRatingViewSet(APIView):  # TODO доделать
    serializer_class = serializers.UpdateRatingObjectSerializer
    permission_classes = [permissions.AllowAny]

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
    filter_backends = [filters.SearchFilter]
    # search_fields = ['country', 'region', 'city', 'name']
    search_fields = ['title', 'city__name']

    def get_queryset(self):
        pk = self.kwargs.get('pk', None)
        if pk and pk.isdigit():
            result = models.ObjectRoomModel.objects.filter(pk=int(pk))
            if result:
                return result
            else:
                return models.ObjectRoomModel.objects.none()  # TODO проработать вариант выдачи своего сообщение вместо стандартного

        elif not pk:
            search = self.request.query_params.get('search', None)
            if not search:
                return models.ObjectRoomModel.objects.none()
            result = models.ObjectRoomModel.objects.select_related('city', 'building_info').filter(
                Q(title__contains=search) | Q(city__name=search) & Q(is_published=True)).annotate(count=Count(
                'title')).annotate(ratingsssss=ExpressionWrapper(F('rating_sum') / NullIf(F('votes'), 0),
                                                                 output_field=FloatField()))  # | ( Q(country__name=search) | Q(region__name=search) = добавить поиск по курорту, адресу

            return result
        else:
            # return Response({'error': f'pk is not valid value. Need integer, but your value is {pk}'}, status=status.HTTP_400_BAD_REQUEST)
            return models.ObjectRoomModel.objects.none()

