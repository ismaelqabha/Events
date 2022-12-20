import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = () => {
   

    return (
        <View style={styles.MainViewPlayer}>
                <Video source={{uri: "https://www.youtube.com/watch?v=_031dsQNy88&list=PL8kfZyp--gEXs4YsSLtB3KqDtdOFHMjWZ&index=20"}}
                    ref={(ref) => {
                        this.player = ref
                    }}                                      // Store reference
                    onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    onError={this.videoError}               // Callback when video cannot be loaded
                    style={styles.backgroundVideo}
                />
           
            <Text>VideoPlayer</Text>  
        </View>
    );
}

const styles = StyleSheet.create({
    MainViewPlayer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
})

export default VideoPlayer;
