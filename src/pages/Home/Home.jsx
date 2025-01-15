import Button from '@/components/Button'
import Logo from '@/components/Logo'

import dogScanImg from '@/assets/dog-scan.png'

import styles from './Home.module.css'

function Home() {
	return (
		<div className={styles.container}>
			<main className={styles.heroContainer}>
				<Logo className={styles.heroLogo} />
				<section className={styles.hero}>
					<h1>Dog breed Image Recognition.</h1>
					<p>
						Recognize over 100 dog breeds by image using Tensorflow.js and
						Teachable Machine.
					</p>
					<Button href="/dash" asLink rounded>
						Get started
					</Button>
				</section>
			</main>
			<aside>
				<figure>
					<img src={dogScanImg} alt="dog" />
				</figure>
			</aside>
		</div>
	)
}

export default Home
