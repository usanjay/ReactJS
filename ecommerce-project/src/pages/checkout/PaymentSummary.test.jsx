import { describe, it, beforeEach, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { PaymentSummary } from './PaymentSummary';
import { MemoryRouter, useLocation } from 'react-router';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('Payment Summary Component', () => {
    let paymentSummary;
    let loadCart;
    const user = userEvent.setup();

    beforeEach(async () => {
        paymentSummary = {
            "totalItems": 1,
            "productCostCents": 799,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 799,
            "taxCents": 80,
            "totalCostCents": 879
        };

        loadCart = vi.fn();
        axios.post = vi.fn();

        function Location() {
            const location = useLocation();
            return (
                <div data-testid="url-path">{location.pathname}</div>
            )
        }

        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                <Location />
            </MemoryRouter>
        )
    });

    it('shows correct values', () => {
        expect(
            screen.getByText('Items (1):')
        ).toBeInTheDocument;

        expect(
            within(screen.getByTestId('products-cost'))
                .getByText('$7.99')
        ).toBeInTheDocument;

        expect(
            within(screen.getByTestId('shipping-cost'))
                .getByText('$0.00')
        ).toBeInTheDocument;

        expect(
            within(screen.getByTestId('total-cost-before-tax'))
                .getByText('$7.99')
        ).toBeInTheDocument;

        expect(
            within(screen.getByTestId('tax-cost'))
                .getByText('$0.80')
        ).toBeInTheDocument;

        expect(
            within(screen.getByTestId('total-cost'))
                .getByText('$8.79')
        ).toBeInTheDocument;
    });

    it('place an order', async () => {
        
        await user.click(
            screen.getByTestId('place-order-button')
        );

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();

        expect(
            screen.getByTestId('url-path')
        ).toHaveTextContent('/orders')
    })


})