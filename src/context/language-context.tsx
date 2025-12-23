'use client';

import React, { createContext, useContext } from 'react';

// Hardcoded English translations to replace the deleted i18n system
const translations: Record<string, string> = {
  // Navigation
  'nav_chat': 'Chat',
  'nav_resources': 'Resources',
  'nav_booking': 'Booking',
  'nav_forum': 'Community',
  'nav_admin': 'Admin',
  'nav_counselor': 'Counselor',
  'nav_logout': 'Logout',
  'nav_login': 'Login',
  'nav_home': 'Home',
  'nav_test': 'Self Assessment',

  // Chat
  'chat_assistant_title': 'PsyConnect Assistant',
  'chat_assistant_subtitle': 'AI-Powered Psychological First Aid',
  'chat_initial_error': 'Sorry, I am having trouble connecting right now.',
  'chat_response_error': 'I encountered an error. Please try again.',
  'chat_input_placeholder': 'Type your message here...',
  'chat_disclaimer': 'This AI is for support, not a substitute for professional help. In emergencies, call emergency services.',
  'chat_no_messages': 'Start a conversation with our AI assistant.',

  // Booking
  'booking_form_title': 'Book an Appointment',
  'form_full_name': 'Full Name',
  'form_student_id': 'Student ID',
  'form_email': 'Email Address',
  'form_select_counselor': 'Select Counselor',
  'form_select_counselor_placeholder': 'Choose a counselor',
  'no_counselors_registered': 'No counselors available',
  'form_preferred_date': 'Preferred Date',
  'form_pick_date': 'Pick a date',
  'form_date_description': 'Choose a date for your appointment.',
  'form_reason_for_appointment': 'Reason for Appointment',
  'form_reason_placeholder': 'Briefly describe why you want to meet...',
  'book_appointment_button': 'Book Appointment',
  'toast_error_title': 'Error',
  'toast_counselor_not_found_description': 'Selected counselor not found.',
  'toast_appointment_booked_title': 'Appointment Booked',
  'toast_appointment_booked_description': 'Your appointment on {date} has been requested.',

  // Auth - Login
  'welcome_title': 'Welcome to PsyConnect',
  'welcome_subtitle': 'Please choose how you want to continue',
  'login_student': 'Login as Student',
  'login_counselor': 'Login as Counselor',
  'login_admin': 'Login as Admin',

  'login_title': 'Welcome Back',
  'login_subtitle': 'Enter your credentials to access your account',
  'student_login_title': 'Student Login',
  'login_form_subtitle': 'Enter your details to sign in',
  'counselor_login_title': 'Counselor Login',
  'admin_login_title': 'Admin Login',
  'login_button': 'Sign In',
  'login_here_link': 'Login here',
  'dont_have_account': 'Don\'t have an account?',
  'already_have_account': 'Already have an account?',
  'register_here_link': 'Register here',
  'back_to_login_selection': 'Back to selection',

  // Auth - Register
  'register_title': 'Create Account',
  'register_subtitle': 'Sign up to get started',
  'student_register_title': 'Student Registration',
  'student_register_subtitle': 'Create your student account to get started',
  'counselor_register_title': 'Counselor Registration',
  'counselor_register_subtitle': 'Register as a counselor (Current: {count}/{limit})',
  'counselor_register_limit_reached': 'Counselor limit reached. Registration is closed.',
  'admin_register_title': 'Admin Registration',
  'register_button': 'Sign Up',

  // Auth - Forms
  'email_label': 'Email',
  'password_label': 'Password',
  'name_label': 'Full Name',
  'school_label': 'School / Institution',
  'student_id_label': 'Student ID',
  'form_password': 'Password',
  'form_confirm_password': 'Confirm Password',

  // Auth - Toasts
  'toast_logged_in_title': 'Logged in successfully',
  'toast_student_logged_in_description': 'Welcome back, student!',
  'toast_counselor_logged_in_description': 'Welcome back, counselor!',
  'toast_admin_logged_in_description': 'Welcome back, admin!',
  'toast_login_failed_title': 'Login Failed',
  'toast_login_failed_description': 'Invalid email or password.',
  'toast_registration_success_title': 'Registration Successful',
  'toast_registration_success_description': 'Your account has been created.',
  'toast_counselor_registration_success_title': 'Counselor Registered',
  'toast_counselor_registration_success_description': 'Your counselor account has been created.',
  'toast_registration_error_title': 'Registration Failed',
  'toast_user_already_exists_description': 'A user with this email already exists.',
  'toast_counselor_limit_reached_description': 'Counselor limit has been reached.',

  // Resources
  'resources_title': 'Support Resources',
  'resources_subtitle': 'Curated mental health guides and articles',
  'read_more': 'Read More',
  'resources_page_title': 'Support Resources',
  'resources_page_subtitle': 'Curated mental health guides and articles to help you on your journey.',
  'resources_search_placeholder': 'Search resources...',
  'resources_all_tags': 'All Topics',
  'resources_no_results': 'No resources found matching your search.',

  // Forum
  'forum_title': 'Community Forum',
  'forum_subtitle': 'Connect with peers in a safe environment',
  'new_post_button': 'New Post',
  'create_post_title': 'Create a Post',
  'forum_create_post_form_title': 'Start a Discussion',
  'form_title': 'Title',
  'form_content': 'Content',
  'form_content_placeholder': 'Share your thoughts...',
  'cancel_button': 'Cancel',
  'create_post_button': 'Post',
  'toast_post_created_title': 'Post Created',
  'toast_post_created_description': 'Your post has been shared with the community.',
  'forum_moderator': 'Moderator',
  'forum_replies': 'replies',
  'forum_views': 'views',

  // Admin
  'admin_dashboard_title': 'Admin Dashboard',

  // Misc
  'test_page_title': 'Self Assessment',
  'test_page_subtitle': 'Take a quick check-in on your mental health',
  'test_step_details': 'Details',
  'test_step_phq9': 'Mood',
  'test_step_gad7': 'Anxiety',
  'test_step_ghq12': 'General',
  'test_step_results': 'Results',
  'student_details_title': 'Student Details',
  'student_details_subtitle': 'Please provide your information to continue.',
  'form_school': 'School / Institution',
  'next_button': 'Next',
  'back_button': 'Back',
  'start_over_button': 'Start Over',
  'questionnaire_phq9_title': 'PHQ-9 (Mood)',
  'questionnaire_gad7_title': 'GAD-7 (Anxiety)',
  'questionnaire_ghq12_title': 'GHQ-12 (General)',
  'question_phq9_1': 'Little interest or pleasure in doing things',
  'question_phq9_2': 'Feeling down, depressed, or hopeless',
  'question_phq9_3': 'Trouble falling or staying asleep, or sleeping too much',
  'question_phq9_4': 'Feeling tired or having little energy',
  'question_phq9_5': 'Poor appetite or overeating',
  'question_phq9_6': 'Feeling bad about yourself',
  'question_phq9_7': 'Trouble concentrating on things',
  'question_phq9_8': 'Moving or speaking so slowly that other people could have noticed',
  'question_phq9_9': 'Thoughts that you would be better off dead',
  'question_gad7_1': 'Feeling nervous, anxious, or on edge',
  'question_gad7_2': 'Not being able to stop or control worrying',
  'question_gad7_3': 'Worrying too much about different things',
  'question_gad7_4': 'Trouble relaxing',
  'question_gad7_5': 'Being so restless that it is hard to sit still',
  'question_gad7_6': 'Becoming easily annoyed or irritable',
  'question_gad7_7': 'Feeling afraid, as if something awful might happen',
  'question_ghq12_1': 'Been able to concentrate on whatever you\'re doing?',
  'question_ghq12_2': 'Lost much sleep over worry?',
  'question_ghq12_3': 'Felt that you were playing a useful part in things?',
  'question_ghq12_4': 'Felt capable of making decisions about things?',
  'question_ghq12_5': 'Felt constantly under strain?',
  'question_ghq12_6': 'Felt you couldn\'t overcome your difficulties?',
  'question_ghq12_7': 'Been able to enjoy your normal day-to-day activities?',
  'question_ghq12_8': 'Been able to face up to your problems?',
  'question_ghq12_9': 'Been feeling unhappy and depressed?',
  'question_ghq12_10': 'Lost confidence in yourself?',
  'question_ghq12_11': 'Thinking of yourself as a worthless person?',
  'question_ghq12_12': 'Been feeling reasonably happy, all things considered?',
  'option_not_at_all': 'Not at all',
  'option_several_days': 'Several days',
  'option_more_than_half_the_days': 'More than half the days',
  'option_nearly_every_day': 'Nearly every day',
  'option_better_than_usual': 'Better than usual',
  'option_same_as_usual': 'Same as usual',
  'option_less_than_usual': 'Less than usual',
  'option_much_less_than_usual': 'Much less than usual',
  'test_results_title': 'Assessment Results for {name}',
  'test_results_phq9_score': 'PHQ-9 Score',
  'test_results_gad7_score': 'GAD-7 Score',
  'test_results_ghq12_score': 'GHQ-12 Score',
  'interpretation_phq9_minimal': 'Minimal depression',
  'interpretation_phq9_mild': 'Mild depression',
  'interpretation_phq9_moderate': 'Moderate depression',
  'interpretation_phq9_moderately_severe': 'Moderately severe depression',
  'interpretation_phq9_severe': 'Severe depression',
  'interpretation_gad7_minimal': 'Minimal anxiety',
  'interpretation_gad7_mild': 'Mild anxiety',
  'interpretation_gad7_moderate': 'Moderate anxiety',
  'interpretation_gad7_severe': 'Severe anxiety',
  'interpretation_ghq12': 'General Health Questionnaire Score',
  'support_recommended_title': 'Support Recommended',
  'support_recommended_description': 'Based on your responses, we recommend reaching out to a counselor.',
  'test_results_disclaimer': 'These results are not a diagnosis. Please consult a professional.',
  'test_retake_message': 'You can take this assessment again on {date}.',
};

// Dummy context
const LanguageContext = createContext({});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{}}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const t = React.useCallback((key: string, params?: Record<string, string>) => {
    let text = translations[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  }, []);

  return { t };
}

export function useLanguage() {
  return {
    language: 'en',
    region: 'US',
    setLanguage: () => { },
  };
}
