import React from 'react';
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmList from './FilmList'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';
import {connect} from 'react-redux'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state =  { films: [], isLoading: false}
        this.searchedText = "";
        this.page = 0;
        this.totalPages = 0;
        //this._loadFilm = this._loadFilm.bind(this)
    }

    /**une fonction fleché utilise par defaut le binding
     * ou bien on declare this._loadFilm = this._loadFilm.bind(this) dans le 
     * constructeur pour binder la fonction.
     * binder une fonction revient à la cibler partout dans notre application.
     */
    _loadFilm = () => {
        this.setState({isLoading: true})
        if(this.searchedText.length > 0 ){
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films, ...data.results], 
                    isLoading: false
                })
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

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
    }

    _searchedTextInputChanged(text){
        this.searchedText = text;
    }

    _searchFilms(){
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            this._loadFilm()
        })
    }

    render(){
        return (
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchedTextInputChanged(text)} style={styles.textinput} placeholder="Titre du Film"/>
                <Button title="Rechercher" onPress={() => this._searchFilms()} />
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilm}
                    page={this.page}
                    totalPages={this.totalPages}
                    favoriteList={false}
                />
                {this._displayLoading()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
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

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Search);