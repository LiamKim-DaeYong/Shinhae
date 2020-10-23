import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function OtherMenuScreen(props) {
    const testList= [
        { itemNum: "1", name: "통계현황", navigation: 'Statistics', icon: 'chart-line'},
        { itemNum: "2", name: "로그아웃", icon: 'sign-out-alt'},
    ]
    
    const FlatListItemSeparator = () => {
        return (
            <View style={{ width: '100%', height: 1, backgroundColor: '#ececec', alignSelf: 'flex-end'}} />
        )
    }

    const logout = () => {
        props.logout();
        props.navigation.navigate("Login");
        
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    const ListItem = (item) => {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity 
                    style={styles.list}
                    onPress={() => {item.itemNum==="2"
                        ?logout()           
                        :props.navigation.navigate(item.navigation)
                    }}>
                    <View style={styles.icon}>                    
                        <Icon name={item.icon} size={16} color="#000000"/>
                    </View>
                    <Text style={styles.listText}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>   
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>더보기</Text>
                </View>
            </View>
     
            <View style={{ flex: 1 }}>
                <FlatList
                    keyExtractor={item => item.itemNum}
                    data={testList}
                    ItemSeparatorComponent = {FlatListItemSeparator}
                    renderItem={({item}) => ListItem(item)}>
                </FlatList>
            </View>            
        </View>        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 20,
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        paddingLeft: 10,
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'NotoSans-Blod',
    },
    list: {
        flexDirection: 'row',
        padding: 10
    },
    icon: {
        paddingHorizontal: 5,
        justifyContent: 'center'
    },
    listText: {
        fontSize: 16,
        paddingLeft: 5
    }
});