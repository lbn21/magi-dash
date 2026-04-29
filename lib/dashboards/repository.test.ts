import {describe, it, expect, vi, beforeEach} from 'vitest';

const queryMock = vi.fn();

vi.mock('@/lib/db', () => ({
    getPool: () => ({query: queryMock}),
}));

import {findAll} from './repository';

describe('dashboards repository', () => {
    beforeEach(() => {
        queryMock.mockReset();
    })

    it('returns parsed dashboards from the database', async () => {
        queryMock.mockResolvedValue([
            [
                {
                    id: 1,
                    title: 'Sales',
                    createdAt: new Date('2026-01-01T00:00:00Z'),
                    updatedAt: new Date('2026-01-02T00:00:00Z'),
                }
            ]
        ])

        const result = await findAll();

        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({id: 1, title: 'Sales'});
        expect(result[0].createdAt).toBeInstanceOf(Date);
    })

    it('throws when a row is missing required fields', async () => {
        queryMock.mockResolvedValue([[{id: 1}]]);

        await expect(findAll()).rejects.toThrow();
    });

})