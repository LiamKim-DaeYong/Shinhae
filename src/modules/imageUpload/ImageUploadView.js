import React from 'react';
import { View, StyleSheet, Text, TextInput, Image, Dimensions } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import ImageSlider from 'react-native-image-slider';

import { Header } from '../components';

export default function ImageUploadScreen(props) {
    const windowWidth = Dimensions.get('window').width;

    const showPicker = () => {
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
            showsSelectedCount: true
        }).then(images => {
            props.setImages(images);            
        });
    };
   
    return (
        <View style={styles.container}>            
            <Header 
                title='이미지 업로드'
                navigation={props.navigation} />
                        
            <ScrollView>
               

                <View style={styles.imageContainer}>
                    <View
                        style={styles.image}>
                        {props.images.length===0
                            ? (
                                <View style={styles.imageIcon}>
                                    <Icon name="images" size={35} color="#cccccc" />
                                    <Text style={{ marginTop: 10, color: '#cccccc'}}>업로드할 이미지를 선택해 주세요.</Text>
                                </View>
                            )
                            : (
                                <ImageSlider
                                    images={props.images}
                                    customSlide={({ index, item, style, width }) => (                                        
                                        <View key={index} style={{  alignItems: 'center', justifyContent: 'center',}}>
                                            <Image source={{ uri: item.path }} style={{width:windowWidth - 40, height: 200}} />
                                        </View>
                                    )}
                                 />
                            )
                        }
                    </View>
                    <View style={styles.note}>
                        <TextInput 
                            onChangeText={(note) => props.setNote(note)}
                            value={props.note}
                            multiline={true}
                            numberOfLines={5}
                            placeholder="특이사항"
                            style={styles.noteInput} />
                    </View>

                    <TouchableOpacity
                        style={styles.blankImage}
                        onPress={showPicker}>
                            <Text style={styles.imageButtonText}>이미지 선택</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1}}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>차종</Text>
                        <TextInput 
                            onChangeText={(carKind) => props.setcarKind(carKind)}
                            value={props.carKind}
                            style={styles.input} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>차량번호</Text>
                        <TextInput 
                            onChangeText={(carNo) => props.setcarNo(carNo)}
                            value={props.carNo}
                            style={styles.input} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>기사성명</Text>
                        <TextInput 
                            onChangeText={(dlvryNm) => props.setDlvryNm(dlvryNm)}
                            value={props.dlvryNm}
                            style={styles.input} />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>기사연락처</Text>
                        <TextInput 
                            onChangeText={(dlvryNum) => props.setDlvryNum(dlvryNum)}
                            value={props.dlvryNum}
                            keyboardType='numeric'
                            style={styles.input} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>실넘버</Text>
                        <TextInput
                            onChangeText={(realNo) => props.setRealNo(realNo)}
                            value={props.realNo}             
                            style={styles.input} />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>
                            컨테이너
                        </Text>
                        <TextInput
                            onChangeText={(containerNo) => props.setContainerNo(containerNo)}
                            value={props.containerNo}
                            multiline={true}                

                            style={styles.input} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>참고사항</Text>
                        <TextInput 
                            onChangeText={(etc) => props.setEtc(etc)}
                            value={props.etc}     
                            style={styles.input} />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        props.upload().then((result) => {
                            if(result===true) {
                                props.navigation.goBack();
                            }
                        })
                    }}
                    style={styles.submitButton}>
                    <View style={{ justifyContent: 'center', paddingRight: 5 }}>
                            <Icon name="paper-plane" size={18} color="#000000" />
                    </View>    
                    <Text style={styles.submitText}>업로드</Text>
                </TouchableOpacity>
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        margin: 10,
        marginBottom: 5,
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
    },
    imageContainer: {
        margin: 10
    },
    image: {
        height: 200,
        backgroundColor: '#f6f6f6',
        margin: 10
    },
    imageIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    customImage: {
        height: 200
    },
    note: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    noteInput: {
        flex:1,
        minHeight: 40,
        borderWidth: 0.7,        
        borderColor: '#cccccc',
        paddingLeft: 10,        
        textAlignVertical: 'top'
    },
    blankImage: {
        padding: 15,
        margin: 10,
        borderWidth: 1,
        backgroundColor: '#134371',
        borderColor: '#134371'
    },
    imageButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
    },
    inputContainer: {
        flex: 1, 
        flexDirection: 'row', 
        marginHorizontal: 20, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderWidth: 0.7,
        marginBottom: 5,
        borderColor: '#cccccc'
    },
    inputText: {
        width: 100,
        paddingHorizontal: 10,
        borderRightWidth: 0.7,        
        fontWeight: 'bold', 
        color: 'gray',
        textAlign: 'center'
    },
    input: {
        flex: 1,
        height: 40, 
        alignSelf: 'center', 
        paddingLeft: 10
    },
    submitButton: {
        width: '90%',
        flexDirection: 'row',
        height: 40, 
        borderWidth: 1, 
        margin: 10, 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    submitText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black'
    }
});