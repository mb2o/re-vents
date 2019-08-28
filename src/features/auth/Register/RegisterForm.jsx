import { Button, Form, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../authActions";
import React from "react";
import TextInput from "../../../app/common/form/TextInput";

const RegisterForm = ({ handleSubmit, registerUser }) => {
   return (
      <div>
         <Form
            autoComplete='off'
            onSubmit={handleSubmit(registerUser)}
            size='large'>
            <Segment>
               <Field
                  component={TextInput}
                  name='displayName'
                  placeholder='Known As'
                  type='text'
               />
               <Field
                  component={TextInput}
                  name='email'
                  placeholder='Email'
                  type='text'
               />
               <Field
                  component={TextInput}
                  name='password'
                  placeholder='Password'
                  type='password'
               />
               <Button color='teal' fluid size='large'>
                  Register
               </Button>
            </Segment>
         </Form>
      </div>
   );
};

export default connect(
   null,
   { registerUser }
)(reduxForm({ form: "registerForm" })(RegisterForm));
