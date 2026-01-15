import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const [session, setSession] = useState<any>(null)
  const [page, setPage] = useState<"landing" | "login" | "signup">("landing")

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (session) return <Dashboard onLogout={() => { setSession(null); setPage("landing") }} />

  if (page === "login") return <Login goBack={() => setPage("landing")} goSignup={() => setPage("signup")} />
  if (page === "signup") return <Signup goBack={() => setPage("landing")} goLogin={() => setPage("login")} />

  return <Landing goLogin={() => setPage("login")} goSignup={() => setPage("signup")} />
}
