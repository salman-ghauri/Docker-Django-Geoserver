$(document).ready(function()
{
  /*
  * @Handeling the modals
  * the @terms and #location
  */
  $('.outer-info').addClass('hide');
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
    // $('.outer-info').toggle(400);
    console.log($('#outer-info').attr('class'));
    $('#outer-info').toggleClass('hide');
    // $('#outer-info').toggle(300);
    $('#check-1').toggleClass('glyphicon glyphicon-chevron-right glyphicon glyphicon-chevron-left');
  });
  /*
  * @Map and openlayers
  * @Layers and geoserver.
  */
  // var center = [-7908084, 6177492];
  // var center = [-52.6680, 8.6305];

  // Create an empty layer gropu to be filled with user data afterwards.
  var overlay_group = new ol.layer.Group({

      title: 'Flood Information',
      layers: []
  });
  var geoserver_link = window.location.hostname;
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
  var fluvial_high = new ol.layer.Tile({
      title: 'Fluvial - high risk',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:fluvial - 10_',
              'VERSION': '1.1.1'
          }
      })
  });
  var fluvial_medium = new ol.layer.Tile({
      title: 'Fluvial - medium risk',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:fluvial - 1_',
              'VERSION': '1.1.1'
          }
      })
  });
  var fluvial_low = new ol.layer.Tile({
      title: 'Fluvial - low risk',
      source: new ol.source.TileWMS({
          url: 'http://'+geoserver_link+':8080/geoserver/flood_data/wms',
          params: {
              'LAYERS': 'flood_data:fluvial - 0.1_',
              'VERSION': '1.1.1'
          }
      })
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

  var map = new ol.Map({
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
     flood_polygons
      // overlay_group
    ],
    target: 'map',
    view: new ol.View({
      center: ol.proj.transform([-8.62635, 52.66751], 'EPSG:4326', 'EPSG:3857'), // -8.2439, 53.4129
      zoom: 12 //8
    })
  });
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

  /*
  * Ability to add marker
  * Move the marker
  * get the new coordinates of the marker.
  */
  var last_coord = [];
  var point_feature = new ol.Feature(new ol.geom.Point(map.getView().getCenter()));
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
        src: 'http://openlayers.org/en/v3.8.2/examples/data/icon.png'
      })
    })
  });

  $('#marker-box').on('click', function()
  {
    map.getLayers().push(marker_layer);
    map.addInteraction(drag_interaction);
    point_feature.on('change', function (e) {
      last_coord = this.getGeometry().getCoordinates();
      last_coord = ol.proj.transform(last_coord, 'EPSG:3857', 'EPSG:4326');
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
  $('#map').on('mouseup', function (e) {
    // alert('go');
    // console.log('moved to: ' + last_coord);
    lat = last_coord[0];
    lon = last_coord[1];
    $.ajax({
      url: '/maps/getPointInfo/',
      type: 'POST',
      data: {
        'coords': 'adsfasdf',
        lat: lat,
        lon: lon,
        'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
      }
    })
    .then(function (res) {
      console.log(res);
    });
  });
  // map.on('singleclick', function(evt)
  // {
  //     var source = flood_points.getSource();
  //     getFeatureInfo(evt, source);

  // });
  var i = 1;

  function getFeatureInfo(evt, source)
  {
      var view = map.getView();
      var viewResolution = view.getResolution();
      var url = source.getGetFeatureInfoUrl(
          evt.coordinate, viewResolution, view.getProjection(),
          {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50}
      );

      console.log(url);
      if (url) {
          $.ajax({
              url: '/maps/getFeatureInfo/',
              type: 'POST',
              dataType: 'json',
              data: {'url': url, 'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()}
          })
          .then(function (res) {

              if (res.features.length)
              {
                  var point_info = res.features[0];
                  var point_info_properties = point_info.properties;
                  var data = "<div><p><strong>Region id: </strong> "+point_info.id+"</p><p><strong>Name: </strong> "+point_info_properties.name+"</p><p><strong>Flood records: </strong> "+point_info_properties.flood_reco+"</p><p><strong>End date: </strong> "+point_info_properties.end_date+"</p></div>";
                  popup.show(evt.coordinate, data);
              }
              else
              {
                  if (i < 2)
                  {
                      getFeatureInfo(evt, flood_polygons.getSource());
                      i = i+1;
                  }
              }
              console.log(res);
          })
          .catch(function(err) {
              console.log(err);
          });
      }
      i = 1;
  }
});
