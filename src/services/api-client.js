import axios from 'axios'

const api = axios.create({ baseURL: 'https://archihau.edu.vn/wp-json/wp/v2' })

export const getLatestPosts = async () => {
	try {
		const res = await api.get('/posts', {
			params: {
				per_page: 10,
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