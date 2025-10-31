import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';
import {DeliveryDate} from './DeliveryDate'

export function OrderSummary({ deliveryOptions, cart }) {
   return (
      <div className="order-summary">
         {
            deliveryOptions.length > 0 && cart.map(cartItem => {

               return (
                  <div key={cartItem.productId} className="cart-item-container">
                     <DeliveryDate deliveryOptions= {deliveryOptions} cartItem = {cartItem}/>

                     <div className="cart-item-details-grid">
                        <img className="product-image"
                           src={cartItem.product.image} />

                        <div className="cart-item-details">
                           <div className="product-name">
                              {cartItem.product.name}
                           </div>
                           <div className="product-price">
                              {formatMoney(cartItem.product.priceCents)}
                           </div>
                           <div className="product-quantity">
                              <span>
                                 Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                              </span>
                              <span className="update-quantity-link link-primary">
                                 Update
                              </span>
                              <span className="delete-quantity-link link-primary">
                                 Delete
                              </span>
                           </div>
                        </div>

                        <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} />
                     </div>
                  </div>
               )
            })
         }

      </div>
   );
}