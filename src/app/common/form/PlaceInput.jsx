import { Form, Label, List, Segment } from "semantic-ui-react";
import PlacesAutocomplete from "react-places-autocomplete";
import React from "react";

const PlaceInput = ({
   input: { value, onChange, onBlur },
   width,
   options,
   placeholder,
   onSelect,
   meta: { touched, error }
}) => {
   return (
      <PlacesAutocomplete
         onChange={onChange}
         onSelect={onSelect}
         searchOptions={options}
         value={value}>
         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <Form.Field error={touched && !!error}>
               <input
                  placeholder={placeholder}
                  {...getInputProps({ placeholder, onBlur })}
               />
               {touched && error && (
                  <Label basic color='red'>
                     {error}
                  </Label>
               )}
               {suggestions.length > 0 && (
                  <Segment
                     style={{
                        marginTop: 0,
                        position: "absolute",
                        zIndex: 1000,
                        width: "100%"
                     }}>
                     {loading && <div>Loading...</div>}
                     <List selection>
                        {suggestions.map((suggestion) => (
                           <List.Item {...getSuggestionItemProps(suggestion)}>
                              <List.Header>
                                 {suggestion.formattedSuggestion.mainText}
                              </List.Header>
                              <List.Description>
                                 {suggestion.formattedSuggestion.secondaryText}
                              </List.Description>
                           </List.Item>
                        ))}
                     </List>
                  </Segment>
               )}
            </Form.Field>
         )}
      </PlacesAutocomplete>
   );
};

export default PlaceInput;
