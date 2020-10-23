import React, { Component } from 'react';
import { TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const SIZE = 60;

class AddButton extends Component {
    render() {
        const { navigation } = this.props;
          
        return (
            <View 
                style={{
                    alignItems: 'center',
                    bottom: 10,
                }}>
               
                <TouchableOpacity
                    onPress={() => {navigation.navigate("Home")}}
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems:'center',
                        justifyContent:'center',
                        width: SIZE,
                        height: SIZE,
                        backgroundColor:'#fff',
                        borderRadius:50,
                        }}
                    >
                    <Icon name="barcode" size={30} color="#01a699" />
                </TouchableOpacity>
            </View>
        );
    }
}

export default AddButton;