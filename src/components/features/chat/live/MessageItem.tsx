import { Crown, Medal } from 'lucide-react'

import { Hint } from '@/components/ui/elements/Hint'

import { FindChatMessagesByStreamQuery } from '@/graphql/generated/output'

import { stringToColor } from '@/utils/color'

interface MessageItemProps {
	message: FindChatMessagesByStreamQuery['findChatMessagesByStream'][0]
	isSponsor: boolean
	isOwner: boolean
}

export function MessageItem({ message, isSponsor, isOwner }: MessageItemProps) {
	const color = stringToColor(message.user.username ?? '')

	const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	})

	return (
		<div className='flex gap-2 rounded-md p-2 hover:bg-accent'>
			<p className='text-sm text-muted-foreground'>{formattedTime}</p>
			<div className='flex grow flex-wrap items-baseline gap-1'>
				<div className='flex items-center whitespace-nowrap text-sm font-semibold'>
					<span className='truncate' style={{ color }}>
						{message.user.username}
					</span>
					{isOwner && (
						<Hint label='Владелец канала' side='top' asChild>
							<Crown
								className='ml-1 size-3.5 text-yellow-500'
								strokeWidth={2}
							/>
						</Hint>
					)}
					{isSponsor && !isOwner && (
						<Hint label='Спонсор канала' side='top' asChild>
							<Medal className='ml-1 size-3.5 text-blue-500' />
						</Hint>
					)}
				</div>
				<p className='break-all text-sm'>{message.text}</p>
			</div>
		</div>
	)
}
