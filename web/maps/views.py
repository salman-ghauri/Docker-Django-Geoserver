from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View, TemplateView
import requests, json
# Create your views here.

def index(request):
    return render(request, 'maps/index.html')
    # return HttpResponse(flood_polys.object.all)

def feature_info(request, *arg, **kargs):
    if request.method == 'POST':
        url = request.POST.get('url', '');
        # get the data from the url
        r = requests.get(url)
        return HttpResponse(r)

def point_info(request, *arg):
    if request.method == 'POST':
        coords = request.POST.get('coords', '')
        lat = request.POST.get('lat', '')
        lon = request.POST.get('lon', '')
        # print lat, lon
        return HttpResponse(coords)
