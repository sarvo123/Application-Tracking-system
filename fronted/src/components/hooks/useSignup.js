import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from 'react-hot-toast';



const useSignup =()=>{
    const {setAuthUser} = useAuthContext();

    const signup =  async ({name , email , password , confirmPassword , role })=>{

        const succcess = handleInputErrors({name , email , password , confirmPassword , role});
        if(!succcess) return ;

        try{ 
            const res = await fetch("/api/auth/signup",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({name , email , password , confirmPassword , role})
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            console.log(data);
            //local storage 
            localStorage.setItem("ATS-user",JSON.stringify(data));
            // context 
            setAuthUser(data);

        }catch(error){
            toast.error(error.message);
        }
    }
    return {signup};
}

export default useSignup;

function handleInputErrors({name , email , password , confirmPassword , role}){
    if(!name || !email || !password || !confirmPassword || !role){
        toast.error("Please fill in all fields");
        return false;
    }

    if(password !== confirmPassword){
        toast.error('Password do not match');
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}