import React, {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar from './components/AnimatedTabBar';
import Icon from 'react-native-vector-icons/Ionicons';

import TodoList from './components/TodoList';

const HomeIcon = (props) => <Icon name="home-outline" size={24} color={props.color} />;
const ProfileIcon = (props) => <Icon name="person-outline" size={24} color={props.color} />;

const tabs = {
  Home: {
    icon: {
      component: HomeIcon,
      color: '', // Add an empty string or a specific color here
      activeColor: 'rgba(91, 55, 183, 1)',
      inactiveColor: 'rgba(0, 0, 0, 0.5)',
    },
    ripple: {
      color: 'rgba(91, 55, 183, 0.2)',
    },
  },
  Profile: {
    icon: {
      component: ProfileIcon,
      color: '', // Add an empty string or a specific color here
      activeColor: 'rgba(91, 55, 183, 1)',
      inactiveColor: 'rgba(0, 0, 0, 0.5)',
    },
    ripple: {
      color: 'rgba(91, 55, 183, 0.2)',
    },
  },
  // Add more tabs here
};


const Tab = createBottomTabNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const screenHeight = Dimensions.get('window').height;

  const HomeScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text>Reminders</Text>
        <TodoList />
      </View>
    );
  };

  const ProfileScreen = () => {
    return (
      <View>
        <Text>Profile</Text>
      </View>
    );
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={[styles.container, backgroundStyle]}>
        <Tab.Navigator tabBar={(props) => <AnimatedTabBar tabs={tabs} {...props} />}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          {/* Add more screens here */}
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;