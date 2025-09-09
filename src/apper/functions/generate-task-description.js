import { apper } from "apper";

apper.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({
      success: false,
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const { title } = await req.json()
    
if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Task title is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const apiKey = await apper.getSecret('OPENAI_API_KEY')
if (!apiKey) {
      return new Response(JSON.stringify({
        success: false,
        error: 'AI service temporarily unavailable'
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates concise, actionable task descriptions. Generate a brief description (2-3 sentences) that explains what the task involves and provides helpful context. Keep it professional and focused.'
          },
          {
            role: 'user',
            content: `Generate a description for this task: "${title.trim()}"`
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const description = data.choices?.[0]?.message?.content?.trim()

    if (!description) {
      throw new Error('No description generated')
    }
return new Response(JSON.stringify({
      success: true,
      description: description
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error generating task description:', error)
return new Response(JSON.stringify({
      success: false,
      error: 'Failed to generate description. Please try again.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})