import * as types from "../constants/actionTypes"
import update from "react-addons-update"

var initState = {
	articleList:[]
};

export default function demoHome(state = initState, action){
	let newState = state;
	switch(action.type){
		case types.FETCH_ATICLES:
			newState = fetchArticles(state, action);
			break;
		case types.FETCH_MORE_ATICLES:
			newState = fetchArticles(state, action);
			break;
	}
	return newState;
}

function fetchArticles(state, action){
	let {type, articles} = action;
	return update(state, {
		articleList: {$set: type === types.FETCH_MORE_ATICLES ? state.articleList.concat(articles) : articles}
	})
}