import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

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
		<section className="grid grid-cols-1 md:grid-cols-6 gap-8">

			<div className="col-span-2 md:col-span-4">
				<h1 className="text-[18px]! font-bold text-stone-500 py-8">THÔNG BÁO</h1>
				{notices.map((e, k) => {
					return (
						<div
							className="flex items-center"
							key={k}
						>
							<div className="pr-4 text-xs text-neutral-500 min-w-[90px] ">{dayjs(e.date).format('DD-MM-YYYY')}</div>
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

			<div className="col-span-1 md:col-span-2">
				<h1 className="text-[18px]! font-bold text-stone-500 py-8">COL2</h1>
			</div>
		</section>
	)
}

export default NoticePage