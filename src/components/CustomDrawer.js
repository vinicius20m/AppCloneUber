import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

const Header = styled.View`
  padding:20px;
  border-bottom-width:1px;
  border-bottom-color:#EEE;
  flex-direction:row;
  align-items:center;
  margin-bottom:20px;
`;

const UserAvatar = styled.View`
  width:40px;
  height:40px;
  border-radius:20px;
  background-color:#DDD;
`;

const UserInfo = styled.View`
  margin-left:10px;
`;

const UserName = styled.Text`
  color:#000;
  font-size:16px;
  font-weight:bold;
`;

const LogoutButton = styled.TouchableHighlight`
  height:25px;
  justify-content:center;
`;

const LogoutButtonText = styled.Text`
  color:#000;
  font-size:15px;
`;

const CustomDrawer = (props) => {

  const handleLogout = () => {
    props.setToken('');
    props.navigation.navigate('Preload');
  }

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <UserAvatar />
          <UserInfo>
            <UserName>{props.name}</UserName>
            <LogoutButton onPress={handleLogout} underlayColor="transparent">
              <LogoutButtonText>Sair</LogoutButtonText>
            </LogoutButton>
          </UserInfo>
        </Header>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    name: state.userReducer.name
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (token) => dispatch({ type: 'SET_TOKEN', payload: { token } })
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
