import { Card, Grid, Header, Image, Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";
import format from "date-fns/format";

const UserDetailedEvents = ({ events, eventsLoading }) => {
   return (
      <Grid.Column width={12}>
         <Segment attached loading={eventsLoading}>
            <Header content='Events' icon='calendar' />
            <Menu pointing secondary>
               <Menu.Item active name='All Events' />
               <Menu.Item name='Past Events' />
               <Menu.Item name='Future Events' />
               <Menu.Item name='Events Hosted' />
            </Menu>

            <Card.Group itemsPerRow={5}>
               {events &&
                  events.map((event) => (
                     <Card as={Link} key={event.id} to={`/events/${event.id}`}>
                        <Image
                           src={`/assets/categoryImages/${event.category}.jpg`}
                        />
                        <Card.Content>
                           <Card.Header textAlign='center'>
                              {event.title}
                           </Card.Header>
                           <Card.Meta textAlign='center'>
                              {format(
                                 event.date && event.date.toDate(),
                                 "dd LLL yyyy"
                              )}{" "}
                              at{" "}
                              {format(
                                 event.date && event.date.toDate(),
                                 "h:mm a"
                              )}
                           </Card.Meta>
                        </Card.Content>
                     </Card>
                  ))}
            </Card.Group>
         </Segment>
      </Grid.Column>
   );
};

export default UserDetailedEvents;
