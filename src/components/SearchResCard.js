import React from 'react';
import { View, StyleSheet, Text,Image,TouchableOpacity  } from 'react-native';
import {  Card, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const SearchResCard = (props) => {
    const navigation = useNavigation();
    const { src, subTitle, title, page } = props;
    
    const onCaardPress = () => {
        navigation.navigate(props.linkPage, { data: { ...props } })
    }

   
    return (
        <View style={styles.container}>
        <Card style={styles.card}>
            <Card.Title>{props.title}</Card.Title>
            <Card.Divider />
            <TouchableOpacity onPress={onCaardPress}>
            <Card.Image
                style={{ padding: 0 }}
                source={props.img}
                    // }
            />
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
               {props.subTitle}
            </Text>
            </TouchableOpacity>
            <Button
                icon={
                    <Image
                    source={require('../../src/assets/mobile-order.png')}
                    style={styles.image}
                />
                }
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    
                }}
                title="احجز الان"
            />
        </Card>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image:{
        width: 20,
        height: 20,
    },
    card:{
        borderRadius: 15,
    },
})

export default SearchResCard;
