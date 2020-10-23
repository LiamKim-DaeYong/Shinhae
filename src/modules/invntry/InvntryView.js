import React from 'react';
import { View, StyleSheet, Text, TextInput, Image, ScrollView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Error } from '../components';

export default function InvntryScreen(props) {
    const _FlatListItemSeparator = () => {
        return (
            <View style={{ width: '100%', height: 1, backgroundColor: '#ececec', alignSelf: 'flex-end'}} />
        )
    }

    const _renderItem = ({item}) => {
        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: item.img===null? 'http://211.224.128.103:9009/images/egovframework/common/no-image.jpg': item.img
                            }} />
                    </View>
                    <View style={styles.left}>
                        <Text style={styles.listTitle}>{item.nm}</Text>
                        <View style={styles.subTitle}>
                            <Text style={styles.subTitleText}>{item.itemType}</Text>
                            <Text style={styles.subTitleText}>   |   {item.wrhousngCode}</Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.rightText}>{item.currQntty}</Text>
                    </View>
                </View>            
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>재고 현황</Text>
                </View>

                <TouchableOpacity 
                    onPress={props.filterOpen}
                    style={styles.filterToggle}>
                    <View style={styles.toggleText}>
                        <Text>필터 </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {props.filterVisible &&                
                <View style={styles.filter}>
                    
                    <Text style={styles.filterTitle}>품목구분</Text>

                    <ScrollView
                    
                        style={styles.filterButtons}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>

                        {props.dstrbFilterList.map((item, index) => (
                            <View
                                style={{ width: 110, marginRight: index===props.dstrbFilterList.length? 0 : 5 }}
                                key={item.code}>
                                <TouchableOpacity
                                    style={item.code===props.dstrbFilter?styles.selectDateButton:styles.defaultDateButton}
                                    onPress={() => props.selectDstrbFilter(item.code)}>
                                    <Text style={item.code===props.dstrbFilter?styles.selectDateText:styles.defaultDateText}>{item.codeNm}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <Text style={styles.filterTitle}>창고구분</Text>

                    <ScrollView
                        style={styles.filterButtons}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>

                        {props.invntryFilterList.map((item, index) => (
                            <View
                                style={{ width: 110, marginRight: index===props.invntryFilterList.length? 0 : 5 }}
                                key={item.code}>
                                <TouchableOpacity
                                    style={item.code===props.invntryFilter?styles.selectDateButton:styles.defaultDateButton}
                                    onPress={() => props.selectInvntryFilter(item.code)}>
                                    <Text style={item.code===props.invntryFilter?styles.selectDateText:styles.defaultDateText}>{item.codeNm}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                    <TextInput 
                        style={styles.searchBar}
                        placeholder='품명' />

                    <TouchableOpacity 
                        style={styles.searchButton}
                        onPress={props.searchList} >
                        
                        <Text style={styles.searchText}>조회</Text>
                    </TouchableOpacity>
                </View>
            }

            { props.error
                ? (<Error onPress={props.refreshList} />)
                :(<FlatList
                    style={{padding: 10, paddingBottom: 20}}
                    ItemSeparatorComponent = {_FlatListItemSeparator}                    
                    data={props.mtrlsList}
                    keyExtractor={(item) => '' + item.stockSq}
                    renderItem={_renderItem}
                    onEndReached={props.loadMoreList}
                    onEndReachedThreshold={0.1}
                    refreshing={props.isLoading}
                    onRefresh={props.refreshList} >
                </FlatList>)
            }
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
        flex: 1,
        paddingLeft: 10,
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'NotoSans-Blod',
    },
    filterToggle: {
        flexDirection: 'row',
    },
    toggleText: {     
        fontSize: 14,
        color: '#000000'
    },
    toggleIcon: {
        justifyContent: 'center',
        paddingTop: 5,
        color: '#000000'
    },
    filter: {
        paddingTop: 10,
        padding: 20,
        backgroundColor: '#f6f6f6',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#ececec'
    },
    filterTitle: {
        paddingLeft: 5,
        paddingBottom: 5,
        fontFamily: 'NotoSans-Blod'
    },
    searchBar: {
        borderWidth: 1,
        paddingLeft: 15,
        height: 45,
        fontSize: 12,
        fontFamily: 'NotoSans-Blod',
        borderColor: '#c8c8c8',
        backgroundColor: 'white',        
    },
    filterButtons: {        
        paddingBottom: 10,        
    },
    selectDateButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: 'gray',
        borderColor: 'gray',        
    },
    selectDateText: {
        fontFamily: 'NotoSans-Blod',
        color: 'white',
        fontSize: 12
    },
    defaultDateButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#c8c8c8',
        alignItems: 'center'
    },
    defaultDateText : {
        color: '#c8c8c8',
        fontFamily: 'NotoSans-Blod',
        fontSize: 12
    },
    searchButton: {
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#212121',
        borderColor: '#212121',
        marginTop: 10,
    },
    searchText: {
        color: 'white',
        fontFamily: 'NotoSans-Black'
    },
    listContainer: {
        flexDirection: 'row',
        padding: 10
    },
    imageContainer: {
        justifyContent: 'center'
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    left: {
        flex: 3
    },
    right: {
        flex: 1,
        justifyContent: 'center'
    },
    listTitle : {
        fontSize: 14,
        fontFamily: 'NotoSans-Blod',
        paddingBottom: 10
    },
    subTitle: {
        flexDirection: 'row'
    },
    subTitleText : {
        fontSize: 10,
        color: 'gray'
    },
    rightText: {
        fontSize: 14, 
        fontFamily: 'NotoSans-Blod',
        color: 'red',
        textAlign: 'right'
    }
});