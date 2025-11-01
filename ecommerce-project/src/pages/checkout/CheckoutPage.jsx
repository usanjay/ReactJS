import axios from 'axios'
import { useState, useEffect } from 'react'
import CheckoutHeader from './CheckoutHeader'

import './CheckoutPage.css'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'

function CheckoutPage({ cart, loadCart }) {
   const [deliveryOptions, setDeliveryOptions] = useState([]);
   const [paymentSummary, setPaymentSummary] = useState(null);

   useEffect(() => {
      const fetchPaymentSummaryData = async () => {
         const response = await axios.get('/api/payment-summary')
         setPaymentSummary(response.data);
      }
      fetchPaymentSummaryData();
   }, [cart])

   useEffect(() => {
      const fetchDeliveryOptionData = async () => {
         let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
         setDeliveryOptions(response.data)
      }
      fetchDeliveryOptionData();
   }, [])



   return (
      <>
         <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
         <title>Checkout</title>

         <CheckoutHeader cart={cart} />

         <div className="checkout-page">
            <div className="page-title">Review your order</div>

            <div className="checkout-grid">
               <OrderSummary
                  deliveryOptions={deliveryOptions}
                  cart={cart}
                  loadCart={loadCart}
               />

               <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
            </div>
         </div>
      </>
   )
}

export default CheckoutPage