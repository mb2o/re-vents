import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import React, { Component, Fragment } from "react";

import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import EventForm from "../../features/event/EventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import ModalManager from "../../features/modals/ModalManager";
import NavBar from "../../features/nav/NavBar/NavBar";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import TestComponent from "../../features/testarea/TestComponent";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";

class App extends Component {
   render() {
      return (
         <Fragment>
            <ModalManager />
            <Route component={HomePage} exact path='/' />
            <Route
               path='/(.+)'
               render={() => (
                  <Fragment>
                     <NavBar />
                     <Container className='main'>
                        <Switch key={this.props.location.key}>
                           <Route
                              component={EventDashboard}
                              exact
                              path='/events'
                           />
                           <Route
                              component={EventDetailedPage}
                              path='/events/:id'
                           />
                           <Route component={PeopleDashboard} path='/people' />
                           <Route
                              component={UserDetailedPage}
                              path='/profile/:id'
                           />
                           <Route
                              component={SettingsDashboard}
                              path='/settings'
                           />
                           <Route
                              component={EventForm}
                              path={["/createEvent", "/manage/:id"]}
                           />
                           <Route component={TestComponent} path='/test' />
                        </Switch>
                     </Container>
                  </Fragment>
               )}
            />
         </Fragment>
      );
   }
}

export default withRouter(App);
