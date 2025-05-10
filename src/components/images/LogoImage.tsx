export function LogoImage() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			viewBox='0 0 2400 2800'
			xmlSpace='preserve'
			width={56}
			height={56}
		>
			<title>Logo</title>
			<g>
				<path
					className='fill-primary'
					d='M400,800c0-110.5,89.5-200,200-200h1200c110.5,0,200,89.5,200,200v1200c0,110.5-89.5,200-200,200H600
				c-110.5,0-200-89.5-200-200V800z'
				/>

				<polygon
					className='fill-white'
					points='1050,1050 1050,1750 1650,1400'
				/>
			</g>
		</svg>
	)
}
