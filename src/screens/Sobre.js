import React from 'react'
import { View, Text } from 'react-native'
import { withTheme } from 'react-native-paper'

 function Sobre({theme}){
     const { colors } = theme
    return(
        <View>
            <Text style={{color: colors.text}}>Versão 1.0.1 iComida</Text>
        </View>
    )
}

export default withTheme(Sobre)