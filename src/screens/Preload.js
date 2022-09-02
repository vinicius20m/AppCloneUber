import AsyncStorage from "@react-native-community/async-storage";
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";

const Preload = props => {
  // take care with this !!! ---- !!! -----
  // AsyncStorage.clear();
  if (!props.token) {
    props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})],
    }));
  } else {
    props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})],
    }));
  }

  return null;
}

const mapStateToProps = state => {
  return {
    token: state.userReducer.token
  };
};

export default connect(mapStateToProps)(Preload);
