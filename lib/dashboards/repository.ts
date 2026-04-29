import { getPool } from '@/lib/db';
import { Dashboard, DashboardSchema } from './schema';

export async function findAll(): Promise<Dashboard[]> {
    const [rows] = await getPool().query(
        'SELECT id, title, createdAt, updatedAt FROM dashboards ORDER BY createdAt DESC'
    );
    return DashboardSchema.array().parse(rows);
}