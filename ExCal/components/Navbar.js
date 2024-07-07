"use client"
import React, {useContext, useEffect} from "react"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import UserContext from "@/contexts/UserContext";

const Navbar = () => {
    const { user, getUser, setUser } = useContext(UserContext);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>{
        const init = async()=>{

          const token = localStorage.getItem('token');
          if(token){
            const userTemp = await getUser();
            if(!userTemp){
                localStorage.removeItem('token');
                router.push("/login");
            }
            if(userTemp && (pathname==='/signup' || pathname==='/login')){
                router.push("/");
            }
          }
          else{
            if(pathname!=='/signup' && pathname!=='/login'){
                router.push('/login');
            }
          }
        }
        init();
    },[pathname])
  

    const handleLogout = async () => {
        // Implement your logout logic here
        // For example, clear the session, remove tokens, etc.
        // Then redirect the user to the login page
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    const handleLogin = () => {
        // Implement your logout logic here
        // For example, clear the session, remove tokens, etc.
        // Then redirect the user to the login page
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    const handleSignup = () => {
        // Implement your logout logic here
        // For example, clear the session, remove tokens, etc.
        // Then redirect the user to the login page
        router.push('/signup');
    };

    return(
        <div>
            <nav className='flex justify-between items-center px-4 bg-slate-800 text-white py-4'>
                <div className="logo font-bold text-2xl"><Link href='/'>ExCal</Link></div>
                {user ? (<div className="flex items-center">

                    <ul className='flex gap-6'>
                        <Link href='/'><li>Home</li></Link>
                        <Link href='/about'><li>About</li></Link>
                        <Link href='/contact'><li>Contact</li></Link>
                        
                    </ul>
                    <button
                        className="mx-2 py-3 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>) : (<div className="flex items-center">

                    <button
                        className="mx-2 py-3 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <button
                        className="mx-2 py-3 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none"
                        onClick={handleSignup}
                    >
                        Signup
                    </button>
                    </div>)}
                
            </nav>
        </div>
    );
}


export default Navbar;