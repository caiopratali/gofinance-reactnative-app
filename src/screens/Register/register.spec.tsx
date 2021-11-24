import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { Register } from '.';
import theme from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

describe('Register Screen', () => {
  it('should be open category modal when user click on button', async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId('modal-category');
    const categoryButton = getByTestId('category-button');

    fireEvent.press(categoryButton);

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});