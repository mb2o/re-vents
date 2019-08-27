import { Header, Segment } from "semantic-ui-react";
import React, { Fragment } from "react";

const EventActivity = () => {
   return (
      <Fragment>
         <Header attached='top' content='Recent Activity' />
         <Segment attached>
            <p>Recent activity goes here</p>
         </Segment>
      </Fragment>
   );
};

export default EventActivity;
