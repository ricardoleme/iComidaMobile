import React, {useContext} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppContext } from '../themes/ThemeProvider'

const Stack = createStackNavigator()

import Home from '../screens/Home'
import Sobre from '../screens/Sobre'
import Tabs from './Tabs'

export default function Navigation(){
    const { tema } = useContext(AppContext)
    return(
        <NavigationContainer theme={tema}>
            <Stack.Navigator initialRouteName="Tabs">
                <Stack.Screen
                    name="Home"
                    component={Tabs}
                    options={{
                        title: 'iComida',
                        headerStyle: {backgroundColor: '#002984'},
                        headerTintColor: '#FFFFFF'
                    }} />
            <Stack.Screen name="Sobre" component={Sobre} />        
            </Stack.Navigator>
        </NavigationContainer>
    )
}