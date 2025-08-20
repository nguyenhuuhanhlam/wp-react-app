import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

import { getLatestPosts, getPostsByCategory } from "@/services/api-client"
import PostsGrid from '@/components/wp/posts-grid'
import ImageTextBlock from '@/components/wp/image-text-block'
import { getFeaturedImage } from '@/lib/helpers'

const NewsPage = () => {
	const [posts, setPosts] = useState([])
	const [highlights, setHighlights] = useState([])

	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const [observerSupported, setObserverSupported] = useState(true)
	const observer = useRef(null)

	const navigate = useNavigate()

	const lastPostRef = useCallback((node) => {
		if (!observerSupported) return
		if (loading) return
		if (observer.current) observer.current.disconnect()

		try {
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPage((prev) => prev + 1)
				}
			})
			if (node) observer.current.observe(node)
		} catch (err) {
			console.warn("IntersectionObserver not supported, fallback to button")
			setObserverSupported(false)
		}
	}, [loading, hasMore, observerSupported])


	useEffect(() => {
		(async () => {
			const highlights = await getPostsByCategory(34, 3)
			setHighlights(highlights)
		})()
	}, [])

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			const newPosts = await getLatestPosts(6, page)
			if (newPosts.length > 0) {
				setPosts((prev) => [...prev, ...newPosts])
			} else {
				setHasMore(false)
			}
			setLoading(false)
		}
		fetchPosts()
	}, [page])

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

				{loading && (
					<div className="flex justify-center mt-6">
						<Spinner className="w-6 h-6 text-gray-700" />
					</div>
				)}

				{observerSupported && hasMore && <div ref={lastPostRef} className="h-10" />}

				{!observerSupported && hasMore && (
					<div className="text-center mt-8">
						<button
							onClick={() => setPage((prev) => prev + 1)}
							disabled={loading}
							className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
						>
							{loading ? "Loading..." : "Load More"}
						</button>
					</div>
				)}

				{!hasMore && (
					<p className="text-center text-gray-500 mt-4">No more posts.</p>
				)}

			</div>
		</div>
	)
}

export default NewsPage