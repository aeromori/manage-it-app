import History from "../../components/History/history";

const HistoryPage = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-orange-900 mb-1">Transaction History</h3>
            <p className="text-orange-700">
                Review and manage all your recorded expenses
            </p>

            <History />
        </div>
    );
};

export default HistoryPage;
