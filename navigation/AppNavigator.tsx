import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../DashboardScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  EventDetail: { event: Event | null };
};

type HomeTabParamList = {
  Dashboard: undefined;
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    </Stack.Navigator>
  );
}

// Export the types for use in screens
export type { RootStackParamList, HomeTabParamList };
export default AppNavigator;
