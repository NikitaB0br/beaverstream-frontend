import { Share } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FaOdnoklassniki, FaTelegram, FaVk, FaWhatsapp } from 'react-icons/fa'
import {
	OKShareButton,
	TelegramShareButton,
	VKShareButton,
	WhatsappShareButton
} from 'react-share'

import { Button } from '@/components/ui/common/Button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/common/Popover'

import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'

interface ShareActionsProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function ShareActions({ channel }: ShareActionsProps) {
	const t = useTranslations('stream.actions.share')

	const shareUrl = `${window.location.origin}/${channel.username}`

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant='ghost' size='lgIcon'>
					<Share className='size-5' />
				</Button>
			</PopoverTrigger>
			<PopoverContent side='top' className='w-[300px]'>
				<h2 className='font-medium'>{t('heading')}</h2>
				<div className='mt-4 grid grid-cols-4 gap-3'>
					<TelegramShareButton url={shareUrl}>
						<div className='flex h-14 items-center justify-center rounded-md bg-sky-500 transition-transform hover:-translate-y-1.5'>
							<FaTelegram className='size-7 text-white' />
						</div>
					</TelegramShareButton>
					<WhatsappShareButton url={shareUrl}>
						<div className='flex h-14 items-center justify-center rounded-md bg-green-500 transition-transform hover:-translate-y-1.5'>
							<FaWhatsapp className='size-7 text-white' />
						</div>
					</WhatsappShareButton>
					<VKShareButton url={shareUrl}>
						<div className='flex h-14 items-center justify-center rounded-md bg-sky-700 transition-transform hover:-translate-y-1.5'>
							<FaVk className='size-7 text-white' />
						</div>
					</VKShareButton>
					<OKShareButton url={shareUrl}>
						<div className='flex h-14 items-center justify-center rounded-md bg-orange-600 transition-transform hover:-translate-y-1.5'>
							<FaOdnoklassniki className='size-7 text-white' />
						</div>
					</OKShareButton>
				</div>
			</PopoverContent>
		</Popover>
	)
}
