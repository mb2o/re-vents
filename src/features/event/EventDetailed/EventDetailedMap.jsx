import { Icon, Segment } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";
import React from "react";

const Marker = () => <Icon color='red' name='marker' size='big' />;

const EventDetailedMap = ({ lat, lng }) => {
   const zoom = 14;

   return (
      <Segment attached='bottom' style={{ padding: 0 }}>
         <div style={{ height: "300px", width: "100%" }}>
            <GoogleMapReact
               bootstrapURLKeys={{
                  key: "AIzaSyD0rIYu9axHXLXIKhtoGiT6pEIZcLGaxm4"
               }}
               defaultCenter={{ lat, lng }}
               defaultZoom={zoom}>
               <Marker lat={lat} lng={lng} />
            </GoogleMapReact>
         </div>
      </Segment>
   );
};

export default EventDetailedMap;
