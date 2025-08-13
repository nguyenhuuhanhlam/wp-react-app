import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getLatestPosts } from "@/services/api-client"
import PostBlock from '@/components/wp/post-block'

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
		<div className="w-full py-8">

			{/** SECTION-1 */}
			<div className="flex md:flex-row bg-stone-200">
				<div className="md:w-[50%]">M1</div>
				<div className="md:w-[50%]">M2</div>
			</div>

			{/** SECTION-2 */}
			<div className="flex flex-col md:flex-row">
				<div className="w-full md:w-[70%] bg-slate-100">
					F-News
				</div>

				<div className="w-full md:w-[30%] bg-neutral-50">
					<div className="font-bold">LatestNews</div>
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
			</div>
		</div>
	)
}

export default NewsPage