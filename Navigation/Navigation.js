import * as React from 'react';
import {Image, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites'
import Test from '../Components/Test'
import News from '../Components/News'
import Seen from '../Components/Seen'

const SearchStackNavigator = createStackNavigator()
const TabBottomNavigator = createBottomTabNavigator();

function Navigation() {
    return(
        <NavigationContainer>
            <TabBottomNavigator.Navigator  tabBarOptions={{
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF'
          }}>
                {/* <TabBottomNavigator.Screen name="Test" component={Test}/> */}
                <TabBottomNavigator.Screen  options={{
                    tabBarIcon: props =>( <Image source={require('../Images/search.png')} style={styles.icon}/>)}} name="Rechercher" component={NavigationStack}/>
                <TabBottomNavigator.Screen  options={{
                    tabBarIcon: props =>( <Image source={require('../Images/ic_fiber_new.png')} style={styles.icon}/>)}} name="News" component={NewsFilmStack}/>
                 <TabBottomNavigator.Screen  options={{
                    tabBarIcon: props =>( <Image source={require('../Images/ic_check.png')} style={styles.icon}/>)}} name="Seen" component={FilmsVueStack}/>
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

function NewsFilmStack() {
    return(
        <SearchStackNavigator.Navigator>
            <SearchStackNavigator.Screen name="News" component={News} options={{ title: 'Les Derniers Films', headerTitleAlign: 'center'}}/>
            <SearchStackNavigator.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Film Détail' }}/>
        </SearchStackNavigator.Navigator>
    )
}

function FilmsVueStack() {
    return(
        <SearchStackNavigator.Navigator>
            <SearchStackNavigator.Screen name="Seen" component={Seen} options={{ title: 'Mes Films Vus', headerTitleAlign: 'center'}}/>
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