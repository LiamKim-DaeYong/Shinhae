import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BarIndicator } from 'react-native-indicators';

class ButtonForm extends Component {
    render() {
        const { submit, scanStatus, readyToScan, barcode, input } = this.props;
        
        if(input) {
            return (
                <View style={styles.container}>
                    <Text style={styles.barcodeText}>스캔한 바코드</Text>
                    <TextInput
                        value={barcode}
                        style={styles.bacodeInput} 
                        editable={false}/>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={submit}>
                            <View style={{ justifyContent: 'center', paddingRight: 5 }}>
                                <Icon name="paper-plane" size={18} color="#000000" />
                            </View>    
                            <Text style={styles.submitText}>바코드 전송</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity
                        style={styles.scanButton}
                        onPress={readyToScan}>
                        {scanStatus
                            ?<BarIndicator size={18} count={6} color='white' />
                            :<Text style={styles.scanText}>바코드 스캔</Text>}
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={submit}>
                            <View style={{ justifyContent: 'center', paddingRight: 5 }}>
                                <Icon name="paper-plane" size={18} color="#000000" />
                            </View>    
                            <Text style={styles.submitText}>바코드 전송</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity
                        style={styles.scanButton}
                        onPress={readyToScan}>
                        {scanStatus
                            ?<BarIndicator size={18} count={6} color='white' />
                            :<Text style={styles.scanText}>바코드 스캔</Text>}
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

export default ButtonForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    barcodeText: {
        marginBottom: 10,
        marginLeft: 10,
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'   
    },
    bacodeInput: {
        borderWidth: 1,
        height: 60,
        fontSize: 16,
        fontFamily: 'NotoSans-Blod',     
        borderColor: '#c8c8c8',
        backgroundColor: '#c8c8c8',
        color: 'black',        
        textAlign: 'center',
        marginBottom: 5,
        marginHorizontal: 10,        
    },
    submitButton: {
        flexDirection: 'row',
        height: 50,
        padding: 15,
        marginBottom: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        justifyContent: 'center'
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black'
    },
    scanButton: {
        padding: 15,
        height: 50,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: '#134371',
    },
    scanText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
    }
})