import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getPostDetail } from '@/services/api-client'

const PostDetailPage = () => {
	const { id } = useParams()
	const [post, setPost] = useState(null)

	useEffect(() => {
		getPostDetail(id).then(res => {
			setPost(res)
		})
	}, [])

	return (
		<section className="grid grid-cols-4 gap-8">
			<div className="col-span-4 md:col-span-3">
				<h2
					className="text-lg font-semibold"
					dangerouslySetInnerHTML={{ __html: post?.title.rendered }}
				/>
				<div className="py-2 text-xs text-emerald-500">
					{post?._embedded['wp:term'][0][0].name}
				</div>

				<div
					className="sm:block text-sm text-neutral-500"
					dangerouslySetInnerHTML={{
						__html: post?.excerpt.rendered,
					}}
				/>

				<div
					className="
					sm:block
					text-sm
					text-neutral-500
					wp-content
					"
					dangerouslySetInnerHTML={{
						__html: post?.content.rendered,
					}}
				/>
			</div>

			<div className="col-span-1"></div>
		</section>
	)
}

export default PostDetailPage