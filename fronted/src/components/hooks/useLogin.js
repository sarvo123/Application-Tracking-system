import { useAuthContext } from "../../context/AuthContext"



const useLogin =()=>{

    const {setAuthUser} = useAuthContext();

    const login = async ({name , email , password })=>{
        const success = handleInputErrors({name ,email , password });
        if(!success) return ;

        try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name,email, password }),
			});

			const data = await res.json();
            console.log(data);
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("ATS-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		}
    };
    return {login};
}

export default useLogin;

function handleInputErrors({name,email, password}) {
	if (!name || !email || !password) {
		toast.error("Please fill in all fields");
		return false;
	}
	return true;
}