import { useState } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

// export class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {},
//     mapCenter: {
//       lat: 49.2827291,
//       lng: -123.1207375
//     }
//   };
 
//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });
 
//   render() {
//     return (
//       <Map 
//         google={this.props.google}
//         initialCenter={{
//           lat: this.state.mapCenter.lat,
//           lng: this.state.mapCenter.lng
//         }}
//       >
//         <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />
//       </Map>
//     )
//   }
// }


//  export function MapContainer (google){
//   const [showingInfoWindow, setShowingInfoWindow] = useState(false);
//   const [activeMarker, setActiveMarker] = useState({});
//   const [selectedPlace, setSelectedPlace] = useState({});
//   const [mapCenter, setMapCenter] = useState({lat: 49.2827291,lng: -123.1207375});

//   const onMarkerClick = (props, marker, e) => {
//     setActiveMarker(marker);
//     setSelectedPlace(props);
//     setShowingInfoWindow(true)
//   }
//     return (
//       <Map 
//         google={google}
//         initialCenter={{
//           lat: mapCenter.lat,
//           lng: mapCenter.lng
//         }}
//       >
//         <Marker onClick={onMarkerClick}
//                 name={'Current location'} />
//       </Map>
//   );
// }
export function MapContainer({ google, locations = [] }) {
    return (
        <Map
            google={google}
            containerStyle={{
                position: "static",
                width: "100%",
                height: "100%"
            }}
            style={{
                width: "100%",
                height: "100%"
            }}
            center={locations[0]}
            initialCenter={locations[0]}
            zoom={locations.length === 1 ? 18 : 13}
            disableDefaultUI={true}
        >
            {locations.map(
                coords => <Marker position={coords} />
            )}

        </Map>
    )
};
export default GoogleApiWrapper({
  apiKey: ('AIzaSyC7PNQ00cXm0xYL8PCt_VY9KdEuSTtlRiU')
})(MapContainer)