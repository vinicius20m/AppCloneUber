import styled from 'styled-components/native';

export default {
  Container: styled.View`
    flex:1;
    background-color:#EEE;
    `,
  MenuArea: styled.TouchableHighlight`
    width:60px;
    height:60px;
    position:absolute;
    left:0;
    top:0;
    justify-content:center;
    align-items:center;
    `,
  MenuImage: styled.Image`
    width:24px;
    height:24px;
    `,
  IntineraryArea: styled.View`
    position:absolute;
    left:10px;
    right:10px;
    top:60px;
    background-color:#FFF;
    border-radius:5px;
    box-shadow:0px 0px 4px #999;
    border-color:#EEE;
    border-width:1px;
    `,
  IntineraryItem: styled.TouchableHighlight`
    padding:15px 20px;
    border-bottom-color:#EEE;
    border-bottom-width:1px;
    `,
  IntineraryLabel: styled.View`
    flex-direction:row;
    align-items:center;
    margin-bottom:10px;
    `,
  IntineraryPoint: styled.View`
    width:10px;
    height:10px;
    border-radius:5px;
    background-color:${props=>props.color};
    `,
  IntineraryTitle: styled.Text`
    margin-left:10px;
    color:#999999;
    `,
  IntineraryValue: styled.Text`
    color:#000000;
    font-size:16px;
    `,
  IntineraryPlaceHolder: styled.Text`
    color:#5555;
    font-size:16px;
    text-align:center;
    `,
  RequestDetails: styled.View`
    flex-direction:row;
    `,
  RequestDetail: styled.View`
    flex:1;
    align-items:center;
    `,
  RequestTitle: styled.Text`
    color:#999999;
    font-weight:bold;
    font-size:15px;
    `,
  RequestValue: styled.Text`
    color:#000000;
    font-size:17px;
    `,
  RequestButtons: styled.View`
    flex-direction:row;
    `,
  RequestButton: styled.TouchableHighlight`
    flex:1;
    height:40px;
    justify-content:center;
    align-items:center;
    border-radius:5px;
    background-color:${props=>props.color};
    margin:10px 5px;
    `,
  RequestButtonText: styled.Text``,
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
};
