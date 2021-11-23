import React from 'react';
import { TextInput, Text, View, Button } from 'react-native';

export const Profile: React.FC = () => {
  return (
    <View>
      <Text testID="text-title">Perfil</Text>
      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Caio"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Pratali"
      />
      <Button 
        title="Salvar" 
        onPress={() => {}} 
      />
    </View>
  );
}