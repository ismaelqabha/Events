import { StyleSheet, Text, View, Pressable, FlatList, ScrollView } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../../assets/AppColors';
import { EventType } from '../../resources/data';
import ProviderEventTypesComp from '../../components/ProviderComponents/ProviderEventTypesComp';
import SearchContext from '../../../store/SearchContext';

const ProviderSetEventType = (props) => {

    const { eventTypeInfo} = useContext(SearchContext);

    

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
            console.log("event item ",eventItem);
            return (
                <ProviderEventTypesComp {...eventItem} />
            )
        })
        return eventsList
    }
    return (
        <View style={styles.container}>
            {renderHeader()}
            <Text style={styles.titleQuestio}>هل ترغب بتحديد انواع المناسبات التي تقوم مصلحتك بخدمتها؟</Text>
            <View style={styles.body}>
                {/* <FlatList data={EventType} renderItem={renderEventsType} numColumns={2} /> */}
                <ScrollView contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false}>
                    {renderEventsType()}
                </ScrollView>
            </View>

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
        //marginVertical: 20
    },
    home: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }

})