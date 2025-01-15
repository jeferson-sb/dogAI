import { Link } from 'react-router-dom'

import Logo from '@/components/Logo'
import FormUpload from '@/components/FormUpload/FormUpload'

import styles from './Dashboard.module.css'

function Dashboard() {
	return (
		<main className={styles.container}>
			<Link to="/" className={styles.link}>
				<Logo className={styles.dashboardLogo} />
			</Link>
			<FormUpload />
		</main>
	)
}

export default Dashboard
