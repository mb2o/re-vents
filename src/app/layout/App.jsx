import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Route } from "react-router-dom";

import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import EventForm from "../../features/event/EventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar/NavBar";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import TestComponent from "../../features/testarea/TestComponent";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";

class App extends Component {
   render() {
      return (
         <Fragment>
            <Route exact path='/' component={HomePage} />
            <Route
               path='/(.+)'
               render={() => (
                  <Fragment>
                     <NavBar />
                     <Container className='main'>
                        <Route
                           exact
                           path='/events'
                           component={EventDashboard}
                        />
                        <Route
                           path='/events/:id'
                           component={EventDetailedPage}
                        />
                        <Route path='/people' component={PeopleDashboard} />
                        <Route
                           path='/profile/:id'
                           component={UserDetailedPage}
                        />
                        <Route path='/settings' component={SettingsDashboard} />
                        <Route path='/createEvent' component={EventForm} />
                        <Route path='/test' component={TestComponent} />
                     </Container>
                  </Fragment>
               )}
            />
         </Fragment>
      );
   }
}

export default App;
