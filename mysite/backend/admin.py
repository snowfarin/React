from django.contrib import admin
from django.db.models.fields import DateField
from .models import *
# Register your models here.
admin.site.register(Blog)
admin.site.register(Userdata)
