from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'countries', views.CountryViewSet, basename='countries')
# router.register(r'regions', views.RegionViewSet, basename='regions')
# router.register(r'cities', views.CitiesViewSet, basename='cities')
router.register(r'search', views.SearchViewSet, basename='search')


urlpatterns = [
    path('', include(router.urls)),
]