import React, { useState, useContext } from 'react';
import { View, StyleSheet, Pressable, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather'
import SearchContext from '../../../store/SearchContext';
import { ScreenNames } from '../../../route/ScreenNames';
import ProviderAddPhotoComp from '../../components/ProviderAddPhotoComp';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const ProviderSetPhotos = (props) => {

    const { serviceImg,setserviceImg, ServId } = useContext(SearchContext);
    const [photoSource, setPhotoSource] = useState('');

    const SaveImg = () => {
        const AddNewImg = {
            imgId: uuidv4(),
            serviceID: ServId,
            image: photoSource,
            coverPhoto: true,
        }
        let ImgServArr = serviceImg;
        ImgServArr.push(AddNewImg);
        setserviceImg([...ImgServArr])
        console.log(serviceImg);
    }
    

    const onBackPress = () => {
        props.navigation.goBack();
    }
    const onNextPress = () => {
        props.navigation.navigate(ScreenNames.ProviderSetWorkingRegion, { data: { ...props } });
        
    }

    const onAddImgPress = () => {
        let options = {
            storagOption: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
        };

        launchImageLibrary(options, response => {
            console.log('Response : ', response);
            if (response.didCancel) {
                console.log('User Cancelled');
            } else if (response.error) {
                console.log('Error : ', response.error);
            } else if (response.customButton) {
                console.log('Usser tapped custom Button ', response.customButton);
            } else {
                let source = { uri: 'data:image/png;base64,' + response.base64};
                setPhotoSource(source);
            }
        });
        SaveImg();
        
    }
    const onPickImgPress = () => {
        let options = {
            storagOption: {
                path: 'images',
                mediaType: 'photo',
            },
            includeBase64: true,
            saveToPhotos: true,
        };
        launchCamera(options, response => {
            console.log('Response : ', response);
            if (response.didCancel) {
                console.log('User Cancelled');
            } else if (response.error) {
                console.log('Error : ', response.error);
            } else if (response.customButton) {
                console.log('Usser tapped custom Button ', response.customButton);
            } else {
                let source = { uri: 'data:image/png;base64,' + response.base64 };
                setPhotoSource(source);
            }
        });
        SaveImg();
    }

    const query = () => {
        return serviceImg.filter(id => {
            return id.serviceID == ServId;
        })
    }
    const renderServiceImg = ({ item }) => {
        return <ProviderAddPhotoComp  {...item} />;
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headText}>قم بأضافة الصور الخاصة في القاعة:</Text>
                <Text style={styles.subHeadText}>يجب اضافة 5 صور على الاقل </Text>
            </View>
            <View style={styles.body}>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.touch}
                        onPress={onAddImgPress}
                    >
                        <Card.Title style={{ fontSize: 20, marginRight: 20, }}>اضافة صور</Card.Title>
                        <AntDesign
                            name='plus'
                            style={{ fontSize: 25, }}
                        />

                    </TouchableOpacity>
                </View>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.touch}
                        onPress={onPickImgPress}
                    >
                        <Card.Title style={{ fontSize: 20, marginRight: 20, }}>التقاط صور</Card.Title>
                        <Feather
                            name='camera'
                            style={{ fontSize: 25, }}
                        />

                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={query()}
                        renderItem={renderServiceImg}
                        numColumns={2}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.back} onPress={onBackPress}>
                    <Text style={styles.backText}>رجوع</Text>
                </Pressable>
                <Pressable style={styles.next} onPress={onNextPress}>
                    <Text style={styles.nextText}>التالي</Text>
                </Pressable>

            </View >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: 40,
        marginBottom: 10,
    },
    headText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    subHeadText: {
        fontSize: 14,
    },
    body: {
        height: '75%',
        //marginTop: 30,
        alignItems: 'center',
        //justifyContent: 'center',
        //alignContent: 'center'
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 20,
    },
    next: {
        width: 70,
        height: 40,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    back: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    backText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    touch: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 300,
        height: 40,
        borderRadius: 15,
        marginTop: 10,


    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: '80%',
        height: 50,
        marginTop: 10,
        alignSelf: 'center',
    },

})

export default ProviderSetPhotos;
