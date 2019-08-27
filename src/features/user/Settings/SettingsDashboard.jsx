import { Grid } from "semantic-ui-react";
import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";

import AboutPage from "./AboutPage";
import AccountPage from "./AccountPage";
import BasicPage from "./BasicPage";
import PhotosPage from "./PhotosPage";
import SettingsNav from "./SettingsNav";

const SettingsDashboard = () => {
   return (
      <Grid>
         <Grid.Column width={12}>
            <Switch>
               <Redirect exact from='/settings' to='/settings/basic' />
               <Route component={BasicPage} path='/settings/basic' />
               <Route component={AboutPage} path='/settings/about' />
               <Route component={PhotosPage} path='/settings/photos' />
               <Route component={AccountPage} path='/settings/account' />
            </Switch>
         </Grid.Column>
         <Grid.Column width={4}>
            <SettingsNav />
         </Grid.Column>
      </Grid>
   );
};

export default SettingsDashboard;
