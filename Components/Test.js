import React from 'react'
import {StyleSheet, View, Platform, Animated} from 'react-native'

class Test extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            topPosition: new Animated.Value(0)
        }
    }
    
    componentDidMount(){
        Animated.spring(
            this.state.topPosition,
            {
                toValue: 100,
                speed: 4,
                bounciness: 30,
                useNativeDriver: false
            }
        ).start()
    }
    render(){
        return(
            <View style={styles.main_container}>
                <Animated.View style={[styles.animation_view, {top: this.state.topPosition}]}></Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animation_view: {
        backgroundColor: 'red',
        height: 100,
        width: 100
    }
})

export default Test