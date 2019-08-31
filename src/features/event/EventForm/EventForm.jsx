/* global google */
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import {
   combineValidators,
   composeValidators,
   hasLengthGreaterThan,
   isRequired
} from "revalidate";
import { connect } from "react-redux";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import React, { Component } from "react";
import cuid from "cuid";

import { createEvent, updateEvent } from "../eventActions";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import SelectInput from "../../../app/common/form/SelectInput";
import TextArea from "../../../app/common/form/TextArea";
import TextInput from "../../../app/common/form/TextInput";

const validate = combineValidators({
   title: isRequired({ message: "The event title is required" }),
   category: isRequired({ message: "The category is required" }),
   description: composeValidators(
      isRequired({ message: "Please enter a description" }),
      hasLengthGreaterThan(4)({
         message: "Description needs to be at least 5 characters"
      })
   )(),
   city: isRequired("city"),
   venue: isRequired("venue"),
   date: isRequired("date")
});

const category = [
   { key: "drinks", text: "Drinks", value: "drinks" },
   { key: "culture", text: "Culture", value: "culture" },
   { key: "film", text: "Film", value: "film" },
   { key: "food", text: "Food", value: "food" },
   { key: "music", text: "Music", value: "music" },
   { key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
   state = {
      cityLatLng: {},
      venueLatLng: {}
   };

   onFormSubmit = async (values) => {
      values.venueLatLng = this.state.venueLatLng;

      try {
         if (this.props.initialValues.id) {
            this.props.updateEvent(this.state);
            this.props.history.push(`/events/${this.props.initialValues.id}`);
         } else {
            let createdEvent = await this.props.createEvent(values);
            this.props.history.push(`/events/${createdEvent.id}`);
         }
      } catch (error) {
         console.error(error);
      }
   };

   handleCitySelect = (selectedCity) => {
      geocodeByAddress(selectedCity)
         .then((results) => getLatLng(results[0]))
         .then((latlng) => {
            this.setState({
               cityLatLng: latlng
            });
         })
         .then(() => {
            this.props.change("city", selectedCity);
         });
   };

   handleVenueSelect = (selectedVenue) => {
      geocodeByAddress(selectedVenue)
         .then((results) => getLatLng(results[0]))
         .then((latlng) => {
            this.setState({
               venueLatLng: latlng
            });
         })
         .then(() => {
            this.props.change("venue", selectedVenue);
         });
   };

   render() {
      const {
         history,
         initialValues,
         invalid,
         submitting,
         pristine
      } = this.props;

      return (
         <Grid>
            <Grid.Column width={10}>
               <Segment>
                  <Header sub color='teal' content='Event Details' />

                  <Form
                     onSubmit={this.props.handleSubmit(this.onFormSubmit)}
                     autoComplete='off'>
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
                        component={PlaceInput}
                        options={{ types: ["(cities)"] }}
                        onSelect={this.handleCitySelect}
                        placeholder='Where will your event take place?'
                     />
                     <Field
                        name='venue'
                        component={PlaceInput}
                        options={{
                           location: new google.maps.LatLng(
                              this.state.cityLatLng
                           ),
                           radius: 1000,
                           types: ["establishment"]
                        }}
                        onSelect={this.handleVenueSelect}
                        placeholder='Event venue'
                     />
                     <Field
                        name='date'
                        component={DateInput}
                        placeholder='When will your event take place?'
                        dateFormat='dd LLL yyyy h:mm a'
                        showTimeSelect
                        timeFormat='HH:mm'
                     />

                     <Button
                        positive
                        type='submit'
                        disabled={invalid || submitting || pristine}>
                        Submit
                     </Button>
                     <Button
                        type='button'
                        onClick={
                           initialValues.id
                              ? () =>
                                   history.push(`/events/${initialValues.id}`)
                              : () => history.push("/events")
                        }>
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

   let event = {};

   if (eventId && state.events.length > 0) {
      event = state.events.filter((event) => event.id === eventId)[0];
   }

   return {
      initialValues: event
   };
};

const mapDispatchToProps = {
   createEvent,
   updateEvent
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(reduxForm({ form: "eventForm", validate })(EventForm));
