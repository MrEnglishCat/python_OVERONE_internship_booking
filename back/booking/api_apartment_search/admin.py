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
    search_fields = ('id', 'type')
    list_select_related = True

@admin.register(models.BuildingTypeModel)
class BuildingTypeModelAdmin(admin.ModelAdmin):
    # list_display = ('id', 'name')
    search_fields = ('id', 'name')
    autocomplete_fields = ('group', )
    raw_id_fields = ('group',)
    list_select_related = True


@admin.register(models.ObjectRoomModel)
class ObjectRoomModel(admin.ModelAdmin):
    # list_display = ('id', 'name')
    # search_fields = ('id', 'name')
    autocomplete_fields = ('city', 'type', )
    raw_id_fields = ('city', 'type')
    # list_select_related = True
