import type {ReactNode} from "react";
import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "MagiDash",
    description: "Visualise dashboards across your organisation.",
};

export default function RootLayout({children,}: { children: ReactNode; }) {
    return (
        <html lang="en-GB">
            <body>{children}</body>
        </html>
    );
}
