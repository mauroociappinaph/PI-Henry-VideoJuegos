import { createStore , applyMiddleware} from "redux";
import rootReducer from "../reducer/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";




export const store = createStore(rootReducer, (applyMiddleware(thunk)))
