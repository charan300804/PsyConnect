
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

const steps = ['Student Details', 'PHQ-9', 'GAD-7', 'GHQ-12', 'Results'];

export default function TestWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [studentDetails, setStudentDetails] = useState<StudentDetailsFormValues | null>(null);
  const [phq9Answers, setPhq9Answers] = useState<Record<string, number>>({});
  const [gad7Answers, setGad7Answers] = useState<Record<string, number>>({});
  const [ghq12Answers, setGhq12Answers] = useState<Record<string, number>>({});
  const [lastTestDate, setLastTestDate] = useState<string | null>(null);

  useEffect(() => {
    const storedDate = localStorage.getItem('lastTestDate');
    if (storedDate) {
      setLastTestDate(storedDate);
    }
  }, []);

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
      if (score <= 4) return 'Minimal depression';
      if (score <= 9) return 'Mild depression';
      if (score <= 14) return 'Moderate depression';
      if (score <= 19) return 'Moderately severe depression';
      return 'Severe depression';
    }
    if (type === 'gad7') {
      if (score <= 4) return 'Minimal anxiety';
      if (score <= 9) return 'Mild anxiety';
      if (score <= 14) return 'Moderate anxiety';
      return 'Severe anxiety';
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

    const today = new Date().toISOString();
    localStorage.setItem('lastTestDate', today);
    setLastTestDate(today);
  }

  useEffect(() => {
    if (steps[currentStep] === 'Results') {
        handleTestCompletion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);
  
  const renderStep = () => {
    const canRetakeTest = !lastTestDate || isBefore(addDays(parseISO(lastTestDate), 15), new Date());
    const nextTestDate = lastTestDate ? format(addDays(parseISO(lastTestDate), 15), 'PPP') : '';

    switch (steps[currentStep]) {
      case 'Student Details':
        return <StudentDetailsForm onSubmit={handleStudentDetailsSubmit} />;
      case 'PHQ-9':
        return (
          <Questionnaire
            title="PHQ-9: Over the last 2 weeks, how often have you been bothered by any of the following problems?"
            questions={phq9Questions}
            options={questionnaireOptions}
            answers={phq9Answers}
            setAnswers={setPhq9Answers}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'GAD-7':
        return (
          <Questionnaire
            title="GAD-7: Over the last 2 weeks, how often have you been bothered by the following problems?"
            questions={gad7Questions}
            options={questionnaireOptions}
            answers={gad7Answers}
            setAnswers={setGad7Answers}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'GHQ-12':
        return (
          <Questionnaire
            title="GHQ-12: Please tell us how you have been feeling over the past few weeks."
            questions={ghq12Questions}
            options={ghqOptions}
            answers={ghq12Answers}
            setAnswers={setGhq12Answers}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
        case 'Results':
            const phq9Score = calculateScore(phq9Answers);
            const gad7Score = calculateScore(gad7Answers);
            const ghq12Score = calculateScore(ghq12Answers);
            const needsSupport = phq9Score >= 10 || gad7Score >= 10;
            
            return (
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Assessment Results for {studentDetails?.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold">PHQ-9 Score: {phq9Score}</h3>
                                <p>{getInterpretation(phq9Score, 'phq9')}</p>
                            </div>
                            <div>
                                <h3 className="font-bold">GAD-7 Score: {gad7Score}</h3>
                                <p>{getInterpretation(gad7Score, 'gad7')}</p>
                            </div>
                            <div>
                                <h3 className="font-bold">GHQ-12 Score: {ghq12Score}</h3>
                                <p>A higher score suggests a greater level of psychological distress.</p>
                            </div>
                        </div>

                        {needsSupport && (
                            <div className="p-4 bg-accent/10 border-l-4 border-accent text-accent-foreground rounded-r-lg">
                                <h4 className="font-bold mb-2">Support Recommended</h4>
                                <p className="text-sm">
                                    Your results indicate you may be experiencing significant distress. It can be very helpful to talk to someone.
                                    Please consider booking an appointment with one of our on-campus counsellors.
                                </p>
                            </div>
                        )}
                        
                        <p className="text-sm text-muted-foreground pt-4">
                            Disclaimer: These results are not a diagnosis. Please consult a healthcare professional for a formal diagnosis and treatment.
                        </p>
                        
                        {!canRetakeTest && (
                           <p className="text-sm text-center text-muted-foreground pt-4">
                                You can take the assessment again after {nextTestDate}.
                           </p>
                        )}
                        
                        <CardFooter className="flex justify-between p-0">
                           <Button variant="outline" onClick={() => setCurrentStep(0)} disabled={!canRetakeTest}>Start Over</Button>
                           <Button asChild>
                             <Link href="/booking">Book an Appointment</Link>
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
                <p className={`mt-2 text-sm ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{step}</p>
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
