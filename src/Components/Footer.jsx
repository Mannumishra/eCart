import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addNewsletter, getNewsletter } from '../Store/ActionCreators/NewsletterActionCreators'
import { useDispatch, useSelector } from 'react-redux'


export default function Footer() {
    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")
    let dispatch = useDispatch()
    let NewsletterStateData = useSelector((state) => state.NewsletterStateData)

    function getInputData(e) {
        setMessage("")
        setEmail(e.target.value)
    }

    function postData(e) {
        e.preventDefault()
        if (email === "")
            setMessage("Please Enter An email Address")
        else {
            var item = NewsletterStateData.find((x) => x.email === email)
            if (item) {
                setMessage("This Email Addres is already register with us !!!!!")
            }
            else {
                dispatch(addNewsletter({email:email}))
                setMessage("Your Email Address is register with us !!!! Thank You")
                setEmail("")
                setMessage("")
            }
        }

    }

    function getAPIData() {
        dispatch(getNewsletter())
    }

    useEffect(() => {
        getAPIData()
    }, [NewsletterStateData.length])
    return (
        <>
            {/* <!-- Footer Start --> */}
            <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
                <div className="container py-5">
                    <div className="pb-4 mb-4" style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}>
                        <div className="row g-4">
                            <div className="col-lg-3">
                                <a href="#">
                                    <h1 className="text-light mb-0">eKart</h1>
                                    <p className="text-light mb-0">Latest Fashion</p>
                                </a>
                            </div>
                            <div className="col-lg-6">
                                <p className='text-center text-light'>{message}</p>
                                <form onSubmit={postData}>
                                    <div className="position-relative mx-auto">
                                        <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" name='email' value={email} type="email" onChange={getInputData} placeholder="Your Email" />
                                        <button type="submit" className="btn btn-primary border-0 border-light py-3 px-4 position-absolute rounded-pill text-white" style={{ top: 0, right: 0 }}>Subscribe Now</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-3">
                                <div className="d-flex justify-content-end pt-3">
                                    <a className="btn  btn-outline-light me-2 btn-md-square rounded-circle" href=""><i className="fab fa-twitter"></i></a>
                                    <a className="btn btn-outline-light me-2 btn-md-square rounded-circle" href=""><i className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-outline-light me-2 btn-md-square rounded-circle" href=""><i className="fab fa-youtube"></i></a>
                                    <a className="btn btn-outline-light btn-md-square rounded-circle" href=""><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="text-light mb-3">Why People Like us!</h4>
                                <p className="mb-4 text-light">typesetting, remaining essentially unchanged. It was
                                    popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Bottom Menu</h4>
                                <Link className="btn-link text-light" to="/">Home</Link>
                                <Link className="btn-link text-light" to="/shop">Shop</Link>
                                <Link className="btn-link text-light" to="/contactus">Contact</Link>
                                <Link className="btn-link text-light" to="/testimonial">Testimonials</Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Quick Links</h4>
                                <a className="btn-link text-light" href="">Privacy policy</a>
                                <a className="btn-link text-light" href="">Terms & Conditions</a>
                                <a className="btn-link text-light" href="">Refund Policy</a>
                                <a className="btn-link text-light" href="">FAQ</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-item">
                                <h4 className="text-light mb-3">Contact</h4>
                                <p className='text-light'>Address: A-268 vijay vihar ph-1 Rohini Delhi 110085</p>
                                <p className='text-light'>Email: <a className='text-light' href="mailto:mannu22072000@gmail.com">mannu22072000@gmail.com</a></p>
                                <p className='text-light'>Phone: <a className='text-light' href="tel:+919354757842">+91-9354757842</a></p>
                                <p className='text-light'>Whatsapp: <a className='text-light' href="https://wa.me/+919354757842">+91-9354757842</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Footer End --> */}

            {/* <!-- Copyright Start --> */}
            <div className="container-fluid copyright bg-dark py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            <span className="text-light"><a href="#" className='text-light'><i className="fas fa-copyright text-light me-2"></i>Your Site Name</a>, All right reserved.</span>
                        </div>
                        <div className="col-md-6 my-auto text-center text-md-end text-white">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
