import React from 'react';
import { View, StyleSheet, Text,ScrollView,Image,TouchableOpacity  } from 'react-native';
import {  Card, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const SearchResCard = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
        <Card>
            <Card.Title>{props.title}</Card.Title>
            <Card.Divider />
            <TouchableOpacity onPress={() => navigation.navigate(props.page)}>
            <Card.Image
                style={{ padding: 0 }}
                source={props.src}
                    // }
            />
            <Text style={{ marginBottom: 10, fontSize: 18 }}>
               {props.desc}
            </Text>
            </TouchableOpacity>
            <Button
                icon={
                    
                    <Icon
                        name="sync"
                        color="#ffffff"
                        iconStyle={{ marginRight: 10 }}
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
})

export default SearchResCard;
