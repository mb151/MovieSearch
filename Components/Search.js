import React from 'react';
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state =  { films: [], isLoading: false}
        this.searchedText = "";
    }

    _loadFilm(){
        this.setState({isLoading: true})
        if(this.searchedText.length > 0 ){
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({films: data.results, isLoading: false})
            })
        }
    }

    _displayLoading(){
        if(this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' color="#00ff00"/>
                </View>
            )
        }
    }

    _searchedTextInputChanged(text){
        this.searchedText = text;
    }

    render(){
        console.log(this.state.isLoading)
        return (
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._loadFilm()} onChangeText={(text) => this._searchedTextInputChanged(text)} style={styles.textinput} placeholder="Titre du Film"/>
                <Button style={{height:100}} title="Rechercher" onPress={() => this._loadFilm()} />
                <FlatList
                    data={this.state.films}
                    renderItem={({ item }) => <FilmItem film={item}/>}
                    keyExtractor={(item) => item.id.toString()}
                />
                {this._displayLoading()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
        marginTop: 20,
        flex: 1,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default Search;