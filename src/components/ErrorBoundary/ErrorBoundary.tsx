import React, { Component, Children } from "react";

class ErrorBoundary extends Component<any> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch() {
    console.log("error catched");
    //   redirect
  }

  render() {
    if (this.state.hasError) {
      console.log("error catched");
      //   redirect
    }
    return Children.only(this.props?.children);
  }
}

export { ErrorBoundary };
