import { Button, Divider, Form, Label, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login, socialLogin } from "../authActions";
import React from "react";
import SocialLogin from "../SocialLogin/SocialLogin";

import TextInput from "../../../app/common/form/TextInput";

const LoginForm = ({ login, handleSubmit, error, socialLogin }) => {
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
            <SocialLogin socialLogin={socialLogin} />
         </Segment>
      </Form>
   );
};

const mapDispatchToProps = {
   login,
   socialLogin
};

export default connect(
   null,
   mapDispatchToProps
)(reduxForm({ form: "loginForm" })(LoginForm));
