import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks'
import { mocked } from 'ts-jest/utils';
import { logInAsync } from 'expo-google-app-auth';

import { AuthProvider, useAuth } from "./auth";

jest.mock('expo-google-app-auth');

const Providers: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

describe('Auth Hook', async () => {
  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = mocked(logInAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'success',
      user: {
        id: 'any_id',
        email: 'any@email.com',
        name: 'Any Name',
        photo: 'any_photo.png'
      }
    });

    const { result } = renderHook(() => useAuth(), { 
      wrapper: Providers 
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('any@email.com');
  });

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(logInAsync as any);

    googleMocked.mockReturnValueOnce({ type: 'cancel' });

    const { result } = renderHook(() => useAuth(), { 
      wrapper: Providers 
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });

  it('should be error with incorrectly Google parametes', async () => {
    const { result } = renderHook(() => useAuth(), { 
      wrapper: Providers 
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch (error) {
      expect(result.current.user).toEqual({});
    }
  });
}); 