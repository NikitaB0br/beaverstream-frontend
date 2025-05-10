'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/common/Button'
import { Skeleton } from '@/components/ui/common/Skeleton'
import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar'
import { ChannelVerified } from '@/components/ui/elements/ChannelVerified'
import { Hint } from '@/components/ui/elements/Hint'
import { LiveBadge } from '@/components/ui/elements/LiveBadge'

import { FindRecommendedChannelsQuery } from '@/graphql/generated/output'

import { useSidebar } from '@/hooks/useSidebar'

import { cn } from '@/utils/tw-merge'

interface ChannelItemProps {
	channel: FindRecommendedChannelsQuery['findRecommendedChannels'][0]
}

export function ChannelItem({ channel }: ChannelItemProps) {
	const pathname = usePathname()
	const { isCollapsed } = useSidebar()

	const isActive = pathname === `/${channel.username}`

	return isCollapsed ? (
		<Hint label={channel.username} side='right' asChild>
			<Link
				href={`/${channel.username}`}
				className='mt-3 flex w-full items-center justify-center'
			>
				<ChannelAvatar
					channel={channel}
					isLive={channel.stream.isLive}
				/>
			</Link>
		</Hint>
	) : (
		<Button
			className={cn(
				'mt-2 h-11 w-full justify-start',
				isActive && 'bg-accent'
			)}
			variant='ghost'
			asChild
		>
			<Link
				href={`/${channel.username}`}
				className='relative flex w-full items-center gap-x-3 overflow-hidden'
			>
				<ChannelAvatar
					size='sm'
					channel={channel}
					isLive={channel.stream.isLive}
				/>
				<div className='flex min-w-0 flex-1 items-center gap-x-1'>
					<span className='truncate whitespace-nowrap text-sm text-foreground'>
						{channel.username}
					</span>
					{channel.isVerified && <ChannelVerified size='sm' />}
				</div>
				{channel.stream.isLive && (
					<div className='ml-auto'>
						<LiveBadge />
					</div>
				)}
			</Link>
		</Button>
	)
}

export function ChannelItemSkeleton() {
	return <Skeleton className='mt-3 h-11 w-full rounded-full' />
}
