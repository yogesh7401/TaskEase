// Login.js
import { useEffect, useState } from "react";
import { useAuth } from "../Authentication/AuthProvider";  
import { useNavigate } from "react-router-dom" 

function Login() {
    const [ userdata, setUser ] = useState({ email: "", password: "" })
    const { login, error, user, setError } = useAuth();    
    const navigate = useNavigate()

    const labelClass = "text-primary text-sm"
    const inputClass = "p-2 w-full rounded-md focus:outline-none"

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })

    function handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        setUser({
            ...userdata,
            [name]: value
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        login(userdata)
        if (user) {
            navigate("/")
        }
    }

    return (
        <div className="min-h-screen flex bg-primary">
            <div className="m-auto w-96 bg-secondary-light rounded-xl p-8 shadow-xl">
                <div className="text-center text-3xl uppercase text-white font-bold">Login</div>
                <form className="mt-5 flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)} method="POST">
                    <div>
                        <label className={`${labelClass} required`} htmlFor="taskTitle">
                            Email
                        </label> <br />
                        <input 
                            className={inputClass} 
                            name="email" 
                            value={userdata.email} 
                            onChange={(e) => handleChange(e)} 
                            type="email" 
                            id="Email" 
                            placeholder="Enter your email"
                            required/>
                    </div>
                    <div>
                        <label className={`${labelClass} required`} htmlFor="Password">
                            Password
                        </label> <br />
                        <input 
                            className={inputClass} 
                            name="password" 
                            autoComplete="cutrent-password"
                            value={userdata.password} 
                            onChange={(e) => handleChange(e)} 
                            type="password" 
                            id="Password" 
                            placeholder="Enter your password"
                            required/>
                    </div>
                    <p className="text-red-600 -my-2">{error}</p>
                    <div className="">
                        <button value={"submit"} className={`p-2 w-full text-light rounded-md focus:outline-none mt-3 bg-primary-light hover:bg-primary`}>Login</button>
                    </div>
                    <div className="flex justify-between text-primary text-sm">
                        <div className="underline cursor-pointer" onClick={() => { setError(null), navigate("/register") }}>
                            Sign up
                        </div>
                        <div className="underline cursor-pointer">
                            Forgot password?
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
