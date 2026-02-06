import Income from "../../components/Income/income";

const IncomePage = () => {
    return (
        <div className="space-y-6">
            <h3 className="text-orange-900 mb-1">Income and Savings</h3>
            <p className="text-orange-700">
                Set your monthly income and savings goal - the foundation of
                Kakeibo
            </p>

            <Income />
        </div>
    );
};

export default IncomePage;
