import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTab from './MainTab';
import { ProfileProduction,
             MenuSelection,
             TargetCalorie,
             Profile,
             UserDelete,
             ProfileRevise, MenuSearch, FoodAddList, ChatBot,
             UpdateMenuSelection, UpdateTargetCalorie, 
             PostRegister, PostDetail, PostEdit,
             RunHistory,
             BattleRegister, BattleDetail, MyBattle, MyBattleDetail} from '../screens';

const Stack = createStackNavigator();

const MainStack = () => {
    const theme = useContext(ThemeContext);
    return (
        <Stack.Navigator >
            <Stack.Screen name="Main" component={MainTab} options={{headerShown: false}}/>
            <Stack.Screen name="ProfileProduction" component={ProfileProduction} options={{headerShown:false}} />
            <Stack.Screen name="MenuSelection" component={MenuSelection} options={{ title:'' }} />
            <Stack.Screen name="TargetCalorie" component={TargetCalorie} options={{ title:'' }} />
            <Stack.Screen name="Profile" component={Profile} options={{ title:'' }} />
            <Stack.Screen name="UserDelete" component={UserDelete} options={{ title:'' }}/>
            <Stack.Screen name="ProfileRevise" component={ProfileRevise} options={{ title:'' }} />
            <Stack.Screen name="UpdateMenuSelection" component={UpdateMenuSelection} options={{ title:'' }} />
            <Stack.Screen name="UpdateTargetCalorie" component={UpdateTargetCalorie} options={{ title:'' }} />
            <Stack.Screen name="MenuSearch" component={MenuSearch} options={{ title:'' }} />
            <Stack.Screen name="FoodAddList" component={FoodAddList} options={{ title:'' }} initialParams={{ selectedItemList: [] }}/>
            <Stack.Screen name="ChatBot" component={ChatBot} options={{ title:'' }}/>
            <Stack.Screen name="PostRegister" component={PostRegister} options={{ title:'' }}/>
            <Stack.Screen name="PostDetail" component={PostDetail} options={{ title:'' }}/>
            <Stack.Screen name="PostEdit" component={PostEdit} options={{ title:'' }}/>
            <Stack.Screen name="RunHistory" component={RunHistory} options={{ title:'' }}/>
            <Stack.Screen name="BattleRegister" component={BattleRegister} options={{ title:'' }}/>
            <Stack.Screen name="BattleDetail" component={BattleDetail} options={{ title:'' }}/>
            <Stack.Screen name="MyBattle" component={MyBattle} options={{ title:'' }}/>
            <Stack.Screen name="MyBattleDetail" component={MyBattleDetail} options={{ title:'' }}/>
        </Stack.Navigator>
    );
};

export default MainStack;