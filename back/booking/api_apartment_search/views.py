from django.shortcuts import render
from django.db.models import Q
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


class SearchViewSet(viewsets.ModelViewSet):
    # queryset = models.CityModel.objects.all()
    serializer_class = serializers.ObjectRoomSerializer
    filter_backends = [filters.SearchFilter]
    # search_fields = ['country', 'region', 'city', 'name']
    search_fields = ['title', 'city__name']

    def get_queryset(self):
        search = self.request.query_params.get('search', None)
        result = models.ObjectRoomModel.objects.select_related('city').filter(Q(title=search) | Q(city__name=search))  # | ( Q(country__name=search) | Q(region__name=search) = добавить поиск по курорту, адресу
        print('='*100)
        print(result.query)
        print('='*100)
        # result = models.CityModel.objects.filter(name__icontains=search).values('name', 'region__name', 'country__name')
        # result.setdefault(
        #     "count", len(result)
        # )
        return result
        # return models.CityModel.objects.all().filter(name=search)