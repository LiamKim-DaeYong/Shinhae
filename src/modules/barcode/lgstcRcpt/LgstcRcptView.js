import React, { useRef } from 'react';
import { KeyboardAvoidingView, View, StyleSheet, TextInput, Dimensions } from 'react-native';
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
    let partDropBox = null;
    const scrollViewRef = useRef();    
    return (        
        <View style={styles.container}>
            <Header 
                title='원자재입고' 
                navigation={props.navigation} 
                onPress={props.submit} />
            
            
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <BarcodeReader
                    setCenterPosition={props.setCenterPosition}
                    scanStatus={props.scanStatus}
                    scanning={props.scanning}
                    />
                
                <View style={{ height: windowHeight* 0.8 - 200 }}>
                    <DropDownPicker
                        ref={ref=> bcncDropBox = ref}
                        placeholder='거래처'
                        items={props.bcncList}
                        defaultIndex={0}
                        containerStyle={styles.dropBox} 
                        onChangeItem={(item) => {
                            props.setBcnc(item);
                            partDropBox.setState({choice: {label: null, value: null}})
                        }} 
                        onOpen={() =>
                            partDropBox.setState({isVisible: false})
                        } />

                    <DropDownPicker
                        ref={ref=> partDropBox = ref}
                        placeholder='부품명'
                        items={props.partList.filter(item => {
                            return item.bcncSq === props.bcncSq
                        })}
                        defaultIndex={0}
                        containerStyle={styles.dropBox}
                        disabled={props.bcncSq===null}
                        onChangeItem={item => props.setLot(item)}
                        onOpen={() =>
                            bcncDropBox.setState({isVisible: false})
                        } />

                    <View style={styles.table}>
                        <Table>
                            <Row data={props.tableHead} flexArr={[1, 2, 1, 1]} style={styles.tableHeader} textStyle={styles.headerText}/>
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
                                                                
                                    <View style={{ flex: 2 }}>
                                        <Cell 
                                            key={index} 
                                            data={rowData.barcode} 
                                            textStyle={styles.rowText} />
                                    </View>
        
                                    <View style={{ flex: 1 }}>
                                        <Cell 
                                            data={
                                                <TextInput 
                                                    style={{ textAlign: 'center' }} 
                                                    value={"" + rowData.qntty}
                                                    keyboardType='numeric'
                                                    onChangeText={(qntty) => props.setQntty(index, qntty)}
                                                    />
                                            } 
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
            </KeyboardAvoidingView>                
        </View>               
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    dropBox: {
        margin: 10,
        marginBottom: 0,
        height: 40
    },
    table: {
        margin: 10,
        flex: 1
    },
    dataWrapper: { 
        marginTop: -1
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
    submitButton: {
        flexDirection: 'row',
        height: 50,
        padding: 15,
        marginBottom: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        justifyContent: 'center'
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black'
    },
    scanButton: {
        padding: 15,
        height: 50,
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