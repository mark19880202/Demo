import {routerReducer as routing} from "react-router-redux"
import demoHome from "./demoHomeReducers"
import demoPage from "./demoPageReducers"
import {combineReducers} from "redux"


const rootReducer = combineReducers({
	demoHome,
	routing,
	demoPage
});

export default rootReducer