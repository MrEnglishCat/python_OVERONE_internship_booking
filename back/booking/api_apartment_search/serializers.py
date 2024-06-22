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
    country = serializers.CharField(source='country.name')
    # country = CountrySerializer(read_only=True,)
    region = serializers.CharField(source='region.name')


    class Meta:
        model = models.CityModel
        fields = ('name', 'country', 'region')
        # fields = ('name', 'country_id', 'region_id')
        # exclude = ['region_id', 'country_id']

class BuildingTypeSerializer(serializers.ModelSerializer):
    building_type_group = serializers.CharField(source='building_type_group.building_group_type')
    
    class Meta:
        model = models.BuildingTypeModel
        fields = ('building_type_name', 'building_type_group')
        read_only_fields = ('building_type_name', 'building_type_group')


class ObjectRoomSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)
    building_info = BuildingTypeSerializer(read_only=True)

    class Meta:
        model = models.ObjectRoomModel
        fields = '__all__'
