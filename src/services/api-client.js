import axios from 'axios'

// const api = axios.create({ baseURL: 'https://buithanhphap.com/wp-json/wp/v2' })
const api = axios.create({ baseURL: 'https://archihau.edu.vn/wp-json/wp/v2' })

export const getLatestPosts = async (per_page = 10, page = 1) => {
	try {
		const res = await api.get('/posts', {
			params: {
				per_page,
				page,
				orderby: 'date',
				order: 'desc',
				_embed: true
			}
		})

		return res.data

	} catch (error) {
		console.error('ERROR ::', error)
		return []
	}
}

export const getStickyPosts = async () => await api.get()

export const getPostsByCategory = async (category_id, limit = 5, page = 1) => {
	try {
		const res = await api.get(`/posts`, {
			params: {
				categories: category_id, // lọc theo category ID
				per_page: limit,        // giới hạn số post
				page: page,             // phân trang
				orderby: "date",        // sắp xếp theo ngày
				order: "desc",          // mới nhất trước
				// _fields: "id,title,excerpt,link", // chỉ lấy field cần thiết
				_embed: true
			}
		})

		return res.data
	} catch (error) {
		console.error('ERROR ::', error)
		return []
	}
}

export const getPostDetail = async (post_id) => {
	const res = await api.get(`/posts/${post_id}`,{params:{_embed:true}})
	return res.data
}

export const getCategories = async () => {
	const res = await api.get('/categories')
	return res.data
}