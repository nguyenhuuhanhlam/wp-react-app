// import { Menu, Search } from 'lucide-react'
// import HAULogo from '@/assets/hau-logo.svg'

// const MiddleBar = () => {
// 	return (
// 		<div className="container mx-auto">
// 			<div className="flex flex-wrap md:flex-nowrap justify-between items-center py-5">
// 				<div className="flex flex-wrap items-center">
// 					<a href="/">
// 						<img src={HAULogo} width={64} />
// 					</a>
// 					<span className="pl-4 text-sky-600 text-sm">Faculty of Architecture</span>
// 				</div>

// 				<div className="md:grow mt-5 md:mt-0 xl:ml-10.5 md:ml-6 w-full md:w-auto md:block order-3 md:order-2 overflow-x-auto">
// 					<a href="#" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 xl:text-sm text-xs">#tập huấn</a>
// 					<a href="#" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 xl:text-sm text-xs">#sự kiện</a>
// 					{/* <a href="/notices" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 xl:text-sm text-xs">#thông báo</a> */}
// 				</div>

// 				<div className="flex-none ml-auto order-2 md:order-3 relative">
// 					<Menu className="block xl:hidden w-6 h-6 text-gray-700 cursor-pointer" />
// 					<div className="xl:flex hidden border px-3 py-1 right-9 top-0 -mt-0.5 border-gray-300 overflow-hidden items-center">
// 						<input type="text" className="outline-0 w-32" placeholder="Search ...." />
// 						<Search className="ml-2 w-5 h-5 text-gray-400 cursor-pointer" />
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default MiddleBar




'use client'

import { useState, useCallback, useMemo, memo } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import HAULogo from '@/assets/hau-logo.svg'

/* Nếu bạn dùng Shadcn UI sheet component */
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

const MiddleBar = () => {
	const [sheetOpen, setSheetOpen] = useState(false)

	// Menu / Nav items - memoized để không tạo lại mỗi render
	const NAV_ITEMS = useMemo(() => ([
		{ key: 'home', to: '/', label: 'Trang Chủ' },
		{ key: 'notices', to: '/notices', label: 'Thông Báo' },
		{ key: 'contact', to: '/contact', label: 'Liên Hệ' },
	]), [])

	const handleCloseSheet = useCallback(() => setSheetOpen(false), [])

	return (
		<div className="container mx-auto px-4">
			<div className="flex items-center gap-4 py-5">

				{/* LEFT: Logo + short title */}
				<div className="flex items-center flex-shrink-0">
					<Link to="/" aria-label="Home">
						<img src={HAULogo} alt="HAU Logo" className="w-16" />
					</Link>
					<span className="pl-4 text-sky-600 text-sm hidden sm:inline">Faculty of Architecture</span>
				</div>

				{/* CENTER: tags (scrollable horizontally on small screens) */}
				<div className="flex-1 overflow-x-auto whitespace-nowrap px-2">
					<div className="inline-flex items-center gap-2">
						<a href="#" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 xl:text-sm text-xs">#tập huấn</a>
						<a href="#" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 xl:text-sm text-xs">#sự kiện</a>
						{/* thêm tag khác nếu cần */}
					</div>
				</div>

				{/* RIGHT: on desktop -> search box; on mobile -> hamburger (Sheet) */}
				<div className="flex items-center gap-3 ml-auto">

					{/* Desktop search: only visible on xl and above */}
					<div className="hidden xl:flex items-center border px-3 py-1 border-gray-300 rounded">
						<label className="sr-only" htmlFor="site-search">Search</label>
						<input
							id="site-search"
							type="text"
							className="outline-0 w-48 bg-transparent"
							placeholder="Search ...."
							aria-label="Search site"
						/>
						<Search className="ml-2 w-5 h-5 text-gray-600 cursor-pointer" />
					</div>

					{/* Mobile menu (hamburger) */}
					<div className="xl:hidden">
						<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
							<SheetTrigger asChild>
								<button
									aria-label="Open menu"
									className="p-1 rounded-md"
									type="button"
								>
									<Menu className="w-6 h-6 text-gray-700" />
								</button>
							</SheetTrigger>

							<SheetContent side="bottom">
								<nav className="mt-4 space-y-2 pb-6">
									{NAV_ITEMS.map(item => (
										<Link
											key={item.key}
											to={item.to}
											onClick={handleCloseSheet}
											className="block text-base px-2"
										>
											{item.label}
										</Link>
									))}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(MiddleBar)
