import { Link } from 'react-router-dom'
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

const NavigationBar = () => {
	return (
		<div className="container mx-auto py-4">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem className="cursor-pointer">
						<NavigationMenuLink
							asChild
							className="p-0 hover:bg-transparent hover:text-stone-500! data-[state=open]:bg-transparent focus:bg-transparent"
						>
							<Link to="/">Trang Chủ</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>

					{/* <NavigationMenuItem className="cursor-pointer">
						<NavigationMenuLink
							asChild
							className="p-0 hover:bg-transparent hover:text-stone-500! data-[state=open]:bg-transparent focus:bg-transparent"
						>
							<Link to="/news" className="pl-4">News</Link>
						</NavigationMenuLink>
					</NavigationMenuItem> */}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}

export default NavigationBar