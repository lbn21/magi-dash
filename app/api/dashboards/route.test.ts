import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/dashboards/repository', () => ({
    findAll: vi.fn(),
}));

import { GET } from './route';
import { findAll } from '@/lib/dashboards/repository';

describe('GET /api/dashboards', () => {
    beforeEach(() => {
        vi.mocked(findAll).mockReset();
    });

    it('returns the dashboards as JSON', async () => {
        vi.mocked(findAll).mockResolvedValue([
            {
                id: 1,
                title: 'Sales',
                createdAt: new Date('2026-01-01T00:00:00Z'),
                updatedAt: new Date('2026-01-02T00:00:00Z'),
            },
        ]);

        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body).toHaveLength(1);
        expect(body[0].title).toBe('Sales');
    });

    it('returns 500 when the repository throws an unknown error', async () => {
        vi.mocked(findAll).mockRejectedValue(new Error('boom'));

        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(500);
        expect(body.error.code).toBe('INTERNAL_ERROR');
    });
});