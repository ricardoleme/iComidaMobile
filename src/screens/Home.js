import React from 'react'
import { Text, View, Button } from 'react-native'
import { withTheme } from 'react-native-paper'

function Home({navigation, theme}){
    const { colors } = theme
    return(
        <View style={{backgroundColor: colors.background}}>
            <Text style={{color: colors.text}}>Início</Text>
            <Button
            title="Sobre o App"
            color={colors.accent}
            onPress={() => navigation.navigate('Sobre')}
            />
        </View>
    )
}

export default withTheme(Home)