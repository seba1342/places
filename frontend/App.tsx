import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import client from './src/graphql/apollo-client';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StatusBar style="auto" />
      <HomeScreen />
    </ApolloProvider>
  );
}
