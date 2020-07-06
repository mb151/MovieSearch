import React from 'react';
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'

export default function FilmDetail ({route}) {
    const {idFilm} = route.params;
    return(
        <View style={styles.main_container}>
            <Text>Détail du film {JSON.stringify(idFilm)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    }
})