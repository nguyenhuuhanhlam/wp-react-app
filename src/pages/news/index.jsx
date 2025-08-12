import { useEffect, useState } from 'react'
import { getLatestPosts } from "@/services/api-client"
import PostBlock from '@/components/wp/post-block'

const NewsPage = () => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		(async () => {
			const latestPosts = await getLatestPosts()
			setPosts(latestPosts)
		})()
	}, [])

	// return (
	// 	<div>
	// 		{posts.map(post => (
	// 			<article key={post.id}>
	// 				{post.thumbnail && (
	// 					<img src={post.thumbnail} alt={post.title} width="200" />
	// 				)}
	// 				<h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
	// 			</article>
	// 		))}
	// 	</div>
	// )

	return (
		<div>
			{
				posts.map(post => (
					<PostBlock key={post.id} post={post} />
				))
			}
		</div>
	)
}

export default NewsPage