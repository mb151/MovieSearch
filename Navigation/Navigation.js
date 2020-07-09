import * as React from 'react';
import {Image, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites'

const SearchStackNavigator = createStackNavigator()
const TabBottomNavigator = createBottomTabNavigator();

function Navigation() {
    return(
        <NavigationContainer>
            <TabBottomNavigator.Navigator tabBarOptions={{
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF'
          }}>
                <TabBottomNavigator.Screen  options={{
                    tabBarIcon: props =>( <Image source={require('../Images/search.png')} style={styles.icon}/>)}} name="Rechercher" component={NavigationStack}/>
                <TabBottomNavigator.Screen  options={{
                    tabBarIcon: props =>( <Image source={require('../Images/inFavoris.png')} style={styles.icon}/>)}} name="Favorites" component={FavoriteStack}/>
            </TabBottomNavigator.Navigator>
        </NavigationContainer>
    )
}

function NavigationStack() {
    return(
        <SearchStackNavigator.Navigator>
            <SearchStackNavigator.Screen name="Rechercher" component={Search}/>
            <SearchStackNavigator.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Film Détail' }}/>
        </SearchStackNavigator.Navigator>
    )
}

function FavoriteStack() {
    return(
        <SearchStackNavigator.Navigator>
            <SearchStackNavigator.Screen name="Favorites" component={Favorites}/>
            <SearchStackNavigator.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Film Détail' }}/>
        </SearchStackNavigator.Navigator>
    )
}


const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})
  

export default Navigation;