from rest_framework import serializers
from . import models


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CountryModel
        # fields = '__all__'
        fields = ('name',)

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RegionModel
        # fields = '__all__'
        fields = ('name',)

class CitySerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True,)
    region = RegionSerializer(read_only=True)


    class Meta:
        model = models.CityModel
        fields = ('name', 'country', 'region')
        # fields = ('name', 'country_id', 'region_id')
        # exclude = ['region_id', 'country_id']

class BuildingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BuildingTypeModel
        fields = ('name',)
        read_only_fields = ('name',)


class ObjectRoomSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    type = BuildingTypeSerializer(read_only=True)

    class Meta:
        model = models.ObjectRoomModel
        fields = '__all__'
