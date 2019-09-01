import { Grid } from "semantic-ui-react";
import { auth } from "firebase";
import { connect } from "react-redux";
import { objectToArray } from "../../../app/common/util/helpers";
import { toastr } from "react-redux-toastr";
import { withFirestore } from "react-redux-firebase";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import React, { Component } from "react";

const mapStateToProps = (state, ownProps) => {
   const eventId = ownProps.match.params.id;

   let event = {};

   if (
      state.firestore.ordered.events &&
      state.firestore.ordered.events.length > 0
   ) {
      event =
         state.firestore.ordered.events.filter(
            (event) => event.id === eventId
         )[0] || {};
   }

   return { event, auth: state.firebase.auth };
};

class EventDetailedPage extends Component {
   async componentDidMount() {
      const { firestore, match, history } = this.props;
      let event = await firestore.get(`events/${match.params.id}`);
      if (!event.exists) {
         history.push("/events");
         toastr.error("Sorry", "Event not found");
      }
   }

   render() {
      const { event, auth } = this.props;
      const attendees =
         event && event.attendees && objectToArray(event.attendees);
      const isHost = event.hostUid === auth.uid;
      const isGoing = attendees && attendees.some((a) => a.id === auth.uid);

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventDetailedHeader
                  event={event}
                  isGoing={isGoing}
                  isHost={isHost}
               />
               <EventDetailedInfo event={event} />
               <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
               <EventDetailedSidebar attendees={attendees} />
            </Grid.Column>
         </Grid>
      );
   }
}

export default withFirestore(connect(mapStateToProps)(EventDetailedPage));
