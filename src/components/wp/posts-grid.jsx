import { getFeaturedImage } from '@/lib/helpers'

const PostsGrid = ({ posts = [], columns = 3, mobileColumns = 1, onClick = () => { } }) => {
  // luôn bắt đầu với mobileColumns
  let gridCols = `grid grid-cols-${mobileColumns} gap-8`

  // breakpoints cho tablet / desktop
  if (columns === 2) {
    gridCols += " sm:grid-cols-2"
  } else if (columns === 3) {
    gridCols += " sm:grid-cols-2 md:grid-cols-3"
  } else if (columns === 4) {
    gridCols += " sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  }

  return (
    <div className={gridCols}>
      {posts.map((post) => {
        const featuredImage = getFeaturedImage(post)

        return (
          <div
            key={post.id}
            className="overflow-hidden hover:text-stone-500 transition cursor-pointer"
            onClick={() => onClick(post.id, post.slug)}
          >
            {featuredImage && (
              <img
                src={featuredImage}
                alt={post.title.rendered}
                className="w-full h-32 sm:h-64 object-cover"
              />
            )}
            <div>
              <h2
                className="text-lg font-semibold mb-2 mt-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <div
                className="hidden sm:block text-sm text-gray-500 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PostsGrid
