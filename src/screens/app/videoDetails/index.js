import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Button, Pressable,StatusBar , Platform} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const VideoDetail = (props) => {

    const videoRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [playbackRate, setPlaybackRate] = useState(1.0); // Initial playback rate
    const [isPause, setIsPause] = useState(true);
    const [currentOrientation, setCurrentOrientation] = useState('PORTRAIT');
    const [isFullScreen, setIsFullScreen] = useState(true);

    const onBuffer = (isBuffering) => {
        console.log(isBuffering);
        setIsLoading(isBuffering);
    };

    const changePlaybackSpeed = (speed) => {
        setPlaybackRate(speed);
    };

    const switchVideoQuality = (quality) => {
        // Use selectTrack method to switch between different qualities
        console.log(videoRef.current);
        // videoRef.current?.selectTrack({
        //     type: 'resolution',
        //     value: quality,
        // });
    };
    const toggleFullscreen = () => {
        // Orientation.lockToPortrait();
        if (currentOrientation === 'PORTRAIT') {
            setCurrentOrientation('LANDSCAPE')
            Orientation.lockToLandscape();
            // videoRef.current.presentFullscreenPlayer()
            if(Platform.OS=='android'){
                setIsFullScreen(true)
            }
            
        } else {
            setCurrentOrientation('PORTRAIT')
            Orientation.lockToPortrait();
            // videoRef.current.dismissFullscreenPlayer()
            if(Platform.OS=='android'){
                setIsFullScreen(false)
            }
        }
    };

    const handleSeek = (forward) => {
        const currentPosition = videoRef.current.getCurrentTime();
        const newPosition = forward ? currentPosition + 10 : currentPosition - 10;
        videoRef.current.seek(newPosition);
    };

    useEffect(() => {
        // Hide the status bar when the component mounts
        // StatusBar.setHidden(true);
    
        // Clean up on component unmount
        return () => {
          // Show the status bar when the component is unmounted
        //   StatusBar.setHidden(false);
        };
      }, []);

    return (
        <>

            <View style={styles.container}>
                <Video
                    ref={videoRef}
                    source={{ uri: props.route.params.videoUrl }}
                    style={styles.video}
                    controls={true}
                    rate={playbackRate}
                    // onBuffer={onBuffer}
                    resizeMode="cover"
                    poster="https://hillypix.com/storage/branding_media/TxKNitIsRG2R4nhU28BdYgCJ0zG5fzYv0zjJ6Sd4.png"
                    posterResizeMode = "center"
                    preferredForwardBufferDuration={5000}
                    fullscreen={isFullScreen}
                    onLoad={() => setIsLoading(false)}
                // paused = {isPause}
                />
                {isLoading && (
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loaderText}>Loading Video...</Text>
                    </View>
                )}

            </View>

            {/* <View style={styles.controls}>
                <TouchableOpacity onPress={() => handleSeek(false)}>
                    <Text style={styles.controlButton}>Backward</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => videoRef.current.seek(0)}>
                    <Text style={styles.controlButton}>Restart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => videoRef.current.seek(10)}>
                    <Text style={styles.controlButton}>Forward</Text>
                </TouchableOpacity>
            </View> */}
            <View style={styles.speedControls}>
                {/* <TouchableOpacity onPress={() => changePlaybackSpeed(1.0)}>
                    <Text style={styles.speedButton}>Normal</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changePlaybackSpeed(1.5)}>
                    <Text style={styles.speedButton}>1.5x</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changePlaybackSpeed(2.0)}>
                    <Text style={styles.speedButton}>2.0x</Text>
                </TouchableOpacity> */}
                <Pressable onPress={() => props.navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" color={'gray'} size={25} />
                </Pressable>
                <Pressable onPress={() => toggleFullscreen()}>
                    <MaterialCommunityIcons name="fullscreen" color={'gray'} size={25} />
                </Pressable>

                {/* <Button title="Switch to Low Quality" onPress={() => switchVideoQuality('low')} /> */}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
    video: {
        flex: 1,
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        marginTop:250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        color: '#fff',
        marginTop: 10,
    },
    controls: {
        // ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    },
    controlButton: {
        color: '#fff',
        fontSize: 16,
    },
    speedControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:15,
        alignItems: 'center',
        position: 'absolute',

        top: 20,
        left: 0,
        right: 0,
    },
    speedButton: {
        color: '#fff',
        fontSize: 16,
    },
});

export default VideoDetail;
