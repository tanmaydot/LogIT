'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      });

      if (response.ok) {
        // Registration successful
        router.push('/login');
      } else if (response.status === 400) {
        const { source } = await response.json(); // Parse the error message from the response
        setError(source); // Set the specific error message from the server
      } else {
        setError("Email already exists.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 space-y-6 sm:w-full sm:max-w-sm">
        <h2 className="text-2xl font-bold text-green-600 text-center">
          Register for an account
        </h2>
        <form className="space-y-6" onSubmit={registerUser}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={data.name}
                onChange={e => setData({ ...data, name: e.target.value })}
                className="block w-full rounded-md border py-1.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })}
                className="block w-full rounded-md border py-1.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={data.password}
                onChange={e => setData({ ...data, password: e.target.value })}
                className="block w-full rounded-md border py-1.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {error && (
            <div className="mt-2 text-red-600 text-sm">{error}</div>
          )}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Have an account?{' '}
          <button onClick={() => router.push('/login')} className="text-green-500">
            LogIn
          </button>
        </p>
      </div>
    </div>
  );
}
