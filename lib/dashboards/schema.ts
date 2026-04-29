import { z } from 'zod';

export const DashboardSchema = z.object({
    id: z.number().int().positive(),
    title: z.string().min(1),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type Dashboard = z.infer<typeof DashboardSchema>;