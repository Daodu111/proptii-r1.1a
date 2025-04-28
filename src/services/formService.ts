import { DatabaseFormSubmission } from '../types/database';

const API_BASE_URL = 'https://proptii-referencing-api.azurewebsites.net/api';

export interface FormSubmission {
  formData: any;
  userId: string;
  submittedAt: string;
  formType: string;
}

export const submitFormToDatabase = async (submission: FormSubmission): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/forms/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(submission),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Server response:', errorData);
      throw new Error(errorData?.message || 'Failed to submit form to database');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

export const submitReferencingForm = async (formData: any, userId: string): Promise<void> => {
  const submission: FormSubmission = {
    formData,
    userId,
    submittedAt: new Date().toISOString(),
    formType: 'referencing'
  };

  await submitFormToDatabase(submission);
};
