import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { BallIndicator } from 'react-native-indicators';

class Loading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                </View>
                <View style={styles.loading}>          
                    <BallIndicator size={50} color='black' />
                </View>
            </View>
        );
    }
}

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingContainer: {
        width: '100%',
        height: '100%',
        position:'absolute',
        alignSelf: 'center',
        backgroundColor: 'white',
        top: 0,        
        left: 0,
        opacity: 0.5
    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
    }
})