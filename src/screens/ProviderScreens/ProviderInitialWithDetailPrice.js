
import React, { useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScreenNames } from '../../../route/ScreenNames';
import ScreenHeader from '../../components/ProviderComponents/ScreenHeader';
import strings from '../../assets/res/strings';
import ScreenBack from '../../components/ProviderComponents/ScreenBack';
import ScreenNext from '../../components/ProviderComponents/ScreenNext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import SearchContext from '../../../store/SearchContext';
import { addService, addServiceImages } from '../../resources/API';
import HeaderComp from '../../components/ProviderComponents/HeaderComp';
import { colors } from '../../assets/AppColors';
import { showMessage } from '../../resources/Functions';
import UsersContext from '../../../store/UsersContext';

const ProviderInitialWithDetailPrice = props => {
    const langauge = strings.arabic.ProviderScreens.ProviderInitialWithDetailPrice;
    const {
        serviceAddress,
        price,
        setPrice,
        serviceRegion,
        title,
        SuTitle,
        description,
        selectServiceType,
        photoArray,
        workAreas,
        additionalServices,
        socialMediaArray,
        phoneNumer,
        email
    } = useContext(ServiceProviderContext);
    const { userId } = useContext(UsersContext);

    const params = {
        ScreenHeader: {
            HeaderStyle: styles.header,
            HeaderTextStyle: styles.headText,
            Text: langauge.Header,
        },
        ScreenBack: {
            backStyle: styles.back,
            backTextStyle: styles.backText,
            Text: langauge.Back,
            onPress: () => onBackPress(),
        },
        ScreenNext: {
            nextStyle: styles.next,
            nextTextStyle: styles.nextText,
            Text: langauge.Next,
            onPress: () => onPublishPress(),
        },
    };

    const onPublishPress = async () => {
        const body = {
            userID: userId,
            servType: selectServiceType,
            title: title,
            subTitle: SuTitle,
            desc: description,
            region: serviceRegion,
            address: serviceAddress,
            servicePrice: price,
            workingRegion: workAreas,
            additionalServices: additionalServices,
            socialMedia: socialMediaArray,
            servicePhone: phoneNumer,
            serviceEmail: email,
        };
        await addService(body)
        then(async res => {
            console.log(' service res ->', res);
            await addServiceImages(photoArray, res?.serviceID).then((res) => {
                console.log("images res -> ", res);
                showMessage("تم حفظ البيانات")
            })
        })
            .catch(e => {
                console.log('create new event error : ', e);
            });
    };

    const onAddSerPress = () => {
        props.navigation.navigate(ScreenNames.ProviderAddServiceDetail, {
            data: { ...props },
        });
    };
    const onBackPress = () => {
        props.navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <HeaderComp />
            <ScreenHeader ScreenHeader={params.ScreenHeader} />
            <View style={styles.body}>
                <View style={styles.price}>
                    <Text style={styles.descText}>{langauge.setPrice}</Text>
                    <View style={styles.IconView}>
                        <Foundation
                            name="price-tag"
                            color={colors.puprble}
                            size={25}
                        />
                    </View>
                </View>
                <TextInput
                    style={styles.titleInput}
                    keyboardType="numeric"
                    maxLength={5}
                    onChangeText={value => {
                        setPrice(value);
                    }}
                />
                <View style={styles.detailprice}>
                    <View style={styles.price}>
                        <Text style={styles.descText}>{langauge.setDetailPrice}</Text>
                        <View style={styles.IconView}>
                            <Foundation
                                name="pricetag-multiple"
                                color={colors.puprble}
                                size={25}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.AddButton}
                        onPress={onAddSerPress}
                    //activeOpacity={0.2} underlayColor={supmeted ? 'white' : 'gray'}
                    >
                        <FontAwesome5
                            name="less-than"
                            color={colors.puprble}
                            size={18}
                        />
                        <Text style={styles.footText}>{langauge.addServDetailes}</Text>
                        <Entypo
                            name="plus"
                            color={colors.puprble}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
};

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
        color: colors.puprble,
        fontWeight: 'bold'
    },
    body: {
        marginTop: 20,
    },

    titleInput: {
        textAlign: 'center',
        height: 50,
        width: '50%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#dcdcdc',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        marginRight: 70
    },
    AddButton: {
        flexDirection: 'row',
        width: '70%',
        backgroundColor: 'white',
        alignItems: 'center',
        marginRight: 20,
        height: 50,
        justifyContent: 'space-around',
        marginTop: 10,
        borderRadius: 10,
        alignSelf: 'center',
        elevation: 5
    },
    footText: {
        fontSize: 18,
        color: colors.puprble,
        marginLeft: 40,
    },
    descText: {
        fontSize: 20,
        color: colors.puprble,
        marginRight: 20

    },
    price: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
    },
    detailprice: {
        marginTop: 50,
        alignItems: 'flex-end'
    }
});

export default ProviderInitialWithDetailPrice;
