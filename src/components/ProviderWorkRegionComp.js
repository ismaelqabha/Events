import React, { useContext } from 'react';
import SearchContext from '../../store/SearchContext';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ProviderWorkRegionComp = (props) => {
    const { userId, ServiceDataInfo, setServiceDataInfo, ServId } = useContext(SearchContext);

    const regionItemIndex = ServiceDataInfo.findIndex(item => item.service_id === ServId && item.UserId === userId);
    const regionItem = regionItemIndex > -1 ? ServiceDataInfo[regionItemIndex] : undefined;
    const { workingRegion } = regionItem || {};

    const checkIfChecked = (item, addingDisabled) => {
        if (addingDisabled) {
            return !!workingRegion.find(i => i === item.value);
        }
        if (!regionItem) {
            creatListRegion(props);
            return null;
        }
        return !!workingRegion.find(i => i === item.value);
    }

    const creatListRegion = (item) => {
        const items = regionItem.workingRegion;
        items.push({ workingRegion: [item.value] })
        setServiceDataInfo([...items])
    }

    const onCardPress = (item) => {
        const SDInfo = ServiceDataInfo;
        const isChecked = checkIfChecked(item);

        //console.log('isChecked: ', isChecked);

        if (isChecked === null) {
            return;
        }
        if (!isChecked) {
            SDInfo[regionItemIndex].workingRegion.push(item.value)
            setServiceDataInfo([...SDInfo])
        } else {
            var prods = workingRegion;
            prods = prods.filter(pr => pr !== item.value)
            SDInfo[regionItemIndex].workingRegion = prods
            setServiceDataInfo([...SDInfo])
        }
        //console.log('xxxx',ServiceDataInfo);
    }
    const clicked = checkIfChecked(props, true);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                    style={clicked ? styles.bodyActive : styles.body}
                    onPress={() => onCardPress(props)}
                >
                    <Text
                        style={clicked ? styles.textActive : styles.text}
                    >{props.value}</Text>
                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    textActive: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5f9ea0',
    },
    body: {
        height: 70,
        width: 220,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 3,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: 'white',
    },
    bodyActive: {
        height: 70,
        width: 220,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 3,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: '#5f9ea0',
    },
})

export default ProviderWorkRegionComp;
