import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import { RNCamera } from 'react-native-camera';

const windowHeight = Dimensions.get('window').height;

class BarcodeReader extends Component {
    render() {
        const { scanStatus, scanning, setCenterPosition } = this.props;
        

        return (
            <View style={styles.container}>                
                <RNCamera                    
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    autoFocusPointOfInterest={{ x: 0.3, y: 0.3 }}
                    defaultTouchToFocus
                    mirrorImage={false}
                    style={styles.barcode}
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                    onGoogleVisionBarcodesDetected={scanStatus?scanning: null} />
                
                <View style={styles.barcodeArea}
                    onLayout={(event) => {
                        var {x, y, width, height} = event.nativeEvent.layout
                        setCenterPosition({'x': (x + width) / 2, 'y': (y + height) / 2})
                    }}
                    />
            </View>
        );
    }
}

export default BarcodeReader;

const styles = StyleSheet.create({
    container: {
        height: windowHeight * 0.16,
        justifyContent: 'center'
    },
    barcode: {
        flex: 1,
        overflow: 'hidden'
    },
    barcodeArea: {
        position: 'absolute',
        borderWidth: 3,
        width: '90%',
        height: windowHeight * 0.08,
        borderColor: '#00ff00',
        left: '5%',
        top: windowHeight * 0.04
    },
})