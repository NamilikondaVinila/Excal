import React from "react"
import SignupForm from "./SignupForm";

const Page = () => {

    return(
        <div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-2 mt-4">Sign Up</h1>
            </div>
            
            <SignupForm />
        </div>
    );
}


export default Page;