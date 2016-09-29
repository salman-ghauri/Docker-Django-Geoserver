$(document).ready(function()
{
  /*
  * @Handeling the modals
  * the @terms and #location
  */
  $('.outer-info').hide();
  $('#terms-modal').modal({
    show: true,
    backdrop: 'static',
    keyboard: false
  });

  $('#accept-terms').on('click', function (eap)
  {
    $('#terms-modal').slideUp(1000);
    $('#terms-modal').modal('hide');
    $('#location-modal').modal('show');
    $('.floating-panel').removeClass('hide');
  });

  $('#search-location').on('click', function (e)
  {
    e.preventDefault();
    $('#location-modal').modal('show');
  });

  $('#floating-swipe').on('click', function (e)
  {
    $('.buttons').toggle(200);
    $('.outer-info').toggle(200);
    $('#check-1').toggleClass('glyphicon glyphicon-chevron-right glyphicon glyphicon-chevron-left');
  });
  /*
  * @Map and openlayers
  * @Layers and geoserver.
  */
  var geoserver_link = window.location.hostname;

/*
  // Create an empty layer gropu to be filled with user data afterwards.
  var overlay_group = new ol.layer.Group({

      title: 'Flood Information',
      layers: []
  });
  // Get user data from geoserver - Map layers.
  var flood_points = new ol.layer.Tile({
      title: 'Ireland_flood_points',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': ' flood_data:ireland_flood_points',
              'VERSION': '1.1.1'
          }
      })
  });
  var flood_polygons = new ol.layer.Tile({
      title: 'Ireland_flood_polygons',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:ireland_flood_polygons',
              'VERSION': '1.1.1.'
          }
      })
  });
  var coastal_high = new ol.layer.Tile({
      title: 'Coastal - high risk',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:coastal - 10_ eap',
              'VERSION': '1.1.1'
          }
      })
  });
  var coastal_medium = new ol.layer.Tile({
      title: 'Coastal - medium risk',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:coastal - 0.5_ eap',
              'VERSION': '1.1.1'
          }
      })
  });
  var coastal_low = new ol.layer.Tile({
      title: 'Coastal - low risk',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:coastal - 0.1_ eap',
              'VERSION': '1.1.1'
          }
      })
  });
  });
  var defence_embarkment = new ol.layer.Tile({
      title: 'Defence Embarkement',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:defence embankment',
              'VERSION': '1.1.1'
          }
      })
  });
  var defence_wall = new ol.layer.Tile({
      title: 'Defence wall',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:defence wall',
              'VERSION': '1.1.1'
          }
      })
  });
  var defended_areas = new ol.layer.Tile({
      title: 'Defended Areas',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:defended areas',
              'VERSION': '1.1.1'
          }
      })
  });
*/
  var fluvial_high = new ol.layer.Tile({
      title: 'Fluvial - high risk',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:fluvial_10',
              'VERSION': '1.1.1'
          }
      })
  });
  var fluvial_medium = new ol.layer.Tile({
      title: 'Fluvial - medium risk',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:fluvial_1',
              'VERSION': '1.1.1'
          }
      })
  });
  var fluvial_low = new ol.layer.Tile({
      title: 'Fluvial - low risk',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:fluvial_0_1',
              'VERSION': '1.1.1'
          }
      })
    });
  var map = new ol.Map({
    controls:ol.control.defaults({ attribution: false}),
    layers: [
     new ol.layer.Group({
      'title': 'Base maps',
      layers: [
          new ol.layer.Tile({
              title: 'OSM',
              type: 'base',
              visible: true,
              source: new ol.source.OSM()
          }),
          new ol.layer.Tile({
            title: 'Google',
            type: 'base',
            visible: true,
            source: new ol.source.OSM({
            url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            attributions: [
                new ol.Attribution({ html: '© Google' }),
                new ol.Attribution({ html: '<a href="https://developers.google.com/maps/terms">Terms of Use.</a>' })
              ]
            })
          }),
        ]
      }),
      fluvial_high,
      fluvial_medium,
      fluvial_low
    ],
    target: 'map',
    view: new ol.View({
      center: ol.proj.transform([-8.6305, 52.6680], 'EPSG:4326', 'EPSG:3857'), // [-8.62635, 52.66751]
      zoom: 14
    })
  });
  map.addControl(new ol.control.ScaleLine());
