from django.http.response import JsonResponse
from django.shortcuts import render
import json
from .models import *
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        User.objects.create(
            username=data['username'], email=data['email'], password=data['password'], first_name=data['firstname'], last_name=data['lastname'])
        for x in User.objects.all().filter(username=data['username']):
            userid = x
        Userdata.objects.create(
            userid=userid,
            dob=data['dob'], phone=data['phone'], gender=data['gender'])

        return JsonResponse({'status': True})
    else:
        return JsonResponse({'status': False})


@csrf_exempt
def signin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = authenticate(
            username=data['username'], password=data['password'])
        if user is not None:
            created_user = User.objects.all().get(username=data['username'])
            return JsonResponse({'status': True, 'user_token': created_user.id})
        else:
            return JsonResponse({"status": False})


@csrf_exempt
def upload(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = User.objects.get(id=data['userid'])
        Blog.objects.create(userid=user, blog=data['blog'])
        return JsonResponse({'status': True})
    else:
        return JsonResponse({'status': False})


def blogdisp(request, user_id):
    if request.method == 'GET':
        user = User.objects.get(id=user_id)
        blog = [x.blog for x in Blog.objects.all().filter(userid=user)]
        return JsonResponse({'status': True, 'blog': blog})
