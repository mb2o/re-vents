import { FETCH_EVENTS } from "./eventConstants";
import {
   asyncActionError,
   asyncActionFinish,
   asyncActionStart
} from "../async/asyncActions";
import { createNewEvent } from "../../app/common/util/helpers";
import { toastr } from "react-redux-toastr";
import firebase from "../../app/config/firebase";

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
            eventId: createdEvent.id,
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

export const cancelEventToggle = (cancelled, eventId) => async (
   dispatch,
   getState,
   { getFirestore }
) => {
   const firestore = getFirestore();
   const message = cancelled
      ? "Are you sure you want to cancel this event?"
      : "This will reactivate the event. Are you sure?";

   try {
      toastr.confirm(message, {
         onOk: async () =>
            await firestore.update(`events/${eventId}`, {
               cancelled: cancelled
            })
      });
   } catch (error) {
      console.error(error);
   }
};

export const getEventsForDashboard = (lastEvent) => async (
   dispatch,
   getState
) => {
   // let today = new Date();
   const firestore = firebase.firestore();
   const eventsRef = firestore.collection("events");

   try {
      dispatch(asyncActionStart());

      let startAfter =
         lastEvent &&
         (await firestore
            .collection("events")
            .doc(lastEvent.id)
            .get());

      let query;

      lastEvent
         ? (query = eventsRef
              //   .where("date", ">=", today)
              .orderBy("date")
              .startAfter(startAfter)
              .limit(2))
         : (query = eventsRef
              //   .where("date", ">=", today)
              .orderBy("date")
              .limit(2));

      let querySnap = await query.get();

      if (querySnap.docs.length === 0) {
         dispatch(asyncActionFinish());
         return querySnap;
      }

      let events = [];

      for (let i = 0; i < querySnap.docs.length; i++) {
         let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
         events.push(evt);
      }

      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionFinish());

      return querySnap;
   } catch (error) {
      console.error(error);
      dispatch(asyncActionError());
   }
};
