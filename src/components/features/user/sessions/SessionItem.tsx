import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import { CardContainer } from '@/components/ui/elements/CardContainer'
import { ConfirmModal } from '@/components/ui/elements/ConfirmModal'

import {
	type FindSessionsByUserQuery,
	useFindSessionsByUserQuery,
	useRemoveSessionMutation
} from '@/graphql/generated/output'

import { getBrowserIcon } from '@/utils/get-browser-icon'

import { SessionModal } from './SessionModal'

interface SessionItemProps {
	session: FindSessionsByUserQuery['findSessionsByUser'][0]
	isCurrentSession?: boolean
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
	const t = useTranslations('dashboard.settings.sessions.sessionItem')

	const { refetch } = useFindSessionsByUserQuery()

	const [remove, { loading: isLoadingRemove }] = useRemoveSessionMutation({
		onCompleted() {
			refetch()
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const browser = session?.metadata?.device?.browser ?? 'Unknown browser'
	const os = session?.metadata?.device?.os ?? 'Unknown OS'
	const country = session?.metadata?.location?.country ?? 'Unknown country'
	const city = session?.metadata?.location?.city ?? 'Unknown city'
	const Icon = getBrowserIcon(browser)

	return (
		<CardContainer
			heading={`${browser}, ${os}`}
			description={`${country}, ${city}`}
			Icon={Icon}
			rightContent={
				<div className='flex items-center gap-x-4'>
					{!isCurrentSession && (
						<ConfirmModal
							heading={t('confirmModal.heading')}
							message={t('confirmModal.message')}
							onConfirm={() =>
								remove({ variables: { id: session.id } })
							}
						>
							<Button
								variant='secondary'
								disabled={isLoadingRemove}
							>
								{t('deleteButton')}
							</Button>
						</ConfirmModal>
					)}
					<SessionModal session={session}>
						<Button>{t('detailsButton')}</Button>
					</SessionModal>
				</div>
			}
		/>
	)
}
