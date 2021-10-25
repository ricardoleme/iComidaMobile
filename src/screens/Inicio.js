import React from 'react'
import { View, FlatList } from 'react-native'
import { withTheme, List } from 'react-native-paper'
import Header from '../components/Header'

function Inicio({navigation, theme}){
    const { colors } = theme
    //Lista de ícones: https://materialdesignicons.com/
    const opcoesMenu = [
        {id: 1, nome: 'Categorias', descricao: 'Categorias de Restaurantes', icone: 'blur', menu: 'ListaCategorias'},
        {id: 2, nome: 'Configurações', descricao: 'Configurações do App', icone: 'cog', menu: 'Configuracoes'}
    ]

    return (
        <>
        <Header titulo='Área Admin' subtitulo='iComida' />
        <View style={{backgroundColor: colors.surface, paddingHorizontal: 8, paddingVertical: 16, flex: 1}}>
            <List.Subheader>Selecione uma das opções:</List.Subheader>
            <FlatList
              data={opcoesMenu}
              renderItem={({item}) => (
                  <List.Item
                     title={item.nome}
                     style={{background: colors.background}}
                     titleStyle={{fontSize: 20}}
                     description={item.descricao}
                     descriptionStyle={{marginBottom: 4}}
                     onPress={()=> navigation.navigate(item.menu)}
                     left={props => <List.Icon {...props} icon={item.icone} />}
                     />
              )}
              keyExtractor={item => item.id.toString()}
              />
        </View>
        </>
    )
}

export default withTheme(Inicio)