"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

// Page to enter phone number after Google authentication

export default function EnterPhonePage() {
  const { data: session, status } = useSession()
  const [phone, setPhone] = useState("")
  const router = useRouter()

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>
  if (!session) {
    router.push("/")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
     try {
      // Fetch calendar events using the access token from session
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=5&orderBy=startTime&singleEvents=true&timeMin=" + new Date().toISOString(),
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    )

    const data = await response.json()
    if (data.items && data.items.length > 0) {
        // Store events in localStorage or a global store to aviod backend and db usage
          localStorage.setItem("userData", 
          JSON.stringify({ phone, events: data.items }))
        router.push("/calendar-events")
      } else {
        alert("Failed to fetch events")
      }
  } catch (error) {
    console.error("Error fetching calendar events:", error)
  }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}</h1>
        <p className="mb-4 text-gray-600">Please enter your phone number:</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  )
}
