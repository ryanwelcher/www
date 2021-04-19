import Head from 'next/head'
import styles from '../styles/Home.module.css'
import landing from '../styles/LandingPage.module.css'
import prisma from '../lib/prisma'

import Footer from '../components/footer'
import { Box, Button, Heading, Link, Text } from '@chakra-ui/react'

export default function Home({ feed }) {
  if (process.env.NODE_ENV === 'production') {
    const title = "My Covid Story | Every number has a story"
    const description = "Every covid number has a story which deserves to be shared"
    const previewImage = "https://www.mycovidstory.ca/img/landingpage-v2.jpg"
    return (
      <div className={landing.container}>
        <Head>
          <title>{title}</title>
          <meta
            name="description"
            content={description}
          />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={previewImage} />

          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={previewImage} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <div className={landing.background} />
        <main className={landing.main}>
          <Box>
            <Heading className={landing.heading} as="h1" size="3xl">
              My Covid Story
            </Heading>
            <Text>Every number has a story</Text>
          </Box>
          <Box>
            <Heading size="xl">Coming Soon</Heading>
            <Text className={landing.blurb}>
              We are a group of concerned citizens who could no longer stand by as Ontario is led
              into a humanitarian crisis. We believe the power of storytelling is an effective means
              to drive government action.
            </Text>
          </Box>
          <Box>
            <Link
              href="https://kvmhxg5ojy6.typeform.com/to/gUsoYkft"
              rel="noopener"
              style={{ display: 'inline-block' }}
            >
              <Button variant="solid">Media Sign-Up</Button>
            </Link>
          </Box>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>My Covid Story</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Share your Covid Story</h1>
        <div className={styles.storyContainer}>
          <h3>Latest stories</h3>
          {feed.map((story) => (
            <pre key={story.id}>
              <ul>
                <li>id: {story.id}</li>
                <li>content: {story.content}</li>
                <li>postal: {story.postal}</li>
                <li>approved: {story.approved}</li>
                <li>email: {story.email}</li>
                <li>twitter: {story.twitter}</li>
              </ul>
            </pre>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const feed = await prisma.story.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'asc' },
  })

  return {
    props: { feed },
  }
}
