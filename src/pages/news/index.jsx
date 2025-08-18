import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getLatestPosts, getPostsByCategory } from "@/services/api-client"
import PostsGrid from '@/components/wp/posts-grid'
import ImageTextBlock from '@/components/wp/image-text-block'
import { getFeaturedImage } from '@/lib/helpers'

const NewsPage = () => {
	const [posts, setPosts] = useState([])
	const [highlights, setHighlights] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			const latestPosts = await getLatestPosts()
			setPosts(latestPosts)
		})()
	}, [])

	useEffect(() => {
		(async () => {
			// HAU = 34 // BTP = 14
			const highlights = await getPostsByCategory(34, 3)
			setHighlights(highlights)
		})()
	}, [])

	const handleOnClick = (id, slug) => {
		navigate(`/news/${id}/${slug}`)
	}

	return (
		<div className="w-full pt-4">
			{/** SECTION-1 */}
			<h1 className="text-[32px]! font-bold text-stone-500">SECTION 1</h1>
			<div className="flex flex-col md:flex-row my-4 gap-8">

				<div className="w-full md:w-[65%] md:px-0 bg-stone-50">
					<ImageTextBlock
						variant="landscape"
						title={posts[0]?.title?.rendered}
						imgSrc={getFeaturedImage(posts[0])}
						imageSize="sm:w-64"
						textPosition="bottom"
					/>
				</div>

				<div className="w-full flex flex-col gap-8 md:w-[35%] bg-stone-50">
					<ImageTextBlock
						variant="landscape"
						title={posts[1]?.title?.rendered}
						imgSrc={getFeaturedImage(posts[1])}
						imageSize="sm:w-64"
						textPosition="bottom"
					/>
					<ImageTextBlock
						variant="landscape"
						title={posts[2]?.title?.rendered}
						imgSrc={getFeaturedImage(posts[2])}
						imageSize="sm:w-64"
						textPosition="bottom"
					/>
				</div>

			</div>

			{/** SECTION-2 */}
			<h1 className="text-[32px]! font-bold text-stone-500">SECTION 2</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
				{
					highlights.map(e => {
						return (
							<ImageTextBlock
								variant="landscape"
								title={e?.title?.rendered}
								imgSrc={getFeaturedImage(e)}
								imageSize="sm:w-64"
								textPosition="bottom"
							/>
						)
					})
				}
			</div>

			{/** SECTION-3 */}
			<h1 className="text-[32px]! font-bold text-stone-500">SECTION 3</h1>
			<div className="py-8">
				<PostsGrid posts={posts} columns={3} mobileColumns={2} onClick={handleOnClick} />
			</div>
		</div>
	)
}

export default NewsPage