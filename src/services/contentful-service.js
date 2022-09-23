// Modules
import { createClient } from 'contentful'

const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE_ID,
})

const getPageContent = async entryId => {
  const content = await client.getEntry(entryId)
  return content.fields
}

export { getPageContent }
