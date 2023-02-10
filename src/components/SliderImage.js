
import React,{useState} from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");
const height = width * 0.6;

const SliderImage = (props) => {
const [active, setActive] = useState();


    const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                style={{ width, height }}
                showsHorizontalScrollIndicator={false}
            >
                {
                    props.images.map((image, index) => (
                        <Image
                            style={styles.img}
                            source={image}
                            key={index}
                        />
                    ))
                }
            </ScrollView>
            <View style={styles.dot}>
                {
                    props.images.map((i, k) => (
                        <Text key={k} style={active ? styles.dotActiveStyle : styles.dotStyle}>•</Text>
                    ))
                }
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        width,
        height,
    },
    img: {
        width,
        height,
        resizeMode: 'cover'
    },
    dot: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    dotStyle: {
        color: 'white',
        margin: 3,
        fontSize: (width / 30),
    },
    dotActiveStyle: {
        color: 'blue',
        margin: 3,
        fontSize: (width / 30),
    },
})

export default SliderImage;
