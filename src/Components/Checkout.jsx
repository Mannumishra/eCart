import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileComponent from './ProfileComponent'
import { deleteCart, getCart } from '../Store/ActionCreators/CartActionCreators'
import { addCheckout } from '../Store/ActionCreators/CheckoutActionCreators'
import { useDispatch, useSelector } from 'react-redux'

export default function Checkout() {
  let [user, setUser] = useState({})
  let [cart, setCart] = useState([])
  let [subtotal, setSubtotal] = useState(0)
  let [shipping, setshipping] = useState(0)
  let [total, setTotal] = useState(0)
  let [mode, setMode] = useState("COD")
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let CartStateData = useSelector((state) => state.CartStateData)

  function placeOrder() {
    var item = {
      userid: localStorage.getItem("userid"),
      orderstatus: "Order is Placed",
      paymentstatus: "Pending",
      paymentmode: "COD",
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(),
      product: cart
    }
    dispatch(addCheckout(item))
    for (let item of cart)
      dispatch(deleteCart({ id: item.id }))
    navigate("/confirmation")
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
    dispatch(getCart())
    if (CartStateData.length) {
      let carts = CartStateData.filter((x) => x.userid === localStorage.getItem("userid"))
      // console.log(carts);
      setCart(carts)
      let subtotal = 0
      let shipping = 0
      let total = 0

      for (let item of carts) {
        subtotal = subtotal + item.total
      }
      if (subtotal > 0 && subtotal < 1000) {
        shipping = 150
      }
      total = subtotal + shipping
      setTotal(total)
      setSubtotal(subtotal)
      setshipping(shipping)
    }
  }

  // console.log(CartStateData);
  useEffect(() => {
    getAPIdata()
  }, [CartStateData.length])
  return (
    <>

      {/* <!-- Single Page Header start --> */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Checkout</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to='/' className='text-light'>Home</Link></li>
          <li className="breadcrumb-item active text-white">Checkout</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End --> */}


      {/* <!-- Checkout Page Start --> */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-md-12 col-lg-6 col-xl-7">
              <ProfileComponent heading="Billing Details" user={user} />
            </div>
            <div className="col-md-12 col-lg-6 col-xl-5">
              <h5 className='bg-primary text-light p-2 text-center'> Cart Items</h5>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Products</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cart.map((item, index) => {
                        return <tr key={index}>
                          <th scope="row">
                            <div className="d-flex align-items-center mt-2">
                              <img src={`/product/${item.pic}`} className="img-fluid rounded-circle" style={{ width: "50px", height: "50px" }} alt="" />
                            </div>
                          </th>
                          <td className="py-2">{item.name}</td>
                          <td className="py-2">&#8377;{item.price}</td>
                          <td className="py-2">{item.qty}</td>
                          <td className="py-2">&#8377;{item.total}</td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <th>Subtotal</th>
                      <td>&#8377;{subtotal}</td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td>&#8377;{shipping}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>&#8377;{total}</td>
                    </tr>
                    <tr>
                      <th>Payment Mode</th>
                      <td>
                        <select name="mode" className='form-select'>
                          <option value="COD">COD</option>
                          <option value="Net Banking">Net Banking</option>
                          <option value="Card">Card</option>
                          <option value="UPI ">UPI </option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                <button type="button" className="btn bg-primary text-light  py-3 px-4 text-uppercase w-100" onClick={placeOrder}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Checkout Page End --> */}
    </>
  )
}
