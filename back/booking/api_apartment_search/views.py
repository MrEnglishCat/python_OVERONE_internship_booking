from django.shortcuts import render
from django.db.models import Q, Count, ExpressionWrapper, F, FloatField
from django.db.models.functions.comparison import NullIf
from rest_framework import viewsets, filters
from . import models
from . import serializers


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


class SearchMainPageViewSet(viewsets.ModelViewSet):
    # queryset = models.CityModel.objects.all()
    serializer_class = serializers.ObjectRoomSerializer
    filter_backends = [filters.SearchFilter]
    # search_fields = ['country', 'region', 'city', 'name']
    search_fields = ['title', 'city__name']

    def get_queryset(self):
        search = self.request.query_params.get('search', None)
        result = models.ObjectRoomModel.objects.select_related('city', 'building_info').filter(
            Q(title__contains=search) | Q(city__name=search)).annotate(count=Count(
            'title')).annotate(ratingsssss=ExpressionWrapper(F('rating_sum') / NullIf(F('votes'), 0), output_field=FloatField()))  # | ( Q(country__name=search) | Q(region__name=search) = добавить поиск по курорту, адресу
        # print('='*100)
        # print(result.query)
        # print('='*100)
        # result = models.CityModel.objects.filter(name__icontains=search).values('name', 'region__name', 'country__name')
        # result.setdefault(
        #     "count", len(result)
        # )
        return result
        # return models.CityModel.objects.all().filter(name=search)
