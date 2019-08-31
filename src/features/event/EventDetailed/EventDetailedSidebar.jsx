import { Item, Label, Segment } from "semantic-ui-react";
import React, { Fragment } from "react";

const EventDetailedSidebar = ({ attendees }) => {
   const isHost = false;

   return (
      <Fragment>
         <Segment
            attached='top'
            color='teal'
            inverted
            secondary
            style={{ border: "none" }}
            textAlign='center'>
            {attendees && attendees.length}{" "}
            {attendees && attendees.length === 1 ? "Person" : "People"} Going
         </Segment>
         <Segment attached>
            <Item.Group divided>
               {attendees &&
                  attendees.map((attendee) => (
                     <Item key={attendee.id} style={{ position: "relative" }}>
                        {isHost && (
                           <Label
                              color='orange'
                              ribbon='right'
                              style={{ position: "absolute" }}>
                              Host
                           </Label>
                        )}
                        <Item.Image size='tiny' src={attendee.photoURL} />
                        <Item.Content verticalAlign='middle'>
                           <Item.Header as='h3'>
                              {attendee.displayName}
                           </Item.Header>
                        </Item.Content>
                     </Item>
                  ))}
            </Item.Group>
         </Segment>
      </Fragment>
   );
};

export default EventDetailedSidebar;
