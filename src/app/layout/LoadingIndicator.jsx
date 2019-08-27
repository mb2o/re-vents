import { Dimmer, Loader } from "semantic-ui-react";
import React from "react";

const LoadingIndicator = ({ inverted = true }) => {
   return (
      <Dimmer active={true} inverted={inverted}>
         <Loader content='Loading...' />
      </Dimmer>
   );
};

export default LoadingIndicator;
