import Dashboard from "../components/Dashboard/dashboard";

export default async function Home() {
    return (
        <div className="space-y-6">
            <h3 className="text-orange-900 mb-1">
                {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                })}
            </h3>
            <p className="text-orange-700">
                Your financial overview at a glance
            </p>

            <Dashboard />
        </div>
    );
}
