import { useTranslations } from 'next-intl'
import Link from 'next/link'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'
import { ChannelAvatar } from '@/components/ui/elements/ChannelAvatar'
import { Hint } from '@/components/ui/elements/Hint'

import {
	type FindChannelByUsernameQuery,
	useFindSponsorsByChannelQuery
} from '@/graphql/generated/output'

interface ChannelSponsorsProps {
	channel: FindChannelByUsernameQuery['findChannelByUsername']
}

export function ChannelSponsors({ channel }: ChannelSponsorsProps) {
	const t = useTranslations('stream.sponsors')

	const { data, loading: isLoadingSponsors } = useFindSponsorsByChannelQuery({
		variables: {
			channelId: channel.id
		}
	})
	const sponsors = data?.findSponsorsByChannel ?? []

	if (!sponsors.length || isLoadingSponsors) return null

	return (
		<Card className='mt-6 rounded-2xl shadow-md'>
			<CardHeader className='border-b p-5'>
				<CardTitle className='text-xl font-bold'>
					{t('heading')} {channel.displayName}
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-wrap gap-4 p-5'>
				{sponsors.map(sponsor => (
					<Link
						key={sponsor.user.id}
						href={`/${sponsor.user.username}`}
						className='transition-transform hover:scale-105'
					>
						<Hint label={sponsor.user.displayName}>
							{' '}
							<ChannelAvatar channel={sponsor.user} size='lg' />
						</Hint>
					</Link>
				))}
			</CardContent>
		</Card>
	)
}
