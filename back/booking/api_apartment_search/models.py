from django.db import models
from django.contrib.auth.models import User
from . import users_models


# Create your models here.

class CountryModel(models.Model):
    name = models.CharField(max_length=100)
    geographic_coordinates = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class RegionModel(models.Model):
    name = models.CharField(max_length=100)
    geographic_coordinates = models.CharField(max_length=100)
    country = models.ForeignKey(CountryModel, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name


class CityModel(models.Model):
    name = models.CharField(max_length=100)
    geographic_coordinates = models.CharField(max_length=100)
    region = models.ForeignKey(RegionModel, on_delete=models.DO_NOTHING)
    country = models.ForeignKey(CountryModel, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name


class StreetTypeModel(models.Model):
    """
    бульвар
    переулок
    проспект
    улица
    шоссе
    другое:
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
    type = models.CharField(max_length=100)


class AddressModel(models.Model):
    street_name = models.CharField(max_length=100)
    building = models.IntegerField()
    corps = models.IntegerField()
    location = models.CharField(
        max_length=100)  # TODO почитать про задание координат в джанго, что бы можно было использовать с картами
    street_type = models.ForeignKey(StreetTypeModel, on_delete=models.DO_NOTHING)


class BuildingGroupTypeModel(models.Model):
    """
    Номера, спальные места - в отеле, гостевом доме или хостеле - desc Гостям будет предоставлен номер в отеле, гостевом доме или спальное место в хостеле
    Квартиры, апартаменты - целиком - desc Гости снимут квартиру целиком. Вместе со всеми удобствами и кухней
    Дома, коттеджи - целиком - desc Гости снимут дом целиком. Вместе с пристройками
    Отдельные комнаты - целиком - desc Гости снимут отдельную комнату со спальным местом
    """
    type = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


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
    name = models.CharField(max_length=100)
    group = models.ForeignKey(BuildingGroupTypeModel, on_delete=models.DO_NOTHING)


class PropertyRoomsModel(models.Model):
    arrival_time = models.TimeField()
    departure_time = models.TimeField()
    prepayment = models.FloatField()
    minimum_length_of_stay = models.PositiveIntegerField(default=1)  # минимальный срок проживания


# ===============================================================
class GeneralInformationModel(models.Model):
    room_square = models.FloatField()
    floor = models.PositiveIntegerField()
    floor_in_the_house = models.PositiveIntegerField()
    count_rooms = models.PositiveIntegerField()
    kitchen = models.CharField()  # без кухни; отдельная кухня; кухня-гостинная; кухонная зона
    room_repair = models.CharField()  # без ремонта; косметический ремонт; евро ремонт; дизайнерский


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
    type = models.CharField(max_length=100)
    count = models.PositiveIntegerField()


class SleepingPlacesModel(models.Model):
    count_sleeping_places = models.PositiveIntegerField()
    maximum_guests = models.PositiveIntegerField()
    bed_types = models.ForeignKey(BedTypesModel, on_delete=models.DO_NOTHING)


class BathroomAmenitiesModel(models.Model):
    name = models.CharField(max_length=100)


class BathroomModel(models.Model):
    bathroom_with_wc = models.PositiveIntegerField()
    bathroom_without_wc = models.PositiveIntegerField()
    separate_wc = models.PositiveIntegerField()
    amenities = models.ForeignKey(BathroomAmenitiesModel, on_delete=models.DO_NOTHING)


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
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title


# class ParkingAmenitiesModel(models.Model):  # TODO в последствии добавить такой вариант
#     type = models.CharField(max_length=100)
#

class AmenitiesModel(models.Model):  # Amenities - удобства
    """
    """
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    category = models.ForeignKey(CategoriesAmenitiesModel, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name


class ImageUrlsModel(models.Model):
    url = models.URLField()


class PlacingRulesModel(models.Model):
    # TODO всем полям ниже нужны значения по умолчанию в select
    with_children = models.BooleanField()
    age = models.PositiveIntegerField()
    with_animals = models.BooleanField()
    smoking_is_allowed = models.BooleanField()
    parties_are_allowed = models.BooleanField()


class ArrivalsDepartueModel(models.Model):
    arrival_time = models.TimeField()
    departure_time = models.TimeField()


class PricesModel(models.Model):
    currency_for_calculations = models.CharField()
    min_rental_period = models.CharField()  # TODO если не получится с датой, то использовать integerField
    price_per_day = models.FloatField()
    how_many_guests = models.PositiveIntegerField()


class SalesModel(models.Model):
    type_sales = models.CharField()
    value = models.FloatField()
    from_days = models.CharField()  # TODO добавить виджет select


class RoomModel(models.Model):
    title = models.CharField(max_length=100)
    images_urls = models.ForeignKey(ImageUrlsModel,
                                    on_delete=models.DO_NOTHING)  # хранение адресов на изображения. Разделитель: ","
    # TODO рассмотреть возможность сделать зависимость параметров от типа строения
    # TODO СУПЕРХОЗЯИН ГОСТИ РЕКОМЕНДУЮТ 9.9 (12 отзывов) - добавить рейтинг, отзывы. Отобразить количество отзывов
    buildind_description = models.TextField()

    placing_rules = models.ForeignKey(PlacingRulesModel, on_delete=models.DO_NOTHING)
    arrival_departure = models.ForeignKey(ArrivalsDepartueModel, on_delete=models.DO_NOTHING)
    prepayment = models.FloatField()  # persent default 20%
    price_data = models.ForeignKey(PricesModel, on_delete=models.DO_NOTHING)
    sales = models.ForeignKey(SalesModel, on_delete=models.DO_NOTHING)

    type = models.ForeignKey(BuildingTypeModel, on_delete=models.DO_NOTHING)
    city = models.ForeignKey(CityModel, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(users_models.UserModel, on_delete=models.DO_NOTHING)
