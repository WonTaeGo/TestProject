import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import FooterButton from './components/FooterButton';
import Toast, {DURATION} from 'react-native-easy-toast';
import firebase from 'react-native-firebase';

export default class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('user');
        this.state = {
            email : '',
            password : '',
            emailText : '이메일',
            passwordText : '비밀번호',
            loading: false,
        }
    }

    handleSignUp = () => {
            console.log('handleSignUp');
            this.setState({loading:true});
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(()=> {
                this.setState({loading:false});
                //this.ref.doc(this.state.email).set({id: this.state.email})
                this.ref.add({id:this.state.email})
                this.props.navigation.navigate('Main') 
            })
            .catch(error => {
                this.setState({loading:false});
                this.refs.toast.show('이메일 형식을 확인해 주세요.\n비밀번호는 6자 이상이어야 합니다.', 1000);
                console.log(error);
            });
      
    }

    render() {
        return (
            <View style= {styles.container}>
                <Text style= {styles.switchText} >SWITCH{"\n"}계정 만들기</Text>              
                <TextInput 
                style={styles.textInputButton}
                onChangeText = {(email)=> this.setState({email})}
                placeholder = {this.state.emailText}
                autoCorrect = {false}
                />
                <TextInput 
                style={styles.textInputButton}
                onChangeText = {(password) => this.setState({password})}
                placeholder = {this.state.passwordText}
                autoCorrect = {false}
                secureTextEntry = {true}
                />
                <Text style= {styles.descriptionText}>회원가입 시 다음약관에 동의한 것으로 간주합니다.</Text>
                {   
                    this.state.loading ?
                    <ActivityIndicator size="small" style= {styles.signupButton} />
                    : <FooterButton 
                        style= {styles.signupButton}
                        buttonText = "회원가입"
                        onPress= {this.handleSignUp}
                    />
                }
                <Toast ref = "toast"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent : 'center',
        alignItems: 'center',
        backgroundColor : '#D8D8D8',
    },
    switchText : {
        fontSize : 16,
        color: '#585A5A',
        marginTop : 41,
        textAlign: 'center',
        marginBottom : 115,
    },
    textInputButton : {
        width: 288,
        borderColor: 'gray',
        paddingVertical : 10,
        borderWidth : 0.3,
        paddingHorizontal : 5,
        borderRadius : 2,
        backgroundColor : 'white',
        height: 50,
    },
    descriptionText : {
        marginTop : 20,
        fontSize : 12,
        color : '#585A5A',
        fontWeight : '200',
    },
    signupButton : {
        marginTop : 97.5,
    }
});