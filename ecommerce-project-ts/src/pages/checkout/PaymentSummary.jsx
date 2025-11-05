import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";
import axios from 'axios';

export function PaymentSummary({ paymentSummary, loadCart }) {
    const navigate = useNavigate();
    const placeOrder = async () => {
        await axios.post('/api/orders');
        await loadCart();
        navigate('/orders');
    }

    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>

            {paymentSummary && (
                <>
                    <div className="payment-summary-row" data-testid="products-cost">
                        <div>Items ({paymentSummary.totalItems}):</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.productCostCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row" data-testid="shipping-cost">
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.shippingCostCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row subtotal-row" data-testid="total-cost-before-tax">
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row" data-testid="tax-cost">
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.taxCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row total-row" data-testid="total-cost">
                        <div>Order total:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.totalCostCents)}
                        </div>


                    </div>

                    <button className="place-order-button button-primary"
                        data-testid="place-order-button" onClick={placeOrder}>
                        Place your order
                    </button>
                </>
            )}
        </div>
    );
}