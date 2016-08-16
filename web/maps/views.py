from django.shortcuts import render
from django.http import HttpResponse
import requests, json
# Create your views here.

def index(request):
    return render(request, 'maps/index.html')

def feature_info(request, *arg, **kargs):
    if request.method == 'POST':
        url = request.POST.get('url', '');
        r = requests.get(url)
        return HttpResponse(r)
