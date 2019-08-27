import { Button, Header, Image, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import React from "react";

const eventImageStyle = {
   filter: "brightness(30%)"
};

const eventImageTextStyle = {
   position: "absolute",
   bottom: "5%",
   left: "5%",
   width: "100%",
   height: "auto",
   color: "white"
};

const EventDetailedHeader = ({ event }) => {
   return (
      <Segment.Group>
         <Segment attached='top' basic style={{ padding: "0" }}>
            <Image
               fluid
               src={`/assets/categoryImages/${event.category}.jpg`}
               style={eventImageStyle}
            />

            <Segment basic style={eventImageTextStyle}>
               <Item.Group>
                  <Item>
                     <Item.Content>
                        <Header
                           content={event.title}
                           size='huge'
                           style={{ color: "white" }}
                        />
                        <p>
                           {event.date &&
                              format(parseISO(event.date), "EEEE do LLLL")}
                        </p>
                        <p>
                           Hosted by <strong>{event.hostedBy}</strong>
                        </p>
                     </Item.Content>
                  </Item>
               </Item.Group>
            </Segment>
         </Segment>

         <Segment attached='bottom'>
            <Button>Cancel My Place</Button>
            <Button color='teal'>JOIN EVENT</Button>

            <Button
               as={Link}
               color='orange'
               floated='right'
               to={`/manage/${event.id}`}>
               Manage Event
            </Button>
         </Segment>
      </Segment.Group>
   );
};

export default EventDetailedHeader;
