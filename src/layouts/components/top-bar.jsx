import tiktokIcon from '@/assets/tiktok.svg'
import facebookIcon from '@/assets/facebook.svg'
import youtubeIcon from '@/assets/youtube.svg'

const TopBar = () => {
	return (
		<div className="container mx-auto">
			<div className="flex flex-col sm:flex-row justify-between sm:items-center">
				<div className="py-2">
					<a className="pr-6 text-xs border-r" title="advertisement" href="#">Quảng Cáo</a>
					<a className="px-6 text-xs border-r" href="#submit-article">Gửi Bài</a>
					<a className="pl-6 text-xs" href="#">Danh Bạ</a>
				</div>

				<div className="py-2 flex items-center">
					<a className="pr-1" href=""><img src={facebookIcon} width={20} /></a>
					<a className="px-1" href=""><img src={youtubeIcon} width={20} /></a>
					<a className="pl-1" href=""><img src={tiktokIcon} width={20} /></a>
				</div>
			</div>
		</div>
	)
}

export default TopBar