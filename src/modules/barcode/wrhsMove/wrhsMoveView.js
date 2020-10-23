import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import Icon from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker'

import { Header, Loading, BarcodeReader, ButtonForm } from '../../components';

const windowHeight = Dimensions.get('window').height;
export default function wrhsWrhsScreen(props) {

    const delBtn = (index) => (
        <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() => props.delRow(index)}>
            <Icon name="trash" size={20} color="#000000"/>
        </TouchableOpacity>
    );        

    const scrollViewRef = useRef();    
    return (        
        <View style={styles.container}>            
            <Header 
                title='창고이동' 
                navigation={props.navigation} 
                onPress={props.submit} />
            
            <BarcodeReader
                setCenterPosition={props.setCenterPosition}
                scanStatus={props.scanStatus}
                scanning={props.scanning}
                />

            <View style={{ height: windowHeight* 0.8 - 200 }}>
                <DropDownPicker
                    placeholder='창고선택'
                    items={props.wrhousngList.map((item, index) => (
                        {"label": item.codeNm, "value": item.code}
                    ))}
                    defaultIndex={0}
                    containerStyle={styles.dropBox}
                    onChangeItem={item => props.setWrhousng(item)} />
                
                <View style={styles.table}>
                    <Table>
                        <Row data={props.tableHead} flexArr={[1, 3, 1]} style={styles.tableHeader} textStyle={styles.headerText}/>
                    </Table>
                    <ScrollView
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>

                        {props.tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Cell
                                        data={index +  1} 
                                        textStyle={styles.rowText} />
                                </View>
                            
                                <View style={{ flex: 3 }}>
                                    <Cell 
                                        key={index} 
                                        data={rowData} 
                                        textStyle={styles.rowText} />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Cell 
                                        data={delBtn(index)} 
                                        textStyle={styles.rowText} />
                                </View>
                            </TableWrapper>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <ButtonForm 
                submit={props.submit}
                scanStatus={props.scanStatus}
                readyToScan={props.readyToScan}
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
        backgroundColor: 'white',
    },
    dropBox: {
        margin: 10,
        height: 40
    },
    table: {
        marginHorizontal: 10,
        flex: 1
    },
    tableHeader: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 5
    },
    headerText: {
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    rowText: {
        margin: 6,
        textAlign: 'center'
    },
    buttons: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    submitButton: {
        padding: 15,
        borderWidth:1,
        marginVertical: 5,
        marginHorizontal: 10,
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
        marginBottom: 5,
        marginHorizontal: 10,
        borderWidth: 1,
        backgroundColor: '#134371',
        borderColor: '#134371'
    },
    scanText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
    }
});