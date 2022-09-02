import styled from 'styled-components/native';

export default {
  Container: styled.KeyboardAvoidingView`
    flex:1;
  `,
  Header: styled.SafeAreaView`
    height:150px;
    background-color:#3574CB;
    justify-content:center;
  `,
  HeaderTitle: styled.Text`
    color:#FFF;
    font-size:27px;
    margin-left:20px;
  `,
  Menu: styled.View`
    background-color:#3574CB;
    flex-direction:row;
    padding-left:20px;
    margin-bottom:20px;
  `,
  MenuItem: styled.TouchableHighlight`
    padding:20px;
    border-bottom-width:5px;
    border-bottom-color:${props => props.active ? '#FFF' : '#3574CB'};
  `,
  MenuItemText: styled.Text`
    color:#FFF;
    font-size:16px;
  `,
  Input: styled.TextInput`
    margin:10px 20px;
    border-bottom-width:2px;
    border-bottom-color:#CCC;
    height:50px;
    font-size:16px;
    color:#333;
  `,
  ActionButton: styled.TouchableHighlight`
    background-color:#3574CB;
    justify-content:center;
    align-items:center;
    height:50px;
    border-radius:5px;
    margin:20px;
    box-shadow:0px 2px 2px #999;
  `,
  ActionButtonText: styled.Text`
    color:#FFF;
    font-size:18px;
  `,
  LoadingArea: styled.View`
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background-color:rgba(0,0,0,0.5);
    justify-content:center;
    align-items:center;
  `,
}
