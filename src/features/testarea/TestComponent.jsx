import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import { incrementCounter, decrementCounter } from "./testActions";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import SimpleMap from "./SimpleMap";
import TestPlaceInput from "./TestPlaceInput";

const mapStateToProps = (state) => ({
   data: state.test.data
});

const mapDispatchToProps = {
   incrementCounter,
   decrementCounter
};

class TestComponent extends Component {
   state = {
      latlng: {
         lat: 59.95,
         lng: 30.33
      }
   };

   handleSelect = (address) => {
      geocodeByAddress(address)
         .then((res) => getLatLng(res[0]))
         .then((latLng) => {
            this.setState({ latlng: latLng });
         })
         .catch((err) => console.error(err));
   };

   render() {
      const { data, incrementCounter, decrementCounter } = this.props;

      return (
         <div>
            <h1>Test Component</h1>
            <h3>The answer is: {data}</h3>
            <Button
               onClick={incrementCounter}
               positive
               content='Increment'></Button>
            <Button
               onClick={decrementCounter}
               negative
               content='Decrement'></Button>
            <br />
            <br />
            <TestPlaceInput selectAddress={this.handleSelect} />
            <br />
            <SimpleMap key={this.state.latlng.lng} latlng={this.state.latlng} />
         </div>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(TestComponent);
