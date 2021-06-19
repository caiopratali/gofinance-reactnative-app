import React from "react";
import { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import AppleSVG from '../../assets/apple.svg';
import GoogleSVG from '../../assets/google.svg';
import LogoSVG from '../../assets/logo.svg';

import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

import { Container, Header, TitleWrapper, Title, SignInTitle, Footer, FooterWrapper } from './styles';

export function SignIn() {
  const [ isLoading, setIsLoading ] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar')
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar')
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples 
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton svg={GoogleSVG} title="Entrar com Google" onPress={handleSignInWithGoogle} />
          <SignInSocialButton svg={AppleSVG} title="Entrar com Apple" onPress={handleSignInWithApple} />
        </FooterWrapper>
        { isLoading && <ActivityIndicator color={theme.colors.shape} style={{ marginTop: 18 }} /> }
      </Footer>
    </Container>
  );
}