import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, Image } from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";
import { images } from '../../assets/photos/images';
import { colors } from '../../assets/AppColors';
import { updateRelation } from '../../resources/API';
import { showMessage } from '../../resources/Functions';
import { formatDistanceToNow } from 'date-fns';



const ClientIncomingRelation = (props) => {
    const [pendingRelations, setPendingRelations] = useState(props.route.params.pendingRelations || []);
    const { setRelations } = props.route.params || {};
    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const renderHeader = () => {
        return (
            <View style={styles.headerImg}>
                <View style={styles.viewIcon}>
                    <Pressable onPress={onPressHandler}>
                        <Ionicons
                            style={styles.icon}
                            name={"arrow-back"}
                            color={"black"}
                            size={25} />
                    </Pressable>
                </View>
                <View style={styles.viewtitle}>
                    <Text style={styles.title}>قائمة طلبات الصداقة</Text>
                </View>
            </View>
        )
    }

    /**
     * Handles the user action for accepting or refusing a relationship request.
     * @param {'accept' | 'refuse'} action - The action to be performed. Can be either "accept" or "refuse".
     * @param {string} relationId - The ID of the relationship to be updated.
     */
    const handleAction = (action, relationId) => {
        const status = action === 'accept' ? 'accepted' : 'rejected';

        // Call API to update the relationship status
        updateRelation({ friendshipId: relationId, status })
            .then((res) => {
                console.log("response ", res);
                showMessage(res?.message || "error updating");

                if (res?.message && res.user) {
                    // Update pendingRelations by filtering out the handled relation
                    setPendingRelations(prevRelations =>
                        prevRelations.filter(relation => relation.friendshipDetails.friendshipId !== relationId)
                    );

                    // Update relations state
                    setRelations(prevRelations => {
                        // Find index of the relation to be updated
                        const index = prevRelations.findIndex(relation => relation.friendshipDetails.friendshipId === relationId);

                        // If the relation is found, update it with new data
                        if (index !== -1) {
                            const updatedRelation = {
                                ...prevRelations[index],
                                friendshipDetails: {
                                    ...prevRelations[index].friendshipDetails,
                                    status: res.user.status || "pending",
                                    // Add any other fields you want to update
                                    createdAt: res.user.createdAt,
                                    updatedAt: res.user.updatedAt
                                },
                                userInfo: {
                                    ...prevRelations[index].userInfo,
                                    ...res.user.userInfo
                                }
                            };

                            // Replace the old relation with the updated one
                            const newRelations = [...prevRelations];
                            newRelations[index] = updatedRelation;
                            return newRelations;
                        }

                        return prevRelations;
                    });
                }
            })
            .catch((e) => {
                console.error(e);
                showMessage("error updating, please try again");
            });
    };


    const renderRequestCard = (relation) => {
        const { User_name, UserPhoto } = relation.userInfo;
        const { friendshipId, createdAt } = relation.friendshipDetails
        const timeAgo = createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : 'Unknown time';
        return (
            <View style={styles.card} key={relation.userInfo.USER_ID}>
                <View style={styles.cardInfo}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.infoTxt}>{User_name}</Text>
                        <Text style={styles.timeTxt}>{timeAgo}</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <Pressable style={styles.refusPressView} onPress={() => handleAction("refuse", friendshipId)}>
                            <Text style={styles.infoTxt}>رفض</Text>
                        </Pressable>
                        <Pressable style={styles.acceptPressView} onPress={() => handleAction("accept", friendshipId)}>
                            <Text style={styles.infoTxt}>موافقة</Text>
                        </Pressable>
                    </View>
                </View>
                <Image source={{ uri: UserPhoto }} style={{ width: 80, height: 80, borderRadius: 50 }} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                    {pendingRelations?.map((relation) => renderRequestCard(relation)) || null}
                </ScrollView>
            </View>
        </View>
    )
}

export default ClientIncomingRelation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BGScereen,
    },
    headerImg: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 10,
    },
    body: {
        width: '100%',
        height: '100%',
        marginTop: 20,
    },
    viewtitle: {
        justifyContent: 'center',
        height: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.puprble,
        marginRight: 20,
    },
    card: {
        width: '90%',
        height: 100,
        elevation: 5,
        backgroundColor: colors.BGScereen,
        margin: 10,
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    cardInfo: {
        width: '70%',
        height: '100%',
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 5,
        alignSelf: 'flex-end',
    },
    acceptPressView: {
        width: 120,
        height: 30,
        borderWidth: 3,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.puprble,
    },
    refusPressView: {
        width: 120,
        height: 30,
        borderWidth: 3,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.silver,
        marginRight: 10
    },
    infoTxt: {
        fontSize: 18,
        color: colors.puprble
    },
    timeTxt: {
        fontSize: 15,
    }
})