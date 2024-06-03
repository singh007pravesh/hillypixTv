import { View, Text, TouchableOpacity, Touchable, Image, StyleSheet, ActivityIndicator, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const VideoComponent = (props) => {
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [paused, setPaused] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [progress, setProgress] = useState(null);
    const [fullScreen, setFullScreen] = useState(false)
    const [loading, setLoading] = useState(true);
    const [buffering, setBuffering] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [volSlider, setVolSlider] = useState(0.5);
    const [isEnd, setIsEnd] = useState(false);
    const [isOnslider, setIsOnslider] = useState(false);

    const ref = useRef();

    const format = seconds => {
        let mins = parseInt(seconds / 60)
            .toString()
            .padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };
    const toggleControl = () => {
        setClicked(true);
        setTimeout(() => {
            isOnslider == false ?
            setClicked(false): null;
        }, 3000);
    }
    const toggleControlSlider = () => {
      
        setTimeout(() => {
           
            setClicked(false);
        }, 3000);
    }

    const SwitchToFullScreen = () => {
        if (fullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
        setFullScreen(!fullScreen)
    }

    const handleReplay = () => {

        // Seek the video back to the beginning
        ref.current.seek(0);
        setPaused(false);
        setIsEnd(false);
    }
    useEffect(() => {
        SwitchToFullScreen();
    }, [])

    return (
        <SafeAreaView style={styles.containerMain} edges={['bottom']}>
            <Pressable
                activeOpacity={1}
                style={styles.listItemBody}
                onPress={() => {
                    toggleControl()
                }}>
                <Video
                    onLoadStart={() => setLoading(true)} // Set loading state when video starts loading
                    onLoad={() => setLoading(false)}
                    onBuffer={({ isBuffering }) => setBuffering(isBuffering)} // Toggle loading based on buffering state
                    onEnd={() => {
                        setIsEnd(true)
                        setPaused(true)
                    }}
                    paused={paused}
                    resizeMode="contain" 
                    source={{ uri: props.route.params.videoUrl }}
                    ref={ref}
                    onProgress={x => {
                        console.log(x);  
                        setProgress(x);
                    }}
                    preferredForwardBufferDuration={15000}
                    fullscreen={isFullScreen}
                    volume={volume}
                    poster="https://hillypix.com/storage/branding_media/TxKNitIsRG2R4nhU28BdYgCJ0zG5fzYv0zjJ6Sd4.png"
                    posterResizeMode="center"
                    // Callback when video cannot be loaded
                    onError={(err) => console.log('videoError', videoError)}
                    muted={isMute}
                    style={styles.videoElement}

                />
                {(loading || buffering) && ( // Render loader while video is loading
                    <View style={styles.loader}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loaderText}>Loading Video...</Text>
                    </View>
                )}
                {(clicked && loading == false) && (
                    <TouchableOpacity
                        onPress={() => {
                            toggleControl()
                        }}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            backgroundColor: 'rgba(0,0,0,.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // borderWidth: 2,
                            // borderColor: 'yellow' 
                        }}>

                        {/* play/ pause , backward and forward button */}
                        <View style={{
                            zIndex:13, 
                            flexDirection: 'row',
                            width: '70%',
                            justifyContent: isEnd ? 'center' : 'space-around',
                            alignItems: 'center',
                            // borderWidth: 2,
                            // borderColor: 'yellow' 
                        }}>
                            {
                                isEnd == true
                                    ?
                                    <TouchableOpacity
                                        style={{ alignItems: 'center', justifyContent: 'center' }}
                                        onPress={() => handleReplay()}>
                                        <Image
                                            source={
                                                require('../../../assets/replay.png')
                                            }
                                            style={{
                                                width: 60,
                                                height: 60,
                                                tintColor: 'white',

                                            }}
                                        />
                                    </TouchableOpacity>
                                    :
                                    <>
                                        <TouchableOpacity
                                            onPress={() => {
                                                ref.current.seek(parseInt(progress.currentTime) - 10);
                                            }}>
                                            <Image
                                                source={require('../../../assets/images/backward.png')}
                                                style={{ width: 40, height: 40, tintColor: 'white' }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setPaused(!paused);
                                            }}>
                                            <Image
                                                source={
                                                    paused
                                                        ? require('../../../assets/images/play-button.png')
                                                        : require('../../../assets/images/pause.png')
                                                }
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    tintColor: 'white',
                                                    marginLeft: 50,
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                ref.current.seek(parseInt(progress?.currentTime) + 10);
                                            }}>
                                            <Image
                                                source={require('../../../assets/images/forward.png')}
                                                style={{
                                                    width: 40,
                                                    height: 40,
                                                    tintColor: 'white',
                                                    marginLeft: 50,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </>
                            }

                        </View>
                        {/* mute/ unmute button */}
                        <View style={{
                            // width: '100%',
                            flexDirection: 'row',
                            // justifyContent: 'space-between',
                            position: 'absolute',
                            top: 10,
                            right: '2%',
                            paddingLeft: 20,
                            paddingRight: 20,
                            alignItems: 'center',
                            // borderWidth: 3,
                            // borderColor: 'white',
                            zIndex: 10
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsMute(!isMute);
                                }}>
                                <Image
                                    source={
                                        isMute
                                            ? require('../../../assets/images/mute.png')
                                            : require('../../../assets/images/medium-volume.png')
                                    }
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: 'white',

                                    }}
                                />
                            </TouchableOpacity>
                             {/* volume Text */}
                             <Text style={{ color: 'white',marginHorizontal:4,  }}>
                                {volume * 10}
                            </Text>
                        </View>
                        {/* timing slider*/}
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly', 
                                position: 'absolute',
                                bottom: 0,
                                paddingLeft: 25,
                                paddingRight: 25,
                                alignItems: 'center',
                                zIndex: 8,
                                // borderWidth: 2,
                                // borderColor: 'green'
                            }}>
                            {/* <Text style={{ color: 'white' }}>
                                {progress?.currentTime ? format(progress?.currentTime) : null}
                            </Text> */} 
                            <Slider
                                style={{ width: '70%', height: 70, }}
                                minimumValue={0}
                                maximumValue={progress?.seekableDuration}
                                minimumTrackTintColor="yellow"
                                maximumTrackTintColor="gray" 
                                thumbTintColor="yellow"
                                tapToSeek={true} 
                                onSlidingStart={()=>{
                                    setIsOnslider(true)
                                }}
                                onSlidingComplete={()=>{
                                    setIsOnslider(false)
                                    toggleControlSlider() 
                                }}
                                onValueChange={(x) => {

                                    ref.current.seek(x);
                                }}
                                value={Math.round(progress?.currentTime)}
                            />
                            <Text style={{ color: 'white' }}>
                                {progress?.seekableDuration ? format(progress?.seekableDuration - progress?.currentTime) : null}
                            </Text>
                           

                            {/* Rate Text / View */}
                            <TouchableOpacity style={{flexDirection:'row', justifyContent:'center',alignItems:'center', gap:2}}>
                                <MaterialCommunityIcons name="speedometer" size={25} color="white"/>
                                <Text style={{color:'white'}}>Speed (1x)</Text>
                            </TouchableOpacity>
                           
                           
                        </View>
                        {/* movie name and back button */}
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                position: 'absolute',
                                top: 10,
                                left: '2%',
                                // paddingLeft: 20,
                                // paddingRight: 20, 
                                alignItems: 'center',
                                gap: 10,
                                // borderWidth: 2,
                                // borderColor: 'yellow'
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.navigation.goBack();
                                }}
                            >
                                {/* <Image source={fullScreen ? require('../../../assets/images/minimize.png') : require('r../../../assets/images/full-size.png')}
                                    style={{ width: 24, height: 24, tintColor: 'white' }} /> */}
                                <Ionicons name="arrow-back" size={25} color="white" />

                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 20 }}>Animal </Text>

                        </View>
                        {/* volume slider  */}
                        <View style={{
                            position: 'absolute',
                            zIndex: 5,
                            top: 0,
                            right: 0,
                            height: '100%', 
                            justifyContent: 'center',
                            alignItems: 'center', 
                            width: '30%', // Adjust the width as needed
                            transform: [{ rotate: '270deg' }],
                            marginRight: '-6%',
                            // borderWidth: 2,
                            // borderColor: 'blue',  

                        }}>
                            <Slider
                                style={{
                                    width: '90%',
                                    height: '100%',
                                    // transform: [{ rotate: '270deg' }],   // Rotate the slider vertically 
                                    


                                }}
                                step={0.1}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="yellow"
                                maximumTrackTintColor="gray" 
                                thumbTintColor="yellow"
                                tapToSeek={true}
                                onSlidingStart={()=>{
                                    setIsOnslider(true)
                                }}
                                onSlidingComplete={()=>{
                                    setIsOnslider(false)
                                    toggleControlSlider() 
                                }}  
                                onValueChange={(value) => {
                                    // console.log(value.toFixed(2));
                                    setVolSlider(value);
                                    setVolume(parseFloat(value.toFixed(2)));


                                }}
                                value={volSlider}
                            />
                        </View>

                    </TouchableOpacity>
                )}
            </Pressable>
        </SafeAreaView>
    );
};

export default VideoComponent;

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        backgroundColor: '#000',
        // Specify which edges of the screen should not have padding
        // You can adjust this based on your requirements
        padding: 0, // Adjust as per your design
        // borderColor:'red',
        // borderWidth:2
    },
    listItemBody: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 0,
        // borderColor:'red',
        // borderWidth:2
    },
    videoElement: {
        flex: 1,
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        marginTop: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        color: '#fff',
        marginTop: 10,
    },
});