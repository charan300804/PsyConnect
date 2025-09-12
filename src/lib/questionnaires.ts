
export const phq9Questions = [
    { id: 'phq1', text: 'question_phq9_1' },
    { id: 'phq2', text: 'question_phq9_2' },
    { id: 'phq3', text: 'question_phq9_3' },
    { id: 'phq4', text: 'question_phq9_4' },
    { id: 'phq5', text: 'question_phq9_5' },
    { id: 'phq6', text: 'question_phq9_6' },
    { id: 'phq7', text: 'question_phq9_7' },
    { id: 'phq8', text: 'question_phq9_8' },
    { id: 'phq9', text: 'question_phq9_9' },
];

export const gad7Questions = [
    { id: 'gad1', text: 'question_gad7_1' },
    { id: 'gad2', text: 'question_gad7_2' },
    { id: 'gad3', text: 'question_gad7_3' },
    { id: 'gad4', text: 'question_gad7_4' },
    { id: 'gad5', text: 'question_gad7_5' },
    { id: 'gad6', text: 'question_gad7_6' },
    { id: 'gad7', text: 'question_gad7_7' },
];

export const ghq12Questions = [
    { id: 'ghq1', text: 'question_ghq12_1' },
    { id: 'ghq2', text: 'question_ghq12_2' },
    { id: 'ghq3', text: 'question_ghq12_3' },
    { id: 'ghq4', text: 'question_ghq12_4' },
    { id: 'ghq5', text: 'question_ghq12_5' },
    { id: 'ghq6', text: 'question_ghq12_6' },
    { id: 'ghq7', text: 'question_ghq12_7' },
    { id: 'ghq8', text: 'question_ghq12_8' },
    { id: 'ghq9', text: 'question_ghq12_9' },
    { id: 'ghq10', text: 'question_ghq12_10' },
    { id: 'ghq11', text: 'question_ghq12_11' },
    { id: 'ghq12', text: 'question_ghq12_12' },
];

export const questionnaireOptions = [
    { value: 0, label: 'option_not_at_all' },
    { value: 1, label: 'option_several_days' },
    { value: 2, label: 'option_more_than_half_the_days' },
    { value: 3, label: 'option_nearly_every_day' },
];

export const ghqOptions = [
    { value: 0, label: 'option_better_than_usual' },
    { value: 1, label: 'option_same_as_usual' },
    { value: 2, label: 'option_less_than_usual' },
    { value: 3, label: 'option_much_less_than_usual' },
];
  
// Note for GHQ scoring:
// Items 2, 5, 6, 9, 10, 11 are reverse scored for some scoring methods.
// Using the 0-0-1-1 scoring method is common.
// For simplicity, we can use a simple scoring where higher indicates more distress.
// Let's stick to a simple sum for now.
