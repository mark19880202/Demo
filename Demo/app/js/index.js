import React from "react"
import {render} from "react-dom"
import {broserHistory} from "react-router"
import {syncHistoryWithStore} from "react-router-redux"
import {Router} from "react-router"
import {Provider} from "react-redux"


window.onload = ()=>{
	render(<Provider >
		
	</Provider>, document.getElementById("main-container"));
}
