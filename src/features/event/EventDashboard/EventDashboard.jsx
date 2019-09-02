import { Button, Grid } from "semantic-ui-react";
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
   state = {
      moreEvents: false
   };

   async componentDidMount() {
      let next = await this.props.getEventsForDashboard();
      console.log(next);

      if (next && next.docs && next.docs.length > 1) {
         this.setState({
            moreEvents: true
         });
      }
   }

   getNextEvents = async () => {
      const { events } = this.props;
      let lastEvent = events && events[events.length - 1];
      console.log(lastEvent);
      let next = await this.props.getEventsForDashboard(lastEvent);
      console.log(next);
      if (next && next.docs && next.docs.length <= 1) {
         this.setState({
            moreEvents: false
         });
      }
   };

   render() {
      const { events, loading } = this.props;

      if (loading) return <LoadingIndicator />;

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventList events={events} />
               <Button
                  color='green'
                  content='More...'
                  disabled={!this.state.moreEvents}
                  floated='right'
                  onClick={this.getNextEvents}
               />
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