/*
  // Creating instance for the Layer swither and adding it to the map for controls.
  var layer_switcher = new ol.control.LayerSwitcher();
  map.addControl(layer_switcher);

  // Creating instance of popup and add it to the map.
  var popup = new ol.Overlay.Popup();
  map.addOverlay(popup);
  // Adding the user data to layers_group (from above) to show them on map and in the controls.
  overlay_group.getLayers().push(coastal_high);
  overlay_group.getLayers().push(coastal_medium);
  overlay_group.getLayers().push(coastal_low);
  overlay_group.getLayers().push(fluvial_high);
  overlay_group.getLayers().push(fluvial_medium);
  overlay_group.getLayers().push(fluvial_low);
  overlay_group.getLayers().push(defence_embarkment);
  overlay_group.getLayers().push(defence_wall);
  overlay_group.getLayers().push(defended_areas);

  ol.control.LayerSwitcher.forEachRecursive(overlay_group, function(layer) {
      layer.setVisible(false);
      layer.setOpacity(0.5);
  });

  flood_polygons.setOpacity(0.5);
  */

  /*
  * Ability to add marker
  * Move the marker
  * get the new coordinates of the marker.

   var last_coord = [];

  * @listner for creating marer layer
  * return new @cordinates on each point movment.
  */
  console.log(map.getLayers().U.length);

  $('#marker-box').on('click', function()
  {
    last_coord = map.getView().getCenter();
    var point_feature = new ol.Feature(new ol.geom.Point(last_coord));
    var drag_interaction = new ol.interaction.Modify({
      features: new ol.Collection([point_feature]),
      style: null
    });
    var marker_layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [point_feature]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          src: 'http://s22.postimg.org/nyt5oxv6p/location_marker.png'
        })
      })
    });
    if (map.getLayers().U.length >= 5)
    {
      map.getLayers().pop();
      map.removeInteraction(drag_interaction);
    }
    map.getLayers().push(marker_layer);
    map.addInteraction(drag_interaction);

    point_feature.on('change', function (e) {
      last_coord = this.getGeometry().getCoordinates();
      last_coord = ol.proj.transform(last_coord, 'EPSG:3857', 'EPSG:4326');
      // console.log(last_coord);
    }, point_feature);
  });

  /*
  * Change the cursor
  * make the pointer
  * on the features.
  */
  var target = map.getTarget();
  var jTarget = typeof target === "string" ? $("#" + target) : $(target);
  $(map.getViewport()).on('mousemove', function (e) {
      var pixel = map.getEventPixel(e.originalEvent);
      var hit = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
          return true;
      });
      if (hit) {
          jTarget.css("cursor", "pointer");
      } else {
          jTarget.css("cursor", "");
      }
  });
  var old_val = $('.inner-content').html();

  $('#map').on('mouseup', function (e)
  {
    lat = last_coord[0];
    lon = last_coord[1];
    var current_zoom = map.getView().getZoom();
    var url = 'http://nominatim.openstreetmap.org/reverse?format=json&lat='+lon+'&lon='+lat+'&zoom='+current_zoom+'&addressdetails=1';
    $.ajax({
      type: 'GET',
      url: url,
    })
    .then(function (res) {
      console.log(res.display_name);
      $('#inner-data').html('Location name: ' + res.display_name);
      // if (checkClass())
      // {

      // }
      // else
      // {

      // }
      $('.outer-info').show(200);
      // $('#check-1').toggleClass('glyphicon glyphicon-chevron-right glyphicon glyphicon-chevron-left');
    });
    $.ajax({
      url: '/maps/getPointDistance/',
      type: 'POST',
      data: {
        'coords': 'none',
        lat: lat,
        lon: lon,
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
      }
    })
    .then(function (res) {
      output = JSON.parse(res);
      if ($.isEmptyObject(output))
      {
        console.log('nothing found');
        $('.inner-content').html(old_val);
      }
      else {
        keys = Object.keys(output);

        var new_text =  "<div id='info-region'>"+
                          "<div id='inner-data'>"+
                            "This area will contain some data"+
                          "</div>"+
                        "</div>"+
                        "<div id='distance-blocks'>"+
                          "<div id='danger-dis'><p>High Risk Area</p><p>"+cleanValue(output['danger'])+" away</p><span class='info_icon_2'><img src='/static/img/info_2.png'/></span></div>"+
                          "<div id='medium-dis'><p>Medium Risk Area </p><p>"+cleanValue(output['medium'])+" away</p><span class='info_icon_2'><img src='/static/img/info_2.png'/></span></div>"+
                          "<div id='low-dis'><p>Low Risk Area </p><p>"+cleanValue(output['low'])+" away</p><span class='info_icon_2'><img src='/static/img/info_2.png'/></span></div>"+
                        "</div>";

        $('.inner-content').html(new_text);
      }
    });
  });

  function cleanValue(val)
  {
    val = Math.floor(val).toString();
    if (val.length > 3)
    {
      return Math.ceil(parseFloat(val)/1000).toString() + ' Km';
    }
    else
    {
      return val+' m';
    }
  }

});
