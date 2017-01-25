import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {fetchArticles, fetchMoreArticles} from "../actions/demoActions"
import DemoPage from "../components/DemoPage"
import {Link} from "react-router"

class DemoHome extends Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.props.fetchArticles();
		window.removeEventListener("scroll", this._handlerScroll);
	}

	componentDidMount(){
		window.addEventListener("scroll",this._handlerScroll.bind(this));
	}

	_renderArticles(articleList){
		return _.map(articleList, (articles) =>{
			return (
				<DemoPage key={articles.articleId} isFullPageState={false} articles={articles}> </DemoPage>
			)
		})
	}

	_handlerScroll(){
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
		const body = document.body;
		const html = document.documentElement;
		const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		const windowBottom = windowHeight + window.pageYOffset;
		if(windowBottom >= docHeight){
			this.props.fetchMoreArticles();
		}
	}

	render(){
		const {children, demoHome} = this.props;
		return (
			<div>
				<div className="home-header">
					<input className="header-search-bar"/>
					<Link className="link-page header-icon" to="/article/empty">Icon</Link>
				</div>
				<div className="home-container">
					{this._renderArticles(demoHome.articleList)}
				</div>
				<div className="home-footer">
					<div className="page-footer-btn" ><Link className="link-page" to="/">HOME</Link></div>
					<div className="page-footer-btn" ><Link className="link-page" to="/article/empty">FIND</Link></div>
					<div className="page-footer-btn" ><Link className="link-page" to="/article/empty">ANNOUNCE</Link></div>
					<div className="page-footer-btn" ><Link className="link-page" to="/article/empty">CHAT</Link></div>
					<div className="page-footer-btn" ><Link className="link-page" to="/article/empty">MORE</Link></div>
				</div>
			</div>
		)
	}
}

DemoHome.propTypes = {
	children: PropTypes.node
}

const mapStateToProps = (state) =>{
	let {demoHome} = state;
	return {
		demoHome
	}
}

let mapDispatchToProps = {
	fetchArticles,
	fetchMoreArticles
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoHome);