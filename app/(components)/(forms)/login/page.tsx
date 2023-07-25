'use client'
import { useState, useEffect } from "react";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      router.push('/home');
    }
  }, [session, router]);

  const loginUser = async (e:any) => {
    e.preventDefault();
    const result = await signIn('credentials', { ...data, redirect: false });
    if (result?.error) {
      setError("Wrong email or password");
    } else {
      setError("User does not exist");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 space-y-6 sm:w-full sm:max-w-sm">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Sign in to your account
        </h2>
        <form className="space-y-6" onSubmit={loginUser}>
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
                value={data.email}
                onChange={e => setData({ ...data, email: e.target.value })}
                required
                className="block w-full rounded-md border py-1.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                  Forgot password?
                </a>
              </div>
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
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
            >
              Sign in
            </button>
          </div>
          {error && (
            <div className="text-center text-red-500">
              {error}
            </div>
          )}
        </form>
        <p className="text-center text-sm text-gray-500">
          Not a member?{' '}
          <button onClick={() => router.push('/register')} className="text-green-500">
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
