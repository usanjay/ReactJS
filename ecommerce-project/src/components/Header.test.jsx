import { describe, beforeEach, it, expect, vi } from 'vitest';
import Header from './Header';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import LogoWhite from '../assets/images/logo-white.png'


describe('Header Component', () => {
    let user;
    let cart;

    beforeEach(() => {
        vi.clearAllMocks();
        cart = [{
            "id": 6,
            "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            "quantity": 4,
            "deliveryOptionId": "1",
            "createdAt": "2025-11-03T17:57:33.401Z",
            "updatedAt": "2025-11-03T17:57:52.171Z"
        }]
        user = userEvent.setup();

    });

    it('displays the logo', () => {
        render(
            <MemoryRouter>
                <Header cart={cart} />
            </MemoryRouter>
        );

        expect(
            screen.getByTestId('header-logo')
        ).toHaveAttribute('src', '/src/assets/images/logo-white.png');
    });

    it('takes to homepage from logo when clicked', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>
        }

        render(
            <MemoryRouter>
                <Header cart={cart} />
                <Location />
            </MemoryRouter>
        );

        await user.click(
            screen.getByTestId('header-index-link')
        );

        expect(screen.getByTestId('url-path')).toHaveTextContent('/');
    })

    it('search the item correctly', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}{location.search}</div>
        }

        render(
            <MemoryRouter>
                <Header cart={cart} />
                <Location />
            </MemoryRouter>
        );

        const searchBar = screen.getByTestId('search-bar');
        await user.type(searchBar, 'plates');

        expect(searchBar).toHaveValue('plates');

        await user.click(screen.getByTestId('search-button'));

        expect(screen.getByTestId('url-path')).toHaveTextContent('/?search=plates')

    })

    it('goes to orders page from order button', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>
        }

        render(
            <MemoryRouter>
                <Header cart={cart} />
                <Location />
            </MemoryRouter>
        );
        await user.click(screen.getByTestId('orders-link'));
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders')
    });

    it('goes to cart page from cart icon', async () => {
        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>
        }

        render(
            <MemoryRouter>
                <Header cart={cart} />
                <Location />
            </MemoryRouter>
        );
        await user.click(screen.getByTestId('cart-link'));
        expect(screen.getByTestId('url-path')).toHaveTextContent('/checkout')
    });

    it('shows correct cart quantity', async () => {
        render(
            <MemoryRouter>
                <Header cart={cart} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('header-cart-quantity')).toHaveTextContent('4');
    });
});
