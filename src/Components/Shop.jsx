import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProduct } from '../Store/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../Store/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../Store/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../Store/ActionCreators/BrandActionCreators'


export default function Shop() {
    let [min, setMin] = useState(0)
    let [max, setMax] = useState(10000)
    let [search, setSearch] = useState("")
    let [product, setProduct] = useState([])
    let [flag, setFlag] = useState(false)
    let [filter, setFilter] = useState({
        mc: "",
        sc: "",
        br: ""
    })

    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)
    // console.log(filter);

    function getAPIData() {
        dispatch(getProduct())
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
        if (ProductStateData.length) {
            if (window.location.search.split("=")[1]) {
                categoryFilter(window.location.search.split("=")[1])
            }
            else {
                setProduct(ProductStateData.reverse())
            }
        }
    }

    function postSearch() {
        let ch = search.toLocaleLowerCase()
        setProduct(ProductStateData.filter((x) => x.name.toLocaleLowerCase().includes(ch) || x.maincategory.toLocaleLowerCase() === ch || x.subcategory.toLocaleLowerCase() === ch || x.brand.toLocaleLowerCase() === ch || x.color.toLocaleLowerCase() === ch || x.size.toLocaleLowerCase() === ch || x.description.toLocaleLowerCase().includes(ch)))
    }

    function sortFilter(e) {
        let value = e.target.value
        if (value === "1")
            product.sort((x, y) => y.id - x.id)
        else if (value === "2")
            product.sort((x, y) => y.finalprice - x.finalprice)
        else
            product.sort((x, y) => x.finalprice - y.finalprice)
        setFlag(!flag)
    }


    function categoryFilter(mc = "", sc = "", br = "", min = -1, max = -1) {
        let data = []
        setFilter({ mc: mc, sc: sc, br: br })
        if (mc === "" && sc === "" && br === "")
            data = ProductStateData
        else if (mc !== "" && sc === "" && br === "")
            data = ProductStateData.filter((x) => x.maincategory === mc)
        else if (mc === "" && sc !== "" && br === "")
            data = ProductStateData.filter((x) => x.subcategory === sc)
        else if (mc === "" && sc === "" && br !== "")
            data = ProductStateData.filter((x) => x.brand === br)
        else if (mc !== "" && sc !== "" && br === "")
            data = ProductStateData.filter((x) => x.maincategory === mc && x.subcategory === sc)
        else if (mc !== "" && sc === "" && br !== "")
            data = ProductStateData.filter((x) => x.maincategory === mc && x.brand === br)
        else if (mc === "" && sc !== "" && br !== "")
            data = ProductStateData.filter((x) => x.brand === br && x.subcategory === sc)
        else if (mc !== "" && sc !== "" && br !== "")
            data = ProductStateData.filter((x) => x.maincategory === mc && x.subcategory === sc && x.brand === br)
        if (min === -1 && max === -1) {
            setProduct(data)
        }
        else
            setProduct(data.filter((x) => x.finalprice >= min && x.finalprice <= max))
    }

    function applyPriceFilter() {
        categoryFilter()
    }

    useEffect(() => {
        getAPIData()
    }, [MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length, ProductStateData.length])

    return (
        <>
            {/* <!-- Single Page Header start --> */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}


            {/* <!-- Fruits Shop Start--> */}
            <div className="container-fluid fruite py-3">
                <div className="container py-3">
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-lg-9">
                                    <div className="input-group w-100 mx-auto d-flex">
                                        <input type="search" className="form-control p-2" name='name' onChange={(e) => setSearch(e.target.value)} placeholder="Search product with name, category ,brand,etc." aria-describedby="search-icon-1" />
                                        <span id="search-icon-1" onClick={postSearch} className="input-group-text p-2"><i className="fa fa-search"></i></span>
                                    </div>
                                </div>
                                <div className="col-lg-3 ">
                                    <div className="bg-light  ps-3 py-2 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="fruits"> Sorting:</label>
                                        <select id="fruits" name="fruitlist" onChange={sortFilter} className="border-0 form-select-sm bg-light me-3" form="fruitform">
                                            <option value="1">Latest Product</option>
                                            <option value="2">Price: High to Low</option>
                                            <option value="3">Price: Low to High</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4>MainCategories</h4>
                                                <div className="list-group">
                                                    <button className="list-group-item list-group-item-action" onClick={() => categoryFilter("", filter.sc, filter.br)}>All</button>
                                                    {
                                                        MaincategoryStateData.map((item, index) => <button key={index} className="list-group-item list-group-item-action" onClick={() => categoryFilter(item.name, filter.sc, filter.br)}>{item.name}</button>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <h4>Subcategory</h4>
                                                <div className="list-group">
                                                    <button className="list-group-item list-group-item-action" onClick={() => categoryFilter(filter.mc, "", filter.br)}>All</button>
                                                    {
                                                        SubcategoryStateData.map((item, index) => <button key={index} className="list-group-item list-group-item-action" onClick={() => categoryFilter(filter.mc, item.name, filter.br)}>{item.name}</button>)
                                                    }
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <h4>Brand</h4>
                                                <div className="list-group">
                                                    <button className="list-group-item list-group-item-action" onClick={() => categoryFilter(filter.mc, filter.sc, "")}>All</button>
                                                    {
                                                        BrandStateData.map((item, index) => <button key={index} className="list-group-item list-group-item-action" onClick={() => categoryFilter(filter.mc, filter.sc, item.name)}>{item.name}</button>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <h4 className="mb-2">Price</h4>
                                                <div className='d-flex'>
                                                    <input type="number" name="min" value={min} onChange={(e) => setMin(e.target.value)} className='form-control' placeholder='Min price' /> &nbsp;
                                                    <input type="number" name="max" value={max} onChange={(e) => setMax(e.target.value)} className='form-control' placeholder='Max price' />
                                                </div>
                                                <button className='btn btn-primary w-100 text-light mt-3' onClick={applyPriceFilter}>Apply Filter</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="row g-4 justify-content-center">
                                        {
                                            product.map((item, index) => {
                                                // console.log(item);
                                                return <div key={index} className="col-md-6  col-xl-4 mt-5">
                                                    <div className="rounded position-relative fruite-item card">
                                                        <div className="fruite-img">
                                                            <img src={`/product/${item.pic1}`} style={{ height: "250px" }} className="img-fluid w-100 rounded-top" alt="" />
                                                        </div>
                                                        <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{item.maincategory}/{item.subcategory}/{item.brand}</div>
                                                        <div className="p-4">
                                                            <h6 style={{ height: 35, textAlign: "start" }}> <strong>{item.name}</strong> </h6>
                                                            <p>Color:{item.color}, Size:{item.size}</p>
                                                            <p className="text-dark fs-5 fw-bold mb-0 text-center"><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></p>
                                                            <Link to={`/product/${item.id}`} className="btn border border-primary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <div className="col-12">
                                            <div className="pagination d-flex justify-content-center mt-5">
                                                <a href="#" className="rounded">&laquo;</a>
                                                <a href="#" className="active rounded">1</a>
                                                <a href="#" className="rounded">2</a>
                                                <a href="#" className="rounded">3</a>
                                                <a href="#" className="rounded">4</a>
                                                <a href="#" className="rounded">5</a>
                                                <a href="#" className="rounded">6</a>
                                                <a href="#" className="rounded">&raquo;</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Fruits Shop End--> */}

        </>
    )
}
