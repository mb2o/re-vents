import { Form, Label } from "semantic-ui-react";
import React from "react";

const TextArea = ({
   input,
   width,
   type,
   rows,
   placeholder,
   meta: { touched, error }
}) => {
   return (
      <Form.Field error={touched && !!error}>
         <textarea
            {...input}
            placeholder={placeholder}
            rows={rows}
            type={type}
         />
         {touched && error && (
            <Label basic color='red'>
               {error}
            </Label>
         )}
      </Form.Field>
   );
};

export default TextArea;
