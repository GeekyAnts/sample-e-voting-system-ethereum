import { createStore } from "redux";
import rootReducer from "./reducers";

function configureStore() {
  const store = createStore(rootReducer);
  return store;
}

export default configureStore;
