import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Cards from "./components/Cards";
import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <Cards />
    </Provider>
  );
}

export default App;
