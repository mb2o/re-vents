import "react-datepicker/dist/react-datepicker.css";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import React from "react";

const DateInput = ({
   input,
   width,
   placeholder,
   meta: { touched, error },
   ...rest
}) => {
   return (
      <Form.Field error={touched && !!error}>
         <DatePicker
            {...rest}
            onBlur={input.onBlur}
            onChange={input.onChange}
            onChangeRaw={(e) => e.preventDefault()}
            placeholderText={placeholder}
            selected={input.value ? new Date(input.value) : null}
         />
         {touched && error && (
            <Label basic color='red'>
               {error}
            </Label>
         )}
      </Form.Field>
   );
};

export default DateInput;
