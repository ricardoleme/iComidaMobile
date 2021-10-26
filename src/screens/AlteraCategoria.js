import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { withTheme, Caption, TextInput, FAB, HelperText, Checkbox, Snackbar } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'

function AlteraCategoria({ navigation, theme, route }) {
    //Obtendo os dados passados via parâmetro
    const categoriaAlterada = route.params.categoria
     //Atribuindo os valores nos campos a partir do valor passado
    const [id, setId] = useState(categoriaAlterada._id)
    const [nome, setNome] = useState(categoriaAlterada.nome)
    const [status, setStatus] = useState((categoriaAlterada.status === 'ativo') ? true : false)
    const [erros, setErros] = useState({})
    const [aviso, setAviso] = useState('')
    const [salvandoCategoria, setSalvandoCategoria] = useState(false)

    const { colors } = theme

   const validaErrosCategoria = () => {
       const novosErros = {}
       //Validação do nome
       if (!nome || nome ==='') novosErros.nome = 'O nome não pode ser vazio!'
       else if (nome.length > 30) novosErros.nome = 'O nome informado é muito longo!'
       else if (nome.length < 3) novosErros.nome = 'O nome informado é muito curto!'
       
       return novosErros
   }

   async function salvaCategoriaAlterada() {
       const novosErros = validaErrosCategoria()
       //Existe algum erro no objet?
       if (Object.keys(novosErros).length > 0) {
           //Sim, temos erros
           setErros(novosErros)
       } else {
           //Iremos salvar os dados alterados...
           setErros({})
           let statusCategoria = (status === true || status === 'ativo') ? 'ativo' : 'inativo'
           let categoria = {_id: id, nome: nome, status: statusCategoria}
           setSalvandoCategoria(true)
           let url = `${BACKEND}/categorias`
           await fetch(url, {
               mode: 'cors',
               method: 'PUT',
               headers: {
                   Accept: 'application/json',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(categoria)
           }).then(response => response.json())
           .then(data => {
               (data.message || data._id) ? setAviso('Categoria alterada com sucesso!') : setAviso('')
               setNome('')
               setStatus(true)
           })
           .catch(function (error) {
               setAviso('Não foi possível salvar a categoria alterada '+error.message)
           })
       }
       setSalvandoCategoria(false)
   }

    return (
        <View style={{flex:1, paddingVertical: 0}}>
        <Header titulo="Cadastro de Categorias"
        voltar={true} navigation={navigation} />
        <View style={{ flex: 1, backgroundColor: colors.surface, paddingHorizontal: 16,
        paddingVertical: 4 }}>  
            <Caption style={styles.titulo}>Alteração das Categorias</Caption>
            <TextInput
                label="Nome da Categoria"
                mode="outlined"
                name="nome"
                value={nome}
                onChangeText={setNome}
                error={!!erros.nome}
            />
            <HelperText type="error" visible={!!erros.nome}>
                {erros.nome}
            </HelperText>
            <View style={styles.checkbox}>
                <Checkbox
                    status={status ? 'checked' : 'unchecked'}
                    onPress={() => setStatus(!status)}
                />
                <Text style={{ color: colors.text, marginTop: 8 }}>Ativa?</Text>
            </View>
        </View>
        <FAB style={styles.fab}
             icon='content-save'
             loading={salvandoCategoria}
             disabled={erros.length>0}
             onPress={() => salvaCategoriaAlterada()}
             />
        <Snackbar
            visible={aviso.length > 0}
            onDismiss={()=> setAviso('')}
            action={{
                label: 'Voltar',
                onPress: () => navigation.goBack()
            }}>
                <Text>{aviso}</Text>
            </Snackbar>
        </View>
    )
}

const styles  = StyleSheet.create({
    checkbox: {
        flexDirection: 'row'
    },
    fab:{
        position: 'absolute',
        margin: 16,
        right: 4,
        bottom: 8
    },
    titulo: {
        fontSize: 20,
        marginBottom: 16,
        marginTop: 16

    }
})

export default withTheme(AlteraCategoria)