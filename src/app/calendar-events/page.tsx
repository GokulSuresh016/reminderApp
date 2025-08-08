"use client"

import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"

export default function CalendarEventsPage() {
  const [events, setEvents] = useState<any[]>([])

  const makeTwilioCall = async (phone: string) => {
    fetch("/api/make-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      to: phone
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log("Call triggered, SID:", data.sid);
      } else {
        console.error("Call failed:", data.error);
      }
    })
    .catch((error) => {
      console.error("Error making Twilio call:", error);
    });
}

  useEffect(() => {
  const stored = localStorage.getItem("userData");
  if (stored) {
    const parsed = JSON.parse(stored);
    setEvents(parsed.events);
    // check if there are any events
    if (parsed.events.length > 0) {
      // if events found make a call using Twilio API
    
  makeTwilioCall(parsed.phone)
      parsed.events.forEach((event: any) => {
        const startTime = new Date(event.start.dateTime).getTime();
        const now = Date.now();
        const timeUntil = startTime - now;

        if (timeUntil > 0) { 
          const reminderTime = timeUntil - 5 * 60 * 1000; // 5 minutes before      
          if (reminderTime > 0) {
            // timeout function for alert
            setTimeout(() => {
              alert(`Reminder: Your event "${event.summary}" is in 5 minutes.`);
            }, reminderTime);
          }
        }
      });
    }
  }
}, []);
// return the events list 
  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Upcoming Google Calendar Events</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
      {events.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded shadow-sm bg-white">
              <h2 className="text-lg font-semibold">{event.summary || "No title"}</h2>
              <p>
                <strong>Start:</strong>{" "}
                {event.start?.dateTime
                  ? new Date(event.start.dateTime).toLocaleString()
                  : "N/A"}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {event.end?.dateTime
                  ? new Date(event.end.dateTime).toLocaleString()
                  : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}