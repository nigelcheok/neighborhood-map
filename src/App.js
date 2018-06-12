import React, { Component } from 'react';
import './App.css';
import SearchBar from "./SearchBar"

/*global google*/

class App extends Component {

    state = {
        map: null,
        locations: [],
        allLocations: [
            {title: 'Mr and Mrs Mohgan\'s Super Crispy Roti Prata', location: {lat: 1.312611, lng: 103.899259}},
            {title: 'Dunman Food Centre', location: {lat: 1.309424, lng: 103.901848}},
            {title: 'Sin Heng Claypot Bak Koot Teh', location: {lat: 1.307063, lng: 103.904363}},
            {title: 'Sin Hoi Sai Eating House', location: {lat: 1.306967, lng: 103.906375}},
            {title: 'Fei Fei Wanton Noodle', location: {lat: 1.313522, lng: 103.90227}},
        ],
        markers: [],
    };

    initMap = () => {
        this.state.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 1.03974, lng: 103.901095 },
            zoom: 13
        });

        let infoWindow = new google.maps.InfoWindow();
        let bounds = new google.maps.LatLngBounds();

        // let markers = [];

        for (const [index, location] of this.state.locations.entries()) {
            let marker = new google.maps.Marker({
                map: this.state.map,
                title: location.title,
                position: location.location,
                animationType: google.maps.Animation.DROP,
                id: index,
            });

            this.state.markers.push(marker);
            marker.addListener('click', () => {
                populateInfoWindow(marker, infoWindow, this.state.map);
            });
            bounds.extend(this.state.markers[index].position);
        }

        this.state.map.fitBounds(bounds);

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

    filterLocationsBySearch = (e) => {
        // console.log(e);
        this.state.locations = e;
        this.setNewMarkers();
    };

    setNewMarkers = () => {
        for (const [index, marker] of this.state.markers.entries()) {
            if (this.state.locations.map(location => location.title).includes(marker.title)) {
                if (!marker.map) marker.setMap(this.state.map);
            }
            else {
                if (marker.map) marker.setMap(null);
            }
        }

        // for ()

        // for (const [index, location] of this.state.locations.entries()) {
        //
        // }
    };

    addJavascriptSource = (src) => {
        let ref = window.document.getElementsByTagName("script")[0];
        let script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        ref.parentNode.insertBefore(script, ref);
    };

    componentDidMount() {
        this.state.locations = JSON.parse(JSON.stringify(this.state.allLocations));
        window.initMap = this.initMap;
        this.addJavascriptSource('https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyBDtSbC0xfGWk76oeJMx1om_miKJ9qGi48&v=3&callback=initMap');
    };

    render() {
        return (
          <div className="App">
              <SearchBar locations={this.state.allLocations} showFilteredLocations={ this.filterLocationsBySearch }/>
              <div id="map"/>
          </div>
        );
    }
}

function populateInfoWindow(marker, infoWindow, map) {
    if (infoWindow.marker !== marker) {
        infoWindow.setContent('');
        infoWindow.marker = marker;
        infoWindow.setContent('<div>' + marker.title + '</div>');

        let streetViewService = new google.maps.StreetViewService();
        let radius = 50;

        function getStreetView(data, status) {
            if (status === google.maps.StreetViewStatus.OK) {
                let nearStreetViewLocation = data.location.latLng;
                let heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, marker.position);
                infoWindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                let panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 30
                    }
                };
                let panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
            } else {
                infoWindow.setContent('<div>' + marker.title + '</div>' +
                    '<div>No Street View Found</div>');
            }
        }

        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
        infoWindow.open(map, marker);

        infoWindow.addListener('closeclick',function(){
            infoWindow.setMarker = null;
        });
    }
}

export default App;
