import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {fetchFullArticles, increasingArticlesFlag} from "../actions/demoActions"
import {Link} from "react-router"
import * as types from "../constants/actionTypes"

class DemoPage extends Component{
	constructor(props){
		super(props);
		this.state = {isFullPageState: this.props.params && this.props.params.articleId ? true: this.props.isFullPageState,
			articleId: this.props.params && this.props.params.articleId};
		this._increasingGood = this._increasingGood.bind(this);
		this._increasingComments = this._increasingComments.bind(this);
	}

	componentWillMount(){
		this.props.fetchFullArticles(this.state.articleId);
	}

	componentDidMount(){
	}

	_increasingGood(e){
		this.props.increasingArticlesFlag(this.state.articleId, types.INCREASE_ATICLES_GOOD);
	}

	_increasingComments(e){
		this.props.increasingArticlesFlag(this.state.articleId, types.INCREASE_ATICLES_COMMENTS);
	}

	render(){
		const {children, demoPage, articles} = this.props, {isFullPageState} = this.state;
		return (
			isFullPageState ? 
			<div>
				<div className="page-header"><Link className="link-page back-icon" to="/"/> 文章 </div>
				<div className="page-full-context">{demoPage.articles && demoPage.articles.context}</div>
				<div className="page-footer">
					<div className="page-footer-btn" onClick={this._increasingGood}>GOOD<br/>{demoPage.articles && demoPage.articles.good}</div>
					<div className="page-footer-btn" >BOOKMARK</div>
					<div className="page-footer-btn" onClick={this._increasingComments}>Comments<br/>{demoPage.articles && demoPage.articles.comments}</div>
				</div>
			</div> :
			<div className="page-short-context">
				<Link className="link-page" to={`/article/${articles.articleId}`}>
					<div className="page-short-header">{articles.articleTitle}</div>
					<div className="page-short-container">{articles.context}</div>
					<div className="page-short-foot">Good: {articles.good} . Comments: {articles.comments}</div>
				</Link>
			</div> 
		);
	}
}


DemoPage.propTypes = {
	children: PropTypes.node
}

const mapStateToProps = (state) =>{
	let {demoPage} = state;
	return {
		demoPage
	}
}

let mapDispatchToProps = {
	fetchFullArticles,
	increasingArticlesFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoPage);