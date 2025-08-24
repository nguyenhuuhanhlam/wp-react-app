'use client'

import { Outlet } from 'react-router-dom'

import TopBar from './components/top-bar'
import MiddleBar from './components/middle-bar'
import NavigationBar from './components/navigation-bar'
import Footer from './components/footer'


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

			<Footer />
		</div>
	)
}

export default WebLayout