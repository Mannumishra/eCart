import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import formValidationChecker from "./ValidationCheckers/formValidationChecker"

export default function Signup() {
    let navigate = useNavigate()
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: " Name Must Required",
        username: "User Name Must Required",
        email: "email Must Required",
        phone: "phone Must Required",
        password: "password Must Required"
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
        if (data.password === data.cpassword) {
            if (!(Object.keys(errorMessage).find((x) => errorMessage[x] && errorMessage[x] !== ""))) {
                let response = await fetch("http://localhost:8000/user", {
                    method: "get",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                response = await response.json()
                // console.log(response);
                let item = response.find((x) => x.username === data.username || x.email === data.email)
                if (item) {
                    setShow(true)
                    setErrorMessage((old) => {
                        return {
                            ...old,
                            "username": item.username === data.username ? "User Name ALready Taken" : "",
                            "email": item.email === data.email ? "Email id Already Taken" : ""
                        }
                    })
                }
                else {
                    item = {
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer"
                    }
                    // console.log(item);
                    let response = await fetch("http://localhost:8000/user", {
                        method: "post",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(item)
                    })
                    response = await response.json()
                    // console.log(response.data);
                    navigate("/login")
                }
            }
            else {
                setShow(true)
            }
        }
        else {
            setShow(true)
            setErrorMessage((old) => {
                return {
                    ...old,
                    "password": "Password and confirm password Dosen't Matched"
                }
            })
        }
    }
    return (
        <>
            <div className="container-fluid page-header py-3">
                <h1 className='text-center text-white display-6'>Create Account</h1>
                <ol className='breadcrumb justify-content-center mb-0'>
                    <li className='breadcrumb-item'><Link to='/' className='text-light'>Home</Link></li>
                    <li className='breadcrumb-item active text-white'>Signup</li>
                </ol>
            </div>
            <div className='container my-3'>
                <div className='w-75 m-auto'>
                    <h5 className='bg-primary text-center text-light p-2'><strong>Create</strong> a New Account </h5>
                    <form onSubmit={postData}>
                        <div className="row mb-3">
                            <div className='col-md-6 '>
                                <label>Name <sup className='text-danger'>*</sup></label>
                                <input type="text" name="name" onChange={getInputData} placeholder='Enter Name' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                            </div>
                            <div className='col-md-6 '>
                                <label>User Name <sup className='text-danger'>*</sup></label>
                                <input type="text" name="username" onChange={getInputData} placeholder='Enter User Name' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessage.username}</p> : ""}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='col-md-6'>
                                <label>Email <sup className='text-danger'>*</sup></label>
                                <input type="email" name="email" onChange={getInputData} placeholder='Enter  Email Address' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessage.email}</p> : ""}
                            </div>
                            <div className='col-md-6'>
                                <label>Phone No <sup className='text-danger'>*</sup></label>
                                <input type="text" name="phone" onChange={getInputData} placeholder='Enter  Phone Number' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessage.phone}</p> : ""}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='col-md-6'>
                                <label>Password <sup className='text-danger'>*</sup></label>
                                <input type="password" name="password" onChange={getInputData} placeholder='***********' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessage.password}</p> : ""}
                            </div>
                            <div className='col-md-6'>
                                <label>Confirm Password <sup className='text-danger'>*</sup></label>
                                <input type="password" name="cpassword" onChange={getInputData} placeholder='***********' className='form-control' />
                            </div>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                            <button type='submit' className='btn btn-primary w-40 text-light'>Signup</button>
                            <Link to="/login" className='btn btn-primary w-40 text-light '>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
