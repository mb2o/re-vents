import React, { Component } from "react";
import cuid from "cuid";
import { connect } from "react-redux";
import { Segment, Form, Button } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";

import TextInput from "../../../app/common/form/TextInput";
import { createEvent, updateEvent } from "../eventActions";

class EventForm extends Component {
   state = {
      ...this.props.event
   };

   componentDidMount() {
      if (this.props.selectedEvent !== null) {
         this.setState({
            ...this.props.selectedEvent
         });
      }
   }

   handleFormSubmit = (event) => {
      event.preventDefault();

      if (this.state.id) {
         this.props.updateEvent(this.state);
         this.props.history.push(`/events/${this.state.id}`);
      } else {
         const newEvent = {
            ...this.state,
            id: cuid(),
            hostPhotoURL: "/assets/user.png"
         };
         this.props.createEvent(newEvent);
         this.props.history.push(`/events`);
      }
   };

   handleInputChange = ({ target: { name, value } }) => {
      this.setState({
         [name]: value
      });
   };

   render() {
      const { title, date, city, venue, hostedBy } = this.state;

      return (
         <Segment>
            <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
               <Form.Field>
                  <label>Event Title</label>
                  <Field
                     name='title'
                     component={TextInput}
                     placeholder='Event Title'
                  />
               </Form.Field>

               <Form.Field>
                  <label>Event Date</label>
                  <input
                     type='date'
                     name='date'
                     placeholder='Event Date'
                     value={date}
                     onChange={this.handleInputChange}
                  />
               </Form.Field>
               <Form.Field>
                  <label>City</label>
                  <input
                     placeholder='City event is taking place'
                     name='city'
                     value={city}
                     onChange={this.handleInputChange}
                  />
               </Form.Field>
               <Form.Field>
                  <label>Venue</label>
                  <input
                     placeholder='Enter the Venue of the event'
                     name='venue'
                     value={venue}
                     onChange={this.handleInputChange}
                  />
               </Form.Field>
               <Form.Field>
                  <label>Hosted By</label>
                  <input
                     placeholder='Enter the name of person hosting'
                     name='hostedBy'
                     value={hostedBy}
                     onChange={this.handleInputChange}
                  />
               </Form.Field>
               <Button positive type='submit'>
                  Submit
               </Button>
               <Button type='button' onClick={this.props.history.goBack}>
                  Cancel
               </Button>
            </Form>
         </Segment>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   const eventId = ownProps.match.params.id;

   let event = {
      title: "",
      date: "",
      city: "",
      venue: "",
      hostedBy: ""
   };

   if (eventId && state.events.length > 0) {
      event = state.events.filter((event) => event.id === eventId)[0];
   }

   return { event };
};

const mapDispatchToProps = {
   createEvent,
   updateEvent
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(reduxForm({ form: "eventForm" })(EventForm));
