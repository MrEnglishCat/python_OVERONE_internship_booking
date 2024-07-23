
from decimal import Decimal
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions
from rest_framework.views import APIView, status
from serializers import CustomUserSerializer
from rest_framework.response import Response
# JWT Token (Registration, Sing in, sign out)

class RegistrationAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            # user = serializer.save()
            user = serializer.save()
            refresh = RefreshToken.for_user(user)  # Создание Refesh и Access
            refresh.payload.update({  # Полезная информация в самом токене
                'user_id': user.id,
                'username': user.username
            })
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),  # Отправка на клиент
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    permission_classes = (permissions.AllowAny,)
    # def get_queryset(self):
    #     user = self.request.user
    #     return Response({'error': 'Нужен и логин, и пароль'},
    #
    #                         status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):

        def authenticate_user(username=None, password=None, user=None):
            user = models.User.objects.get(username=username)

            if user is not None:
                if user.check_password(password):
                    return user
                else:
                    return False


        data = request.data
        username = data.get('username', None)
        password = data.get('password', None)

        if username is None or password is None:
            return Response({'error': 'Нужен и логин, и пароль'},

                            status=status.HTTP_400_BAD_REQUEST)

        user = authenticate_user(username=username, password=password)
        print(user)
        if user is None:
            return Response(
                {
                    'error': 'Неверные данные'
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)
        refresh.payload.update(
            {
                'user_id': user.id,
                'username': user.username
            }
        )

        return Response(
            {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            status=status.HTTP_200_OK
        )
