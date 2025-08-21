'use client'

import { Outlet } from 'react-router-dom'

import TopBar from './components/top-bar'
import MiddleBar from './components/middle-bar'
import NavigationBar from './components/navigation-bar'
import HAULogo from '@/assets/hau-logo.svg'

const WebLayout = () => {

	return (
		<div className="w-full flex flex-col min-h-screen">

			<TopBar />
			<MiddleBar />

			<div className="w-full"><hr className="border-stone-200" /></div>

			<NavigationBar />

			<main className="container mx-auto flex flex-1">
				<Outlet />
			</main>

			<div className="w-full bg-neutral-900 mt-8">
				<div className="container mx-auto text-neutral-300 py-18">
					<img src={HAULogo} width={96}/>
				</div>
			</div>
		</div>
	)
}

export default WebLayout