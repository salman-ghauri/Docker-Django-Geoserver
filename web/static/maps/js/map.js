(function ($) {
    "use strict";
    function centerModal() {
        $(this).css('display', 'block');
        var $dialog  = $(this).find(".modal-dialog"),
        offset       = ($(window).height() - $dialog.height()) / 2,
        bottomMargin = parseInt($dialog.css('marginBottom'), 10);

        // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
        if(offset < bottomMargin) offset = bottomMargin;
        $dialog.css("margin-top", offset);
    }

    $(document).on('show.bs.modal', '.modal', centerModal);
    $(window).on("resize", function () {
        $('.modal:visible').each(centerModal);
    });
}(jQuery));

$(document).ready(function (e) {

    var flood_points_check;
    $(document).on('click', '#point-toggle', function(e) {
        flood_points_check = $(this).prop('checked');
        console.log(flood_points_check);
    });
    var geoserver_link = window.location.host;
    // var geoserver_link = '172.21.0.3';
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
    var layers = [openstreet_layer];
    if (flood_points_check)
    {
        layers.push(flood_points);
    }
    else if (!flood_points_check)
    {
        if (layers.indexOf(flood_points) > 0)
        {
            var point_index = layers.indexOf(flood_points);
            layers.splice(flood_points, 1);
        }
    }

    var map = new ol.Map({
        target: 'map',
        controls: ol.control.defaults({
            attribution: false
        }),
        layers: [
            openstreet_layer,
            flood_points,
            // flood_polygons
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
    });
    map.on('singleclick', function(evt)
    {
        var view = map.getView();
        var viewResolution = view.getResolution();
        var source = flood_points.getSource();

        var url = source.getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, view.getProjection(),
            {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50}
        );
        console.log(url);
        if (url) {
            // document.getElementById('nodelist').innerHTML = '<iframe src="' + url + '"></iframe>';
            $.get(url).then(function (res) {

                if (res.features.length)
                {
                    var point_info = res.features[0];
                    console.log(point_info.id);
                    var point_info_properties = point_info.properties;
                    console.log(point_info_properties.name);
                    console.log(point_info_properties.flood_reco);
                    console.log(point_info_properties.end_date);
                    $('#myModal .modal-body').append('<strong>Region id:</strong> '+ point_info.id+'<br/><strong>Name:</strong> '+point_info_properties.name+'<br/><strong>Flood records:</strong> '+point_info_properties.flood_reco+'<br/><strong>End date:</strong> '+point_info_properties.end_date);
                    $('#myModal').modal();

                }
            });
        }
    });
    $('#myModal').on('hidden.bs.modal', function () {

        $('#myModal .modal-body').html('');
    });
});
