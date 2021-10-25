import React from 'react'
import { Appbar, withTheme } from 'react-native-paper'

function Header(props){
    return(
        <Appbar.Header style={{padding: 40}}>
            {props.voltar && <Appbar.BackAction  onPress={() => props.navigation.goBack()} />}
            <Appbar.Content title={props.titulo} subtitle={props.subtitulo} />
        </Appbar.Header>    
    )
}

export default withTheme(Header)