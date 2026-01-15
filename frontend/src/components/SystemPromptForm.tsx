import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function SystemPromptForm() {
  const [prompt, setPrompt] = useState('')

  useEffect(() => {
    supabase.from('admin_settings')
      .select('system_prompt')
      .single()
      .then(res => setPrompt(res.data.system_prompt))
  }, [])

  const save = async () => {
    await supabase.from('admin_settings')
      .update({ system_prompt: prompt })
      .eq('id', (await supabase.from('admin_settings').select('id').single()).data.id)
  }

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold mb-2">System Instructions</h2>
      <textarea
        className="border w-full p-2 h-32"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <button className="mt-2 bg-black text-white px-4 py-1" onClick={save}>
        Save
      </button>
    </div>
  )
}
