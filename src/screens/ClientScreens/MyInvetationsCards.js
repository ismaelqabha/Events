import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../assets/AppColors';
import InvetationOutboxComp from '../../components/InvetationOutboxComp';
import InvetationInboxComp from '../../components/InvetationInboxComp';
import { invitation } from '../../resources/data';
import { getInvetationByUser } from '../../resources/API';
import UsersContext from '../../../store/UsersContext';
import SearchContext from '../../../store/SearchContext';

const MyInvetationsCards = (props) => {

    const { fromInvetationInbox, fromInvetationOutbox } = props?.route.params
    const { userId } = useContext(UsersContext);
    const { invitationData, setInvitationData } = useContext(SearchContext)
    const [myInvetation, setMyInvetation] = useState([])


    const onPressHandler = () => {
        props.navigation.goBack();
    }



    useEffect(() => {
        const getInvetationInfo = async () => {
            try {
                const response = await getInvetationByUser({ createdBy: userId });
                if (response && response.invitation) {
                    setInvitationData(response.invitation)
                }

            } catch (error) {
                console.error('Error fetching or creating invitation:', error);
                showMessage('Error fetching or creating invitation.');
            }
        }


        const findMyInvetation = async () => {

            const queryInfo = {
                invitees: [{ user: userId }]
            }

            try {
                const response = await getInvetationByUser(queryInfo);
                if (response && response.invitation) {
                    console.log("response.invitation",response.invitation);
                    setMyInvetation(response.invitation)
                }

            } catch (error) {
                console.error('Error fetching or creating invitation:', error);
                showMessage('Error fetching or creating invitation.');
            }
        }


        findMyInvetation()
        getInvetationInfo()
    }, [userId])

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
        return invitationData.map(item => {
            return (
                <InvetationOutboxComp {...item} />
            )
        })
    }
    const renderInvetInboxCard = () => {
        return myInvetation.map(item => {
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