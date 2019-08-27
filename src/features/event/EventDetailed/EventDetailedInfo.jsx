import { Button, Grid, Icon, Segment } from "semantic-ui-react";
import { format, parseISO } from "date-fns";
import EventDetailedMap from "./EventDetailedMap";
import React, { useState } from "react";

const EventDetailedInfo = ({ event }) => {
   const [isMapOpen, showMapToggle] = useState(false);

   return (
      <Segment.Group>
         <Segment attached='top'>
            <Grid>
               <Grid.Column width={1}>
                  <Icon color='teal' name='info' size='large' />
               </Grid.Column>
               <Grid.Column width={15}>
                  <p>{event.description}</p>
               </Grid.Column>
            </Grid>
         </Segment>
         <Segment attached>
            <Grid verticalAlign='middle'>
               <Grid.Column width={1}>
                  <Icon color='teal' name='calendar' size='large' />
               </Grid.Column>
               <Grid.Column width={15}>
                  {event.date && (
                     <span>
                        {format(parseISO(event.date), "EEEE do LLL")} at{" "}
                        {format(parseISO(event.date), "h:mm a")}
                     </span>
                  )}
               </Grid.Column>
            </Grid>
         </Segment>
         <Segment attached>
            <Grid verticalAlign='middle'>
               <Grid.Column width={1}>
                  <Icon color='teal' name='marker' size='large' />
               </Grid.Column>
               <Grid.Column width={11}>
                  <span>{event.venue}</span>
               </Grid.Column>
               <Grid.Column width={4}>
                  <Button
                     color='teal'
                     content={isMapOpen ? "Hide Map" : "Show Map"}
                     onClick={() => showMapToggle(!isMapOpen)}
                     size='tiny'
                  />
               </Grid.Column>
            </Grid>
         </Segment>
         {isMapOpen && (
            <EventDetailedMap
               lat={event.venueLatLng.lat}
               lng={event.venueLatLng.lng}
            />
         )}
      </Segment.Group>
   );
};

export default EventDetailedInfo;
