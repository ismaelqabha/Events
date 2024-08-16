import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../assets/AppColors';
import InvetationOutboxComp from '../../components/InvetationOutboxComp';
import InvetationInboxComp from '../../components/InvetationInboxComp';
import { invitation } from '../../resources/data';

const MyInvetationsCards = (props) => {
    
    const { fromInvetationInbox, fromInvetationOutbox, relations, loading  } = props?.route.params

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    useEffect(() => {

    }, [])

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}>
                    <AntDesign
                        name={"left"}
                        color={"black"}
                        size={20} />
                </Pressable>
                {fromInvetationInbox && <Text style={styles.txt}>البطاقات الواردة</Text>}
                {fromInvetationOutbox && <Text style={styles.txt}>البطاقات الصادرة</Text>}
            </View>
        )
    }
    const renderInvetOutboxCard = () => {
        return invitation.map(item => {
            return (
                <InvetationOutboxComp {...item}
                relations={relations}
                loading={loading} />
            )
        })
    }
    const renderInvetInboxCard = () => {
        return invitation.map(item => {
            return (
                <InvetationInboxComp {...item} />
            )
        })

    }
    return (
        <View style={styles.container}>
            {renderHeader()}
            {fromInvetationInbox && renderInvetInboxCard()}
            {fromInvetationOutbox && renderInvetOutboxCard()}

        </View>
    )
}

export default MyInvetationsCards

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '6%',
        width: '95%',
        alignSelf: 'center',
        //borderWidth: 1
    },
    txt: {
        fontSize: 20,
        color: colors.puprble,
    },
})