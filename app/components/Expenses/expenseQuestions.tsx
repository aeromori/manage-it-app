import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ExpenseQuestions = () => {
    const questions = [
        "Can I live without this item?",
        "Based on my financial situation, can I afford it?",
        "Will I actually use it?",
        "Do I have space for it?",
        "How did I come across it, and what is my emotional state?",
    ];

    return (
        <>
            <Card className="border-orange-300 bg-linear-to-br from-amber-50 to-orange-100">
                <CardHeader>
                    <CardTitle className="text-orange-900">
                        Kakeibo Wisdom
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-orange-800">
                    {questions.map((question, index) => (
                        <div className="flex items-start gap-3" key={index}>
                            <div className="flex items-center justify-center size-6 rounded-full bg-orange-600 text-white shrink-0 mt-0.5">
                                {index + 1}
                            </div>
                            <p className="text-orange-800">{question}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </>
    );
};

export default ExpenseQuestions;
