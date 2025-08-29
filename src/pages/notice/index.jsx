import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPosts } from '@/services/api-client'

const NoticePage = () => {
	const [notices, setNotices] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		getPosts({ categoryId: 43 })
			.then(res => setNotices(res))
	}, [])

	const handleOnClick = (id, slug) => {
		navigate(`/post/${id}/${slug}`)
	}

	return (
		<div>
			<h1 className="text-[18px]! font-bold text-stone-500 py-8">THÔNG BÁO</h1>
			{notices.map((e, k) => {
				return (
					<div
						className="flex items-center"
						key={k}
					>
						<div>{k}</div>
						<div
							key={e.id}
							className="hidden sm:block text-sm text-neutral-800 overflow-hidden my-2 pl-2 border-l hover:text-stone-500 cursor-pointer"
							style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
							dangerouslySetInnerHTML={{
								__html: e.title.rendered,
							}}
							onClick={() => handleOnClick(e.id, e.slug)}
						/>
					</div>
				)
			})}
		</div>
	)
}

export default NoticePage