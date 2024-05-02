import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct } from '../Store/ActionCreators/ProductActionCreators'
import { addCart, getCart } from '../Store/ActionCreators/CartActionCreators'
import { addWishlist, getWishlist } from '../Store/ActionCreators/WishlistActionCreators'

import ProductSlider from './ProductSlider'


export default function ProductDetails() {
    let [products, steProducts] = useState({})
    let [relatedProducts, setRelatedProducts] = useState([])
    let [qty, setQty] = useState(1)
    let { id } = useParams()
    let navigate = useNavigate()

    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let CartStateData = useSelector((state) => state.CartStateData)
    let WishlistStateData = useSelector((state) => state.WishlistStateData)

    function addToCart() {
        var item = CartStateData.find((x) => x.productid === id && x.userid === localStorage.getItem("userid"))
        if (!item) {
            item = {
                productid: id,
                userid: localStorage.getItem("userid"),
                name: products.name,
                brand: products.brand,
                color: products.color,
                size: products.size,
                price: products.finalprice,
                qty: qty,
                total: products.finalprice * qty,
                pic: products.pic1
            }
            dispatch(addCart(item))
        }
        navigate("/cart")
    }
    function addToWishlist() {
        var item = CartStateData.find((x) => x.productid === id && x.userid === localStorage.getItem("userid"))
        if (!item) {
            item = {
                productid: id,
                userid: localStorage.getItem("userid"),
                name: products.name,
                brand: products.brand,
                color: products.color,
                size: products.size,
                price: products.finalprice,
                pic: products.pic1
            }
            dispatch(addWishlist(item))
        }
        navigate("/profile")
    }
    function getAPIdata() {
        dispatch(getProduct())
        dispatch(getCart())
        dispatch(getWishlist())
        if (ProductStateData.length) {
            let item = ProductStateData.find((x) => x.id === Number(id))
            // console.log(item);
            if (item) {
                steProducts(item)
                setRelatedProducts(ProductStateData.filter((x) => x.maincategory === item.maincategory))
            }
        }
    }
    useEffect(() => {
        getAPIdata()
    }, [ProductStateData.length, CartStateData.length, WishlistStateData.length])
    return (
        <>

            {/* <!-- Single Page Header start --> */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop Detail</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Shop Detail</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}


            {/* <!-- Single Product Start --> */}
            <div className="container-fluid py-5 mt-2">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <div id="carouselExampleIndicators" className="carousel slide">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={`/product/${products.pic1}`} height="250px" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/product/${products.pic2}`} height="250px" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/product/${products.pic3}`} height="250px" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/product/${products.pic4}`} height="250px" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div className='mt-1 d-flex gap-1'>
                                <img src={`/product/${products.pic1}`} height={70} className='w-100' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" alt="" />
                                <img src={`/product/${products.pic2}`} height={70} className='w-100' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" alt="" />
                                <img src={`/product/${products.pic3}`} height={70} className='w-100' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" alt="" />
                                <img src={`/product/${products.pic4}`} height={70} className='w-100' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h4 className="fw-bold mb-2">{products.name}</h4>
                            <p className="mb-2">Category: {products.maincategory}/ {products.subcategory}/ {products.brand}</p>
                            <h5 className="fw-bold mb-2"><del className='text-danger'>&#8377;{products.baseprice}</del> &#8377;{products.finalprice} <sup className='text-success'>{products.discount}%Off</sup></h5>
                            <div className="d-flex mb-2">
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <p>Color : {products.color}</p>
                            <p>Size : {products.size}</p>
                            <p>Stock : {products.stock === "In Stock" ? "Available" : "Not Availbale"}</p>
                            {
                                products.stock === "In Stock" ?
                                    <>
                                        <div className="input-group quantity mb-2" style={{ width: "300px" }}>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => qty > 1 ? setQty(qty - 1) : ""} >
                                                    <i className="fa fa-minus"></i>
                                                </button>
                                            </div>
                                            <p className='mx-3'>{qty}</p>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => setQty(qty + 1)}>
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <button className="btn border border-primary rounded-pill px-4 py-2 mb-4 text-primary" onClick={addToCart}><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>&nbsp;
                                    </> : ""
                            }
                            <button className="btn border border-primary rounded-pill px-4 py-2 mb-4 text-primary" onClick={addToWishlist}><i className="fa fa-heart me-2 text-primary"></i> Add to wishlist</button>
                            <p className="mb-2">
                                <div dangerouslySetInnerHTML={{ __html: products.description }} />
                            </p>
                        </div>
                    </div>
                    <h3 className="fw-bold mt-3 text-center">Related products</h3>
                    <ProductSlider data={relatedProducts} />
                </div>
            </div>
            {/* <!-- Single Product End --> */}
        </>
    )
}
