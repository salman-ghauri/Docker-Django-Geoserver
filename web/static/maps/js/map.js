
$(document).ready(function (e) {

    // Create an empty layer gropu to be filled with user data afterwards.
    var overlay_group = new ol.layer.Group({

        title: 'Overlays',
        layers: []
    });
    console.log(window.location.hostname);
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

    // Prepare and show the map!
    var map = new ol.Map({
        target: 'map',
        controls: ol.control.defaults({
            attribution: false
        }),
        layers: [
            // This group is responisble for the multiple base maps.
            new ol.layer.Group({
                'title': 'Base maps',
                layers: [
                    new ol.layer.Tile({
                        title: 'Water color',
                        type: 'base',
                        visible: false,
                        source: new ol.source.Stamen({
                            layer: 'watercolor'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    }),
                    new ol.layer.Group({
                        title: 'Satellite and labels',
                        type: 'base',
                        combine: true,
                        visible: false,
                        layers: [
                            new ol.layer.Tile({
                                source: new ol.source.BingMaps({
                                    // Get your own key at https://www.bingmapsportal.com/
                                    key: 'Ahd_32h3fT3C7xFHrqhpKzoixGJGHvOlcvXWy6k2RRYARRsrfu7KDctzDT2ei9xB',
                                    imagerySet: 'Aerial'
                                })
                            }),
                            new ol.layer.Tile({
                                source: new ol.source.Stamen({
                                    layer: 'terrain-labels'
                                })
                            })
                        ]
                    })
                ]
            }),
            overlay_group
        ],
        view: new ol.View({
            center: ol.proj.transform([-8.62635, 52.66751 ], 'EPSG:4326', 'EPSG:3857'),
            zoom: 14.2,
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
