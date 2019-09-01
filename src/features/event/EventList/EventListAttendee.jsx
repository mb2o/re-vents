import { Image, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React, { Component } from "react";

class EventListAttendee extends Component {
   render() {
      const { attendee } = this.props;

      return (
         <List.Item>
            <Image
               as={Link}
               circular
               size='mini'
               src={attendee.photoURL}
               to={`/profile/${attendee.id}`}
            />
         </List.Item>
      );
   }
}

export default EventListAttendee;
