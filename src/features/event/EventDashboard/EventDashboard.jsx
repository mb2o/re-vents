import React, { Component } from "react";
import cuid from "cuid";
import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";

import EventForm from "../EventForm/EventForm";
import EventList from "../EventList/EventList";

class EventDashboard extends Component {
   state = {
      isOpen: false,
      selectedEvent: null
   };

   handleCreateFormOpen = () => {
      this.setState({
         isOpen: true,
         selectedEvent: null
      });
   };

   handleFormCancel = () => {
      this.setState({
         isOpen: false
      });
   };

   handleCreateEvent = (newEvent) => {
      newEvent.id = cuid();
      newEvent.hostPhotoURL = "/assets/user.png";

      this.setState(({ events }) => ({
         events: [...events, newEvent],
         isOpen: false
      }));
   };

   handleSelectEvent = (event) => {
      this.setState({
         selectedEvent: event,
         isOpen: true
      });
   };

   handleUpdateEvent = (updatedEvent) => {
      this.setState(({ events }) => ({
         events: events.map((event) => {
            if (event.id === updatedEvent.id) {
               return { ...updatedEvent };
            } else {
               return event;
            }
         }),
         isOpen: false,
         selectEvent: null
      }));
   };

   handleDeleteEvent = (id) => {
      this.setState(({ events }) => ({
         events: events.filter((e) => e.id !== id)
      }));
   };

   render() {
      const { events } = this.props;
      const { isOpen, selectedEvent } = this.state;

      return (
         <Grid>
            <Grid.Column width={10}>
               <EventList
                  events={events}
                  selectEvent={this.handleSelectEvent}
                  deleteEvent={this.handleDeleteEvent}
               />
            </Grid.Column>
            <Grid.Column width={6}>
               <Button
                  positive
                  content='Create Event'
                  onClick={this.handleCreateFormOpen}
               />
               {isOpen && (
                  <EventForm
                     key={selectedEvent ? selectedEvent.id : 0}
                     selectedEvent={selectedEvent}
                     createEvent={this.handleCreateEvent}
                     updateEvent={this.handleUpdateEvent}
                     cancelFormOpen={this.handleFormCancel}
                  />
               )}
            </Grid.Column>
         </Grid>
      );
   }
}

const mapStateToProps = (state) => ({
   events: state.events
});

export default connect(mapStateToProps)(EventDashboard);
