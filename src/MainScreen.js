import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Picker,
    Switch,
    BackHandler,
    DrawerLayoutAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WeatherBox from './components/WeatherBox';
import firebase from 'react-native-firebase';
import Geolocation from '@react-native-community/geolocation';

export default class MainScreen extends Component {
    constructor(props){
        super(props);
        //firebase collention
        this.ref = firebase.firestore().collection('user');
        this.state = {
            isSwitchTurnOn : true,
            weatherIcon : "",
            weatherText : "",
            temperature : null,
            location: null,
        }
    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        console.log('=== user:' + user)
        if (user) {
            this.setState({user: user._user.email})
        } else {
            console.log('no user');
        }

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', ()=> console.log('back!!!'));
    }   

    componentWillUnmount() {
        this.backHandler.remove()
    }

    onTouchSwitch = () => {
        this.setState({isSwitchTurnOn : ! this.state.isSwitchTurnOn})
        this.ref.doc(this.state.user).collection('switch-status').add(
            {
                isSwitchTurnOn : this.state.isSwitchTurnOn,
                time : firebase.firestore.FieldValue.serverTimestamp()
            }
        )
    }

    handleWeatherBox = () => {
        Geolocation.getCurrentPosition((position) => {
            console.log(position);
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            let key= "011b53c8efd22801e3573b8f6def44d3";
            //https://weatherstack.com/
            let URL = "http://api.weatherstack.com/current?access_key="+key+"&query= Long island, New York";

            fetch(URL)
            .then(res => res.json())
            .then((data) => {
                console.log(data);

                this.setState({
                    weatherIcon : data.current.weather_icons[0],
                    weatherText : data.current.weather_descriptions[0],
                    temperature : data.current.temperature,
                    location: data.location.name,
                })
            })
        });
    }
       

    render() {
        return (
            <View style = {styles.container}>
                <Picker
                    selectedValue={this.state.language}
                    style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }
                    >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <Switch 
                    onValueChange = {() => console.log('onValueChange!!')}
                    value = {true}
                />
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress= {() => this.props.navigation.navigate('Setting')}
                    >
                        <AntDesign name = "bells" color = "#916FF2" size = {30}/>
                    </TouchableOpacity>           
                    <TouchableOpacity
                        onPress= {() => this.props.navigation.navigate('Setting')}
                    >
                        <AntDesign name = "setting" color = "#916FF2" size = {30}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress = {this.handleWeatherBox}
                >
                    <WeatherBox 
                        temperature =  {this.state.temperature}
                        weather = {this.state.weatherText}
                        location =  {this.state.location}
                        weatherIcon = {this.state.weatherIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {this.onTouchSwitch}
                >
                    <Image 
                        source = {
                            this.state.isSwitchTurnOn 
                            ? require('./on.png') 
                            : require('./off.png')}
                        style = {styles.icon}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#D8D8D8',
    },
    icon: {
        width : 185,
        height : 300,
        marginTop : 30,
    },
    description : {
        fontSize : 16,
        color :  '#5B5A5A',
        textAlign: 'center',
        marginBottom : 40,
    },
    iconContainer:{
        flexDirection : 'row',
        position: 'absolute',
        right: 20,
        top : 10,
    },
}); 

