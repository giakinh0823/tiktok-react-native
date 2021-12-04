import { initializeApp } from "firebase/app";
import React from "react";
import { Provider } from "react-redux";
import { firebaseConfig } from "./constants";
import { store } from "./src/app/store";
import Navigation from "./src/navigation/main";
import { NavigationContainer } from "@react-navigation/native";

initializeApp(firebaseConfig);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
