from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View, TemplateView
from maps.models import FloodPolys, Fluvial01, Fluvial1, Fluvial10, Choice
from datetime import date
from time import mktime

import requests, json

# Create your views here.

def index(request):
    return render(request, 'maps/index.html')

def feature_info(request, *arg, **kargs):
    if request.method == 'POST':
        url = request.POST.get('url', '');
        # get the data from the url
        r = requests.get(url)
        return HttpResponse(r)

def calculate_distance(request):

    if request.method == 'POST':
        coords = request.POST.get('coords', '')
        lat = float(request.POST.get('lat', ''))
        lon = float(request.POST.get('lon', ''))
        data = {}
        danger = []
        medium = []
        low = []
        inside_danger = False
        inside_med = False
        inside_low = False

        query_danger = "SELECT id, gid, ST_Distance_Spheroid(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326),'SPHEROID[\"WGS 84\", 6378137, 298.257223563]') AS dis FROM fluvial_10 ORDER BY dis ASC;" %(lat, lon)
        query_medium = "SELECT id, gid, ST_Distance_Spheroid(ST_Transform(ST_Boundary(geom), 4326), ST_GeomFromText('POINT(%f %f)', 4326),'SPHEROID[\"WGS 84\", 6378137, 298.257223563]') AS dis FROM fluvial_1 ORDER BY dis ASC;" %(lat, lon)
        query_low = "SELECT id ,gid, ST_Distance_Spheroid(ST_Transform(ST_Boundary(geom), 4326), ST_GeomFromText('POINT(%f %f)', 4326),'SPHEROID[\"WGS 84\", 6378137, 298.257223563]') AS dis FROM fluvial_0_1 ORDER BY dis ASC;" %(lat, lon)

        for dngr, med, lw in zip(Fluvial10.objects.raw(query_danger), Fluvial1.objects.raw(query_medium), Fluvial01.objects.raw(query_low)):

            if dngr.gid:
                contains_query = "SELECT gid FROM fluvial_10 where ST_Contains(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326));" %(lat, lon)
                for check in Fluvial10.objects.raw(contains_query):
                    if check.gid:
                        inside_danger = True
                danger.append(dngr.dis)

            if med.gid:
                contains_query = "SELECT gid FROM fluvial_1 where ST_Contains(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326));" %(lat, lon)
                for check in Fluvial10.objects.raw(contains_query):
                    if check.gid:
                        inside_med = True
                medium.append(med.dis)

            if lw.gid:
                contains_query = "SELECT gid FROM fluvial_0_1 where ST_Contains(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326));" %(lat, lon)
                for check in Fluvial10.objects.raw(contains_query):
                    if check.gid:
                        inside_low = True
                low.append(lw.dis)

        if inside_danger:
            danger[0] = 0
        if inside_med:
            medium[0] = 0
        if inside_low:
            low[0] = 0
        data.update({'danger':danger[0], 'medium': medium[0], 'low':low[0]})
        if not data:
            print 'empty'
        else:
            print json.dumps(data, default=json_serial)

        return HttpResponse(json.dumps(data, default=json_serial))
    else:
        return HttpResponse('Nothing here to be shown!!')

def point_info(request):

    if request.method == 'POST':

        coords = request.POST.get('coords', '')
        lat = float(request.POST.get('lat', ''))
        lon = float(request.POST.get('lon', ''))
        data = {}
        query = "SELECT gid, id, name, end_date, flood_reco  FROM flood_polys where ST_Contains(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326));" %(lat, lon)
        for x in FloodPolys.objects.raw(query):
            if x.name:
                data = {'id': x.id, 'name': x.name, 'end_date': x.end_date, 'flood_record': x.flood_reco}
        if not data:
            print 'empty'
        else:
            print json.dumps(data, default=json_serial)
        return HttpResponse(json.dumps(data, default=json_serial))

def check_status(request):
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
    # -8.626499176025389 52.66802877544953
    # -8.61774444580078 52.67224466189552
    lat = -8.61774444580078
    lon = 52.67224466189552
    data = {}
    danger = []
    medium = []
    low = []
    inside_danger = False
    inside_med = False
    inside_low = False

    query_danger = "SELECT id, gid, ST_Distance_Spheroid(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326),'SPHEROID[\"WGS 84\", 6378137, 298.257223563]') AS dis FROM fluvial_10 ORDER BY dis ASC;" %(lat, lon)
    query_medium = "SELECT id, gid, ST_Distance_Spheroid(ST_Transform(ST_Boundary(geom), 4326), ST_GeomFromText('POINT(%f %f)', 4326),'SPHEROID[\"WGS 84\", 6378137, 298.257223563]') AS dis FROM fluvial_1 ORDER BY dis ASC;" %(lat, lon)
    query_low = "SELECT id ,gid, ST_Distance_Spheroid(ST_Transform(ST_Boundary(geom), 4326), ST_GeomFromText('POINT(%f %f)', 4326),'SPHEROID[\"WGS 84\", 6378137, 298.257223563]') AS dis FROM fluvial_0_1 ORDER BY dis ASC;" %(lat, lon)

    for dngr, med, lw in zip(Fluvial10.objects.raw(query_danger), Fluvial1.objects.raw(query_medium), Fluvial01.objects.raw(query_low)):

        if dngr.gid:
            contains_query = "SELECT gid FROM fluvial_10 where ST_Contains(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326));" %(lat, lon)
            for check in Fluvial10.objects.raw(contains_query):
                if check.gid:
                    inside_danger = True
            danger.append(dngr.dis)

        if med.gid:
            contains_query = "SELECT gid FROM fluvial_1 where ST_Contains(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326));" %(lat, lon)
            for check in Fluvial10.objects.raw(contains_query):
                if check.gid:
                    inside_med = True
            medium.append(med.dis)

        if lw.gid:
            contains_query = "SELECT gid FROM fluvial_0_1 where ST_Contains(ST_Transform(geom, 4326), ST_GeomFromText('POINT(%f %f)', 4326));" %(lat, lon)
            for check in Fluvial10.objects.raw(contains_query):
                if check.gid:
                    inside_low = True
            low.append(lw.dis)

    if inside_danger:
        danger[0] = 0
    if inside_med:
        medium[0] = 0
    if inside_low:
        low[0] = 0
    data.update({'danger':danger[0], 'medium': medium[0], 'low':low[0]})
    if not data:
        return HttpResponse('empty')
    else:
        return HttpResponse(json.dumps(data, default=json_serial))

def json_serial(obj):
    if isinstance(obj, date):
        serial = obj.isoformat()
        return serial
    raise TypeError ("Type not serializable")




