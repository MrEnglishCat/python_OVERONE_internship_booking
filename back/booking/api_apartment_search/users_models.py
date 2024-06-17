from django.db import models


class UserModel(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    # sex = models.Choices(('male', 'male'), ('female', 'female'))  # TODO Choice узнать как задать селект по умолчанию
    email = models.EmailField()
    password = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    birth_date = models.DateField()
    phone = models.CharField(max_length=100)  # TODO изменить тип поля если не подойдет CharField
    rating = models.FloatField(default=0.0)

    def __str__(self):
        return self.name
