import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,

} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'
import Materialicon from 'react-native-vector-icons/MaterialCommunityIcons'


export default class WeatherBox extends Component {

    // renderWeatherIcon (weather) {
    //     switch(weather){
    //         case "Sunny":
    //             return (
    //                <View style = {styles.weatherIcon}>
    //                    <Ionicons name = "ios-sunny" color="#ffffff" size={80}/>
    //                </View>     
    //             )
    //     }
    // }

    render() {
        return (
            <View>
                <Image 
                    source={require('./weatherBox.png')}
                    style={styles.weatherBox} 
                />     
                {      
                    this.props.weatherIcon ?
                        <Image 
                        source={{uri:this.props.weatherIcon}}
                        style={styles.weatherIcon}
                    /> : null
                    
                }
                <Text style={styles.temperatureText} >{this.props.temperature} {this.props.temperature ? <Materialicon name = "temperature-celsius" size={15}/> : null }</Text>
                <Text style={styles.weatherText} >{this.props.weather}</Text>
                <Text style={styles.locationText} >{this.props.location}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    weatherBox : {
        alignItems:'center',
        justifyContent:'center',
    },
    temperatureText:{
        position: 'absolute',
        color:'white',
        fontSize:20,
        textAlign:'center',
        marginTop:20,
        right:30,
    },
    weatherText : {
        position: 'absolute',
        color:'white',
        fontSize:20,
        textAlign:'center',
        marginTop:50,
        right:30,
    },
    locationText:{
        position: 'absolute',
        color:'white',
        fontSize:25,
        textAlign:'center',
        marginTop:80,
        right:30,
    },
    weatherIcon : {
        position: 'absolute',
        // color : 'white',
        // textAlign: 'center',
        width:50,
        height:50,
        marginTop:20,
        left:30,
    }
});