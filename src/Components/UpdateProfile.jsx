import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import formValidationChecker from "./ValidationCheckers/formValidationChecker"

export default function UpdateProfile() {
    let navigate = useNavigate()
    let [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pin: "",
        pic: ""
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        phone: ""
    })
    async function getAPIData() {
        let response = await fetch("http://localhost:8000/user/" + localStorage.getItem("userid"), {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        // console.log(response);
        if (response) {
            setData({ ...response })
        }
        else {
            navigate("/login")
        }
    }
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
    function getInputFile(e) {
        let { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        if (!(Object.keys(errorMessage).find((x) => errorMessage[x] && errorMessage[x] !== ""))) {
            let response = await fetch("http://localhost:8000/user/" + localStorage.getItem("userid"), {
                method: "put",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })
            response = await response.json()
            // console.log(response.data);
            if (localStorage.getItem("role") === "Admin") {
                navigate("/admin")
            }
            else {
                navigate("/profile")
            }
        }
        else {
            setShow(true)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            <div className="container-fluid page-header py-3">
                <h1 className='text-center text-white display-6'>Update Profile</h1>
                <ol className='breadcrumb justify-content-center mb-0'>
                    <li className='breadcrumb-item'><Link to='/' className='text-light'>Home</Link></li>
                    <li className='breadcrumb-item active text-white'>UpdateProfile</li>
                </ol>
            </div>
            <div className='container my-3'>
                <div className='w-75 m-auto'>
                    <h5 className='bg-primary text-center text-light p-2'><strong>Update</strong> Profile </h5>
                    <form onSubmit={postData}>
                        <div className="row mb-3">
                            <div className='col-md-6 '>
                                <label>Name <sup className='text-danger'>*</sup></label>
                                <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Enter Name' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                            </div>
                            <div className='col-md-6'>
                                <label>Phone No <sup className='text-danger'>*</sup></label>
                                <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Enter  Phone Number' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessage.phone}</p> : ""}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className='col-md-12 '>
                                <label>Address</label>
                                <textarea name="address" onChange={getInputData} placeholder='Enter Full Address' className='form-control' value={data.address ?? ""} />
                            </div>

                        </div>
                        <div className="row mb-3">
                            <div className='col-md-6 '>
                                <label>State</label>
                                <input type="text" name="state" onChange={getInputData} placeholder='Enter State Name' className='form-control' value={data.state ?? ""} />
                            </div>
                            <div className='col-md-6'>
                                <label>City</label>
                                <input type="text" name="city" onChange={getInputData} placeholder='Enter city Name' className='form-control' value={data.city ?? ""} />
                            </div>
                        </div>
                        <div className="row mb-3">
                           <div className="col-md-6">
                            <label>Pin</label>
                            <input type="text" name="pin" onChange={getInputData} placeholder='Enter Pin' className='form-control' value={data.pin} />
                           </div>
                            <div className='col-md-6 '>
                                <label>Pic</label>
                                <input type="file" name="pic" onChange={getInputFile} placeholder='Enter State Name' className='form-control' />
                            </div>
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                            <button type='submit' className='btn btn-primary w-100 text-light'>Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
