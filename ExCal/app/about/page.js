"use client"
import UserContext from "@/contexts/UserContext";
import React, { useContext } from "react";

const Page = () => {
    const context = useContext(UserContext);
    const { user } = context;
    

    return (
        <div>
            This is about
        </div>
    );
}

export default Page;
