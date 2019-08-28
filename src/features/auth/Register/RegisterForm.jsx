import { Button, Divider, Form, Label, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import { connect } from "react-redux";
import { registerUser } from "../authActions";
import React from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import TextInput from "../../../app/common/form/TextInput";

const validate = combineValidators({
   displayName: isRequired("displayName"),
   email: isRequired("email"),
   password: isRequired("password")
});

const RegisterForm = ({
   handleSubmit,
   registerUser,
   error,
   invalid,
   submitting
}) => {
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
               {error && (
                  <Label basic color='red'>
                     {error}
                  </Label>
               )}
               <Button
                  color='teal'
                  disabled={invalid || submitting}
                  fluid
                  size='large'>
                  Register
               </Button>
               <Divider horizontal>Or</Divider>
               <SocialLogin />
            </Segment>
         </Form>
      </div>
   );
};

export default connect(
   null,
   { registerUser }
)(reduxForm({ form: "registerForm", validate })(RegisterForm));
