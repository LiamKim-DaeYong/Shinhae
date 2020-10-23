import React from 'react';
import { 
    View, 
    TextInput, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image, 
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { Loading } from '../../modules/components';

export default function LoginScreen(props) {
    const _onPressEmptySpace = () => {
        Keyboard.dismiss();
    }

    const login = () => {
        props.login();        
    }    
    
    return (
        <TouchableWithoutFeedback onPress={_onPressEmptySpace}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.logoForm}>
                    <Image 
                        source={require('../../assets/image/logo.png')}/>                          
                </View>

                <View style={styles.loginForm}>
                    <TextInput
                        value={props.userId}
                        label='Id'
                        style={styles.input} 
                        onChangeText={(userId) => props.setId(userId)} />

                    <TextInput
                        value={props.password}
                        label='Password'
                        secureTextEntry={true}
                        style={styles.input} 
                        onChangeText={(password) => props.setPassword(password)} />
            
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress ={() => {
                            Keyboard.dismiss();
                            login();
                        }} >
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>

                    <View style={styles.checkBox}>
                        <CheckBox
                            value={props.checkBox} 
                            onChange={props.setCheckBox}/>
                        <View style={{ justifyContent: 'center' }}>
                            <Text>자동로그인</Text>
                        </View>
                    </View>
                </View>

                {props.isLoading &&
                    <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                        <Loading />
                    </View>
                }                
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingBottom: '55%'
    },
    logoForm: {
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginForm: {
        margin: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 10,
        paddingLeft: 15,
        borderColor: '#ececec'
    },
    checkBox: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10,
    },
    checkText: {
        fontFamily: 'NotoSans-Bold'
    },
    loginButton: {
        marginHorizontal: 20,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#134371',
    },
    buttonText: {
        textAlign:'center',
        fontSize: 20,
        color: 'white',
        fontFamily: 'Roboto-Black'
    }
});