import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Preload from '../screens/Preload';
import Login from '../screens/Login';

export default createAppContainer(createStackNavigator({
  Preload,
  Login,
}, {
  initialRouteName: 'Preload',
  defaultNavigationOptions: {
    header: null,
  },
}));
