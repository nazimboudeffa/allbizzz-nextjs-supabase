'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '@/lib/database.types'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    router.refresh()
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.refresh()
  }

  const handleSignInWithGoogle = async() => {
    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${location.origin}/auth/callback`,
                  },
    })
}

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <>

<form 
  onSubmit={handleSignIn}
  className="flex flex-col w-full justify-center items-center mt-8 space-y-5"
>
  <label 
      htmlFor="email" 
      className="block test-sm font-medium test-gray-700"
  >
      Email
  </label>
  <div>
      <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="username@example.com"
          onChange = {(e) => setEmail(e.target.value)}
      />
  </div>
  <label 
      htmlFor="password" 
      className="block test-sm font-medium test-gray-700"
  >
      Password
  </label>
  <div>
      <input
          type="password"
          name="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="password"
          onChange = {(e) => setPassword(e.target.value)}
      />
  </div>
  <button
      type="submit"
      className="flex items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
  >
      Sign in
  </button>
</form>

<div className="flex flex-col justify-center items-center mt-10">
<button 
  onClick={handleSignInWithGoogle}
  className="flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
>
      Sign in with Google
</button>

  <button 
      onClick={handleSignUp}
      className="flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none mt-10"
  >
      Create an account
  </button>

<button 
  onClick={handleSignOut}
  className="flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
>
      Sign Out
</button>
</div>
    </>
  )
}