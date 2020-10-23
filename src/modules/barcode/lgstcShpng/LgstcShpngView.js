import React, { useRef } from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker'

import Icon from 'react-native-vector-icons/FontAwesome5';
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
        
    let bcncDropBox = null;
    let rcvordDropBox = null;
    const scrollViewRef = useRef();
    return (        
        <View style={styles.container}>
            <Header 
                title='출하' 
                navigation={props.navigation} 
                onPress={props.submit} />

            <BarcodeReader
                setCenterPosition={props.setCenterPosition}
                scanStatus={props.scanStatus}
                scanning={props.scanning}
                />

            <View style={{ height: windowHeight* 0.8 - 200 }}>
                <View style={{ flexDirection: 'row' }}>
                    <DropDownPicker
                        ref={ref=> bcncDropBox = ref}
                        placeholder='거래처'
                        items={props.bcncList}
                        defaultIndex={0}
                        containerStyle={[styles.dropBox, { flex: 1 }]}
                        onChangeItem={(item) => {
                            props.setBcnc(item);
                            rcvordDropBox.setState({choice: {label: null, value: null}})
                        }} 
                        onOpen={() =>
                            rcvordDropBox.setState({isVisible: false})
                        } />

                    <DropDownPicker
                        ref={ref=> rcvordDropBox = ref}
                        placeholder='수주번호'
                        items={props.rcvordNoList.filter(item => {
                            return item.value===props.bcncSq
                        })}
                        defaultIndex={0}
                        containerStyle={[styles.dropBox, { flex: 1 }]}
                        disabled={props.bcncSq===null}
                        onChangeItem={item => props.setRcvordNo(item)}
                        onOpen={() =>
                            bcncDropBox.setState({isVisible: false})
                        } />
                </View>

                <View>
                    <TextInput
                        value={props.localNm}
                        label='local'
                        placeholder="납품처"
                        style={styles.input} 
                        editable={(props.bcncSq!=null && props.rcvordNo===null)} 
                        onChangeText={(localNm) => props.setLocal(localNm)} />
                </View>      

                <View style={styles.table}>
                    <Table>
                        <Row data={props.tableHead} flexArr={[1, 3]} style={styles.tableHeader} textStyle={styles.headerText}/>
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
    barcode: {
        flex: 1,
        overflow: 'hidden',
    },
    barcodeArea: {
        position: 'absolute',
        borderWidth: 3,
        width: '90%',
        height: 80,
        borderColor: '#00ff00',
        left: '5%',
        top: 35
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
    input: {
        height: 40,
        borderWidth: 1,
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginBottom: 10,
        paddingLeft: 15,
        borderColor: '#ececec'
    },
    buttons: {
        position: 'absolute',
        width: '100%',
        bottom: 10
    },
    submitButton: {
        padding: 15,
        marginBottom: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderWidth: 1
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black'
    },
    scanButton: {
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: '#134371',
    },
    scanText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
    }
});