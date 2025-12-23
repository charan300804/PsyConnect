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
import { addDays, format, isBefore, parseISO, isValid } from 'date-fns';
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
      if (storedDate && isValid(parseISO(storedDate))) {
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
    if (currentStep === steps.length - 1) { // Check for the last step
      handleTestCompletion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const renderStep = () => {
    const lastTestDateObj = lastTestDate ? parseISO(lastTestDate) : null;
    const canRetakeTest = !lastTestDateObj || !isValid(lastTestDateObj) || isBefore(addDays(lastTestDateObj, 15), new Date());
    const nextTestDate = lastTestDateObj && isValid(lastTestDateObj) ? format(addDays(lastTestDateObj, 15), 'PPP') : '';

    if (currentStep === 0 && !canRetakeTest) {
      return (
        <Card className="max-w-2xl mx-auto glass border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-black/20 text-center">
          <CardHeader className="pt-10">
            <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4 border border-primary/20">
              <span className="text-4xl">🎉</span>
            </div>
            <CardTitle className="text-3xl font-bold font-headline">{t('test_results_title', { name: studentDetails?.name || authState.userName || '' })}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground py-8 leading-relaxed max-w-lg mx-auto">
              {t('test_retake_message', { date: nextTestDate })}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pb-10">
            <Button asChild size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
              <Link href="/resources">{t('nav_resources')}</Link>
            </Button>
          </CardFooter>
        </Card>
      );
    }

    switch (currentStep) {
      case 0:
        return <StudentDetailsForm onSubmit={handleStudentDetailsSubmit} />;
      case 1:
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
      case 2:
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
      case 3:
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
      case 4:
        const phq9Score = calculateScore(phq9Answers);
        const gad7Score = calculateScore(gad7Answers);
        const ghq12Score = calculateScore(ghq12Answers);
        const needsSupport = phq9Score >= 10 || gad7Score >= 10;

        return (
          <Card className="max-w-3xl mx-auto glass border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-md bg-white/40 dark:bg-black/20">
            <CardHeader className="text-center pb-8 border-b border-white/10 dark:border-white/5">
              <CardTitle className="text-3xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent py-1">{t('test_results_title', { name: studentDetails?.name || authState.userName || '' })}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/40 dark:bg-white/5 p-6 rounded-xl border border-white/20 dark:border-white/10 shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
                  <h3 className="font-bold text-lg mb-2 text-primary">{t('test_results_phq9_score')}</h3>
                  <div className="text-4xl font-black mb-3 text-foreground/80">{phq9Score}</div>
                  <p className="text-sm font-medium text-muted-foreground">{getInterpretation(phq9Score, 'phq9')}</p>
                </div>
                <div className="bg-white/40 dark:bg-white/5 p-6 rounded-xl border border-white/20 dark:border-white/10 shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
                  <h3 className="font-bold text-lg mb-2 text-primary">{t('test_results_gad7_score')}</h3>
                  <div className="text-4xl font-black mb-3 text-foreground/80">{gad7Score}</div>
                  <p className="text-sm font-medium text-muted-foreground">{getInterpretation(gad7Score, 'gad7')}</p>
                </div>
                <div className="bg-white/40 dark:bg-white/5 p-6 rounded-xl border border-white/20 dark:border-white/10 shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
                  <h3 className="font-bold text-lg mb-2 text-primary">{t('test_results_ghq12_score')}</h3>
                  <div className="text-4xl font-black mb-3 text-foreground/80">{ghq12Score}</div>
                  <p className="text-sm font-medium text-muted-foreground">{t('interpretation_ghq12')}</p>
                </div>
              </div>

              {needsSupport && (
                <div className="p-6 bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl flex gap-4 mt-6">
                  <div className="text-3xl">🛡️</div>
                  <div>
                    <h4 className="font-bold text-lg text-red-700 dark:text-red-400 mb-2">{t('support_recommended_title')}</h4>
                    <p className="text-sm text-red-600/90 dark:text-red-300/90 leading-relaxed">
                      {t('support_recommended_description')}
                    </p>
                  </div>
                </div>
              )}

              <p className="text-xs text-center text-muted-foreground pt-4 max-w-lg mx-auto italic">
                {t('test_results_disclaimer')}
              </p>

              {!canRetakeTest && (
                <p className="text-sm text-center text-muted-foreground pt-4 font-medium">
                  {t('test_retake_message', { date: nextTestDate })}
                </p>
              )}

            </CardContent>
            <CardFooter className="flex justify-between items-center bg-muted/10 p-6 border-t border-white/10 dark:border-white/5">
              <Button variant="outline" onClick={() => setCurrentStep(0)} disabled={!canRetakeTest} className="border-white/20 hover:bg-white/10">{t('start_over_button')}</Button>
              <Button asChild size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                <Link href="/booking">{t('book_appointment_button')}</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex items-start justify-center min-w-max px-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center text-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm border-2 ${index <= currentStep
                      ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-primary/30'
                      : 'bg-muted text-muted-foreground border-transparent'
                    }`}
                >
                  <span className="font-bold text-sm">{index + 1}</span>
                </div>
                <p className={`mt-3 text-xs font-medium tracking-wide uppercase transition-colors duration-300 ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>{step}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 md:w-32 h-1 mx-2 rounded-full transition-all duration-700 ${index < currentStep ? 'bg-primary' : 'bg-muted/50'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      {renderStep()}
    </div>
  );
}
