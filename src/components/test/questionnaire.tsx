
'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

type Question = {
  id: string;
  text: string;
};

type Option = {
  value: number;
  label: string;
};

type Props = {
  title: string;
  questions: Question[];
  options: Option[];
  answers: Record<string, number>;
  setAnswers: (answers: Record<string, number>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function Questionnaire({ title, questions, options, answers, setAnswers, onNext, onBack }: Props) {
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: parseInt(value, 10),
    });
  };

  const allQuestionsAnswered = questions.every((q) => answers[q.id] !== undefined);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id}>
            <p className="font-medium mb-4">{`${index + 1}. ${question.text}`}</p>
            <RadioGroup
              value={answers[question.id]?.toString()}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-8"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
                  <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={!allQuestionsAnswered}>Next</Button>
      </CardFooter>
    </Card>
  );
}
