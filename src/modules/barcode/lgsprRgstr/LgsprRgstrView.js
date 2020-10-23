import React from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableWithoutFeedback, 
    Keyboard,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Header, Loading, BarcodeReader, ButtonForm } from '../../components';

export default function mtrlsRcvngScreen(props) {
    const _onPressEmptySpace = () => {
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={_onPressEmptySpace}>
            <KeyboardAvoidingView
                style={styles.container} >
            
                <Header 
                    title='포장 생산등록' 
                    navigation={props.navigation} 
                    onPress={props.submit} />
                
                
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 3 }}>
                        <BarcodeReader
                            setCenterPosition={props.setCenterPosition}
                            scanStatus={props.scanStatus}
                            scanning={props.scanning}
                            />

                        <Text style={styles.barcodeText}>완제품코드</Text>

                        <View style={styles.bacodeInput}>
                            <TextInput
                                style={{ flex: 1, color: 'black' }}
                                value={props.prductCd}
                                editable={false} />

                            <TouchableOpacity
                                onPress={props.delPrductCd}
                                style={{ paddingRight: 10 }}>
                                <Icon name="times" size={18} color="#000000" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.barcodeText}>렉코드</Text>

                        <View style={styles.bacodeInput}>
                            <TextInput
                                style={{ flex: 1, color: 'black' }}
                                value={props.rackCd}
                                editable={false} />

                            <TouchableOpacity
                                onPress={props.delRackCd}
                                style={{ paddingRight: 10 }}>
                                <Icon name="times" size={18} color="#000000" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.barcodeText}>수량</Text>

                        <TextInput
                            value={props.qntty}
                            keyboardType='numeric'
                            onChangeText={(qntty) => props.setQntty(qntty)}
                            style={styles.qnttyInput} />
                    </View>

                    <ButtonForm 
                        submit={props.submit}
                        scanStatus={props.scanStatus}
                        readyToScan={props.readyToScan}
                        />
                </ScrollView>

                {props.isLoading &&
                    <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                        <Loading />
                    </View>
                }
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },   
    barcodeText: {
        margin: 10,        
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
    },
    bacodeInput: {
        borderWidth: 1,
        flexDirection: 'row',
        height: 40,
        fontSize: 16,
        fontFamily: 'NotoSans-Blod',     
        borderColor: '#f6f6f6',
        backgroundColor: '#f6f6f6',
        color: 'black',        
        textAlign: 'center',
        marginBottom: 5,
        marginHorizontal: 10,
        alignItems: 'center'
    },
    qnttyInput: {
        height: 40,
        fontSize: 16,
        fontFamily: 'NotoSans-Blod',     
        backgroundColor: 'white',
        color: 'black',        
        textAlign: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ececec'
    },
    submitButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        padding: 15,
        marginBottom: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderWidth: 1
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black'
    },
    scanButton: {
        height: 50,
        padding: 15,
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
});