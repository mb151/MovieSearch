import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';

const SearchStackNavigator = createStackNavigator()

function Navigation() {
    return(
        <NavigationContainer>
            <SearchStackNavigator.Navigator initialRouteName="Search">
                <SearchStackNavigator.Screen name="Rechercher" component={Search}/>
                <SearchStackNavigator.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Film Détail' }}/>
            </SearchStackNavigator.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;