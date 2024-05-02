import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import formValidationChecker from "../../ValidationCheckers/formValidationChecker"

import { getTestimonial, updateTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators"
export default function UpdateTestimonial() {
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        profession: "",
        star: "",
        pic: "",
        message: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        profession: "",
        star: "",
        message: ""
    })
    let [show, setShow] = useState(false)

    let dispatch = useDispatch()
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
    let navigate = useNavigate()

    function getInputData(e) {
        var { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidationChecker(e)
            }
        })
        setShow(false)
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getInputFile(e) {
        var { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0] && files[0].name
            }
        })
    }
     function postData(e) {
        e.preventDefault()
        // console.log(errorMessage);
        if (!(Object.keys(errorMessage).find((x) => errorMessage[x] && errorMessage[x] !== ""))) {
            //    let formData = new FormData()
            //     formData.append("name",data.name)
            //     formData.append("profession",data.profession)
            //     formData.append("star",data.star)
            //     formData.append("message",data.message)
            //     formData.append("pic",data.pic)


            let formData = {
                id:id,
                name: data.name,
                message: data.message,
                star: data.star,
                profession: data.profession,
                pic: data.pic
            }
            dispatch(updateTestimonial(formData))
            navigate("/admin/testimonial")
        }
        else
            setShow(true)
    }
    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length) {
            let item = TestimonialStateData.find((x) => x.id === Number(id))
            if (item)
                setData(item)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length])
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Admin</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Testimonial</li>
                </ol>
            </div>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center text-light p-2'>Testimonial</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name<span className='text-danger'>*</span></label>
                                    <input type="text" name="name" onChange={getInputData} value={data.name} className='form-control' placeholder='Person Name' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessage.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Profession<span className='text-danger'>*</span></label>
                                    <input type="text" name="profession" onChange={getInputData} value={data.profession} className='form-control' placeholder='Profession' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessage.profession}</p> : ""}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Star<span className='text-danger'>*</span></label>
                                    <input type="text" name="star" onChange={getInputData} value={data.star} className='form-control' placeholder='Star' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessage.star}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getInputFile} className='form-control' />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Message<span className='text-danger'>*</span></label>
                                <textarea name="message" rows="5" onChange={getInputData} value={data.message} placeholder='Message...' className='form-control'></textarea>
                                {show ? <p className='text-danger text-capitalize my-2'>{errorMessage.message}</p> : ""}
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
