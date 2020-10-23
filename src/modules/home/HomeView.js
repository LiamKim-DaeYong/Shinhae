import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function HomeScreen(props) {
    const commMenu= [
        {name: '자재입고', navigation: 'MtrlsRcvng'}, 
        {name: '창고이동', navigation: 'WrhsMove'},
        {name: '출하', navigation: 'LgstcShpng'}
    ];

    const logisticsMenu= [
        {name: '작업지시', navigation: 'WorkOrder'}, 
        {name: '원자재입고', navigation: 'LgstcRcpt'}, 
        {name: '포장 생산등록', navigation: 'LgsprRgstr'}, 
        {name: '포장 생산실적', navigation: 'LgsprPrfrm'}, 
    ];

    const cardboardMenu= [
        {name: '생산실적', navigation: 'CrdbrPrfrm'}, 
    ];

    const itemList = (item) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.listContainer}>
                    <Text style={styles.listText}>{item.name}</Text>
                </TouchableOpacity>            
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>바코드 스캐너</Text>
                    </View>
                </View>

                <View>            
                    <View style={styles.menuTitle}>
                        <Icon name="angle-right" size={16} />
                        <Text style={styles.menuTitleText}>공통</Text>                
                    </View>
                    
                    <View>
                        {commMenu.map((item, index) => (
                            <View 
                                key={index}
                                style={styles.menuList}>
                                <TouchableOpacity
                                    onPress={() => {props.navigation.navigate(item.navigation)}}>
                                    <Text style={styles.menuText}>{item.name}</Text>
                                </TouchableOpacity>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#ececec', alignSelf: 'flex-end'}} />
                            </View>
                        ))}
                    </View>

                    <View style={styles.menuTitle}>
                        <Icon name="truck" size={16} />
                        <Text style={styles.menuTitleText}>포장</Text>                
                    </View>
                    
                    <View>
                        {logisticsMenu.map((item, index) => (
                            <View 
                                key={index}
                                style={styles.menuList}>
                                <TouchableOpacity
                                    onPress={() => {props.navigation.navigate(item.navigation)}}>
                                    <Text style={styles.menuText}>{item.name}</Text>                                
                                </TouchableOpacity>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#ececec', alignSelf: 'flex-end'}} />
                            </View>
                        ))}
                    </View>

                    <View style={styles.menuTitle}>
                        <Icon name="box" size={16} />
                        <Text style={styles.menuTitleText}>생산</Text>                
                    </View>
                    
                    <View>
                        {cardboardMenu.map((item, index) => (
                            <View 
                                key={index}
                                style={styles.menuList}>
                                <TouchableOpacity
                                    onPress={() => {props.navigation.navigate(item.navigation)}}>
                                    <Text style={styles.menuText}>{item.name}</Text>
                                </TouchableOpacity>
                                <View style={{ width: '100%', height: 1, backgroundColor: '#ececec', alignSelf: 'flex-end'}} />
                            </View>
                        ))}
                    </View>
                    
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        paddingTop: 20,
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {
        padding: 10
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'NotoSans-Blod',
    },
    listContainer: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center'
    },
    listText: {
        fontSize: 16,
        fontFamily: 'NotoSans-Blod'
    },
    menuTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 15
    },
    menuTitleText: {
        paddingLeft: 15,
        fontSize: 16,
        fontFamily: 'NotoSans-Black',
    },
    menuList: {
        paddingBottom: 10,
        paddingLeft: 30
    },
    menuText: {
        padding: 10,
        fontSize: 14,
        fontFamily: 'NotoSans-Blod',
    }
});