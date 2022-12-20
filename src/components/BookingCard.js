import React,{useContext} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SearchContext from '../../store/SearchContext';


const ClientNeeds = (props) => {
    const {setevId} = useContext(SearchContext);
    const navigation = useNavigation();
   
    return (
        <View>
            <Card >
                <View style={styles.cardHeader}>
                <Card.Image
                    style={styles.image}
                    source={props.img}
                />
                <Card.Title style={{ fontSize: 20, marginLeft:90 }}>{props.serName}</Card.Title>
                </View>
                <Card.Divider />
                <TouchableOpacity style={{  flexDirection: 'row', }}
                //onPress={() => navigation.navigate(props.page)}
                >
                    <Text style={{ marginBottom: 10, fontSize: 18 }}>
                         {props.serDate}
                    </Text>

                    <Text style={{ marginBottom: 10, fontSize: 18, marginLeft:110, alignItems:'center' }}>
                    ₪{props.srrCost} 
                    </Text>
                    

                </TouchableOpacity>

            </Card>

        </View>
    );

}

const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        borderRadius: 30,
       // marginRight:90
    },
    card: {
        marginTop: 20,
        alignItems:'center',
    },
    cardHeader:{
        flexDirection: 'row',
        //backgroundColor: '#87ceeb',
        alignItems:'center',
        elevation: 2,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#87ceeb',
        shadowOpacity: 0.1,
        marginBottom: 10,
    },
})

export default ClientNeeds;
