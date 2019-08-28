import { Button, Divider, Form, Label, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../authActions";
import React from "react";
import SocialLogin from "../SocialLogin/SocialLogin";

import TextInput from "../../../app/common/form/TextInput";

const LoginForm = ({ login, handleSubmit, error }) => {
   return (
      <Form
         autoComplete='off'
         error
         onSubmit={handleSubmit(login)}
         size='large'>
         <Segment>
            <Field
               component={TextInput}
               name='email'
               placeholder='Email Address'
               type='text'
            />
            <Field
               component={TextInput}
               name='password'
               placeholder='password'
               type='password'
            />
            {error && (
               <Label basic color='red'>
                  {error}
               </Label>
            )}
            <Button color='teal' fluid size='large'>
               Login
            </Button>
            <Divider horizontal>Or</Divider>
            <SocialLogin />
         </Segment>
      </Form>
   );
};

const mapDispatchToProps = {
   login
};

export default connect(
   null,
   mapDispatchToProps
)(reduxForm({ form: "loginForm" })(LoginForm));
