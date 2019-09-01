import { Button, Icon, Item, Label, List, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import EventListAttendee from "./EventListAttendee";
import React, { Component } from "react";

class EventListItem extends Component {
   render() {
      const { event } = this.props;

      return (
         <Segment.Group>
            <Segment>
               <Item.Group>
                  <Item>
                     <Item.Image
                        circular
                        size='tiny'
                        src={event.hostPhotoURL}
                     />
                     <Item.Content>
                        <Item.Header as={Link} to={`/events/${event.id}`}>
                           {event.title}
                        </Item.Header>
                        <Item.Description>
                           Hosted by{" "}
                           <Link to={`/profile/${event.hostUid}`}>
                              {event.hostedBy}
                           </Link>{" "}
                        </Item.Description>
                        {event.cancelled && (
                           <Label
                              color='red'
                              content='Event cancelled'
                              ribbon='right'
                              style={{ top: "-40px" }}
                           />
                        )}
                     </Item.Content>
                  </Item>
               </Item.Group>
            </Segment>

            <Segment>
               <span>
                  <Icon name='clock' />{" "}
                  {format(event.date.toDate(), "EEEE do LLL")} at{" "}
                  {format(event.date.toDate(), "h:mm a")} |
                  <Icon name='marker' /> {event.venue}
               </span>
            </Segment>

            <Segment secondary>
               <List horizontal>
                  {event.attendees &&
                     Object.values(event.attendees).map((attendee, index) => (
                        <EventListAttendee attendee={attendee} key={index} />
                     ))}
               </List>
            </Segment>

            <Segment clearing>
               <span>{event.description}</span>
               <Button
                  as={Link}
                  color='teal'
                  content='View'
                  floated='right'
                  to={`/events/${event.id}`}
               />
            </Segment>
         </Segment.Group>
      );
   }
}

export default EventListItem;
