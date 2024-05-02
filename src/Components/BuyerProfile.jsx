import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteWishlist, getWishlist } from '../Store/ActionCreators/WishlistActionCreators'
import { getCheckout } from '../Store/ActionCreators/CheckoutActionCreators'
import { useDispatch, useSelector } from 'react-redux'
import ProfileComponent from './ProfileComponent'

export default function BuyerProfile() {
    let [user, setUser] = useState({})
    let [wishlist, setWishlist] = useState([])
    let [order, setOrder] = useState([])
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let WishlistStateData = useSelector((state) => state.WishlistStateData)
    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)
    function deleteItem(id) {
        dispatch(deleteWishlist({ id: id }))
        getAPIdata()
    }
    async function getAPIdata() {
        let response = await fetch("http://localhost:8000/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        // console.log(response);
        if (response)
            setUser(response)
        else
            navigate("/login")


        dispatch(getWishlist())
        if (WishlistStateData.length) {
            setWishlist(WishlistStateData.filter((x) => x.userid === localStorage.getItem("userid")))
        }
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            setOrder(CheckoutStateData.filter((x) => x.userid === localStorage.getItem("userid")))
        }
    }

    // console.log(WishlistStateData);
    useEffect(() => {
        getAPIdata()
    }, [WishlistStateData.length, CheckoutStateData.length])
    return (
        <>
            <div className="container-fluid page-header py-3">
                <h1 className='text-center text-white display-6'>Buyer Profile</h1>
                <ol className='breadcrumb justify-content-center mb-0'>
                    <li className='breadcrumb-item'><Link to='/' className='text-light'>Home</Link></li>
                    <li className='breadcrumb-item active text-white'>Buyer : {user.name}</li>
                </ol>
            </div>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-6">
                        {
                            user.pic ? <img src={`/img/${user.pic}`} alt="" height="500px" width="100%" /> :
                                <img src="/img/noimage.png" alt="" height="425px" width="100%" />
                        }
                    </div>
                    <div className="col-md-6">
                        <ProfileComponent heading="Buyer Profile" user={user} />
                    </div>
                    <div>
                        <h5 className='bg-primary text-light my-2 py-2 text-center'>Wishlist</h5>
                    </div>
                    {
                        wishlist.length ? <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Pic</th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        wishlist.map((item, index) => {
                                            return <tr>
                                                <td><a href={`/product/${item.pic}`} target='_blank' ><img src={`/product/${item.pic}`} alt="" style={{ height: 70, width: 70 }} /></a></td>
                                                <td>{item.name}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>&#8377;{item.price}</td>
                                                <td><Link to={`/product/${item.productid}`} className='btn btn-primary text-light'><i className='fa fa-shopping-cart'></i></Link></td>
                                                <td><button className='btn btn-danger' onClick={() => deleteItem(item.id)}><i className='fa fa-times'></i></button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                            : <div className='text-center'>
                                <p>No Item In Wishlist</p>
                                <Link to='/shop'><button className='btn btn-primary text-light'>Shop Now</button></Link>
                            </div>
                    }
                    <div>
                        <h5 className='bg-primary text-light my-5 py-2 text-center'>Order History Section</h5>
                    </div>
                    {
                        order.length ?
                            order.map((item, index) => {
                                return <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <div className="table-responsive">
                                            <table className='table table-bordered'>
                                                <tbody>
                                                    <tr>
                                                        <th>ID</th>
                                                        <td>{item.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Order Status</th>
                                                        <td>{item.orderstatus}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Payment Mode</th>
                                                        <td>{item.paymentmode}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Subtotal</th>
                                                        <td>&#8377;{item.subtotal}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>shipping</th>
                                                        <td>&#8377;{item.shipping}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total</th>
                                                        <td>&#8377;{item.total}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Date</th>
                                                        <td>{(new Date(item.date)).toLocaleDateString()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-8 col-sm-6">
                                        <div className='table-responsive'>
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <th>Pic</th>
                                                        <th>Name</th>
                                                        <th>Brand</th>
                                                        <th>Color</th>
                                                        <th>Size</th>
                                                        <th>Price</th>
                                                        <th>Qty</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        item.product.map((item, index) => {
                                                            return <tr>
                                                                <td><a href={`/product/${item.pic}`} target='_blank' ><img src={`/product/${item.pic}`} alt="" style={{ height: 70, width: 70 }} /></a></td>
                                                                <td>{item.name}</td>
                                                                <td>{item.brand}</td>
                                                                <td>{item.color}</td>
                                                                <td>{item.size}</td>
                                                                <td>&#8377;{item.price}</td>
                                                                <td>{item.qty}</td>
                                                                <td>&#8377;{item.total}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            })
                            : <div className='text-center'>
                                <p>No Order History Found</p>
                                <Link to='/shop'><button className='btn btn-primary text-light'>Shop Now</button></Link>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}
