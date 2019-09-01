import { Grid } from "semantic-ui-react";
import { cancelGoingToEvent, goingToEvent } from "../../user/userActions";
import { connect } from "react-redux";
import { objectToArray } from "../../../app/common/util/helpers";
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

const mapDispatchToProps = {
   goingToEvent,
   cancelGoingToEvent
};

class EventDetailedPage extends Component {
   async componentDidMount() {
      const { firestore, match } = this.props;
      await firestore.setListener(`events/${match.params.id}`);
   }

   async componentWillUnmount() {
      const { firestore, match } = this.props;
      await firestore.unsetListener(`events/${match.params.id}`);
   }

   render() {
      const { event, auth, goingToEvent, cancelGoingToEvent } = this.props;
      const attendees =
         event && event.attendees && objectToArray(event.attendees);
      const isHost = event.hostUid === auth.uid;
      const isGoing = attendees && attendees.some((a) => a.id === auth.uid);

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventDetailedHeader
                  cancelGoingToEvent={cancelGoingToEvent}
                  event={event}
                  goingToEvent={goingToEvent}
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

export default withFirestore(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(EventDetailedPage)
);
