import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import FilmList from './FilmList'
import Avatar from './Avatar'
import {connect} from 'react-redux'

class Favorites extends React.Component {
    render(){
        return(
            <View style={styles.main_container}>
                <View style={styles.avatar_container}>
                    <Avatar/>
                </View>

                <FilmList
                films={this.props.favoritesFilm}
                navigation={this.props.navigation}
                favoriteList={true}
                /> 
            </View>
           
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    avatar_container: {
        alignItems: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}
export default connect(mapStateToProps)(Favorites);