import "../globals.css";
import ReduxProvider from "../provider";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ReduxProvider>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center px-4">
                {children}
            </div>
        </ReduxProvider>
    );
}
