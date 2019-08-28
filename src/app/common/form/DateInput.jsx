import "react-datepicker/dist/react-datepicker.css";
import { Form, Label } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import React from "react";

const DateInput = ({
   input: { value, onChange, onBlur },
   width,
   placeholder,
   meta: { touched, error },
   ...rest
}) => {
   return (
      <Form.Field error={touched && !!error}>
         <DatePicker
            {...rest}
            onBlur={(e, val) => onBlur(val)}
            onChange={onChange}
            onChangeRaw={(e) => e.preventDefault()}
            placeholderText={placeholder}
            selected={
               value
                  ? Object.prototype.toString.call(value) !== "[object Date]"
                     ? value.toDate()
                     : value
                  : null
            }
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
