import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import "./index.css";
import rootReducer from "./reducers";

// dispatch & getState are not store objects
// curriable form of logger(obj, next, action)
  // logger(obj)(next)(action)
  // next refers to...next middleware in chain or dispatch function at last MW

// const logger = function ({dispatch, getState}){
//   return function(next){
//     return function(action){
//       if (typeof action !== "function") {
//         console.log("ACTION TYPE = ", action.type);
//       }
//       next(action);
//     }
//   }
// }

// var f = () => () => () => {return 1}
  // f()()()
const logger = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action !== "function") {
      console.log("ACTION TYPE = ", action.type);
    }
    next(action);
  };

// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     if (typeof action === "function") {
//       action(dispatch);
//       return;
//     }
//     next(action);
//   };

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export const StoreContext = createContext();

class Provider extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
