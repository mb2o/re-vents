import { Grid } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { getUserEvents } from "../userActions";
import { userDetailedQuery } from "../userQueries";
import LoadingIndicator from "../../../app/layout/LoadingIndicator";
import React, { Component } from "react";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedSidebar from "./UserDetailedSidebar";

const mapStateToProps = (state, ownProps) => {
   let userUid = null;
   let profile = {};

   if (ownProps.match.params.id === state.auth.uid) {
      profile = state.firebase.profile;
   } else {
      profile =
         !isEmpty(state.firestore.ordered.profile) &&
         state.firestore.ordered.profile[0];
      userUid = ownProps.match.params.id;
   }

   return {
      profile,
      userUid,
      events: state.events,
      eventsLoading: state.async.loading,
      auth: state.firebase.auth,
      photos: state.firestore.ordered.photos,
      requesting: state.firestore.status.requesting
   };
};

const mapDispatchToProps = {
   getUserEvents
};

class UserDetailedPage extends Component {
   async componentDidMount() {
      const { getUserEvents, userUid } = this.props;
      let events = await getUserEvents(userUid);
      console.log(events);
   }

   changeTab = (e, data) => {
      this.props.getUserEvents(this.props.userUid, data.activeIndex);
   };

   render() {
      const {
         profile,
         photos,
         auth,
         match,
         requesting,
         events,
         eventsLoading
      } = this.props;
      const isCurrentUser = auth.uid === match.params.id;
      const loading = Object.values(requesting).some((a) => a === true);

      if (loading) return <LoadingIndicator />;

      return (
         <Grid>
            <UserDetailedHeader profile={profile} />
            <UserDetailedDescription profile={profile} />
            <UserDetailedSidebar isCurrentUser={isCurrentUser} />
            {photos && photos.length > 0 && (
               <UserDetailedPhotos photos={photos} />
            )}
            <UserDetailedEvents
               changeTab={this.changeTab}
               events={events}
               eventsLoading={eventsLoading}
            />
         </Grid>
      );
   }
}

export default compose(
   connect(
      mapStateToProps,
      mapDispatchToProps
   ),
   firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
