import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import formValidationChecker from "../../ValidationCheckers/formValidationChecker"

import { getBrand, updateBrand } from "../../../Store/ActionCreators/BrandActionCreators"
export default function UpdateBrand() {
    let [name, setName] = useState("")
    let { id } = useParams()
    let [message, setMessage] = useState("")
    let [show, setShow] = useState(false)

    let dispatch = useDispatch()
    let BrandStateData = useSelector((state) => state.BrandStateData)
    let navigate = useNavigate()

    function getInputData(e) {
        setMessage(formValidationChecker(e))
        setShow(false)
        setName(e.target.value)
    }
     function postData(e) {
        e.preventDefault()
        if (message.length === 0) {
            var item = BrandStateData.find((x) => x.name === name)
            if (item) {
                setShow(true)
                setMessage("Brand Already Exist")
            }
            else {
                dispatch(updateBrand({ id: id, name: name }))
                navigate("/admin/brand")
            }
        }
        else
            setShow(true)
    }
    function getAPIData() {
        dispatch(getBrand())
        if (BrandStateData.length) {
            let item = BrandStateData.find((x) => x.id === Number(id))
            if (item)
                setName(item.name)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [BrandStateData.length])
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Admin</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Brand</li>
                </ol>
            </div>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center text-light p-2'>Brand</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name<span className='text-danger'>*</span></label>
                                <input type="text" name="name" onChange={getInputData} className='form-control' value={name} placeholder='Brand Name' />
                                {show ? <p className='text-danger text-capitalize my-2'>{message}</p> : ""}
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary text-light w-100'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
