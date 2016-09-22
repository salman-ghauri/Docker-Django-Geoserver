from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View, TemplateView
from maps.models import FloodPolys
from datetime import date
from time import mktime

import requests, json

# Create your views here.

def index(request):
    # lat = -8.589420318603516
    # lon = 52.67669432297103
    # data = {}
    # query = "SELECT gid, id, name, end_date, flood_reco  FROM flood_polys where ST_Contains(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326));" %(lat, lon)
    # for x in FloodPolys.objects.raw(query):
    #     if x.name:
    #         data = {'id': x.id, 'name': x.name, 'end_date': x.end_date, 'flood_record': x.flood_reco}
    # if not data:
    #     print 'empty'
    # else:
    #     print json.dumps(data, default=json_serial)
    return render(request, 'maps/index.html')

def feature_info(request, *arg, **kargs):
    if request.method == 'POST':
        url = request.POST.get('url', '');
        # get the data from the url
        r = requests.get(url)
        return HttpResponse(r)

def point_info(request):

    if request.method == 'POST':

        coords = request.POST.get('coords', '')
        lat = float(request.POST.get('lat', ''))
        lon = float(request.POST.get('lon', ''))
        data = {}
        # if lat & lon:
        query = "SELECT gid, id, name, end_date, flood_reco  FROM flood_polys where ST_Contains(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326));" %(lat, lon)
        for x in FloodPolys.objects.raw(query):
            if x.name:
                data = {'id': x.id, 'name': x.name, 'end_date': x.end_date, 'flood_record': x.flood_reco}
        if not data:
            print 'empty'
        else:
            print json.dumps(data, default=json_serial)
        return HttpResponse(json.dumps(data, default=json_serial))

def json_serial(obj):
    if isinstance(obj, date):
        serial = obj.isoformat()
        return serial
    raise TypeError ("Type not serializable")




