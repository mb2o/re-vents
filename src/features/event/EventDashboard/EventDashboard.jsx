import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import EventActivity from "../EventActivity/EventActivity";
import EventList from "../EventList/EventList";
import LoadingIndicator from "../../../app/layout/LoadingIndicator";
import React, { Component } from "react";

const mapStateToProps = (state) => ({
   events: state.firestore.ordered.events
});

const mapDispatchToProps = {
   createEvent,
   updateEvent
};

class EventDashboard extends Component {
   render() {
      const { events } = this.props;

      if (!isLoaded) return <LoadingIndicator />;

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

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
