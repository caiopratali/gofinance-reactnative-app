import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor valido').positive('O valor não pode ser negativo').required('O valor é obrigatório'),
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const { user } = useAuth();
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'categoria'
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const navigation = useNavigation();

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if(!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      // console.log(newTransaction.transactionType);

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]
      
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'categoria'
      });
      reset();
      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar.")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>
            Cadastro
          </Title>
        </Header>
        <Form>
          <Fields>
            <InputForm 
              name="name" 
              control={control} 
              placeholder="Nome" 
              error={errors.name && errors.name.message} 
              autoCapitalize="sentences" 
              autoCorrect={false} 
            />
            <InputForm 
              name="amount" 
              control={control} 
              placeholder="Preço" 
              error={errors.amount && errors.amount.message} 
              keyboardType="numeric" 
            />
            <TransactionTypes>
              <TransactionTypeButton 
                title="Income" 
                type="up" 
                onPress={() => handleTransactionTypeSelect('up')} 
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton 
                title="Outcome" 
                type="down" 
                onPress={() => handleTransactionTypeSelect('down')} 
                isActive={transactionType === 'down'}
              />
            </TransactionTypes>
            <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}