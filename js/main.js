function uniqId() {
    return Math.round(new Date().getTime() + (Math.random() * 100));
}

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

!function() {

    var appWidgets = $('[data-widget]');
    var appTriggers = $('[data-trigger]');

    $('[data-floater]').each(function(){
        $(this).on('click',function(ev){

            ev.preventDefault();
            var thisTrigger = $(this);
            var thisTriggerName = thisTrigger.attr('data-trigger');
            var thatWidget = $('[data-widget="' + thisTriggerName + '"]');

            if(thisTrigger.hasClass('is-active'))
            {
                appWidgets.removeClass('is-visible').removeAttr('id');
                appTriggers.removeClass('is-active');
            }
            else
            {
                appTriggers.removeClass('is-active');
                appWidgets.removeClass('is-visible');
                thisTrigger.addClass('is-active');
                thatWidget.addClass('is-visible');
                var thisId = 'bs' + uniqId();

                thatWidget.attr('id', thisId);
                thisTrigger.attr('id', thisId);


                // bind clickout function
                $(document).mouseup(function (clickOut) {
                    if (clickOut.target.id !== thatWidget.attr('id') && !thatWidget.has(clickOut.target).length) {

                        thisTrigger.removeClass('is-active');
                        thatWidget.removeClass('is-visible');
                        thatWidget.removeAttr('id');

                        $(this).unbind(clickOut);
                    }
                });
            }
        });
    });
    $('[data-trigger="close-panels"]').each(function(){
        $('[data-trigger="close-panels"]').on('click', function(){
            appWidgets.removeClass('is-visible').removeAttr('id');
            appTriggers.removeClass('is-active');

        });
    });
}();