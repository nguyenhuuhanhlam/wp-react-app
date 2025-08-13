const PostBlock = ({
	post,
	layout: _layout,
	onClick = () => { }
}) => {
	const layout = {
		w: 80,
		title: { color: '#1F2937' },
		..._layout,
		title: {
			color: '#1F2937',
			..._layout?.title
		}
	};

	const { title, _embedded } = post;

	const handleClick = () => onClick(post?.id, post?.slug);

	return (
		<div className="flex py-2 cursor-pointer" onClick={handleClick}>
			{_embedded?.['wp:featuredmedia'] && (
				<img
					src={_embedded['wp:featuredmedia'][0]?.['source_url']}
					width={layout.w}
					alt=""
					className="pr-4"
				/>
			)}
			<h2
				style={{ color: layout.title.color }}
				dangerouslySetInnerHTML={{ __html: title.rendered }}
			/>
		</div>
	);
};

export default PostBlock;
