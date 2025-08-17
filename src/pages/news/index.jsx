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
			const latestPosts = await getLatestPosts(4)
			setPosts(latestPosts)
		})()
	}, [])

	const handleOnClick = (id, slug) => {
		navigate(`/news/${id}/${slug}`)
	}

	return (
		<div className="w-full pt-4">
			<h1 className="text-[32px]! font-bold text-stone-500">News</h1>

			{/** SECTION-1 */}
			<div className="flex flex-col md:flex-row my-4 gap-8">

				<div className="w-full md:w-[65%] md:px-0 bg-stone-50">
					<ImageTextBlock
						variant="landscape"
						title={posts[1]?.title?.rendered}
						imgSrc={posts[1]?._embedded['wp:featuredmedia'][0]['source_url']}
						imageSize="sm:w-64"
						textPosition="bottom"
					/>
				</div>

				<div className="w-full flex flex-col gap-8 md:w-[35%] bg-stone-50">
					<ImageTextBlock
						variant="landscape"
						title={posts[2]?.title?.rendered}
						imgSrc={posts[2]?._embedded['wp:featuredmedia'][0]['source_url']}
						imageSize="sm:w-64"
						textPosition="bottom"
					/>
					<ImageTextBlock
						variant="landscape"
						title={posts[3]?.title?.rendered}
						imgSrc={posts[3]?._embedded['wp:featuredmedia'][0]['source_url']}
						imageSize="sm:w-64"
						textPosition="bottom"
					/>
				</div>
			</div>

			{/** SECTION-2 */}
			<h1 className="text-[32px]! font-bold text-stone-500 pt-8">Highlights</h1>

			{/** SECTION-3 */}
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