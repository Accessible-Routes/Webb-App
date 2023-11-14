import React, { Component } from "react";
import {buildings, isAccessible} from "./Map";

class AccessibleDiv extends Component {
    state = {
      accessible: ""
    };
    render() {
      return (
        <div>
          <button
            onClick={() => {
              this.getResult();
            }}
          >
            Get Building
          </button>
          <br />
          <br />
          {this.state.accessible}
        </div>
      );
    }
  
    getResult() {
      var result = isAccessible.get("Low")
      this.setState({ accessible: result });
      console.log(result);
    }
  }
  
  export default AccessibleDiv;