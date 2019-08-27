import {
   Button,
   Container,
   Header,
   Icon,
   Image,
   Segment
} from "semantic-ui-react";
import React from "react";

const HomePage = ({ history }) => {
   return (
      <Segment className='masthead' inverted textAlign='center' vertical>
         <Container text>
            <Header as='h1' inverted>
               <Image
                  alt='logo'
                  size='massive'
                  src='/assets/logo.png'
                  style={{ marginBottom: 12 }}
               />
               Re-vents
            </Header>
            <Button
               inverted
               onClick={() => history.push("/events")}
               size='huge'>
               Get started
               <Icon inverted name='right arrow' />
            </Button>
         </Container>
      </Segment>
   );
};

export default HomePage;
