import React from 'react';
import { View, StyleSheet, Text, TextInput, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';

import { Error } from '../components';

export default function PurchsScreen(props) {
    const _FlatListItemSeparator = () => {
        return (
            <View style={{ width: '100%', height: 1, backgroundColor: '#ececec', alignSelf: 'flex-end'}} />
        )
    }

    const _renderItem = ({item}) => {
        return (
            <View style={styles.container}>
                <View
                    style={styles.listContainer}>
                    <View style={styles.left}>
                        <Text style={styles.listTitle}>{item.orderPlace} - {item.orderNo}</Text>
                        <View style={styles.subTitle}>
                            <Text style={styles.subTitleText}>발주일 : {item.orderDt}</Text>
                            <Text style={styles.subTitleText}>   |   납기일 : {item.prdPymntDt}</Text>
                        </View>
                        
                    </View>
                    <View style={styles.right}>
                        {item.inputDt !== ''?<Text style={styles.rightText}>입고</Text>: null}
                    </View>
                </View>            
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>입고 현황</Text>
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
                    <Text style={styles.filterTitle}>조회기간</Text>
                    
                    <View style={styles.filterButtons}>
                        {props.dateFilterList.map((item, index) => (
                            <View
                                style={{ flex: 1, marginRight: index===3? 0 : 5 }}
                                key={index}>
                                <TouchableOpacity
                                    style={index===props.dateFilter?styles.selectButton:styles.defaultButton}
                                    onPress={() => props.selectDateFilter(index)}>
                                    <Text style={index===props.dateFilter?styles.selectText:styles.defaultText}>{item}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    <View style={styles.dateContainer}>
                        <DatePicker
                            style={styles.datePicker}
                            date={props.startDate}
                            mode="date"
                            placeholder="시작일"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            iconComponent={
                                <Icon style={styles.datePickerIcon} name="calendar-alt" size={20} />
                            }
                            customStyles={{
                                dateInput: {
                                    borderColor: '#c8c8c8'
                                },
                                placeholderText: {
                                    fontSize: 12,
                                    color: '#c8c8c8'
                                }
                            }} 
                            onDateChange={(date) => props.changeStartDate(date)} />

                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'gray', alignSelf: 'center'}}> - </Text>

                        <DatePicker
                            style={styles.datePicker}
                            date={props.endDate}
                            mode="date"
                            placeholder="종료일"
                            format="YYYY-MM-DD"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel" 
                            iconComponent={
                                <Icon style={styles.datePickerIcon} name="calendar-alt" size={20} />
                            } 
                            customStyles={{
                                dateInput: {
                                    borderColor: '#c8c8c8'
                                },
                                placeholderText: {
                                    fontSize: 12,
                                    color: '#c8c8c8'
                                }
                            }}
                            onDateChange={(date) => props.changeEndDate(date)} />
                    </View>
                            
                    <TextInput 
                        style={styles.searchBar}
                        value={props.searchKeyword}
                        onChangeText={(keyword) => props.changeSearchKeyword(keyword)}
                        placeholder='거래처' />
                
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
                    data={props.purchsList}
                    keyExtractor={(item) => '' + item.orderSq}
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
        flexDirection: 'row',
        paddingBottom: 10,
    },
    selectButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        alignItems: 'center',
        backgroundColor: 'gray',
        borderColor: 'gray',        
    },
    selectText: {
        fontFamily: 'NotoSans-Blod',
        color: 'white',
        fontSize: 12
    },
    defaultButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#c8c8c8',
        alignItems: 'center'
    },
    defaultText : {
        color: '#c8c8c8',
        fontFamily: 'NotoSans-Blod',
        fontSize: 12
    },
    dateContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    datePicker: {
        flex: 1,
        borderColor: '#a5a5a5',
        backgroundColor: 'white'
    },
    datePickerIcon : {
        position: 'absolute',
        right: 10,
        color: '#a5a5a5'
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
    left: {
        flex: 3,
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
    },
    erorrContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});