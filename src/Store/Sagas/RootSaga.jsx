import { all } from "redux-saga/effects"

import maincategorySagas from "./MaincategorySagas"
import subcategorySagas from "./SubcategorySagas"
import brandSagas from "./BrandSagas"
import productSagas from "./ProductSagas"
import testimonialSagas from "./TestimonialSagas"
import cartSagas from "./cartSagas"
import checkoutSagas from "./CheckoutSagas"
import wishlistSagas from "./WishlistSagas"
import contactUsSaga from "./ContactUsSagas"
import newsletterSaga from "./NewsletterSagas"

export default function* RootSaga() {
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        productSagas(),
        testimonialSagas(), , cartSagas(), checkoutSagas(), wishlistSagas(), contactUsSaga(), newsletterSaga()
    ])
}