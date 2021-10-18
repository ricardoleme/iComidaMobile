import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

import Home from '../screens/Home'
import Sobre from '../screens/Sobre'

export default function Tabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen
                name="Usuário"
                component={Home}
                options={{
                    tabBarIcon: () => (<FontAwesome5 name="user" size={24} color="black"/>)
                }} />
            <Tab.Screen name="Sobre"
               component={Sobre}  
               options={{
                tabBarIcon: () => (<FontAwesome5 name="cogs" size={24} color="black"/>)
            }} />  
        </Tab.Navigator>
    )
}