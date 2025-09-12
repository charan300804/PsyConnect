
'use client';

import { useState, useEffect } from 'react';
import StudentDetailsForm from './student-details-form';
import Questionnaire from './questionnaire';
import { phq9Questions, gad7Questions, ghq12Questions, questionnaireOptions, ghqOptions } from '@/lib/questionnaires';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import type { StudentDetailsFormValues } from './student-details-form';
import Link from 'next/link';
import { addStudentAssessmentData } from '@/lib/admin-data';
import { addDays, format, isBefore, parseISO } from 'date-fns';
import { useTranslation } from '@/context/language-context';
import { useAuth } from '@/context/auth-context';

export default function TestWizard() {
  const { t } = useTranslation();
  const { authState } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [studentDetails, setStudentDetails] = useState<StudentDetailsFormValues | null>(null);
  const [phq9Answers, setPhq9Answers] = useState<Record<string, number>>({});
  const [gad7Answers, setGad7Answers] = useState<Record<string, number>>({});
  const [ghq12Answers, setGhq12Answers] = useState<Record<string, number>>({});
  const [lastTestDate, setLastTestDate] = useState<string | null>(null);

  const steps = [t('test_step_details'), t('test_step_phq9'), t('test_step_gad7'), t('test_step_ghq12'), t('test_step_results')];

  useEffect(() => {
    if (authState.userName) {
      const storedDate = localStorage.getItem(`lastTestDate_${authState.userName}`);
      if (storedDate) {
        setLastTestDate(storedDate);
      }
    }
  }, [authState.userName]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStudentDetailsSubmit = (data: StudentDetailsFormValues) => {
    setStudentDetails(data);
    handleNext();
  };

  const calculateScore = (answers: Record<string, number>) => {
    return Object.values(answers).reduce((acc, val) => acc + (val || 0), 0);
  };

  const getInterpretation = (score: number, type: 'phq9' | 'gad7') => {
    if (type === 'phq9') {
      if (score <= 4) return t('interpretation_phq9_minimal');
      if (score <= 9) return t('interpretation_phq9_mild');
      if (score <= 14) return t('interpretation_phq9_moderate');
      if (score <= 19) return t('interpretation_phq9_moderately_severe');
      return t('interpretation_phq9_severe');
    }
    if (type === 'gad7') {
      if (score <= 4) return t('interpretation_gad7_minimal');
      if (score <= 9) return t('interpretation_gad7_mild');
      if (score <= 14) return t('interpretation_gad7_moderate');
      return t('interpretation_gad7_severe');
    }
    return '';
  };

  const handleTestCompletion = () => {
    const phq9Score = calculateScore(phq9Answers);
    const gad7Score = calculateScore(gad7Answers);
    const ghq12Score = calculateScore(ghq12Answers);

    if (studentDetails) {
        addStudentAssessmentData({
            id: studentDetails.studentId + Date.now(),
            studentName: studentDetails.name,
            studentId: studentDetails.studentId,
            school: studentDetails.school,
            phq9Score,
            gad7Score,
            ghq12Score,
            assessmentDate: format(new Date(), 'yyyy-MM-dd'),
        });
    }

    if (authState.userName) {
      const today = new Date().toISOString();
      localStorage.setItem(`lastTestDate_${authState.userName}`, today);
      setLastTestDate(today);
    }
  }

  useEffect(() => {
    if (steps[currentStep] === t('test_step_results')) {
        handleTestCompletion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, t]);
  
  const renderStep = () => {
    const canRetakeTest = !lastTestDate || isBefore(addDays(parseISO(lastTestDate), 15), new Date());
    const nextTestDate = lastTestDate ? format(addDays(parseISO(lastTestDate), 15), 'PPP') : '';

    switch (steps[currentStep]) {
      case t('test_step_details'):
        return <StudentDetailsForm onSubmit={handleStudentDetailsSubmit} />;
      case t('test_step_phq9'):
        return (
          <Questionnaire
            title="questionnaire_phq9_title"
            questions={phq9Questions}
            options={questionnaireOptions}
            answers={phq9Answers}
            setAnswers={setPhq9Answers}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case t('test_step_gad7'):
        return (
          <Questionnaire
            title="questionnaire_gad7_title"
            questions={gad7Questions}
            options={questionnaireOptions}
            answers={gad7Answers}
            setAnswers={setGad7Answers}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case t('test_step_ghq12'):
        return (
          <Questionnaire
            title="questionnaire_ghq12_title"
            questions={ghq12Questions}
            options={ghqOptions}
            answers={ghq12Answers}
            setAnswers={setGhq12Answers}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case t('test_step_results'):
            const phq9Score = calculateScore(phq9Answers);
            const gad7Score = calculateScore(gad7Answers);
            const ghq12Score = calculateScore(ghq12Answers);
            const needsSupport = phq9Score >= 10 || gad7Score >= 10;
            
            return (
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>{t('test_results_title', { name: studentDetails?.name })}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold">{t('test_results_phq9_score')}: {phq9Score}</h3>
                                <p>{getInterpretation(phq9Score, 'phq9')}</p>
                            </div>
                            <div>
                                <h3 className="font-bold">{t('test_results_gad7_score')}: {gad7Score}</h3>
                                <p>{getInterpretation(gad7Score, 'gad7')}</p>
                            </div>
                            <div>
                                <h3 className="font-bold">{t('test_results_ghq12_score')}: {ghq12Score}</h3>
                                <p>{t('interpretation_ghq12')}</p>
                            </div>
                        </div>

                        {needsSupport && (
                            <div className="p-4 bg-accent/10 border-l-4 border-accent text-accent-foreground rounded-r-lg">
                                <h4 className="font-bold mb-2">{t('support_recommended_title')}</h4>
                                <p className="text-sm">
                                    {t('support_recommended_description')}
                                </p>
                            </div>
                        )}
                        
                        <p className="text-sm text-muted-foreground pt-4">
                           {t('test_results_disclaimer')}
                        </p>
                        
                        {!canRetakeTest && (
                           <p className="text-sm text-center text-muted-foreground pt-4">
                                {t('test_retake_message', { date: nextTestDate })}
                           </p>
                        )}
                        
                        <CardFooter className="flex justify-between p-0">
                           <Button variant="outline" onClick={() => setCurrentStep(0)} disabled={!canRetakeTest}>{t('start_over_button')}</Button>
                           <Button asChild>
                             <Link href="/booking">{t('book_appointment_button')}</Link>
                           </Button>
                        </CardFooter>
                    </CardContent>
                </Card>
            );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index + 1}
                </div>
                <p className={`mt-2 text-sm text-center ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{step}</p>
              </div>
              {index < steps.length - 1 && <div className={`w-16 h-px ${index < currentStep ? 'bg-primary' : 'bg-muted'} mx-4`}></div>}
            </div>
          ))}
        </div>
      </div>
      {renderStep()}
    </div>
  );
}
