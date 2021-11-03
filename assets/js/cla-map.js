function initMap(jsonurl) {
    $.getJSON(jsonurl, function(data) {
        createMap(data);
    });
}

// == creates map and creates markers ==
function createMap(data) {
    var myLatlng = new google.maps.LatLng(37.330894, -119.688728);
    var myOptions = {
        zoom: 2,
        center: myLatlng,
        mapTypeControl: true,
		mapTypeControlOptions: {
		  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		},
		panControl: false,
		zoomControl: true,
		zoomControlOptions: {
		  style: google.maps.ZoomControlStyle.SMALL
		},
        mapTypeId: google.maps.MapTypeId.TERRAIN
    } 
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
    var infoWindow = new google.maps.InfoWindow;

    $.each(data, function(i, lang) {
        var point = new google.maps.LatLng(
            parseFloat(lang.lat),
            parseFloat(lang.lng)
        );
        var href = 'list.php?langid=' + lang.cla_id + '=' + lang.name;
        var a = '<a href="' + encodeURI(href) + '">' + lang.name + '</a>';
        var infowincontent = '<strong>' + a + '</strong><br />';
        infowincontent += lang.info;
// TODO: work on path to .png files
        var marker = new google.maps.Marker({ 
            map: map, 
            position: point,
            icon: 'images/mm_20_gold3.png', 
            shadow: 'images/mm_20_shadow.png'
        });
        marker.addListener('click', function() {
//            window.location = href;
            infoWindow.setContent(infowincontent);
            infoWindow.open(map, marker);
        });
    });
/*
    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });

    function doNothing() {} 
*/
}
