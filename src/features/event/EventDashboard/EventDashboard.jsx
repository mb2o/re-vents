import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { getEventsForDashboard } from "../eventActions";
import EventActivity from "../EventActivity/EventActivity";
import EventList from "../EventList/EventList";
import LoadingIndicator from "../../../app/layout/LoadingIndicator";
import React, { Component } from "react";

const mapStateToProps = (state) => ({
   events: state.events,
   loading: state.async.loading
});

const mapDispatchToProps = {
   getEventsForDashboard
};

class EventDashboard extends Component {
   componentDidMount() {
      this.props.getEventsForDashboard();
   }

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

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
