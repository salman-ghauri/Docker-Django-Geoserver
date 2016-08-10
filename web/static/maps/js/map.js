$(document).ready(function (e) {

    var geoserver_link = window.location.host;
    // var geoserver_link = '172.21.0.3';
    var projection = new ol.proj.Projection({
          code: 'EPSG:29903',
          units: 'm',
          axisOrientation: 'neu'
    });
    var flood_points = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
            params: {
                'LAYERS': ' flood_data:ireland_flood_points',
                'VERSION': '1.1.1'
            }
        })
    });
    var flood_polygons = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
            params: {
                'LAYERS': 'flood_data:ireland_flood_polygons',
                'VERSION': '1.1.1.'
            }
        })
    });
    var openstreet_layer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    var map = new ol.Map({
        target: 'map',
        controls: ol.control.defaults({
            attribution: false
        }),
        layers: [
            openstreet_layer,
            flood_points
        ],
        view: new ol.View({
            center: ol.proj.transform([-8, 52.5 ], 'EPSG:4326', 'EPSG:3857'),
            zoom: 7,
        })
    });

    map.getView().on('change:resolution', function(evt)
    {
        var resolution = evt.target.get('resolution');
        var units = map.getView().getProjection().getUnits();
        var dpi = 25.4 / 0.28;
        var mpu = ol.proj.METERS_PER_UNIT[units];
        var scale = resolution * mpu * 39.37 * dpi;
        if (scale >= 9500 && scale <= 950000) {
          scale = Math.round(scale / 1000) + "K";
        } else if (scale >= 950000) {
          scale = Math.round(scale / 1000000) + "M";
        } else {
          scale = Math.round(scale);
        }
        // document.getElementById('scale').innerHTML = "Scale = 1 : " + scale;
    });
    map.on('singleclick', function(evt)
    {
        document.getElementById('nodelist').innerHTML = "Loading... please wait...";
        var view = map.getView();
        var viewResolution = view.getResolution();
        var source = flood_points.getSource();
        console.log(view.getProjection());

        var url = source.getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, view.getProjection(),
            {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50}
        );
        console.log(url);
        if (url) {
            document.getElementById('nodelist').innerHTML = '<iframe src="' + url + '"></iframe>';
        }
    });

});
