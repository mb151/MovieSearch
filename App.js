/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import Navigation from './Navigation/Navigation';
import {Provider} from 'react-redux'
import Store from './Store/configureStore'



class App extends React.Component{
  render(){
    return (
      <Provider store={Store}>
        <Navigation/>
      </Provider>
    )
  }    
};


export default App;
