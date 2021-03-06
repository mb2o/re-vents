import { FETCH_EVENTS } from "../event/eventConstants";
import {
   asyncActionError,
   asyncActionFinish,
   asyncActionStart
} from "../async/asyncActions";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import firebase from "../../app/config/firebase";

export const updateProfile = (user) => async (
   dispatch,
   getState,
   { getFirebase }
) => {
   const firebase = getFirebase();
   const { isLoaded, isEmpty, ...updatedUser } = user;

   try {
      await firebase.updateProfile(updatedUser); // updates profile in firestore!
      toastr.success("Success", "Your profile has been updated");
   } catch (error) {
      console.error(error);
   }
};

export const uploadProfileImage = (file, fileName) => async (
   dispatch,
   getState,
   { getFirebase, getFirestore }
) => {
   const imageName = cuid();
   const firebase = getFirebase();
   const firestore = getFirestore();
   const user = firebase.auth().currentUser;
   const path = `${user.uid}/user_images/`;
   const options = {
      name: imageName
   };

   try {
      dispatch(asyncActionStart());
      // upload file to firebase storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      // get url of the image
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      // get userdoc
      let userDoc = await firestore.get(`users/${user.uid}`);
      // check if user has photo, if not update profile
      if (!userDoc.data().photoURL) {
         await firebase.updateProfile({
            photoURL: downloadURL
         });
         await user.updateProfile({
            photoURL: downloadURL
         });
      }
      // add image to firestore
      await firestore.add(
         {
            collection: "users",
            doc: user.uid,
            subcollections: [{ collection: "photos" }]
         },
         {
            name: imageName,
            url: downloadURL
         }
      );
      dispatch(asyncActionFinish());
   } catch (error) {
      console.error(error);
      dispatch(asyncActionError());
   }
};

export const deletePhoto = (photo) => async (
   dispatch,
   getState,
   { getFirebase, getFirestore }
) => {
   const firebase = getFirebase();
   const firestore = getFirestore();
   const user = firebase.auth().currentUser;

   try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
         collection: "users",
         doc: user.uid,
         subcollections: [{ collection: "photos", doc: photo.id }]
      });
   } catch (error) {
      console.error(error);
      throw new Error("Problem deleting the photo");
   }
};

export const setMainPhoto = (photo) => async (
   dispatch,
   getState,
   { getFirebase }
) => {
   const firebase = getFirebase();

   try {
      return await firebase.updateProfile({
         photoURL: photo.url
      });
   } catch (error) {
      console.error(error);
      throw new Error("Problem setting main photo"); // throw error up to PhotoPage
   }
};

export const goingToEvent = (event) => async (
   dispatch,
   getState,
   { getFirebase, getFirestore }
) => {
   const firebase = getFirebase();
   const firestore = getFirestore();
   const user = firebase.auth().currentUser;
   const profile = getState().firebase.profile;
   const attendee = {
      going: true,
      joinDate: firestore.FieldValue.serverTimestamp(),
      photoURL: profile.photoURL || "/assets/user.png",
      displayName: profile.displayName,
      host: false
   };

   try {
      await firestore.update(`events/${event.id}`, {
         [`attendees.${user.uid}`]: attendee
      });
      await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
         eventId: event.id,
         userUid: user.uid,
         eventDate: event.date,
         host: false
      });
      toastr.success("Success", "You have signed up to this event");
   } catch (error) {
      console.error(error);
      toastr.error("Oops", "Problem signing up to this event");
   }
};

export const cancelGoingToEvent = (event) => async (
   dispatch,
   getState,
   { getFirestore, getFirebase }
) => {
   const firebase = getFirebase();
   const firestore = getFirestore();
   const user = firebase.auth().currentUser;

   try {
      await firestore.update(`events/${event.id}`, {
         [`attendees.${user.uid}`]: firestore.FieldValue.delete()
      });
      await firestore.delete(`event_attendee/${event.id}_{user.uid}`);
      toastr.success("Success", "You have removed yourself from this event");
   } catch (error) {
      console.error(error);
      toastr.error("Oops", "Something went wrong");
   }
};

export const getUserEvents = (userUid, activeTab) => async (
   dispatch,
   getState
) => {
   dispatch(asyncActionStart());

   const firestore = firebase.firestore();
   const today = new Date(Date.now());
   let eventsRef = firestore.collection("event_attendee");
   let query;

   switch (activeTab) {
      case 1: // past events
         query = eventsRef
            .where("userUid", "==", userUid)
            .where("eventDate", "<=", today)
            .orderBy("eventDate", "desc");
         break;

      case 2: // future events
         query = eventsRef
            .where("userUid", "==", userUid)
            .where("eventDate", ">=", today)
            .orderBy("eventDate");
         break;

      case 3: // hosted events
         query = eventsRef
            .where("userUid", "==", userUid)
            .where("host", "==", true)
            .orderBy("eventDate", "desc");
         break;

      default:
         query = eventsRef
            .where("userUid", "==", userUid)
            .orderBy("eventDate", "desc");
   }

   try {
      let querySnap = await query.get();
      let events = [];

      for (let i = 0; i < querySnap.docs.length; i++) {
         const evt = await firestore
            .collection("events")
            .doc(
               querySnap.docs[i].data().eventId
            )
            .get();

         events.push({ ...evt.data(), id: evt.id });
      }

      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionFinish());
   } catch (error) {
      console.error(error);
      dispatch(asyncActionError());
   }
};
