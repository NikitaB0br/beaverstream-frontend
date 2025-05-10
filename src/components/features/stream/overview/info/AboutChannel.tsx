import { useTranslations } from 'next-intl'
import Link from 'next/link'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'
import { Skeleton } from '@/components/ui/common/Skeleton'

import type { FindChannelByUsernameQuery } from '@/graphql/generated/output'

import { getSocialIcon } from '@/utils/get-social-icon'
import { pluralize } from '@/utils/pluralize'

interface AboutChannelProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function AboutChannel({ channel }: AboutChannelProps) {
	const t = useTranslations('stream.aboutChannel')

	return (
		<Card className='mt-6'>
			<CardHeader className='p-4'>
				<CardTitle className='text-xl'>
					{t('heading')} {channel.displayName}
				</CardTitle>
			</CardHeader>
			<CardContent className='-mt-1 space-y-2 px-4'>
				<div className='text-[15px] text-foreground'>
					<span className='font-semibold'>
						{channel.followings.length}
					</span>{' '}
					{pluralize(
						channel.followings.length,
						t('followerSingular'),
						t('followerFew'),
						t('followerPlural')
					)}
				</div>
				<div className='text-[15px] text-muted-foreground'>
					{channel.bio ?? t('noDescription')}
				</div>
				{channel.socialLinks.length > 0 && (
					<div className='flex flex-wrap gap-2 pt-1'>
						{channel.socialLinks.map(socialLink => {
							const Icon = getSocialIcon(socialLink.url)
							return (
								<Link
									key={socialLink.url}
									href={socialLink.url}
									target='_blank'
									className='inline-flex max-w-fit items-center gap-1 rounded-md bg-muted px-2 py-1.5 text-sm text-foreground transition hover:bg-accent hover:text-accent-foreground'
								>
									<Icon className='size-4' />
									<span>{socialLink.title}</span>
								</Link>
							)
						})}
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export function AboutChannelSkeleton() {
	return <Skeleton className='mt-6 h-36 w-full' />
}
