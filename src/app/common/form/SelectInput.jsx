import { Form, Label, Select } from "semantic-ui-react";
import React from "react";

const SelectInput = ({
   input,
   type,
   placeholder,
   multiple,
   options,
   meta: { touched, error }
}) => {
   return (
      <Form.Field error={touched && !!error}>
         <Select
            multiple={multiple}
            onChange={(e, data) => input.onChange(data.value)}
            options={options}
            placeholder={placeholder}
            value={input.value || null}
         />
         {touched && error && (
            <Label basic color='red'>
               {error}
            </Label>
         )}
      </Form.Field>
   );
};

export default SelectInput;
