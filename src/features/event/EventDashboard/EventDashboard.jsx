import { Grid, Loader } from "semantic-ui-react";
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
      moreEvents: false,
      loadingInitial: true,
      loadedEvents: []
   };

   async componentDidMount() {
      let next = await this.props.getEventsForDashboard();

      if (next && next.docs && next.docs.length > 1) {
         this.setState({
            moreEvents: true,
            loadingInitial: false
         });
      }
   }

   componentDidUpdate(prevProps, prevState) {
      if (this.props.events !== prevProps.events) {
         this.setState({
            loadedEvents: [...this.state.loadedEvents, ...this.props.events]
         });
      }
   }

   getNextEvents = async () => {
      const { events } = this.props;

      let lastEvent = events && events[events.length - 1];
      let next = await this.props.getEventsForDashboard(lastEvent);

      if (next && next.docs && next.docs.length <= 1) {
         this.setState({
            moreEvents: false
         });
      }
   };

   render() {
      const { loading } = this.props;
      const { moreEvents, loadedEvents } = this.state;

      if (loadedEvents.length > 0 && this.state.loadingInitial)
         return <LoadingIndicator />;

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventList
                  events={loadedEvents}
                  getNextEvents={this.getNextEvents}
                  loading={loading}
                  moreEvents={moreEvents}
               />
            </Grid.Column>
            <Grid.Column width={6}>
               <EventActivity />
            </Grid.Column>
            <Grid.Column width={10}>
               <Loader active={loading} />
            </Grid.Column>
         </Grid>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
