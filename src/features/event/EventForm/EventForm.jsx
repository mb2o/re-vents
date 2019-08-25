import React, { Component } from "react";
import cuid from "cuid";
import { connect } from "react-redux";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";

import { createEvent, updateEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";

const category = [
   { key: "drinks", text: "Drinks", value: "drinks" },
   { key: "culture", text: "Culture", value: "culture" },
   { key: "film", text: "Film", value: "film" },
   { key: "food", text: "Food", value: "food" },
   { key: "music", text: "Music", value: "music" },
   { key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
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

   render() {
      return (
         <Grid>
            <Grid.Column width={10}>
               <Segment>
                  <Header sub color='teal' content='Event Details' />

                  <Form onSubmit={this.handleFormSubmit} autoComplete='off'>
                     <Field
                        name='title'
                        component={TextInput}
                        placeholder='Give your event a name'
                     />
                     <Field
                        name='category'
                        component={SelectInput}
                        options={category}
                        placeholder='What is yout event about?'
                     />
                     <Field
                        name='description'
                        component={TextArea}
                        rows='3'
                        placeholder='Tell us more about your event'
                     />

                     <Header
                        sub
                        color='teal'
                        content='Event Location Details'
                     />

                     <Field
                        name='city'
                        component={TextInput}
                        placeholder='Where will your event take place?'
                     />
                     <Field
                        name='venue'
                        component={TextInput}
                        placeholder='Event venue'
                     />
                     <Field
                        name='date'
                        component={TextInput}
                        placeholder='When will your event take place?'
                     />

                     <Button positive type='submit'>
                        Submit
                     </Button>
                     <Button type='button' onClick={this.props.history.goBack}>
                        Cancel
                     </Button>
                  </Form>
               </Segment>
            </Grid.Column>
         </Grid>
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
