"use client"
import UserContext from "@/contexts/UserContext";
import hashPassword from "@/utilities/auth/hashPassword";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { useRouter } from "next/navigation";
import React, {useState, useContext} from "react"


const Page = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {getUser} = useContext(UserContext);
    const router = useRouter();

    const handleSubmit = async (e) => {   
      e.preventDefault();
      // Add your login logic here
      console.log('Logging in with email:', email, 'and password:', password);
      const hashedPassword = await hashPassword(password);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const resp = await fetch(`${baseUrl}/api/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: hashedPassword })
      })

      const res = await resp.json();
      console.log(res);
      if (res.success){
        localStorage.setItem('token',res.token);
        await getUser();
        router.push('/');
        console.log(res);
      }
    };
  
    return (
      <div className="max-w-md mx-auto pt-20">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
}


export default Page;