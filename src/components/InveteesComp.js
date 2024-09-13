import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../assets/AppColors'
import AntDesign from "react-native-vector-icons/AntDesign";
import UsersContext from "../../store/UsersContext"
import { getRelations } from '../resources/API';
import { ActivityIndicator } from 'react-native-paper';

const InveteesComp = (props) => {
    const { onSelectionChange, inviteesList } = props;
    const { relations, setRelations, userId } = useContext(UsersContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState({});
    const [loading, setLoading] = useState(false);
    // console.log("inviteesList", inviteesList);
    // console.log("inviteesList length ", inviteesList.length);

    const fetchRelations = async () => {
        setLoading(true);
        const relationsData = await getRelations({ userId });

        if (relationsData && relationsData.error) {
            showMessage("هناك خطأ في الحصول على البيانات، يرجى المحاولة لاحقاً");
        } else {
            setLoading(false);
            setRelations(relationsData);
        }
    };

    useEffect(() => {
        if (!relations) {
            fetchRelations();
        } else {
            setLoading(false);
        }
    }, [relations, userId, setRelations]);

    useEffect(() => {
        onSelectionChange(selectedItems);
    }, [selectedItems, onSelectionChange]);

    const isInvited = (userId) => {
        // console.log("inviteesList", inviteesList);
        return inviteesList.some(invitee => invitee.user._id === userId);
    };

    const toggleSelection = (userId) => {
        setSelectedItems(prevState => {
            const newState = { ...prevState, [userId]: !prevState[userId] };
            return newState;
        });
    };

    const filteredRelations = relations
        ? relations.filter(relation => relation.userInfo.User_name.includes(searchQuery))
        : [];

    const RnderSearchBar = () => {
        return (
            <View style={styles.SearchView}>
                <TextInput
                    style={styles.Input}
                    placeholder='بحث'
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                <AntDesign
                    style={styles.icon}
                    name={"search1"}
                    size={20}
                />
            </View>
        );
    };

    const RnderInveteesItem = (item) => {
        const isSelected = selectedItems[item.userInfo._id] || false;
        return (
            <View style={styles.ItemView} key={item.userInfo._id}>
                <TouchableOpacity
                    style={styles.Invetation}
                    onPress={() => toggleSelection(item.userInfo._id)}
                >
                    <Text style={styles.txt}>{isSelected ? 'تم الاختيار' : 'تم الدعوة'}</Text>
                </TouchableOpacity>
                <View style={styles.NameView}>
                    <Text style={styles.txt}>{item.userInfo.User_name}</Text>
                    <Image style={styles.img} source={{ uri: item.userInfo.UserPhoto }} />
                </View>
            </View>
        );
    };

    const rnderOtherRelatio = (item) => {
        const isSelected = selectedItems[item.userInfo._id] || false;
        return (
            <View style={styles.ItemView} key={item.userInfo._id}>
                <TouchableOpacity
                    style={styles.Invetation}
                    onPress={() => toggleSelection(item.userInfo._id)}
                >
                    <Text style={styles.txt}>{isSelected ? 'تم الاختيار' : 'اختيار'}</Text>
                </TouchableOpacity>
                <View style={styles.NameView}>
                    <Text style={styles.txt}>{item.userInfo.User_name}</Text>
                    <Image style={styles.img} source={{ uri: item.userInfo.UserPhoto }} />
                </View>
            </View>
        );
    };

    const renderRelations = () => {
        if (!relations) return null;

        const sortedRelations = [...filteredRelations].sort((a, b) => {
            const aIsInvited = isInvited(a.userInfo._id);
            const bIsInvited = isInvited(b.userInfo._id);
            return aIsInvited === bIsInvited ? 0 : aIsInvited ? -1 : 1;
        });

        return sortedRelations.map(item => {
            return isInvited(item.userInfo._id) ? RnderInveteesItem(item) : rnderOtherRelatio(item);
        });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.puprble} />
                <Text style={styles.loadingText}>جاري التحميل...</Text>
            </View>
        );
    }

    return (
        <View>
            {RnderSearchBar()}
            {renderRelations()}
        </View>
    );
};

export default InveteesComp;

const styles = StyleSheet.create({
    SearchView: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderColor: colors.silver,
        alignSelf: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
    },
    icon: {
        marginHorizontal: 10,
    },
    ItemView: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 20,
        width: '90%',
        alignSelf: 'center',
    },
    NameView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 30,
        marginLeft: 20,
    },
    txt: {
        fontSize: 15,
        color: colors.puprble,
    },
    Input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
    },
    Invetation: {
        padding: 10,
        borderRadius: 10,
    },
});
