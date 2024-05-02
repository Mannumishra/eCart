import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import formValidationChecker from "./ValidationCheckers/formValidationChecker"

export default function Login() {
    let navigate = useNavigate()
    let [data, setData] = useState({
        username: "",
        password: ""
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        username: "User Name Must Required",
        password: "Password Must Required"
    })
    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidationChecker(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        if (!(Object.keys(errorMessage).find((x) => errorMessage[x] && errorMessage[x] !== ""))) {
            let response = await fetch("http://localhost:8000/user", {
                method: "get",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            // console.log(response);
            let item = response.find((x) => (x.username === data.username || x.email === data.username) && x.password === data.password)
            if (item) {
                localStorage.setItem("login", true)
                localStorage.setItem("name", item.name)
                localStorage.setItem("username", item.username)
                localStorage.setItem("userid" ,item.id)
                localStorage.setItem("role", item.role)
                // console.log(item.role);
                if (item.role === "Admin")
                    navigate("/admin")
                else
                    navigate("/profile")
            }
            else {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        "username": "Invaild UserName Or Password"
                    }
                })
            }
        }
        else {
            setShow(true)
        }
    }
    return (
        <>
            <div className="container-fluid page-header py-3">
                <h1 className='text-center text-white display-6'>Login</h1>
                <ol className='breadcrumb justify-content-center mb-0'>
                    <li className='breadcrumb-item'><Link to='/' className='text-light'>Home</Link></li>
                    <li className='breadcrumb-item active text-white'>Login</li>
                </ol>
            </div>
            <div className='container my-3'>
                <div className='w-75 m-auto'>
                    <h5 className='bg-primary text-center text-light p-2'><strong>Login</strong> to Your Account </h5>
                    <form onSubmit={postData}>
                        <div className='mb-3'>
                            <label>User Name <sup className='text-danger'>*</sup></label>
                            <input type="text" name="username" onChange={getInputData} placeholder='Enter User Name or Email Address' className='form-control' />
                            {show ? <p className='text-danger text-capitalize'>{errorMessage.username}</p> : ""}
                        </div>
                        <div className='mb-3'>
                            <label>Password <sup className='text-danger'>*</sup></label>
                            <input type="password" name="password" onChange={getInputData} placeholder='***********' className='form-control' />
                            {show ? <p className='text-danger text-capitalize'>{errorMessage.password}</p> : ""}
                        </div>
                        <div className="mb-3">
                            <button type='submit' className='btn btn-primary w-100 text-light'>Login</button>
                        </div>
                    </form>
                    <div className='d-flex justify-content-between'>
                        <Link to="#" className='text-danger'>Forget Password ?</Link>
                        <Link to="/signup">New User ? Create Account Free</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
