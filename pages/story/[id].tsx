import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { list, get } from '../../lib/api/stories'
import StoryDetail from '../../components/stories/StoryDetail'
import Footer, { FooterSpace, Button } from '../../components/common/Footer'

export default function StoryPage() {
  const router = useRouter()
  const id = router.query.id as string

  // If we came from the feed, go back on cancel. If not, navigate forward to the feed.
  function handleCancel() {
    router.query.back === 'true' ? router.back() : router.push('/feed')
  }

  return (
    <Box>
      <StoryDetail id={id} onCancel={handleCancel} />
      <FooterSpace />
      <Footer>
        <Button>Share This Story</Button>
      </Footer>
    </Box>
  )
}

// Return the latest story IDs to pre-render those pages on the server with getStaticProps().
// If a page with another ID is requested, getStaticProps() will be called to fetch the data.
// The page will be rendered on the server, and the page will be cached for future requests.
// Details: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
//
export async function getStaticPaths() {
  const stories = await list()
  const paths = stories.map((s) => ({ params: { id: s.id } }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const story = await get(params.id)
  return { props: { story } }
}
