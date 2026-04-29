import {findAll} from "@/lib/dashboards/repository";

export const dynamic = 'force-dynamic';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

export default async function HomePage() {
    const dashboards = await findAll();

    return (
        <main className="dashboards-page">
            <h1>Dashboards</h1>
            {dashboards.length === 0 ? (
                <p>No dashboards yet.</p>
            ) : (
                <ul className="dashboards-list">
                    {dashboards.map((dashboard) => (
                        <li key={dashboard.id} className="dashboards-list__item">
                            <span className="dashboards-list__title">{dashboard.title}</span>
                            <time className="dashboards-list__date"
                                  dateTime={dashboard.createdAt.toISOString()}>
                                Created {dateFormatter.format(dashboard.createdAt)}
                            </time>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
