import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../route/ScreenNames';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SearchContext from '../../../store/SearchContext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';


const PoviderServiceListCard = (props) => {
    const { setServId } = useContext(SearchContext);
    const navigation = useNavigation();
    const {
        setSelectServiceType,
        setserviceAddress,
        setserviceRegion,
        setTitle,
        setSuTitle,
        setDescription,
        setPhotoArray,
        setWorkAreas,
        setPrice,
        setAdditionalServices,
        setDraftID
    } = useContext(ServiceProviderContext);



    const {
        servType,
        subTitle,
        title,
        desc,
        region,
        address,
        photoArray,
        workingAreas,
        servicePrice,
        additionalServices,
        ID
    } = props.body

    const onCaardPress = () => {
        setData();
        setID();
        navigation.navigate(ScreenNames.ProviderChooseService, { data: { ...props }, isFromChooseServiceClick: true });
    }

    const setData = () => {
        setSelectServiceType(servType);
        setserviceAddress(address);
        setserviceRegion(region);
        setTitle(title);
        setSuTitle(subTitle);
        setDescription(desc);
        setPhotoArray(photoArray)
        setWorkAreas(workingAreas)
        setPrice(servicePrice)
        setAdditionalServices(additionalServices)
    }
    const setID = () => {
        setDraftID(ID)
    }

    return (
        <View style={styles.container}>
            <Card >
                <TouchableOpacity style={styles.cardHeader}
                    onPress={onCaardPress}
                >
                    <FontAwesome5
                        name='less-than'
                        style={{ fontSize: 20, alignSelf: 'center', marginLeft: 20 }}
                    />
                    <Card.Title style={{ fontSize: 20, alignSelf: 'center', justifyContent: 'center' }}>{title}</Card.Title>
                    <Card.Image
                        style={styles.image}
                        source={props.img}
                    />

                </TouchableOpacity>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignSelf: 'center',
    },
    card: {
        marginTop: 20,
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,

        elevation: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#87ceeb',
        shadowOpacity: 0.1,
        marginBottom: 10,
    },
})

export default PoviderServiceListCard;
