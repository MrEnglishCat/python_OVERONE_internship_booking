from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'countries', views.CountryViewSet, basename='countries')
# router.register(r'regions', views.RegionViewSet, basename='regions')
# router.register(r'cities', views.CitiesViewSet, basename='cities')
router.register(r'search', views.SearchMainPageViewSet, basename='search')
# router.register(r'update_rating', views.UpdateRatingViewSet, basename='update_rating')


urlpatterns = [
    path('', include(router.urls)),
    path('update_rating', views.UpdateRatingViewSet.as_view(), name="update_rating"),
]
