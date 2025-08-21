import { Menu, Search } from 'lucide-react'
import HAULogo from '@/assets/hau-logo.svg'

const MiddleBar = () => {
	return (
		<div className="container mx-auto">
			<div className="flex flex-wrap md:flex-nowrap justify-between items-center py-5">
				<div className="flex flex-wrap items-center">
					<a href="/">
						<img src={HAULogo} width={64} />
					</a>
					<span className="pl-4 text-sky-600 text-sm">Faculty of Architecture</span>
				</div>

				<div className="md:grow mt-5 md:mt-0 xl:ml-10.5 md:ml-6 w-full md:w-auto md:block order-3 md:order-2 overflow-x-auto">
					<a href="#" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 mb-2 xl:text-sm text-xs">Tag-1</a>
					<a href="#" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 mb-2 xl:text-sm text-xs">Tag-2</a>
					<a href="#" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 mb-2 xl:text-sm text-xs">Tag-3</a>
				</div>

				<div className="flex-none ml-auto order-2 md:order-3 relative">
					<Menu className="block xl:hidden w-6 h-6 text-gray-700 cursor-pointer" />
					<div className="xl:flex hidden border px-3 py-1 right-9 top-0 -mt-0.5 border-gray-300 overflow-hidden items-center">
						<input type="text" className="outline-0 w-32" placeholder="Search ...." />
						<Search className="ml-2 w-5 h-5 text-gray-400 cursor-pointer" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default MiddleBar