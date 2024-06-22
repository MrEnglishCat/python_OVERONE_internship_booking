from django.db import models
from django.contrib.auth.models import User
from . import users_models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class CountryModel(models.Model):
    name = models.CharField(max_length=100, unique=True)
    geographic_coordinates = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Страны'
        verbose_name = 'Страна'

    def __str__(self):
        return self.name


class RegionModel(models.Model):
    name = models.CharField(max_length=100)
    geographic_coordinates = models.CharField(max_length=100, null=True, blank=True)
    country = models.ForeignKey(CountryModel, on_delete=models.DO_NOTHING, related_name='regions')


    def __str__(self):
        return f"{self.name} - {self.country}"


class CityModel(models.Model):
    name = models.CharField(max_length=100)
    geographic_coordinates = models.CharField(max_length=100, null=True, blank=True)
    region = models.ForeignKey(RegionModel, on_delete=models.DO_NOTHING, related_name='cities')
    country = models.ForeignKey(CountryModel, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"{self.name} - {self.country}"


class StreetTypeModel(models.Model):
    """
    бульвар
    переулок
    проспект
    улица
    шоссе
    другое:   # TODO пока что сделано без другого, все в одном
        аллея
        дорога
        дорожка
        жилмассив
        киломерт
        линия
        набережная
        площадь
        проезд
        просека
        просёлок
        проулок
        спуск
        трасса
        тупик

    """
    street_type = models.CharField(max_length=100)

    def __str__(self):
        return self.type
#
#
# class AddressModel(models.Model):
#     street_name = models.CharField(max_length=100)
#     building = models.IntegerField()
#     corps = models.IntegerField()
#     location = models.CharField(
#         max_length=100)  # TODO почитать про задание координат в джанго, что бы можно было использовать с картами
#     street_type = models.ForeignKey(StreetTypeModel, on_delete=models.DO_NOTHING)
#
#
class BuildingGroupTypeModel(models.Model):
    """
    Номера, спальные места - в отеле, гостевом доме или хостеле - desc Гостям будет предоставлен номер в отеле, гостевом доме или спальное место в хостеле
    Квартиры, апартаменты - целиком - desc Гости снимут квартиру целиком. Вместе со всеми удобствами и кухней
    Дома, коттеджи - целиком - desc Гости снимут дом целиком. Вместе с пристройками
    Отдельные комнаты - целиком - desc Гости снимут отдельную комнату со спальным местом
    """
    building_group_type = models.CharField(max_length=100, unique=True)
    comment = models.TextField(null=True, blank=True)
    description = models.TextField()

    def __str__(self):
        return self.type


class BuildingTypeModel(models.Model):
    """
    Номера, спальные места -
        Отель
        Апарт-отель
        Капсюльный отель
        Санаторий
        Гостиница
        Мини-гостиница
        Хостел
        База отдыха
        Апартамент
        Гостевой дом
        Отель эконом-класса
        Пансионат
        Глэмпинг
    Квартиры, апартаменты
        Квартира
        Апартамент
        Студия
    Дома, коттеджи
        Коттедж
        Часть дома с отдельным входом
        Таунхаус
        Шале
        Особняк
        Дом
        Эллинг
        Целый этаж в доме
        Бунгало
        Яхта
        Вилла
        Деревенский дом
        Гестхаус
        Дом на колёсах
        Дача
    Отдельные комнаты
        Комната в квартире
        Комната в частном доме
        Комната в коттедже
    """
    building_type_name = models.CharField(max_length=100)
    building_type_group = models.ForeignKey(BuildingGroupTypeModel, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"{self.name} - {self.group}"

#
# class PropertyRoomsModel(models.Model):
#     arrival_time = models.TimeField()
#     departure_time = models.TimeField()
#     prepayment = models.FloatField()
#     minimum_length_of_stay = models.PositiveIntegerField(default=1)  # минимальный срок проживания
#
#
# # ===============================================================
# class GeneralInformationModel(models.Model):
#     room_square = models.FloatField()
#     floor = models.PositiveIntegerField()
#     floor_in_the_house = models.PositiveIntegerField()
#     count_rooms = models.PositiveIntegerField()
#     kitchen = models.CharField()  # без кухни; отдельная кухня; кухня-гостинная; кухонная зона
#     room_repair = models.CharField()  # без ремонта; косметический ремонт; евро ремонт; дизайнерский
#
#
class BedTypesModel(models.Model):
    """
    односпальная кровать
    двуспальная кровать
    двуспальная диван-кровать
    двуспальная широкая (king-size)
    особо широкая двуспальная (super-king-size)
    двухъярусная кровать
    диван кровать
    """
    bed_type = models.CharField(max_length=100, unique=True)
    # count = models.PositiveIntegerField()  # TODO переместить в промежуточную таблицу

    def __str__(self):
        return self.type

# TODO возможно нужна промежуточная модель многие ко многим между BedTypesModel и SleepingPlacesModel
# class SleepingPlacesModel(models.Model):
#     count_sleeping_places = models.PositiveIntegerField()
#     maximum_guests = models.PositiveIntegerField()
#     bed_types = models.ForeignKey(BedTypesModel, on_delete=models.DO_NOTHING)
#
#
class BathroomAmenitiesModel(models.Model):
    """
        биде
        ванна
        гигиенический душ
        дополнительная ванная
        дополнительный туалет
        душ
        общая ванная комната
        общий туалет
        полотенца
        сауна
        тапочки
        туалетные принадлежности
        фен
        халат
        общий душ/душевая
    """
    bathroom_amenities_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

## TODO возможно нужна промежуточная модель многие ко многим между BathroomAmenitiesModel и BathroomModel
# class BathroomModel(models.Model):
#     bathroom_with_wc = models.PositiveIntegerField()
#     bathroom_without_wc = models.PositiveIntegerField()
#     separate_wc = models.PositiveIntegerField()
#     amenities = models.ForeignKey(BathroomAmenitiesModel, on_delete=models.DO_NOTHING)
#
#
class CategoriesAmenitiesModel(models.Model):
    """
    Удобства
        Популярные услуги и удобства, на которые чаще всего обращают внимание гости при поиске жилья. После публикации можно добавить другие
    Вид из окон
        Укажите, что можно увидеть из окон вашего объекта. В разделе «Фото» загрузите фотографии всех видов, которые вы отметили
    Кухонное оборудование
    Оснащение
    Для отдыха в помещении
    Оснащение двора
    Инфраструктура и досуг рядом
    Для детей
    """
    categories_amenities_title = models.CharField(max_length=100, unique=True)
    categories_amenities_description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title

#
# # class ParkingAmenitiesModel(models.Model):  # TODO в последствии добавить такой вариант удобства как пароковка
# #     type = models.CharField(max_length=100)
# #
#
class AmenitiesModel(models.Model):  # Amenities - удобства
    """

    """
    amenities_name = models.CharField(max_length=100, unique=True)
    amenities_description = models.CharField(max_length=100, null=True, blank=True)
    amenities_category = models.ForeignKey(CategoriesAmenitiesModel, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name
#
#
# class ImageUrlsModel(models.Model):
#     url = models.URLField()
#
#
# class PlacingRulesModel(models.Model):
#     # TODO всем полям ниже нужны значения по умолчанию в select
#     with_children = models.BooleanField()
#     age = models.PositiveIntegerField()
#     with_animals = models.BooleanField()
#     smoking_is_allowed = models.BooleanField()
#     parties_are_allowed = models.BooleanField()
#
#
# class ArrivalsDepartueModel(models.Model):
#     arrival_time = models.TimeField()
#     departure_time = models.TimeField()
#
#
# class PricesModel(models.Model):
#     currency_for_calculations = models.CharField()
#     min_rental_period = models.CharField()  # TODO если не получится с датой, то использовать integerField
#     price_per_day = models.FloatField()
#     how_many_guests = models.PositiveIntegerField()
#
#
# class SalesModel(models.Model):
#     type_sales = models.CharField()
#     value = models.FloatField()
#     from_days = models.CharField()  # TODO добавить виджет select
#
#

class ObjectRoomModel(models.Model):
    title = models.CharField(max_length=100)
#     images_urls = models.ForeignKey(ImageUrlsModel,
#                                     on_delete=models.DO_NOTHING)  # хранение адресов на изображения. Разделитель: ","
#     # TODO рассмотреть возможность сделать зависимость параметров от типа строения
#     # TODO СУПЕРХОЗЯИН ГОСТИ РЕКОМЕНДУЮТ 9.9 (12 отзывов) - добавить рейтинг, отзывы. Отобразить количество отзывов
    building_description = models.TextField()
#
#     placing_rules = models.ForeignKey(PlacingRulesModel, on_delete=models.DO_NOTHING)
#     arrival_departure = models.ForeignKey(ArrivalsDepartueModel, on_delete=models.DO_NOTHING)
    prepayment = models.FloatField(default=0.0)  # persent default 20%   default_currency = BYN
    # default_currency = models.
#     price_data = models.ForeignKey(PricesModel, on_delete=models.DO_NOTHING)
#     sales = models.ForeignKey(SalesModel, on_delete=models.DO_NOTHING)
#
    # TODO разобраться с подсчетом рейтинга и как его хранить
    rating = models.FloatField(validators=(MinValueValidator(0.0), MaxValueValidator(5.0)), default=0.0)
    votes = models.PositiveBigIntegerField(default=0)
    rating_sum = models.FloatField(default=0)
    building_info = models.ForeignKey(BuildingTypeModel, on_delete=models.DO_NOTHING)
    city = models.ForeignKey(CityModel, on_delete=models.DO_NOTHING)
#     user = models.ForeignKey(users_models.UserModel, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.title