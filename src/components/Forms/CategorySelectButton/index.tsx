import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Category, Icon } from './styles';

interface CategorySelectProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({ title, onPress, testID }: CategorySelectProps) {
  return (
    <Container onPress={onPress} testID={testID}>
      <Category>
        {title}
      </Category>
      <Icon name="chevron-down" />
    </Container>
  );
}