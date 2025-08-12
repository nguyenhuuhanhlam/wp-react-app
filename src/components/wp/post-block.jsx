const PostBlock = ({ post }) => {

	const { title, _embedded } = post

	if (_embedded['wp:featuredmedia']) {
		return (
			<div className="flex py-2">
				<img src={_embedded['wp:featuredmedia'][0]['source_url']} width={200} />
				<h2 className="pl-4" dangerouslySetInnerHTML={{ __html: title.rendered }} />
			</div>
		)
	}
	else
		return (
			<div className="flex py-2">
				<h2 dangerouslySetInnerHTML={{ __html: title.rendered }} />
			</div>
		)
}

export default PostBlock