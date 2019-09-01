import { DELETE_EVENT, FETCH_EVENTS } from "./eventConstants";
import {
   asyncActionError,
   asyncActionFinish,
   asyncActionStart
} from "../async/asyncActions";
import { createNewEvent } from "../../app/common/util/helpers";
import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";

export const createEvent = (event) => {
   return async (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      const firebase = getFirebase();
      const user = firebase.auth().currentUser;
      const photoURL = getState().firebase.profile.photoURL;
      const newEvent = createNewEvent(user, photoURL, event);

      try {
         let createdEvent = await firestore.add("events", newEvent); // use ADD() when you do not have any ID

         await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
            eventId: createdEvent,
            userUid: user.uid,
            eventDate: event.date,
            host: true
         });

         toastr.success("Success!", "Event has been created");

         return createdEvent;
      } catch (error) {
         console.error(error);
         toastr.error("Oops", error.message);
      }
   };
};

export const updateEvent = (event) => {
   return async (dispatch, getState, { getFirestore }) => {
      const firestore = getFirestore();

      try {
         await firestore.update(`events/${event.id}`, event);
         toastr.success("Success!", "Event has been updated");
      } catch (error) {
         toastr.error("Oops", error.message);
      }
   };
};

export const deleteEvent = (eventId) => {
   return {
      type: DELETE_EVENT,
      payload: { eventId }
   };
};

export const loadEvents = () => {
   return async (dispatch) => {
      try {
         dispatch(asyncActionStart());
         const events = await fetchSampleData();
         dispatch({ type: FETCH_EVENTS, payload: { events } });
         dispatch(asyncActionFinish());
      } catch (error) {
         dispatch(asyncActionError());
         console.error(error);
      }
   };
};
