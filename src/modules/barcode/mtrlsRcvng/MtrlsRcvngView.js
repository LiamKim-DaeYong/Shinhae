import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Loading, BarcodeReader, ButtonForm } from '../../components';

export default function mtrlsRcvngScreen(props) {

    return (
        <View style={styles.container}>                        
            <Header 
                title='자재입고' 
                navigation={props.navigation} 
                onPress={props.submit}/>

            <BarcodeReader
                setCenterPosition={props.setCenterPosition}
                scanStatus={props.scanStatus}
                scanning={props.scanning}
                />

            <ButtonForm
                input={true}
                scanStatus={props.scanStatus}
                submit={props.submit}
                readyToScan={props.readyToScan}
                barcode={props.barcode}
            />

            {props.isLoading &&
                <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                    <Loading />
                </View>
            }
        </View>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttons: {
        flex: 1,
        backgroundColor: 'white',        
    },
  
    submitButton: {
        padding: 15,
        marginBottom: 5,
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black'
    },
    scanButton: {
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