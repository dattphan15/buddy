import React from 'react';
import type {PropsWithChildren} from 'react';
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
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text>Reminders</Text>
        <TodoList />
      </View>
    </SafeAreaView>
  );
}

export default App;