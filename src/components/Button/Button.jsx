import { useMemo, forwardRef } from 'react'
import cx from 'clsx'

import styles from './Button.module.css'
import { NavLink } from 'react-router'

const Button = forwardRef((props, ref) => {
	const {
		children,
		onClick,
		asLink,
		href,
		isSubmit = false,
		rounded,
		shine,
	} = props

	const buttonStyles = useMemo(
		() =>
			cx({
				[styles.button]: true,
				[styles.rounded]: rounded,
				[styles.shine]: shine,
			}),
		[rounded, shine],
	)

	return asLink ? (
		<NavLink
			ref={ref}
			to={href}
			className={`${buttonStyles} ${styles.link}`}
			viewTransition
		>
			{children}
		</NavLink>
	) : (
		<button
			ref={ref}
			type={isSubmit ? 'submit' : 'button'}
			onClick={onClick}
			className={buttonStyles}
		>
			{children}
		</button>
	)
})

export default Button
