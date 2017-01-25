import * as types from "../constants/actionTypes"
import {mockFullArticles, mockMoreArticles} from "../constants/demoMockData";

export function fetchArticles(){//server fetch, can post index to fetch number of the data
	//can fetch data from server 
	/*
		$.ajax({
			xxxxx
		}).then((result)=>{
			dispatch...
		})

	*/
	return {
		type: types.FETCH_ATICLES,
		articles: mockFullArticles
	}
}

let testCount = 0;
export function fetchMoreArticles(){//server fetch, can reuse fetch api 
	testCount++;
	let moreArticles = testCount > 1 ? [] : mockMoreArticles;//only extend once
	return {
		type: types.FETCH_MORE_ATICLES,
		articles: moreArticles
	}
}

export function fetchFullArticles(articleId){
	return (dispatch, getState)=>{
		let dataState = getState().demoHome;
		let filterItem = _.find(dataState.articleList,(item)=>{
			return item.articleId === articleId
		});
		if(articleId === "empty"){
			filterItem = [];
		}
		filterItem && dispatch({
			type: types.FETCH_FULL_ATICLES,
			articles: filterItem
		})
	}
}


export function increasingArticlesFlag(articleId,type){//server post, need update server data
	return (dispatch, getState)=>{
		let dataState = getState().demoHome;
		let filterItem = _.find(dataState.articleList,(item)=>{
			return item.articleId === articleId
		});
		filterItem && dispatch({
			type: type,
			articles: filterItem
		})
	}

}