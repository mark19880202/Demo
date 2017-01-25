import * as types from "../constants/actionTypes"
import update from "react-addons-update"

var initState = {
	articleId: null,
	articles: null,
	isFullPageState: false
};

export default function demoPage(state = initState, action){
	let newState = state;
	switch(action.type){
		case types.FETCH_FULL_ATICLES:
			newState = fetchFullArticles(state, action);
			break;
		case types.INCREASE_ATICLES_GOOD:
			newState = increasingArticlesField(state, action, "good");
			break;
		case types.INCREASE_ATICLES_COMMENTS:
			newState = increasingArticlesField(state, action, "comments");
			break;

	}
	return newState;
}

function increasingArticlesField(state, action, field){
	let {articles} = action;
	articles[field]++;
	return update(state,{
		articles:{$set: articles}
	})
}
function fetchFullArticles(state, action){
	let {articles} = action;
	return update(state,{
		articles:{$set: articles}
	})
}