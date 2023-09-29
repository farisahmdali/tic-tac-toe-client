"use client"
import Link from 'next/link'
import React, { FormEvent } from 'react'

interface SignupFormProps{
  handleSubmit:(e:FormEvent<HTMLFormElement>) => void
}

function SignupForm({handleSubmit}:SignupFormProps) {
  return (
    <div className="bg-grey-lighter min-h-screen w-[100vw] md:w-[500px] flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            
              <form
                className="px-6 py-8 rounded shadow-md text-black w-full"
                onSubmit={handleSubmit}
              >
                <h1 className="mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">
                  Sign up
                </h1>
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="fullname"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  placeholder="Password"
                  required
                />
                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required
                />
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>
              </form>
            
            <div className="text-grey-dark mt-6">
              Already have an account?
              <Link
                className="no-underline border-b border-blue text-blue"
                href={"/"}
              >
                Log in
              </Link>
              .
            </div>
          </div>
        </div>
  )
}

export default SignupForm