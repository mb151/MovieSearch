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
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/es/integration/react'
import Store from './Store/configureStore'



class App extends React.Component{
  render(){
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor} >
          <Navigation/>
        </PersistGate>
      </Provider>
    )
  }    
};


export default App;
