/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
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

import TodoList from './components/TodoList';


type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{ height: screenHeight }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }}
        contentContainerStyle={{ justifyContent: 'space-between' }}
        >
        <Header />
      </ScrollView>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text>Welcome to my Todo App!</Text>
        <TodoList />
      </View>
    </SafeAreaView>
    
  );
}

export default App;