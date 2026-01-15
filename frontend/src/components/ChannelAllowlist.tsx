import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ChannelAllowlist() {
  const [channels, setChannels] = useState('')

  useEffect(() => {
    supabase.from('admin_settings')
      .select('allowlisted_channels')
      .single()
      .then(res => setChannels(res.data.allowlisted_channels.join(',')))
  }, [])

  const save = async () => {
    await supabase.from('admin_settings')
      .update({ allowlisted_channels: channels.split(',') })
      .eq('id', (await supabase.from('admin_settings').select('id').single()).data.id)
  }

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold mb-2">Allowed Channel IDs</h2>
      <input
        className="border p-2 w-full"
        value={channels}
        onChange={e => setChannels(e.target.value)}
      />
      <button className="mt-2 bg-black text-white px-4 py-1" onClick={save}>
        Save
      </button>
    </div>
  )
}
