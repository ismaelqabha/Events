import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from '../../assets/AppColors';
import InvetationOutboxComp from '../../components/InvetationOutboxComp';
import InvetationInboxComp from '../../components/InvetationInboxComp';
import { invitation } from '../../resources/data';
import { getInvetationByUser } from '../../resources/API';
import UsersContext from '../../../store/UsersContext';

const MyInvetationsCards = (props) => {

    const { fromInvetationInbox, fromInvetationOutbox, relations, loading } = props?.route.params
    const { userId } = useContext(UsersContext);
    const [invetationInfo, setInvetationInfo] = useState([])
    const onPressHandler = () => {
        props.navigation.goBack();
    }

   

    useEffect(() => {
        const getInvetationInfo = async () => {
            try {
                const response = await getInvetationByUser({ createdBy: userId});
                if (response && response.invitation) {
                    setInvetationInfo(response.invitation)
                }
    
            } catch (error) {
                console.error('Error fetching or creating invitation:', error);
                showMessage('Error fetching or creating invitation.');
            }
    
            // getInvetationByUser({ createdBy: userId }).then(res => {
            //      console.log(res);
            //     setInvetationInfo(res)
            //  })
    
        }

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
        console.log("invetationInfo", invetationInfo);
        return invetationInfo.map(item => {
            return (
                <InvetationOutboxComp //{...item}
                    id ={item._id}
                    relations={relations}
                    loading={loading}
                />
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