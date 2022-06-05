import React from "react";
import { Provider } from "react-redux";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { Layout } from "./container/Layout";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
