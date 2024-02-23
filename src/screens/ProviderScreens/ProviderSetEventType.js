import { StyleSheet, Text, View, Pressable, FlatList, ScrollView,ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../../assets/AppColors';
import { EventType } from '../../resources/data';
import ProviderEventTypesComp from '../../components/ProviderComponents/ProviderEventTypesComp';
import SearchContext from '../../../store/SearchContext';
import { updateService } from '../../resources/API';
import ServiceProviderContext from '../../../store/ServiceProviderContext';

const ProviderSetEventType = (props) => {
    const { serviceInfoAccorUser, setServiceInfoAccorUser, eventsTypeWorking } = useContext(ServiceProviderContext);
    const { eventTypeInfo, isFirst } = useContext(SearchContext);

    const updateWorkingEvents = () => {
        const selectedServiceIndex = serviceInfoAccorUser?.findIndex(item => item.service_id === isFirst)

        const newData = {
            service_id: isFirst,
            eventWorkWith: eventsTypeWorking
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = newData;
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }

    const onBackPress = () => {
        props.navigation.goBack();
    }
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onBackPress}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.titleTxt}>تحديد انواع المناسبات</Text>
            </View>
        )

    }

    const renderEventsType = () => {
        const eventsList = eventTypeInfo?.map((eventItem) => {
            return (
                <ProviderEventTypesComp {...eventItem} />
            )
        })
        return eventsList
    }
    return (
        <View style={styles.container}>
            {renderHeader()}
            <Text style={styles.titleQuestio}>قم بتحديد انواع المناسبات التي تقوم مصلحتك بخدمتها؟</Text>
            <View style={styles.body}>
                {/* <FlatList data={EventType} renderItem={renderEventsType} numColumns={2} /> */}
                <ScrollView contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>
                    {renderEventsType()}

                </ScrollView>
            </View>
            <Pressable style={styles.footer} onPress={updateWorkingEvents}>
                <Text style={styles.itemText}>حفظ</Text>
            </Pressable>
        </View>
    )
}

export default ProviderSetEventType

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleTxt: {
        fontSize: 20,
        color: colors.puprble,
        marginRight: 20,
    },
    icon: {
        marginLeft: 10,
    },
    titleQuestio: {
        fontSize: 20,
        color: colors.puprble,
        marginRight: 20,
        marginVertical: 20,
    },
    body: {
        width: '90%',
        alignSelf: 'center',
        height: '70%'
    },
    home: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    footer: {
        marginTop: 20,
        // flexDirection: 'row',
        // justifyContent: 'flex-end',
        width: '100%',
        height: 70,
        paddingHorizontal: '10%',
        position: 'absolute',
        bottom: 0,
    },
    itemText: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 20
    },

})