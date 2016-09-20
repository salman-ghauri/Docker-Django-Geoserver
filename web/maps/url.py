from django.conf.urls import url
from maps import views

urlpatterns = [
	url(r'^$', views.index, name = 'index'),
    url(r'^getFeatureInfo/$', views.feature_info, name = 'featureInfo'),
    url(r'^getPointInfo/$', views.point_info, name = 'pointInfo'),
]
