import { Button, Divider, Form, Header, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { addYears } from "date-fns";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import RadioInput from "../../../app/common/form/RadioInput";
import React, { Component } from "react";
import TextInput from "../../../app/common/form/TextInput";

class BasicPage extends Component {
   render() {
      const { pristine, submitting, handleSubmit, updateProfile } = this.props;

      return (
         <Segment>
            <Header content='Basics' dividing size='large' />
            <Form onSubmit={handleSubmit(updateProfile)}>
               <Field
                  component={TextInput}
                  name='displayName'
                  placeholder='Known As'
                  type='text'
                  width={8}
               />
               <Form.Group inline>
                  <label>Gender: </label>
                  <Field
                     component={RadioInput}
                     label='Male'
                     name='gender'
                     type='radio'
                     value='male'
                  />
                  <Field
                     component={RadioInput}
                     label='Female'
                     name='gender'
                     type='radio'
                     value='female'
                  />
               </Form.Group>
               <Field
                  component={DateInput}
                  dateFormat='dd LLL yyyy'
                  dropdownMode='select'
                  maxDate={addYears(new Date(), -18)}
                  minDate={addYears(new Date(), -400)}
                  name='dateOfBirth'
                  placeholder='Date of Birth'
                  showMonthDropdown={true}
                  showYearDropdown={true}
                  width={8}
               />
               <Field
                  component={PlaceInput}
                  label='Female'
                  name='city'
                  options={{ types: ["(cities)"] }}
                  placeholder='Home Town'
                  width={8}
               />
               <Divider />
               <Button
                  content='Update Profile'
                  disabled={pristine || submitting}
                  positive
                  size='large'
               />
            </Form>
         </Segment>
      );
   }
}

export default reduxForm({ form: "userProfile", enableReinitialize: true })(
   BasicPage
);
