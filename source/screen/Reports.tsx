import React from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';

export default function Reports({navigation}) {
  return (
    <Background>
      <Paragraph>Reports</Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'sign-in'}],
          })
        }>
        Logout
      </Button>
    </Background>
  );
}
