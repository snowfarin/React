from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Blog(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    blog = models.CharField(max_length=100)
    dateandtime = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.userid


class Userdata(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    dob = models.CharField(max_length=10)
    phone = models.CharField(max_length=20)
    gender = models.CharField(max_length=6)

    def __str__(self):
        return self.userid


class Mediasavedb(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    filepath = models.FileField()

    def __str__(self):
        return self.userid
