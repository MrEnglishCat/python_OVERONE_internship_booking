from django.contrib import admin
from . import models
# Register your models here.


@admin.register(models.CityModel)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'country', 'region')
    search_fields = ('id', 'name', 'country__name', 'region__name')
    list_filter = ()
    # list_per_page = 100
    # list_max_show_all = 200
    list_select_related = True
@admin.register(models.CountryModel)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('id', 'name')
    list_select_related = True

@admin.register(models.RegionModel)
class RegionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('id', 'name')
    list_select_related = True


@admin.register(models.StreetTypeModel)
class StreetTypeAdmin(admin.ModelAdmin):
    # list_display = ('id', 'name')
    # search_fields = ('id', 'name')
    list_select_related = True


@admin.register(models.BuildingGroupTypeModel)
class BuildingGroupTypeAdmin(admin.ModelAdmin):
    # list_display = ('id', 'name')
    search_fields = ('id', 'building_type_name')
    list_select_related = True

@admin.register(models.BuildingTypeModel)
class BuildingTypeModelAdmin(admin.ModelAdmin):
    # list_display = ('id', 'name')
    search_fields = ('id', 'building_type_name', 'building_type_group__building_group_type')
    autocomplete_fields = ('building_type_group',)
    raw_id_fields = ('building_type_group',)
    list_select_related = True


@admin.register(models.GeneralInformationModel)
class GeneralInformationModelAdmin(admin.ModelAdmin):
    list_select_related = True
    search_fields = ('id', 'general_information')



@admin.register(models.PlacingRulesModel)
class PlacingRulesAdmin(admin.ModelAdmin):
    list_select_related = True

@admin.register(models.ObjectRoomModel)
class ObjectRoomModel(admin.ModelAdmin):
    list_display = ('id', 'title', 'create_datetime', 'update_datetime', 'city')

    list_display_links = ('title',)
    search_fields = ('id', 'title')
    autocomplete_fields = ('city', 'building_info', )
    raw_id_fields = ('city', 'building_info')
    # list_select_related = True
