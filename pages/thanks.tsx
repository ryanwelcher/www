import { ReactNode, useEffect } from 'react'
import { Button, Center, Container, Heading, Icon, Link, Text, VStack } from '@chakra-ui/react'

import BlankLayout from '../layouts/Blank'

const Thanks = () => {
  // Triggers a Story goal event on Fathom
  useEffect(() => {
    window?.fathom?.trackGoal('RT0FH11Y', 0)
  }, [])

  return (
    <Container pt="32">
      <Center>
        <Heading as="h1" size="lg" pb="8">
          Thank you for your story
        </Heading>
      </Center>
      <VStack spacing="12px" align="left">
        <Text>
          <strong>Thank you for submitting your story.</strong> We will amplify your story to engage
          decision-makers and drive effective government policy with science-based practices that
          will save lives.
        </Text>
        <Text>It may take 24-48 hours for your story to appear on the site.</Text>
        <Text>
          If you selected that you are willing to be contacted by the media, they may reach out to
          you with the contact information that you provided.
        </Text>
        <Text>
          {' '}
          If you have any questions, reach out to{' '}
          <a style={{ fontWeight: 'bold', color: '#55099D' }} href="mailto:info@mycovidstory.ca">
            info@mycovidstory.ca
          </a>
          .
        </Text>
      </VStack>
      <VStack pt="8" align="center" spacing={8}>
        <Heading as="h2" size="md">
          Spread the word
        </Heading>
        <Link href="https://twitter.com/MyCOVIDStory_CA" isExternal>
          <Button color="white" leftIcon={<TwitterIcon />}>
            Share @MyCOVIDStory_CA
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="sm">
            Return to Stories
          </Button>
        </Link>
      </VStack>
    </Container>
  )
}

const TwitterIcon = () => (
  <Icon
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    aria-hidden="true"
    focusable="false"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
  </Icon>
)

const ThanksLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Thanks.getLayout = ThanksLayout

export default Thanks
