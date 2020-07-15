import React from 'react';
import {StyleSheet, View, Button, Share, Image, Text, ActivityIndicator, ScrollView, TouchableOpacity, Platform} from 'react-native'
import {getFilmDetailFromApi, getImageFromApi, getTrailerFromApi} from '../API/TMDBApi';
import moment from 'moment'
import numeral from 'numeral'
import {connect} from 'react-redux'
import ElargeShrink  from '../Animation/ElargeShrink'

class FilmDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            film: undefined,
            isLoading: false
        }
        this._toggleFavorite = this._toggleFavorite.bind(this)
        this._shareFilm = this._shareFilm.bind(this)
    }

    componentDidMount(){
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.route.params.idFilm)
        if(favoriteFilmIndex !== -1){
            this.setState({
                film: this.props.favoritesFilm[favoriteFilmIndex]
            })
            return
        }

        this.setState({
            isLoading: true
        })
        getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _shareFilm = () =>{
        const {film} = this.state
        Share.share({title: film.title, message: film.overview})
    }

    _displayFloatingActionButton = () => {
        const {film} = this.state
        if(film != undefined && Platform.OS === 'android'){
            return(
                <TouchableOpacity style={styles.share_touchable_floatingactionbutton}
                onPress={() => this._shareFilm()}>
                    <Image 
                        style={styles.share_image}
                        source={require('../Images/ic_share.png')}/>
                </TouchableOpacity>
            )
        }
    }



    _toggleFavorite(){
        const action = {type: 'TOGGLE_FAVORITE', value: this.state.film}
        this.props.dispatch(action)
    }

    _toggleSeen() {
        const action = { type: "TOGGLE_SEEN", value: this.state.film }
        this.props.dispatch(action)
      }

    _displayFavoriteImage(){
        var sourceImage = require('../Images/outFavoris.png')
        var shouldEnlarge = false
        if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
            sourceImage = require('../Images/inFavoris.png')
            shouldEnlarge = true
        }
        return(
            <ElargeShrink shouldEnlarge={shouldEnlarge}>
                <Image
                    source={sourceImage}
                    style={styles.favorite_image}/>
            </ElargeShrink>
        )
    }

    _displaySeenButton() {
        const SeenFilmIndex = this.props.seenFilms.findIndex(item => item.id === this.props.route.params.idFilm)
        if (SeenFilmIndex !== -1) {
          return (
            <Button
              title='Non vu'
              onPress={() => this._toggleSeen()}/>
          )
        }
        return (
          <Button
            title='Marquer comme vu'
            onPress={() => this._toggleSeen()}/>
        )
      }

    _displayFilm(){
        const film = this.state.film
        if(film != undefined){
            return(
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.image} source={{uri: getImageFromApi(film.backdrop_path)}}/>
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity 
                        style={styles.favorite_container} 
                        onPress={() => this._toggleFavorite()}>
                            {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD-MM-YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                        return genre.name;
                    }).join(" / ")}</Text>
                    <Text style={styles.default_text}>Companies(s) : {film.production_companies.map(function(company){
                        return company.name;
                    }).join(" / ")}
                    </Text>
                    {this._displaySeenButton()}
                </ScrollView>
            )
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
    
    render(){
        console.log(this.props.favoritesFilm);
        return(
            <View style={styles.main_container}>
               {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingActionButton()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    scrollview_container: {
      flex: 1
    },
    image: {
      height: 169,
      margin: 5
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#000000',
      textAlign: 'center'
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginBottom: 15
    },
    default_text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center'
    },
    favorite_image: {
        flex: 1,
        width: null,
        height: null
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
    },
    share_image: {
        width: 30,
        height: 30
    }
  })
  
  const mapStateToProps = (state) => {
      return {
          favoritesFilm: state.toggleFavorite.favoritesFilm,
          seenFilms: state.toggleSeen.seenFilms
      }
  }

export default connect(mapStateToProps)(FilmDetail)