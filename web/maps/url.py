from django.conf.urls import url
from maps import views

urlpatterns = [
	url(r'^$', views.index, name = 'index'),
    url(r'^getFeatureInfo/$', views.feature_info, name = 'featureInfo'),
    url(r'^getPointInfo/$', views.point_info, name = 'pointInfo'),
    url(r'^getPointDistance/$', views.calculate_distance, name = 'point_distance'),
    url(r'^check-status/$', views.check_status, name = 'check-status'),
]
