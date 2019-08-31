import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import React, { Component } from "react";

const mapStateToProps = (state, ownProps) => {
   const eventId = ownProps.match.params.id;

   let event = {};
   if (eventId && state.events.length > 0) {
      event = state.events.filter((event) => event.id === eventId)[0];
   }

   return { event };
};

class EventDetailedPage extends Component {
   async componentDidMount() {
      const { firestore, match } = this.props;
      let event = await firestore.get(`events/${match.params.id}`);
   }

   render() {
      const { event } = this.props;

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventDetailedHeader event={event} />
               <EventDetailedInfo event={event} />
               <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
               <EventDetailedSidebar attendees={event.attendees} />
            </Grid.Column>
         </Grid>
      );
   }
}

export default withFirestore(connect(mapStateToProps)(EventDetailedPage));
