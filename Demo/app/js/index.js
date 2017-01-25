import React from "react"
import {render} from "react-dom"
import {browserHistory} from "react-router"
import {syncHistoryWithStore} from "react-router-redux"
import {Router, Route} from "react-router"
import configureStore from "./store/configureStore"
import {Provider} from "react-redux"
import DemoHome from "./containers/DemoHome"
import DemoPage from "./components/DemoPage"

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={DemoHome} /> 
			<Route path="/article/:articleId" component={DemoPage}/>
		</Router>
	</Provider>, 
	document.getElementById("main-container")
);