import React, { useContext, useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { servicesCategory } from '../../resources/data';
import ServiceCard from '../../components/ServiceCard';
import { ScreenNames } from '../../../route/ScreenNames';
import SearchContext from '../../../store/SearchContext';


const ProviderChooseService = (props) => {
    const { isFromChooseServiceClick } = props.route?.params || {}
    const {ServId} = useContext(SearchContext);
    const [selectServiceType, setSelectServiceType] = useState('');


   // console.log("ServId :", ServId);


    const onNextPress = () => {
        props.navigation.navigate(ScreenNames.ProviderAddInfo, { data: { ...props } });
    }
    const onBackPress = () => {
        props.navigation.navigate(ScreenNames.ProviderCreateListing, { data: { ...props } });
    }

    const query = () => {
        return servicesCategory || [];
    }
    const renderCard = ({ item }) => {
        return (
            <ServiceCard
                {...item}
                isFromChooseServiceClick={isFromChooseServiceClick}
                isChecked={item.titleCategory === selectServiceType}
                onCatPress={(value) => setSelectServiceType(value)}
            />
        )
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headText}>ما هو تصنيف الخدمة التي توفرها للزبائن؟</Text>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={query()}
                    renderItem={renderCard}
                    numColumns={2}
                />
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
    body: {
        height: '75%',
        marginTop: 20,
        // marginLeft: '18%',
    },
    footer: {
        //alignSelf: 'flex-end',
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

})

export default ProviderChooseService;
