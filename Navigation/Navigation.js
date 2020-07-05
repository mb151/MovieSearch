import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../Components/Search';

const SearchStackNavigator = createStackNavigator()

function Navigation() {
    return(
        <NavigationContainer>
            <SearchStackNavigator.Navigator>
                <SearchStackNavigator.Screen name="Rechercher" component={Search}/>
            </SearchStackNavigator.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;