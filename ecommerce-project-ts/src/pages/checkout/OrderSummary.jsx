import { CartItemDetails } from './CartItemDetails';

export function OrderSummary({ deliveryOptions, cart, loadCart }) {
   return (
      <div className="order-summary">
         {
            deliveryOptions.length > 0 && cart.map(cartItem => {
               
               return (
                  <CartItemDetails
                     key={cartItem.id}
                     cartItem={cartItem}
                     loadCart={loadCart}
                     deliveryOptions={deliveryOptions}
                  />
               )
            })
         }

      </div>
   );
}