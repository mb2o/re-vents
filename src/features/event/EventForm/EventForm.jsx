/* global google */
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { cancelEventToggle, createEvent, updateEvent } from "../eventActions";
import {
   combineValidators,
   composeValidators,
   hasLengthGreaterThan,
   isRequired
} from "revalidate";
import { connect } from "react-redux";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { toastr } from "react-redux-toastr";
import { withFirestore } from "react-redux-firebase";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import React, { Component } from "react";
import SelectInput from "../../../app/common/form/SelectInput";
import TextArea from "../../../app/common/form/TextArea";
import TextInput from "../../../app/common/form/TextInput";

const mapStateToProps = (state, ownProps) => {
   const eventId = ownProps.match.params.id;

   let event = {};

   if (
      state.firestore.ordered.events &&
      state.firestore.ordered.events.length > 0
   ) {
      event =
         state.firestore.ordered.events.filter(
            (event) => event.id === eventId
         )[0] || {};
   }

   return {
      initialValues: event,
      event
   };
};

const mapDispatchToProps = {
   createEvent,
   updateEvent,
   cancelEventToggle
};

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

   async componentDidMount() {
      const { firestore, match, history } = this.props;

      let event = await firestore.get(`events/${match.params.id}`);
      if (!event.exists) {
         history.push("/events");
         toastr.error("Sorry", "Event not found");
      } else {
         this.setState({
            venueLatLng: event.data().venueLatLng
         });
      }
   }

   onFormSubmit = async (values) => {
      values.venueLatLng = this.state.venueLatLng;

      try {
         if (this.props.initialValues.id) {
            this.props.updateEvent(values);
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
         pristine,
         event,
         cancelEventToggle
      } = this.props;

      return (
         <Grid>
            <Grid.Column width={10}>
               <Segment>
                  <Header color='teal' content='Event Details' sub />

                  <Form
                     autoComplete='off'
                     onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                     <Field
                        component={TextInput}
                        name='title'
                        placeholder='Give your event a name'
                     />
                     <Field
                        component={SelectInput}
                        name='category'
                        options={category}
                        placeholder='What is yout event about?'
                     />
                     <Field
                        component={TextArea}
                        name='description'
                        placeholder='Tell us more about your event'
                        rows='3'
                     />

                     <Header
                        color='teal'
                        content='Event Location Details'
                        sub
                     />

                     <Field
                        component={PlaceInput}
                        name='city'
                        onSelect={this.handleCitySelect}
                        options={{ types: ["(cities)"] }}
                        placeholder='Where will your event take place?'
                     />
                     <Field
                        component={PlaceInput}
                        name='venue'
                        onSelect={this.handleVenueSelect}
                        options={{
                           location: new google.maps.LatLng(
                              this.state.cityLatLng
                           ),
                           radius: 1000,
                           types: ["establishment"]
                        }}
                        placeholder='Event venue'
                     />
                     <Field
                        component={DateInput}
                        dateFormat='dd LLL yyyy h:mm a'
                        name='date'
                        placeholder='When will your event take place?'
                        showTimeSelect
                        timeFormat='HH:mm'
                     />

                     <Button
                        disabled={invalid || submitting || pristine}
                        positive
                        type='submit'>
                        Submit
                     </Button>
                     <Button
                        onClick={
                           initialValues.id
                              ? () =>
                                   history.push(`/events/${initialValues.id}`)
                              : () => history.push("/events")
                        }
                        type='button'>
                        Cancel
                     </Button>
                     <Button
                        color={event.cancelled ? "green" : "red"}
                        content={
                           event.cancelled ? "Reactivate event" : "Cancel event"
                        }
                        floated='right'
                        onClick={() =>
                           cancelEventToggle(!event.cancelled, event.id)
                        }
                        type='button'
                     />
                  </Form>
               </Segment>
            </Grid.Column>
         </Grid>
      );
   }
}

export default withFirestore(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(
      reduxForm({ form: "eventForm", validate, enableReinitialize: true })(
         EventForm
      )
   )
);
