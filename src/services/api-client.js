import axios from 'axios'

// const api = axios.create({ baseURL: 'https://buithanhphap.com/wp-json/wp/v2' })
const api = axios.create({ baseURL: 'https://archihau.edu.vn/wp-json/wp/v2' })

export const getLatestPosts = async (per_page = 10) => {
	try {
		const res = await api.get('/posts', {
			params: {
				per_page,
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