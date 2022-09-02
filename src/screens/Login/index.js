import React, { useState } from 'react';
import { StatusBar, Platform, Text, ActivityIndicator } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import useDevsUberApi from '../../useDevsUberApi';
import c from './styled';

const Page = (props) => {
  const api = useDevsUberApi();

  const [activeMenu, setActiveMenu] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (email && password) {
      setLoading(true);
      const res = await api.signin(email, password);
      setLoading(false);

      if (res.error) {
        alert(res.error);
      } else {
        props.setToken(res.token);
        props.setName(res.name);
        props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'HomeDrawer' })
          ]
        }));
      }
    }
  }

  const handleSignUp = async () => {
    if (name && email && password) {
      setLoading(true);
      const res = await api.signup(name, email, password);
      setLoading(false);

      if (res.error) {
        alert(res.error);
      } else {
        props.setToken(res.token);
        props.setName(res.name);
        props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'HomeDrawer' })
          ]
        }));
      }
    }
  }

  return (
    <c.Container behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <StatusBar barStyle="light-content" backgroundColor={"#3574CB"} />
      <c.Header>
        <c.HeaderTitle>DevsUber</c.HeaderTitle>
      </c.Header>
      <c.Menu>
        <c.MenuItem active={activeMenu == 'signin'} onPress={() => setActiveMenu('signin')} underlayColor="transparent">
          <c.MenuItemText>Login</c.MenuItemText>
        </c.MenuItem>
        <c.MenuItem active={activeMenu == 'signup'} onPress={() => setActiveMenu('signup')} underlayColor="transparent">
          <c.MenuItemText>Cadastrar</c.MenuItemText>
        </c.MenuItem>
      </c.Menu>

      {activeMenu == 'signup' &&
        <c.Input editable={!loading} value={name} onChangeText={t => setName(t)} placeholder="Nome" placeholderTextColor="#999" />
      }

      <c.Input editable={!loading} value={email} onChangeText={t => setEmail(t)} keyboardType="email-address" autoCapitalize="none" placeholder="E-mail" placeholderTextColor="#999" />

      <c.Input editable={!loading} value={password} onChangeText={t => setPassword(t)} placeholder="Senha" placeholderTextColor="#999" secureTextEntry={true} />

      {activeMenu == 'signin' &&
        <c.ActionButton disabled={loading} onPress={handleSignIn}>
          <c.ActionButtonText>Login</c.ActionButtonText>
        </c.ActionButton>
      }

      {activeMenu == 'signup' &&
        <c.ActionButton disabled={loading} onPress={handleSignUp}>
          <c.ActionButtonText>Cadastrar</c.ActionButtonText>
        </c.ActionButton>
      }

      {loading &&
        <c.LoadingArea>
          <ActivityIndicator size="large" color="#FFF" />
        </c.LoadingArea>
      }

    </c.Container>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch({ type: 'USER_SET_TOKEN', payload: { token } }),
    setName: (name) => dispatch({ type: 'USER_SET_NAME', payload: { name } })
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Page);
