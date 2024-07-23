from django.contrib import admin
from . import models
from django.contrib.admin.views.main import ChangeList
from django.core.paginator import EmptyPage, InvalidPage, Paginator


# Register your models here.


# @admin.register(models.CityModel)
# class CityAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name', 'country', 'region')
#     search_fields = ('id', 'name', 'country__name', 'region__name')
#     list_filter = ()
#     # list_per_page = 100
#     # list_max_show_all = 200
#     list_select_related = True

class InlineChangeList(object):
    can_show_all = True
    multi_page = True
    get_query_string = ChangeList.__dict__['get_query_string']

    def __init__(self, request, page_num, paginator):
        self.show_all = 'all' in request.GET
        self.page_num = page_num
        self.paginator = paginator
        self.result_count = paginator.count
        self.params = dict(request.GET.items())


class InlineCityAdmin(admin.TabularInline):
    # TODO разобраться с пагинацией, т к если строк более 50 от неудобно просматривать и ожидать долго их загрузки
    model = models.CityModel
    list_display = ('id', 'name', 'country', 'region')
    search_fields = ('id', 'name', 'country__name', 'region__name')
    autocomplete_fields = ('country', 'region',)
    list_filter = ()
    # list_per_page = 10
    # list_max_show_all = 200
    extra = 1
    per_page = 20

    def get_formset(self, request, obj=None, **kwargs):
        formset_class = super(InlineCityAdmin, self).get_formset(
            request, obj, **kwargs
        )

        class PaginationFormSet(formset_class):
            def __init__(self, *args, **kwargs):
                super(PaginationFormSet, self).__init__(*args, **kwargs)

                qs = self.queryset
                paginator = Paginator(qs, self.per_page)
                try:
                    page_num = int(request.GET.get('page', '1'))
                except (ValueError, TypeError):
                    page_num = 1

                try:
                    page = paginator.page(page_num)
                except (EmptyPage, InvalidPage):
                    page = paginator.page(1)

                self.page = page
                self.cl = InlineChangeList(request, page_num, paginator)
                self.paginator = paginator

                if self.cl.show_all:
                    self._queryset = qs
                else:
                    self._queryset = page.object_list

        PaginationFormSet.per_page = self.per_page
        return PaginationFormSet


@admin.register(models.CountryModel)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('id', 'name')
    list_select_related = True
    inlines = (InlineCityAdmin,)


@admin.register(models.RegionModel)
class RegionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('id', 'name')
    list_select_related = True
    autocomplete_fields = ('country',)


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
    # autocomplete_fields = ('city', 'building_info',)  # изначальная строка
    autocomplete_fields = ('building_info',)
    raw_id_fields = ('city', 'building_info')
    # list_select_related = True
