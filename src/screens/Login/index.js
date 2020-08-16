import React, { useState, useCallback } from 'react';
import { StatusBar, Platform, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { StackActions } from '@react-navigation/native';

import useAuth from '../../hooks/useAuth';

import {
  Container,
  Header,
  HeaderTitle,
  TabContainer,
  TabItem,
  TabTitle,
  Form,
  Input,
  Button,
  ButtonTitle,
  LoadingArea,
} from './styles';

const Login = props => {
  const [activeTab, setActiveTab] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Hooks
  const auth = useAuth();

  // Helpers
  const enableSignInSubmit = Boolean(email) && Boolean(password) && !loading;
  const enableSignUpSubmit = enableSignInSubmit && Boolean(name);

  const handleSignIn = useCallback(async () => {
    if(email && password) {
      setLoading(true);
      const res = await auth.signin(email, password);
      setLoading(false);

      if(res.error) {
        alert(res.error);
      } else {
        props.setToken(res.token);
        props.navigation.dispatch(StackActions.replace('HomeStack'));
      }
    }
  }, [email, password]);

  const handleSignUp = useCallback(async () => {
    if(name && email && password) {
      setLoading(true);
      const res = await auth.signup(name, email, password);
      setLoading(false);

      if(res.error) {
        alert(res.error);
      } else {
        props.setToken(res.token);
        props.navigation.dispatch(StackActions.replace('HomeStack'));
      }
    }
  }, [name, email, password]);

  return (
    <>
      <Container>
        <StatusBar backgroundColor="#3574cb" />
        <Header>
          <HeaderTitle>DevsUber</HeaderTitle>
        </Header>

        <TabContainer>
          <TabItem onPress={() => setActiveTab('signin')} selected={activeTab === 'signin'}>
            <TabTitle>Login</TabTitle>
          </TabItem>
          <TabItem onPress={() => setActiveTab('signup')} selected={activeTab === 'signup'}>
            <TabTitle>Cadastro</TabTitle>
          </TabItem>
        </TabContainer>

        <Form behavior={Platform.OS === 'ios'? 'padding' : null}>
          {activeTab === 'signup' && (
            <Input
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Nome"
            />
          )}
          <Input
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder="Senha"
            secureTextEntry
            autoCapitalize="none"
          />

          {activeTab === 'signin' && (
            <Button onPress={handleSignIn} enabled={enableSignInSubmit}>
              <ButtonTitle enabled={enableSignInSubmit}>Entrar</ButtonTitle>
            </Button>
          )}
          {activeTab === 'signup' && (
            <Button onPress={handleSignUp} enabled={enableSignUpSubmit}>
              <ButtonTitle enabled={enableSignUpSubmit}>Cadastrar</ButtonTitle>
            </Button>
          )}
        </Form>
      </Container>
      {loading && (
        <LoadingArea>
          <ActivityIndicator color="#fff" size="large" />
        </LoadingArea>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    token: state.userReducer.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setToken: token =>  dispatch({ type: 'SET_TOKEN', payload: { token } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
