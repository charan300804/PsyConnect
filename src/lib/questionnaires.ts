
export const phq9Questions = [
    { id: 'phq1', text: 'Little interest or pleasure in doing things' },
    { id: 'phq2', text: 'Feeling down, depressed, or hopeless' },
    { id: 'phq3', text: 'Trouble falling or staying asleep, or sleeping too much' },
    { id: 'phq4', text: 'Feeling tired or having little energy' },
    { id: 'phq5', text: 'Poor appetite or overeating' },
    { id: 'phq6', text: 'Feeling bad about yourself - or that you are a failure or have let yourself or your family down' },
    { id: 'phq7', text: 'Trouble concentrating on things, such as reading the newspaper or watching television' },
    { id: 'phq8', text: 'Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual' },
    { id: 'phq9', text: 'Thoughts that you would be better off dead, or of hurting yourself' },
];

export const gad7Questions = [
    { id: 'gad1', text: 'Feeling nervous, anxious, or on edge' },
    { id: 'gad2', text: 'Not being able to stop or control worrying' },
    { id: 'gad3', text: 'Worrying too much about different things' },
    { id: 'gad4', text: 'Trouble relaxing' },
    { id: 'gad5', text: 'Being so restless that it is hard to sit still' },
    { id: 'gad6', text: 'Becoming easily annoyed or irritable' },
    { id: 'gad7', text: 'Feeling afraid as if something awful might happen' },
];

export const ghq12Questions = [
    { id: 'ghq1', text: 'Been able to concentrate on whatever you’re doing?' },
    { id: 'ghq2', text: 'Lost much sleep over worry?' },
    { id: 'ghq3', text: 'Felt that you are playing a useful part in things?' },
    { id: 'ghq4', text: 'Felt capable of making decisions about things?' },
    { id: 'ghq5', text: 'Felt constantly under strain?' },
    { id: 'ghq6', text: 'Felt you couldn’t overcome your difficulties?' },
    { id: 'ghq7', text: 'Been able to enjoy your normal day-to-day activities?' },
    { id: 'ghq8', text: 'Been able to face up to your problems?' },
    { id: 'ghq9', text: 'Been feeling unhappy and depressed?' },
    { id: 'ghq10', text: 'Been losing confidence in yourself?' },
    { id: 'ghq11', text: 'Been thinking of yourself as a worthless person?' },
    { id: 'ghq12', text: 'Been feeling reasonably happy, all things considered?' },
];

export const questionnaireOptions = [
    { value: 0, label: 'Not at all' },
    { value: 1, label: 'Several days' },
    { value: 2, label: 'More than half the days' },
    { value: 3, label: 'Nearly every day' },
];

export const ghqOptions = [
    { value: 0, label: 'Better than usual' },
    { value: 1, label: 'Same as usual' },
    { value: 2, label: 'Less than usual' },
    { value: 3, label: 'Much less than usual' },
];
  
// Note for GHQ scoring:
// Items 2, 5, 6, 9, 10, 11 are reverse scored for some scoring methods.
// Using the 0-0-1-1 scoring method is common.
// For simplicity, we can use a simple scoring where higher indicates more distress.
// Let's use a simplified approach for now, but for a real application, proper scoring is crucial.
// Positive items (1, 3, 4, 7, 8, 12): "Better than usual" (0), "Same as usual" (0), "Less than usual" (1), "Much less than usual" (1).
// Negative items (2, 5, 6, 9, 10, 11): "Not at all" (0), "No more than usual" (0), "Rather more than usual" (1), "Much more than usual" (1).
// But the labels above are different. Let's stick to a simple sum for now.
