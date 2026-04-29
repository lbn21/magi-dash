import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/lib/dashboards/repository', () => ({
    findAll: vi.fn().mockResolvedValue([
        {
            id: 1,
            title: 'Sales',
            createdAt: new Date('2026-01-01T00:00:00Z'),
            updatedAt: new Date('2026-01-02T00:00:00Z'),
        },
    ]),
}));

import HomePage from './page';

describe('HomePage', () => {
    it('renders the dashboard titles', async () => {
        const ui = await HomePage();
        render(ui);

        expect(screen.getByRole('heading', { name: /dashboards/i })).toBeInTheDocument();
        expect(screen.getByText('Sales')).toBeInTheDocument();
    });
});