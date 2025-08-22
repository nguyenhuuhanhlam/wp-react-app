import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

import { getLatestPosts, getPostsByCategory, getCategories } from "@/services/api-client"
import PostsGrid from '@/components/wp/posts-grid'
import ImageTextBlock from '@/components/wp/image-text-block'
import { getFeaturedImage } from '@/lib/helpers'

const HomePage = () => {
	const [postsHDK, setPostsHDK] = useState([])
	const [news, setNews] = useState([])
	const [notices, setNotices] = useState([])
	const [products, setProducts] = useState([])

	const [page, setPage] = useState(2)
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
		getPostsByCategory(36, 5, 1)
			.then(res => {
				setPostsHDK(res)
			})
	}, [])

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			const newPosts = await getPostsByCategory(36, 6, page)
			if (newPosts.length > 0) {
				setNews(prev => [...prev, ...newPosts])
			} else {
				setHasMore(false)
			}
			setLoading(false)
		}
		fetchPosts()
	}, [page])

	useEffect(() => {
		getPostsByCategory(43).then(res => {
			setNotices(res)
		})
	}, [])

	useEffect(() => {
		getPostsByCategory(49, 5).then(res => {
			setProducts(res)
		})
	}, [])

	const handleOnClick = (id, slug) => {
		navigate(`/post/${id}/${slug}`)
	}

	//#region RENDER
	return (
		<div className="bg-white text-black w-full">

			<h1 className="text-[18px]! font-bold text-stone-500 py-4">TOP NEWS</h1>
			<section className="grid grid-cols-1 md:grid-cols-4 gap-8">
				{/* COL 1 */}
				<div className="md:col-span-1 grid grid-rows-2 gap-8">
					<div>
						<ImageTextBlock
							variant="landscape"
							title={postsHDK[0]?.title?.rendered}
							description={postsHDK[0]?.excerpt?.rendered}
							imgSrc={getFeaturedImage(postsHDK[0])}
							imageSize="sm:w-64"
							textPosition="bottom"
						/>
					</div>
					<div>
						<ImageTextBlock
							variant="landscape"
							title={postsHDK[1]?.title?.rendered}
							description={postsHDK[1]?.excerpt?.rendered}
							imgSrc={getFeaturedImage(postsHDK[1])}
							textPosition="bottom"
						/>
					</div>
				</div>

				{/* COL 2 */}
				<div className="md:col-span-2">
					<ImageTextBlock
						variant="landscape"
						title={postsHDK[2]?.title?.rendered}
						description={postsHDK[2]?.excerpt?.rendered}
						imgSrc={getFeaturedImage(postsHDK[2])}
						textPosition="bottom"
					/>
				</div>

				{/* COL 3 */}
				<div className="md:col-span-1 grid grid-rows-2 gap-8">
					<div>
						<ImageTextBlock
							variant="landscape"
							title={postsHDK[3]?.title?.rendered}
							description={postsHDK[3]?.excerpt?.rendered}
							imgSrc={getFeaturedImage(postsHDK[3])}
							textPosition="bottom"
						/>
					</div>
					<div>
						<ImageTextBlock
							variant="landscape"
							title={postsHDK[4]?.title?.rendered}
							description={postsHDK[4]?.excerpt?.rendered}
							imgSrc={getFeaturedImage(postsHDK[4])}
							textPosition="bottom"
						/>
					</div>
				</div>
			</section>

			<h1 className="text-[18px]! font-bold text-stone-500 py-4">EVENTS</h1>
			<section>
				<div>Under construction!</div>
			</section>

			{/* SECTION 3 */}
			<section className="grid grid-cols-1 md:grid-cols-6 gap-8">

				<div className="md:col-span-4">
					<h1 className="text-[18px]! font-bold text-stone-500 py-4">FEATURES</h1>
					<PostsGrid posts={news} columns={2} mobileColumns={1} onClick={handleOnClick} />

					{loading && (
						<div className="flex justify-center mt-6">
							<Spinner className="w-6 h-6 text-gray-700" />
						</div>
					)}

					{hasMore && (
						<div className="text-center mt-8">
							<button
								onClick={() => setPage((prev) => prev + 1)}
								disabled={loading}
								className="px-6 my-4 py-2 bg-neutral-200 hover:bg-neutral-300 transition"
							>
								{loading ? "Loading..." : "Load More"}
							</button>
						</div>
					)}

					{!hasMore && (
						<p className="text-center text-gray-500 py-8">No more posts.</p>
					)}
				</div>

				<div className="md:col-span-2">
					<h1 className="text-[18px]! font-bold text-stone-500 py-4">NOTICES</h1>
					{notices.map(e => {
						return (
							<div
								key={e.id}
								className="hidden sm:block text-sm text-neutral-800 overflow-hidden my-4 pl-2 border-l hover:text-stone-500 cursor-pointer"
								style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
								dangerouslySetInnerHTML={{
									__html: e.title.rendered,
								}}
								onClick={() => handleOnClick(e.id, e.slug)}
							/>
						)
					})}

					<h1 className="text-[18px]! font-bold text-stone-500 py-4">PRODUCTS</h1>
					{products.map(e => {
						return (
							<div key={e.id} className="py-4">
								<ImageTextBlock
									variant="landscape"
									title={e?.title?.rendered}
									description={e?.excerpt?.rendered}
									imgSrc={getFeaturedImage(e)}
									imageSize="sm:w-32"
									textPosition="side"
								/>
							</div>
						)
					})}
				</div>

			</section>
		</div>
	)
}

export default HomePage