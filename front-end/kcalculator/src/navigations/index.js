import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
//import { Spinner } from '../components';
//import { ProgressContext } from '../contexts';
//import MainStack from './MainStack';

const Navigation = () => {
    

    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
};

export default Navigation;