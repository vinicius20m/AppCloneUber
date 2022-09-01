import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";

const Preload = props => {
  if (!props.token) {
    props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})],
    }));
  } else {
    props.navigations.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'HomeStack'})],
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
