import { Grid } from "semantic-ui-react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { updatePassword } from "../../auth/authActions";
import AboutPage from "./AboutPage";
import AccountPage from "./AccountPage";
import BasicPage from "./BasicPage";
import PhotosPage from "./PhotosPage";
import React from "react";
import SettingsNav from "./SettingsNav";

const SettingsDashboard = ({ updatePassword, providerId, user }) => {
   return (
      <Grid>
         <Grid.Column width={12}>
            <Switch>
               <Redirect exact from='/settings' to='/settings/basic' />
               <Route
                  path='/settings/basic'
                  render={() => <BasicPage initialValues={user} />}
               />
               <Route component={AboutPage} path='/settings/about' />
               <Route component={PhotosPage} path='/settings/photos' />
               <Route
                  path='/settings/account'
                  render={() => (
                     <AccountPage
                        providerId={providerId}
                        updatePassword={updatePassword}
                     />
                  )}
               />
            </Switch>
         </Grid.Column>
         <Grid.Column width={4}>
            <SettingsNav />
         </Grid.Column>
      </Grid>
   );
};

// Component loads before our firebase auth data,
// so wrap render() in firebaseAuthIsReady in index.js
const mapStateToProps = (state) => ({
   providerId: state.firebase.auth.providerData[0].providerId,
   user: state.firebase.profile
});

export default connect(
   mapStateToProps,
   { updatePassword }
)(SettingsDashboard);
