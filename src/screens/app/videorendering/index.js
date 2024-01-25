import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';


const VideoPlayer = ({ videoUrl = `${RNFS.DocumentDirectoryPath}/MyVideos/SomaSong1.mp4` }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isload, setIsload] = useState(false);

    const onBuffer = (buffer) => {
        console.log('onBuffer', buffer);
        setIsload(true)
    };

    const onLoad = (info) => {
        console.log('onLoad', info);
        // setIsload(true)
        setDuration(info.duration);
    };

    const onProgress = (progress) => {
        // console.log('onProgress', progress);
        // setCurrentTime(progress.currentTime);
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            //   videoRef.current.pause();

            console.log(videoRef.current)

        } else {
            //   videoRef.current.play();

        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={{ uri: videoUrl }}
                style={styles.video}
                onBuffer={onBuffer}
                onLoadStart={() => setIsload(true)} // Set loading state when video starts loading
                onLoad={() => setIsload(false)}
                onProgress={onProgress}
                paused={isPlaying}
                resizeMode="contain"
            />
            {
                isload == true &&
                <View style={{ position: 'absolute', top: 150, backgroundColor: 'rgb(0,0,0,0.5)' }}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            }


            <View style={styles.controls}>
                <TouchableOpacity onPress={togglePlayPause}>
                    <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
                </TouchableOpacity>

                <Text>{formatTime(currentTime)}</Text>

                <Text>{formatTime(duration)}</Text>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default VideoPlayer;
