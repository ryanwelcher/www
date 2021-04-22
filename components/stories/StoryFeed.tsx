import NextLink from 'next/link'
import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { storyImage, storyCite } from './model'

export default function StoryFeed({ stories }) {
  return (
    <Stack as="main" spacing={6} p={4}>
      {stories.map((story) => (
        <StorySummary key={story.id} story={story} />
      ))}
    </Stack>
  )
}

function StorySummary({ story }) {
  const href = `/story/${story.id}`

  return (
    <Box as="article">
      <NextLink href={`${href}?back=true`} as={href}>
        <Link _hover={{ textDecoration: 'none' }}>
          <Box
            borderRadius="8px"
            bgImage={storyImage(story)}
            bgSize="cover"
            bgPosition="center"
            color="white"
          >
            <Box py={4} px={6} bg="rgba(0, 0, 0, 0.5)">
              <Heading
                as="h2"
                mb={4}
                minH="6rem"
                fontSize="2xl"
                fontWeight={600}
                fontStyle="italic"
                noOfLines={3}
                _before={{ content: `"“"` }}
                _after={{ content: `"”"` }}
              >
                {story.title}
              </Heading>
              <Text>{storyCite(story)}</Text>
            </Box>
          </Box>

          <Heading as="h3" mt={2} color="#333333" fontSize="md" fontWeight={700}>
            Read Story
          </Heading>
        </Link>
      </NextLink>
    </Box>
  )
}
