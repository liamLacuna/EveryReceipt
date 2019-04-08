import React, { Component } from "react";
import AuthButton from "../Auth/AuthButton";
import FormFilds from "../HomeScreen/FormFields";
export default class ManualAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    handleSubmit = () => {

    };
  }

  render() {
    return (
      <React.Fragment>
        <FormFilds />
        <AuthButton text="Submit" />
      </React.Fragment>
    );
  }
}








