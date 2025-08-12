'use client'

import { Outlet } from 'react-router-dom'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
} from '@/components/ui/navigation-menu'

const WebLayout = () => {
	return (
		<div className="flex flex-col min-h-screen bg-white">
			<div className="container mx-auto">
				{/** HEAD-1 */}
				<div className="flex flex-col sm:flex-row justify-between sm:items-center">
					<div className="py-1">
						<a className="pr-6 text-xs border-r" href="#">Link 1</a>
						<a className="px-6 text-xs border-r" href="#">Link 2</a>
						<a className="px-6 text-xs border-r" href="#">Link 3</a>
						<a className="px-6 text-xs border-r" href="#">Link 4</a>
						<a className="pl-6 text-xs" href="#">Link 5</a>
					</div>

					<div className="py-1">
						<a className="pr-2 text-xs" href="">Icon 1</a>
						<a className="px-2 text-xs" href="">Icon 2</a>
						<a className="pl-2 text-xs" href="">Icon 3</a>
					</div>
				</div>

				{/** HEAD-2 */}
				<div className="flex flex-wrap md:flex-nowrap justify-between items-center py-5.5">
					<a href="#" className="w-30 md:25 xl:w-50">LOGO</a>
					<div className="md:grow mt-5 md:mt-0 xl:ml-10.5 md:ml-6 w-full md:w-auto md:block order-3 md:order-2 overflow-x-auto">
						<a href="#" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 mb-2 xl:text-sm text-xs">Hastag-1</a>
						<a href="#" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 mb-2 xl:text-sm text-xs">Hastag-2</a>
						<a href="#" className="inline-block px-2 xl:px-4 py-1 xl:py-2 border mr-2 mb-2 xl:text-sm text-xs">Hastag-3</a>
					</div>
				</div>
			</div>

			<div className="w-full"><hr className="border-stone-200" /></div>

			<div className="container mx-auto pt-4 pb-8 text-black">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem className="cursor-pointer">
							<NavigationMenuLink>Home</NavigationMenuLink>
						</NavigationMenuItem>

						<NavigationMenuItem className="cursor-pointer">
							<NavigationMenuLink>News</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			<main className="container mx-auto flex flex-1">
				<Outlet />
			</main>

			<div className="w-full flex justify-center text-black">
				<div>FOOTER</div>
			</div>
		</div>
	)
}

export default WebLayout