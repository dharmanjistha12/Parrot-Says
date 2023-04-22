import React from 'react'

const NewsItem =(props)=> {
		let { title, description, imgUrl, newsUrl, date, author, source } = props;
		return (
			<div style={{marginTop: '50px'}}>
				<div className="card my-2" style={{ width: "18rem" }}>
					<div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}><span className="badge rounded-pill bg-success" style={{ left: "90%", zIndex: "1" }}> {source} </span></div>

					<img className="card-img-top" src={!imgUrl ? "No image found" : imgUrl} alt="Image not available" />
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<p className="card-text">{description}</p>
						<p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small> </p>
						<a href={newsUrl} target="_blank" className="btn btn-sm btn-link">Read more</a>
					</div>
				</div>
			</div>
		)
}

export default NewsItem
