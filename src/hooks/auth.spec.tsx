import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks'

import { AuthProvider, useAuth } from "./auth";

jest.mock('expo-google-app-auth', () => {
  return {
    logInAsync: () => {
      return {
        type: 'success',
        user: {
          id: 'any_email',
          email: 'any@email.com',
          name: 'Any Mail',
          photo: 'any_photo.png'
        }
      }
    }
  }
});

const Providers: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', async () => {

    const { result } = renderHook(() => useAuth(), { 
      wrapper: Providers 
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('any@email.com');

  });
}); 