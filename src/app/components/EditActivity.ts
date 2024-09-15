'use server';
import { cookies } from 'next/headers';
import { Activity } from '../page';

// Function to update an activity
export const updateActivity = async (
  id: string,
  updatedData: Partial<Activity>
): Promise<Activity> => {
  try {
    const cookieStore = cookies();
    let token = cookieStore.get('Authorization')?.value as string;
    token = decodeURIComponent(token);
    const tokenParts = token.split(' ');
    const tokens = tokenParts[1];
    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens}`, // Replace with your actual token if needed
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    return data as Activity;
  } catch (error) {
    console.error('Failed to update activity:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const deleteActivity = async (id: string): Promise<void> => {
  try {
    const cookieStore = cookies();
    const token = decodeURIComponent(
      cookieStore.get('Authorization')?.value ?? ''
    );
    const tokenValue = token.split(' ')[1];

    const response = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Something went wrong');
    }
  } catch (error) {
    console.error('Failed to delete activity:', error);
    throw error;
  }
};
