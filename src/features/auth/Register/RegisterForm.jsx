import { Button, Form, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import React from "react";

import TextInput from "../../../app/common/form/TextInput";

const RegisterForm = () => {
   return (
      <div>
         <Form autoComplete='off' size='large'>
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

export default reduxForm({ form: "registerForm" })(RegisterForm);
