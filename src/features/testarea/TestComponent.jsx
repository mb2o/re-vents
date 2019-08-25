import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import { incrementCounter, decrementCounter } from "./testActions";

const mapStateToProps = (state) => ({
   data: state.data
});

const mapDispatchToProps = {
   incrementCounter,
   decrementCounter
};

class TestComponent extends Component {
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
         </div>
      );
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(TestComponent);
