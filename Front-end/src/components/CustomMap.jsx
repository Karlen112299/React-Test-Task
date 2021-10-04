import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow  } from '@react-google-maps/api';
import { useHistory } from "react-router-dom";
const MapContainer = ({singleRestaurant, allRestaurants,setSelectedRestaurant}) => {

  const [defaultCenter, setDefaultCenter] = useState({lat: 40.1845934, lng: 44.5102462})
  const history = useHistory();

  const mapStyles = {        
    height: "500px",
    width: "800px"
  };
  const [ selected, setSelected ] = useState({});
  const onSelect = item => {
    setSelected(item);
  }
  const clickHandler = (item) => {
    setSelectedRestaurant(item)
    history.push(`/restaurant/${item._id}`);
  }

   useEffect(() => {
    if(singleRestaurant.name){
      setDefaultCenter(singleRestaurant.location)
    }
  },[singleRestaurant]);
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyC7PNQ00cXm0xYL8PCt_VY9KdEuSTtlRiU'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
         {
            allRestaurants.map(item => {
              return (
              <Marker 
                key={item.name} 
                position={item.location}
                onMouseOver={() => onSelect(item)}
                onClick={() => clickHandler(item)}
              />
              )
            })
         }
        {
            selected.location && 
            (
            <InfoWindow
              position={{lat:selected.location.lat + 0.005, lng: selected.location.lng}}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
            <div>
              <h4>{selected.name}</h4>
              <p>{selected.short_description}</p>
            </div>
            </InfoWindow>
            )
         }
        </GoogleMap>
     </LoadScript>
  )
}
export default MapContainer;
