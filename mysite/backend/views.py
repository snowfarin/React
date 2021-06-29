from django.http.response import JsonResponse
from django.shortcuts import render
import json
from .models import *
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage

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
        blog = [(x.blog, x.id) for x in Blog.objects.all().filter(userid=user)]
        # blogpack = {[x.id, x.blog for x in Blog.objects.all().filter(userid=user)]}
        return JsonResponse({'status': True, 'blog': blog})


@csrf_exempt
def delete(request):
    if request.method == 'DELETE':
        data = json.loads(request.body)
        Blog.objects.get(id=data['id']).delete()
        return JsonResponse({'status': True})


@csrf_exempt
def update(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        print(data)
        blog = Blog.objects.get(id=data['id'])
        blog.blog = data['blog']
        blog.save()
        return JsonResponse({'status': True})


@csrf_exempt
def fileupload(request, user_id):
    if request.method == 'POST' and request.FILES['files']:
        file = request.FILES['files']
        fs = FileSystemStorage()
        filename = fs.save(file.name, file)
        file_url = fs.url(filename)
        user = User.objects.get(id=user_id)
        Mediasavedb.objects.create(userid=user, filepath=file_url)
        users = Mediasavedb.objects.all().filter(userid=user)
        return JsonResponse({'status': True, 'fileurl': file_url})
    else:
        return JsonResponse({'status': 'false'})
