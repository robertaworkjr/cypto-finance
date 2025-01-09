import { supabase } from '../../src/lib/supabase'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { title, content, category, author } = JSON.parse(event.body)

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          content,
          category,
          author,
          created_at: new Date(),
        }
      ])
      .select()

    if (error) throw error

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}

</bolt