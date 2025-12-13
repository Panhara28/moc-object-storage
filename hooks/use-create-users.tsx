"use client"

import { useState } from "react"

export function useCreateUser() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const createUser = async (data: any) => {
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error || "Failed to create user")
        return
      }

      setSuccess(true)
      return json

    } catch (err: any) {
      setError(err.message || "Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return { createUser, loading, success, error, setError }
}
