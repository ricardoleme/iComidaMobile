import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import { Text, withTheme, List, Avatar, FAB } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'
import ListaCategoria from './ListaCategoria'

function ListaCategorias({ navigation, theme }) {
    const { colors } = theme
    const [categorias, setCategorias] = useState([])
    const [carregandoCategorias, setCarregandoCategorias] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        obterCategorias()
    }, [])

    async function obterCategorias() {
        setCarregandoCategorias(true)
        let url = `${BACKEND}/categorias`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setCategorias(data)
                //console.log(data)
            })
            .catch(function (error) {
                console.error('Erro ao obter as categorias! ' + error.message)
            })
        setCarregandoCategorias(false)
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        try {
            await obterCategorias()
        } catch (error) {
            console.error(error)
        }
        setRefreshing(false)
    }, [refreshing])

    return (
        <>
            <Header titulo="Categorias" voltar={true} navigation={navigation} />
            <View>
                <List.Subheader>
                    <Avatar.Icon size={24} icon="refresh" /> Para atualizar os dados
                </List.Subheader>
                {carregandoCategorias && <ActivityIndicator size="large" />}
                {categorias.length === 0 && !carregandoCategorias
                    ? (
                        <View>
                            <Text style={{ fontSize: 20 }}>Ainda não há nenhuma categoria cadastrada</Text>
                        </View>
                    )
                    : (
                        <FlatList
                            data={categorias}
                            renderItem={({ item }) => (
                                <ListaCategoria data={item} navigation={navigation} />
                            )}
                            keyExtractor={item => item._id.toString()}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                            />}
                        />
                    )}
                <FAB
                    style={styles.fab}
                    icon='plus'
                    label=''
                    onPress={() => navigation.navigate('AdicionaCategoria')}
                />

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    fab:{
        position: 'absolute',
        margin: 16,
        right: 4,
        bottom: 8
    }
})

export default withTheme(ListaCategorias)