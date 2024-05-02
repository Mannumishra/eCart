import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import formValidation from './ValidationCheckers/formValidationChecker'
import { addContactUs } from '../Store/ActionCreators/ContactUsActionCreators'
import { useDispatch } from 'react-redux'

export default function ContactUs() {
    let dispatch = useDispatch()
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    let [errorMessage, setErrorMessage] = useState({
        name: "Name Filed is Mendatory",
        email: "Email Filed is Mendatory",
        phone: "Phone Filed is Mendatory",
        subject: "Subject Filed is Mendatory",
        message: "Message Filed is Mendatory",
    })
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidation(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
        setShow(false)
    }

    function postData(e) {
        e.preventDefault()
        if (!(Object.keys(errorMessage).find((x) => errorMessage[x] && errorMessage[x] !== ""))) {
            dispatch(addContactUs({ ...data, data: new Date }))
            setMessage("Thanks for contact us !!!!")
            setData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            })
        }
        else {
            setShow(true)
        }
    }
    return (
        <>
            {/* <!-- Single Page Header start --> */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Contact</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Contact</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}


            {/* <!-- Contact Start --> */}
            <div className="container-fluid contact py-2">
                <div className="container py-3">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: "700px" }}>
                                    <h1 className="text-primary">Get in touch</h1>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="h-100 rounded">
                                    <div className="mapouter">
                                        <div className="gmap_canvas">
                                            <iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=A-268%20vijay%20vihar&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                        </div></div>
                                </div>
                            </div>
                            <div className="col-lg-7 ">
                                <p className='text-success'>{message}</p>
                                <form onClick={postData}>
                                    <div className="mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder='Enter full Name' value={data.name} onChange={getInputData} className='form-control' />
                                        {show ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <label>Email</label>
                                        <input type="email" name="email" placeholder='Enter Email Address' value={data.email} onChange={getInputData} className='form-control' />
                                        {show ? <p className='text-danger text-capitalize'>{errorMessage.email}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <label>Phone</label>
                                        <input type="number" name="phone" placeholder='Enter Phone Number ' value={data.phone} onChange={getInputData} className='form-control' />
                                        {show ? <p className='text-danger text-capitalize'>{errorMessage.phone}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <label>Subject</label>
                                        <input type="text" name="subject" placeholder='Subject' value={data.subject} onChange={getInputData} className='form-control' />
                                        {show ? <p className='text-danger text-capitalize'>{errorMessage.subject}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <label>Message</label>
                                        <textarea name="message"  onChange={getInputData} value={data.message} className='form-control'></textarea>
                                        {show ? <p className='text-danger text-capitalize'>{errorMessage.message}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <button type='submit' className='btn btn-primary text-light'>Send Message</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Address</h4>
                                        <p className="mb-2">A-268 Vijay Vihar Ph-1 Rohini Delhi 110085</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Mail Us</h4>
                                        <p className="mb-2"><a href='mailto:mannu22072000@gmail.com'>mannu22072000@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded bg-white">
                                    <i className="fa fa-phone fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Telephone</h4>
                                        <p className="mb-2"><a href="tel:9354757842">9354757842</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Contact End --> */}

        </>
    )
}
