import API_TOKEN from '../config'

export function getFilmsFromApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN.API_KEY + '&language=fr&query=' + text + '&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w300' + name;
}

export function getFilmDetailFromApi(id){
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN.API_KEY  +  '&language=fr'
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

// export function getTrailerFromApi(id){
//     return 'https://api.themoviedb.org/3/movie/533ec651c3a368544800000b/videos?api_key=eaf0b40a4f2cbab2f47f46c93b6ed1e0&language=en-US'
// }