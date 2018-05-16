import React, { Component } from 'react';
import './App.css';

/*global google*/

class App extends Component {

    initMap() {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.7413549, lng: -73.9980244 },
            zoom: 13
        });

        let locations = [
            {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
            {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
            {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
            {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
            {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
            {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
        ];

        let infoWindow = new google.maps.InfoWindow();
        let markers = [];

        for (const [index, location] of locations.entries()) {
            let marker = new google.maps.Marker({
                map: map,
                title: location.title,
                position: location.location,
                animationType: google.maps.Animation.DROP,
                id: index,
            });

            markers.push(marker);
            marker.addListener('click', () => {
                this.populateInfoWindow(marker, infoWindow, map);
            });
        }

        // let tribeca = { lat: 40.719526, lng: -74.0089934 };
        //
        // let marker = new google.maps.Marker({
        //     position: tribeca,
        //     map: map,
        //     title: 'first marker!'
        // });
        //
        // let infoWindow = new google.maps.InfoWindow({
        //     content: 'test',
        // });
        //
        // marker.addListener('click', function() {
        //     infoWindow.open(map, marker);
        // });

    };

    populateInfoWindow(marker, infoWindow, map) {
        if (infoWindow.marker !== marker) {
            infoWindow.marker = marker;
            infoWindow.setContent('<div>' + marker.title + '</div>');
            infoWindow.open(map, marker);

            infoWindow.addListener('closeclick',function(){
                infoWindow.setMarker = null;
            });
        }
    }

    addJavascriptSource = (src) => {
        let ref = window.document.getElementsByTagName("script")[0];
        let script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    };

    componentDidMount() {
        window.initMap = this.initMap;
        this.addJavascriptSource('https://maps.googleapis.com/maps/api/js?key=AIzaSyBDtSbC0xfGWk76oeJMx1om_miKJ9qGi48&v=3&callback=initMap');
    }

    render() {
        return (
          <div className="App">
              <div id="map"/>
          </div>
        );
    }
}

export default App;
