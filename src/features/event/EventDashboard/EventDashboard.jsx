import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import { firestoreConnect } from "react-redux-firebase";
import EventActivity from "../EventActivity/EventActivity";
import EventList from "../EventList/EventList";
import LoadingIndicator from "../../../app/layout/LoadingIndicator";
import React, { Component } from "react";

class EventDashboard extends Component {
   render() {
      const { events, loading } = this.props;

      if (loading) return <LoadingIndicator />;

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventList events={events} />
            </Grid.Column>
            <Grid.Column width={6}>
               <EventActivity />
            </Grid.Column>
         </Grid>
      );
   }
}

const mapStateToProps = (state) => ({
   events: state.firestore.ordered.events,
   loading: state.firestore.status.requesting.events
});

const mapDispatchToProps = {
   createEvent,
   updateEvent
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
