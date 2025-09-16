import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getPostDetail, getPosts } from '@/services/api-client'
import ImageTextBlock from '@/components/wp/image-text-block'
import { getFeaturedImage } from '@/lib/helpers'

const PostDetailPage = () => {
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [relateds, setRelateds] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		getPostDetail(id)
			.then(res => {
				setPost(res)

				getPosts({ categoryId: res?.categories[0], per_page: 5, exclude: id })
					.then(res => setRelateds(res))
			})
	}, [id])

	const handleOnClick = (id, slug) => {
		navigate(`/post/${id}/${slug}`)
	}

	return (
		<section className="grid grid-cols-1 md:grid-cols-6 gap-8">
			<div className="col-span-2 md:col-span-4">
				<h1
					className="text-[20px]! font-semibold py-8"
					dangerouslySetInnerHTML={{ __html: post?.title.rendered }}
				/>
				<div className="py-2 text-xs text-sky-500">
					{post?._embedded['wp:term'][0][0].name} - {post?._embedded['wp:term'][0][1]?.name}
				</div>

				<div
					className="sm:block text-sm text-neutral-500"
					dangerouslySetInnerHTML={{ __html: post?.excerpt.rendered }}
				/>

				<div
					className="
					sm:block
					text-sm
					text-neutral-500
					wp-content
					"
					dangerouslySetInnerHTML={{ __html: post?.content.rendered }}
				/>
			</div>

			<div className="col-span-1 md:col-span-2">
				<h1 className="text-[18px]! font-bold text-stone-500 py-8">TIN LIÊN QUAN</h1>
				<div>
					{relateds.map(e => {
						return (
							<div key={e.id} className="py-4">
								<ImageTextBlock
									variant="square"
									title={e?.title?.rendered}
									description={e?.excerpt?.rendered}
									imgSrc={getFeaturedImage(e)}
									imageSize="sm:w-32"
									textPosition="side"
									onClick={() => handleOnClick(e?.id, e?.slug)}
								/>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default PostDetailPage