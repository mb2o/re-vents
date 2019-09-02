import EventListItem from "./EventListItem";
import InfiniteScroll from "react-infinite-scroller";
import React, { Component, Fragment } from "react";

class EventList extends Component {
   render() {
      const { events, getNextEvents, loading, moreEvents } = this.props;

      return (
         <Fragment>
            {events && events.length !== 0 && (
               <InfiniteScroll
                  hasMore={!loading && moreEvents}
                  initialLoad={false}
                  loadMore={getNextEvents}
                  pageStart={0}>
                  {events &&
                     events.map((event) => (
                        <EventListItem event={event} key={event.id} />
                     ))}
               </InfiniteScroll>
            )}
         </Fragment>
      );
   }
}

export default EventList;
