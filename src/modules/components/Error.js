import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

class Error extends Component {
    render() {
        const { onPress } = this.props;
          
        return (
            <View style={styles.container}>
                <View style={styles.icon}>
                    <TouchableOpacity
                        onPress={onPress}>
                        <Icon name="redo-alt" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.text}>
                    <Text>결과를 불러오지 못했습니다.</Text>
                    <Text>잠시 후에 다시 시도해 주세요.</Text>
                </View>
            </View>
        );
    }
}

export default Error;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    icon: {
        marginBottom: 10
    },
    text: {
        fontSize: 20,
        fontFamily: 'NotoSans-Blod',
        alignItems: 'center'
    }
})