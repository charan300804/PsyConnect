'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/context/language-context';

interface QuestionnaireProps {
  title: string;
  questions: { id: string; text: string }[];
  options: { value: number; label: string }[];
  answers: Record<string, number>;
  setAnswers: (answers: Record<string, number>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Questionnaire({ title, questions, options, answers, setAnswers, onNext, onBack }: QuestionnaireProps) {
  const { t } = useTranslation();

  const handleOptionChange = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: parseInt(value, 10),
    });
  };

  const isComplete = questions.every((q) => answers[q.id] !== undefined);

  return (
    <Card className="max-w-3xl mx-auto glass border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-black/20">
      <CardHeader className="text-center pb-8 border-b border-white/10 dark:border-white/5">
        <CardTitle className="text-2xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent py-1">{t(title)}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 pt-8">
        {questions.map((question, index) => (
          <div key={question.id} className="space-y-4 p-6 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
            <div className="flex gap-4">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                {index + 1}
              </span>
              <p className="font-medium text-lg leading-relaxed pt-0.5 text-foreground/90">{t(question.text)}</p>
            </div>

            <RadioGroup
              onValueChange={(value) => handleOptionChange(question.id, value)}
              value={answers[question.id]?.toString() || ''}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2"
            >
              {options.map((option) => {
                const optionId = `${question.id}-${option.value}`;
                const isSelected = answers[question.id] === option.value;
                return (
                  <div 
                    key={option.value} 
                    className="relative w-full cursor-pointer"
                    onClick={() => handleOptionChange(question.id, option.value.toString())}
                  >
                    <RadioGroupItem 
                      value={option.value.toString()} 
                      id={optionId}
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor={optionId}
                      className={`flex flex-col items-center justify-center p-4 min-h-[80px] rounded-lg border-2 transition-all duration-200 text-center text-sm font-medium cursor-pointer w-full ${
                        isSelected
                          ? 'border-primary bg-primary/15 text-primary shadow-md'
                          : 'border-muted/40 bg-muted/20 hover:bg-muted/40 hover:border-muted/60'
                      }`}
                    >
                      {t(option.label)}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between pt-6 border-t border-white/10 dark:border-white/5 p-6 bg-muted/10">
        <Button variant="outline" size="lg" onClick={onBack} className="min-w-[100px] border-white/20 hover:bg-white/10">{t('back_button')}</Button>
        <Button size="lg" onClick={onNext} disabled={!isComplete} className="min-w-[100px] shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">{t('next_button')}</Button>
      </CardFooter>
    </Card>
  );
}
