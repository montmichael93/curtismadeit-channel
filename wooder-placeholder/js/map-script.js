/* --------------------------------------------
Google Map
-------------------------------------------- */
/*
var fortWorthServiceArea = new google.maps.LatLngBounds(
  new google.maps.LatLng(32.0, -98.5), // Southwest corner (adjust as needed)
  new google.maps.LatLng(33.5, -96.0) // Northeast corner (adjust as needed)
);*/
////////////////////////////////////////////////////////
window.onload = MapLoadScript;
function GmapInit() {
  Gmap = $(".map-canvas");
  Gmap.each(function () {
    var $this = $(this),
      lat = "",
      lng = "",
      zoom = 12,
      scrollwheel = false,
      zoomcontrol = true,
      draggable = true,
      mapType = google.maps.MapTypeId.ROADMAP,
      title = "",
      contentString = "",
      theme_icon_path = $this.data("icon-path"),
      dataLat = $this.data("lat"),
      dataLng = $this.data("lng"),
      dataZoom = $this.data("zoom"),
      dataType = $this.data("type"),
      dataScrollwheel = $this.data("scrollwheel"),
      dataZoomcontrol = $this.data("zoomcontrol"),
      dataHue = $this.data("hue"),
      dataTitle = $this.data("title"),
      dataContent = $this.data("content");

    if (dataZoom !== undefined && dataZoom !== false) {
      zoom = parseFloat(dataZoom);
    }
    if (dataLat !== undefined && dataLat !== false) {
      lat = parseFloat(dataLat);
    }
    if (dataLng !== undefined && dataLng !== false) {
      lng = parseFloat(dataLng);
    }
    if (dataScrollwheel !== undefined && dataScrollwheel !== null) {
      scrollwheel = dataScrollwheel;
    }
    if (dataZoomcontrol !== undefined && dataZoomcontrol !== null) {
      zoomcontrol = dataZoomcontrol;
    }
    if (dataType !== undefined && dataType !== false) {
      if (dataType == "satellite") {
        mapType = google.maps.MapTypeId.SATELLITE;
      } else if (dataType == "hybrid") {
        mapType = google.maps.MapTypeId.HYBRID;
      } else if (dataType == "terrain") {
        mapType = google.maps.MapTypeId.TERRAIN;
      }
    }
    if (dataTitle !== undefined && dataTitle !== false) {
      title = dataTitle;
    }
    if (navigator.userAgent.match(/iPad|iPhone|Android/i)) {
      draggable = false;
    }

    var mapOptions = {
      zoom: zoom,
      scrollwheel: scrollwheel,
      zoomControl: zoomcontrol,
      draggable: draggable,
      center: new google.maps.LatLng(lat, lng),
      mapTypeId: mapType,
      /*
      restriction: {
        latLngBounds: fortWorthServiceArea,
        strictBounds: false,
      },*/
    };
    var map = new google.maps.Map($this[0], mapOptions);

    //var image = 'images/icons/map-marker.png';
    var image = theme_icon_path;

    if (dataContent !== undefined && dataContent !== false) {
      contentString =
        '<div class="map-data">' +
        "<h6>" +
        title +
        "</h6>" +
        '<div class="map-content">' +
        dataContent +
        "</div>" +
        "</div>";
    }
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      icon: image,
      title: title,
    });
    if (dataContent !== undefined && dataContent !== false) {
      google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });
    }

    if (dataHue !== undefined && dataHue !== false) {
      var styles = [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#444444",
            },
          ],
        },
        {
          featureType: "landscape.natural",
          elementType: "all",
          stylers: [
            {
              color: "#8F9779",
            },
          ],
        },
        {
          featureType: "landscape.man_made",
          elementType: "all",
          stylers: [
            {
              color: "#D3D3D3",
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },

        {
          featureType: "poi.park",
          elementType: "all",
          stylers: [
            {
              color: "#4B6F44",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              saturation: -100,
            },
            {
              lightness: 45,
            },
          ],
        },
        {
          featureType: "road.local",
          elementType: "all",
          stylers: [
            {
              color: "#4f5054",
            },
          ],
        },

        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [
            {
              color: "#5f5f5f",
              visibility: "off",
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "all",
          stylers: [
            {
              color: "#5f5f5f",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [
            {
              color: "#6B9AC4",
            },
            {
              visibility: "on",
            },
            //add more
          ],
        },
      ];
      map.setOptions({ styles: styles });
    }
  });
}

function MapLoadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  GmapInit();
  document.body.appendChild(script);
}
