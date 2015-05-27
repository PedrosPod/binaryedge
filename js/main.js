function initialize() {
    var myLatlng = new google.maps.LatLng(47.3667, 8.5500);
    var mapOptions = {
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 11,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
    };
    var map = new google.maps.Map(document.getElementById("contacts-map"), mapOptions);

    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Binary Edge</h1>'+
        '<div id="bodyContent">'+
        '<strong>Address</strong>'+
        'Finsterrutistrasse 4, 8134'+
        'Adliswil, Switzerland '+
        '<strong>Phone Number</strong>'+
        '+41 786 32 32 90'+
        '<strong>emailr</strong>'+
        'info@binaryedge.io'+

        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });


    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Binary Edge'
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
    //infowindow.open(map,marker);
};

!function(){

    $('[data-trigger="show-more-text"]').on('click', function(ev){
       ev.preventDefault();
        $(this).toggleClass('is-active');
        $(this).parent().toggleClass('more-text-fx');
    });
}();