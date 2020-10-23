import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

class Header extends Component {
    render() {
        const { title, navigation, onPress } = this.props;
          
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <TouchableOpacity
                        onPress={() => {navigation.goBack()}}>
                        <Icon name="chevron-left" size={20} color="#000000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.right}>
                </View>
            </View>
        );
    }
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 12,
    },
    left: {
        flex:1,
        justifyContent: 'center'
    },
    title: {
        flex: 2,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'NotoSans-Blod',
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
})