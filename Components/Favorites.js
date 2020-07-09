import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import FilmList from './FilmList'
import {connect} from 'react-redux'

class Favorites extends React.Component {
    render(){
        return(
            <FilmList
                films={this.props.favoritesFilm}
                navigation={this.props.navigation}
                favoriteList={true}
            />
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}
export default connect(mapStateToProps)(Favorites);