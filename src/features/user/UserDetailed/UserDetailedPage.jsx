import { Grid } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import React, { Component } from "react";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedSidebar from "./UserDetailedSidebar";

const query = ({ auth }) => {
   return [
      {
         collection: "users",
         doc: auth.uid,
         subcollections: [{ collection: "photos" }],
         storeAs: "photos"
      }
   ];
};

const mapStateToProps = (state) => ({
   profile: state.firebase.profile,
   auth: state.firebase.auth,
   photos: state.firestore.ordered.photos
});

class UserDetailedPage extends Component {
   render() {
      const { profile, photos } = this.props;

      return (
         <Grid>
            <UserDetailedHeader profile={profile} />
            <UserDetailedDescription profile={profile} />
            <UserDetailedSidebar />
            {photos && photos.length > 0 && (
               <UserDetailedPhotos photos={photos} />
            )}
            <UserDetailedEvents />
         </Grid>
      );
   }
}

export default compose(
   connect(mapStateToProps),
   firestoreConnect((auth) => query(auth))
)(UserDetailedPage);
