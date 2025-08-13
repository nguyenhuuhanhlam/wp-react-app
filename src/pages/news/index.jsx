import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getLatestPosts } from "@/services/api-client"
import PostBlock from '@/components/wp/post-block'
import ImageTextBlock from '@/components/wp/image-text-block'

const NewsPage = () => {
	const [posts, setPosts] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			const latestPosts = await getLatestPosts()
			setPosts(latestPosts)
		})()
	}, [])

	const handleOnClick = (id, slug) => {
		navigate(`/news/${id}/${slug}`)
	}

	return (
		<div className="w-full">

			{/** SECTION-1 */}
			<div className="flex md:flex-row my-4">
				<div className="md:w-[60%] px-2 md:px-0">
					<ImageTextBlock
						variant="landscape"
						title={posts[2]?.title?.rendered}
						imgSrc={posts[2]?._embedded['wp:featuredmedia'][0]['source_url']}
						imageSize="sm:w-64"
					/>
				</div>
				<div className="md:w-[40%] bg-green-100">M2</div>
			</div>

			{/** SECTION-2 */}
			{/* <div className="flex flex-col md:flex-row">
				<div className="w-full md:w-[75%] bg-slate-100">
					F-News
				</div>

				<div className="w-full md:w-[25%] px-4 sm:px-0 bg-neutral-50">
					<div className="font-bold">Latest News</div>
					{
						posts.map(post => (
							<PostBlock
								key={post.id}
								post={post}
								layout={{ w: 120 }}
								onClick={handleOnClick}
							/>
						))
					}
				</div>
			</div> */}
		</div>
	)
}

export default NewsPage