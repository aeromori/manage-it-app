import "../globals.css";
import { Inter } from "next/font/google";
import BaseLayout from "../components/Layout/baseLayout";
import ReduxProvider from "../provider";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <div>
                <BaseLayout>{children}</BaseLayout>
            </div>
        </ReduxProvider>
    );
}
