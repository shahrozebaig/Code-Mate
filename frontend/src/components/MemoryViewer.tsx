import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function MemoryViewer() {
  const [memory, setMemory] = useState('')

  useEffect(() => {
    supabase.from('conversation_state')
      .select('summary')
      .single()
      .then(res => setMemory(res.data.summary))
  }, [])

  const reset = async () => {
    await supabase.from('conversation_state')
      .update({ summary: '' })
      .eq('id', 1)
    setMemory('')
  }

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold mb-2">Conversation Memory</h2>
      <textarea
        className="border w-full p-2 h-24"
        value={memory}
        readOnly
      />
      <button className="mt-2 bg-red-500 text-white px-4 py-1" onClick={reset}>
        Reset Memory
      </button>
    </div>
  )
}
