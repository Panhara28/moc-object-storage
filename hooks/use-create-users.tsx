"use client"

import { useState } from "react"

type CreateUserPayload = {
  name: string
  email: string
  password: string
  profilePicture?: string | null
  fullNameKh?: string | null
  fullNameEn?: string | null
  gender?: string | null
  generalDepartment?: string | null
  department?: string | null
  office?: string | null
  phoneNumber?: string | null
  currentRole?: string | null
}

export function useCreateUser() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const createUser = async (data: CreateUserPayload) => {
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

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return { createUser, loading, success, error, setError }
}
