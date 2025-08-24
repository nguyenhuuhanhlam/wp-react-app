import tiktokMonoIcon from '@/assets/tiktok-mono.svg'
import facebookMonoIcon from '@/assets/facebook-mono.svg'
import youtubeMonoIcon from '@/assets/youtube-mono.svg'
import hauLogo from '@/assets/hau-logo.svg'

const Footer = () => {
	return (
		<div className="w-full bg-neutral-900 mt-8">
			<div className="container mx-auto text-neutral-300 py-18 flex justify-between">
				<img src={hauLogo} width={96} />

				<div className="py-2 flex items-center">
					<a className="pr-1" href=""><img src={facebookMonoIcon} width={20} /></a>
					<a className="px-1" href=""><img src={youtubeMonoIcon} width={20} /></a>
					<a className="pl-1" href=""><img src={tiktokMonoIcon} width={20} /></a>
				</div>
			</div>

			<div className="container mx-auto pb-4 flex justify-between">
				<div>
					<a className="pr-6 text-xs border-r text-neutral-500!" href="#">Advertisement</a>
					<a className="px-6 text-xs border-r text-neutral-500!" href="#">Submit Article</a>
					<a className="pl-6 text-xs text-neutral-500!" href="#">Directory</a>
				</div>

				<div className="text-xs text-neutral-500!">© Faculty of Architecture 2025</div>
			</div>
		</div>
	)
}

export default Footer