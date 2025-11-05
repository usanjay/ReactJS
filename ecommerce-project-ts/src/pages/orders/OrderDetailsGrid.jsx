import { Fragment } from "react";
import { CartItemsDetails } from "./CartItemsDetails";

export function OrderDetailsGrid({ order, loadCart }) {
    return (
        <div className="order-details-grid">
            {order.products.map(orderProduct => {
                return (
                    <Fragment key={orderProduct.productId}>
                        <CartItemsDetails orderProduct={orderProduct} order={order} loadCart={loadCart} />
                    </Fragment>
                )
            })}
        </div>
    );
}