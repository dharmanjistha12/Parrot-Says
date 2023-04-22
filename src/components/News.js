import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
const News = (props) => {
	const [articles, setArticles] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [totalResults, setTotalResults] = useState(0)

	const updateNews = async () => {
		props.setProgress(10);
		var options = {
			method: 'GET',
			url: 'https://api.newscatcherapi.com/v2/search',
			params: { q: `${props.category}`, lang: 'en', sort_by: 'relevancy', page: `${page + 1}` },
			headers: {
				'x-api-key': `${props.apiKey}`
			}
		};

		axios.request(options).then(function (response) {
			let data = response.data;
			props.setProgress(30);
			setArticles(data.articles)
			setTotalResults(data.totalResults)
			setLoading(false)
			props.setProgress(70);
			console.log(data)
			props.setProgress(100);
		}).catch(function (error) {
			console.error(error);
		});
	}
	useEffect(() => {
		updateNews();
		document.title = `${capiFirstL(props.category)}-ParrotSays`
	}, [props.category])
	const fetchMoreData = async () => {
		var options = {
			method: 'GET',
			url: 'https://api.newscatcherapi.com/v2/search',
			params: { q: `${props.category}`, lang: 'en', sort_by: 'relevancy', page: `${page + 1}` },
			headers: {
				'x-api-key': `${props.apiKey}`
			}
		};

		axios.request(options).then(function (response) {
			let data = response.data;
			props.setProgress(30);
			setArticles(articles.concat(data.articles))
			setTotalResults(data.totalResults)
			setPage(page + 1)
		}).catch(function (error) {
			console.error(error);
		});
	}
	const capiFirstL = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return (
		<>
			<h3 className='text-center'>ParrotSays-Top {props.category} Headlines</h3>
			{loading && <Spinner />}
			<InfiniteScroll dataLength={articles.length}
				next={fetchMoreData}
				hasMore={articles.length !== totalResults}
				loader={<Spinner />}>
				<div className="container">
					<div className="row">
						{!loading && articles.map((ele) => {
							return <div className="col-md-4" ><NewsItem title={ele.title ? ele.title.slice(0, 45) : "Headline not found"} description={ele.summary ? ele.summary.slice(0, 88) : "No description found"} imgUrl={ele.media} newsUrl={ele.link} date={ele.published_date} author={ele.author} source={ele.rights} /></div>
						})}
					</div>
				</div>
			</InfiniteScroll>
		</>
	)
}
News.defaultProps = {
	country: 'in',
	pageSize: '10',
	category: 'general'
}
News.propTypes = {
	country: PropTypes.string,
	pageSize: PropTypes.number,
	category: PropTypes.string

}
export default News
