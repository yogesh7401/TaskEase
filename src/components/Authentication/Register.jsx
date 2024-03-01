// Login.js
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";   
import { useNavigate } from "react-router-dom"

function Register() {
    const [ userData, setUser ] = useState({ email: "", password: "", confirmPassword: "" })
    const { register, error, user, setError } = useAuth(); 
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
            ...userData,
            [name]: value
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        register(userData)
    }

    return (
        <div className="min-h-screen flex bg-primary">
            <div className="m-auto w-96 bg-secondary-light rounded-xl p-8 shadow-xl">
                <div className="text-center text-3xl uppercase text-white font-bold">Register</div>
                <form className="mt-5 flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)} method="POST">
                    <div>
                        <label className={`${labelClass} required`} htmlFor="taskTitle">
                            Email
                        </label> <br />
                        <input 
                            className={inputClass} 
                            name="email" 
                            value={userData.email} 
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
                            autoComplete="current-password"
                            value={userData.password} 
                            onChange={(e) => handleChange(e)} 
                            type="password" 
                            id="Password" 
                            placeholder="Enter your password"
                            required/>
                    </div>
                    <div>
                        <label className={`${labelClass} required`} htmlFor="confirmPassword">
                            Confirm Password
                        </label> <br />
                        <input 
                            className={inputClass} 
                            name="confirmPassword" 
                            autoComplete="current-password"
                            value={userData.confirmPassword} 
                            onChange={(e) => handleChange(e)} 
                            type="password" 
                            id="confirmPassword" 
                            placeholder="Re-Enter your password"
                            required/>
                    </div>
                    <p className="text-red-600 -my-2">{error}</p>
                    <div className="">
                        <button value={"submit"} className={`p-2 w-full text-light rounded-md focus:outline-none mt-3 bg-primary-light hover:bg-primary`}>Create</button>
                    </div>
                    <div className="text-center text-primary text-sm">
                        Already a member? <span className="underline cursor-pointer" onClick={() => { setError(null), navigate("/login") }}>Sign In</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
