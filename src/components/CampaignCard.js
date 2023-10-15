import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';


const CampaignCard = (props) => {
    const { campImag, campTitle, campDesc } = props;
    const navigation = useNavigation();
    const { reachCampaignfrom } = useContext(SearchContext);

    const onCaardPress = () => {
        navigation.navigate(ScreenNames.Campaigns, { data: { ...props } })
    }

    const renderCampaighn = () => {
        if (reachCampaignfrom == 'fromHome') {
            return (<View style={styles.forHome}>
                <TouchableOpacity style={styles.touch} onPress={onCaardPress}>
                    <View style={styles.image}>
                        <Image style={{ flex: 1 }} source={{ uri: campImag }} />
                    </View>
                    <View style={styles.title}>
                        <Text>{campTitle}</Text>
                        {/* <Text>{campDesc}</Text> */}
                    </View>
                    <Text style={styles.detailText}>التفاصيل</Text>
                </TouchableOpacity>
            </View>)
        }
        if (reachCampaignfrom == 'fromRequest') {

        } 
        if (reachCampaignfrom == 'fromServiceDescr') {
            return (<View style={styles.forDescr}>
                <TouchableOpacity style={styles.touch} onPress={onCaardPress}>
                    <View style={styles.img}>
                        <Image style={{ flex: 1 }} source={{ uri: campImag }} />
                    </View>
                    <View>
                        <Text style={styles.cardDesctxt}>{campTitle}</Text>
                    </View>
                    <Text style={styles.detailText}>التفاصيل</Text>
                </TouchableOpacity>
            </View>)
        }
    }

    return (
        <View style={styles.container}>
            {renderCampaighn()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    forHome: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        shadowRadius: 4,
        elevation: 3,
        margin: 5,
        width: 170,
        height: 320
    },
    forDescr: {
        alignSelf:'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        shadowRadius: 4,
        elevation: 3,
        margin: 5,
        width: 350,
        height: 220
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    img: {
        width: "100%",
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    cardDesctxt: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: '#777',
    },

    touch: {
        flexDirection: 'column',
        flex: 1,
    },
    detailText: {

        alignSelf: 'flex-start',
        justifyContent: 'flex-end',
        color: 'blue',
        position: 'absolute',
        left: 0,
        bottom: 0,

    }
})

export default CampaignCard;
