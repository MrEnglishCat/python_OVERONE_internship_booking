from django.db import models


# Create your models here.

class CountryModel(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CityModel(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(CountryModel, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.name


class BuildingTypeModel(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CategoriesAmenitiesModel(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class AmenitiesModel(models.Model):
    """
    Описывает варианты удобств в квартире:
        Беспроводной интернет Wi-Fi
        Утюг с гладильной доской
        Водонагреватель
        Гостиный уголок
        Деревянный/паркетный пол
        Обогреватель
        Дизайнерский ремонт
    """
    name = models.CharField(max_length=100)

    description = models.TextField()  # необходимость поля под вопросом
    category = models.ForeignKey(CategoriesAmenitiesModel, on_delete=models.DO_NOTHING)
    def __str__(self):
        return self.name


class BuildingModel(models.Model):
    title = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    urls = models.TextField()  # хранение адресов на изображения. Разделитель: ","
    house_square = models.FloatField()
    number_of_guests = models.IntegerField()
    number_of_bads = models.IntegerField()
    # number_of_bedrooms = models.IntegerField()  # тоже самое что и number_of_rooms

    # рассмотреть возможность сделать зависимость параметров от типа строения
    number_of_rooms = models.IntegerField()
    number_of_floors = models.IntegerField()
    # TODO СУПЕРХОЗЯИН ГОСТИ РЕКОМЕНДУЮТ 9.9 (12 отзывов) - добавить рейтинг, отзывы. Отобразить количество отзывов
    buildind_description = models.TextField()
    sleeping_places_description = models.TextField()
    location = models.TextField()  # нужно будет в дальнейшем привязать к карте координаты
    property_rules = models.TextField()
    arrival_time = models.TimeField()
    departure_time = models.TimeField()
    price = models.FloatField()  # сутки
    min_rental_period = models.DateField()
    type = models.ForeignKey(BuildingTypeModel, on_delete=models.DO_NOTHING)
    city = models.ForeignKey(CityModel, on_delete=models.DO_NOTHING)
