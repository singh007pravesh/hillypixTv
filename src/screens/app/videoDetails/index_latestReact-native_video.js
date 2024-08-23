import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Button, Menu, Divider, PaperProvider,DefaultTheme } from 'react-native-paper';
import Modal from 'react-native-modal';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
// import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu';
// const customTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     surface: 'black', // Set background color to black
//     onSurface: 'white', // Set text color to white
//   },
// };

const VideoComponent = props => {
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [volSlider, setVolSlider] = useState(0.5);
  const [isEnd, setIsEnd] = useState(false);
  const [isOnslider, setIsOnslider] = useState(false);
  const [resizeModeValue, setResizeModeValue] = useState(false);
  const [playBackMenu, setPlayBackMenu] = useState(false);
  const [playBackRate, setPlayBackRate] = useState(1);

  const insets = useSafeAreaInsets();
  console.log('insets',insets);

  const openMenu = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    setPlayBackMenu(true);
  };

  const closeMenu = () => {
    setPlayBackMenu(false);
    // setClicked(false);
    console.log('close menu item1= ');
  };

  const ref = useRef();
  const hideTimeout = useRef(null);

  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  const toggleControl = () => {
    setClicked(true);
    hideControls();
  };
  const toggleControlSlider = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
  };
  const hideControls = () => {
    hideTimeout.current = setTimeout(() => {
      setClicked(false);
    }, 4000);
  };

  const SwitchToFullScreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(!fullScreen);
  };

  const controlPlayBack = (rate = 1) => {
    setPlayBackRate(rate);
    setClicked(false);
  };

  const handleReplay = () => {
    // Seek the video back to the beginning
    ref.current.seek(0);
    setPlayBackRate(1.0);
    setPaused(false);
    setIsEnd(false);
  };
  useEffect(() => {
    SwitchToFullScreen();
  }, []);

  return (
    <View style={styles.containerMain}>
      <MenuProvider>
      <StatusBar hidden={true} />
      <Pressable
        activeOpacity={1}
        style={styles.playerContainer}
        onPress={() => {
          toggleControl();
        }}>
        <Video
          onLoadStart={() => setLoading(true)} // Set loading state when video starts loading
          onLoad={() => setLoading(false)}
          onBuffer={({isBuffering}) => setBuffering(isBuffering)} // Toggle loading based on buffering state
          onEnd={() => {
            setIsEnd(true);
            setPaused(true);
          }}
          paused={paused}
          resizeMode={resizeModeValue == false ? 'contain' : 'cover'}
          source={{uri: props.route.params.videoUrl}}
          ref={ref}
          onProgress={x => {
            // console.log(x);
            setProgress(x);
          }}
          preferredForwardBufferDuration={15000}
          fullscreen={isFullScreen}
          volume={volume}
          poster="https://hillypix.com/storage/branding_media/TxKNitIsRG2R4nhU28BdYgCJ0zG5fzYv0zjJ6Sd4.png"
          posterResizeMode="center"
          // Callback when video cannot be loaded
          onError={err => console.log('videoError', err)}
          muted={isMute}
          rate={playBackRate}
          pictureInPicture={true}
          style={[
            styles.videoPlayer,
            {
              paddingTop: -insets.top,
              paddingBottom: -insets.bottom,
              paddingLeft: -insets.left,
              paddingRight: -insets.right,
            }, 
          ]}
          bufferConfig={{
            minBufferMs: 5000,
            maxBufferMs: 30000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
        />
        {(loading || buffering) && ( // Render loader while video is loading
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loaderText}>Loading Video...</Text>
          </View>
        )}
        {clicked && loading == false && (
          <Pressable
            style={styles.controlsContainer}
            onPress={() => {
              // toggleControl();
            }}>
            <View style={styles.headerContainer}>
              <View style={styles.infoActionContainer}>
                <Pressable
                  onPress={() => {
                    props.navigation.goBack();
                  }}>
                  <Ionicons name="arrow-back" size={25} color="white" />
                </Pressable>
                <Text style={{color: 'white', fontSize: 20}}>Animal </Text>
              </View>
              <TouchableOpacity
                style={styles.headerRight}
                activeOpacity={1}
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
                {/* volume Text */}
                <Text style={styles.volumeTextHeader}>{volume * 10}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mediaPlayContainer}>
              {isEnd == true ? (
                <TouchableOpacity
                  style={styles.playForwardActionContainer}
                  onPress={() => handleReplay()}>
                  <Image
                    source={require('../../../assets/replay.png')}
                    style={styles.playForwardBtnImage}
                  />
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.playActionContainer}
                    onPress={() => {
                      ref.current.seek(parseInt(progress.currentTime) - 10);
                    }}>
                    <Image
                      source={require('../../../assets/images/backward.png')}
                      style={styles.playForwardBtnImage}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.playActionContainer}
                    onPress={() => {
                      setPaused(!paused);
                    }}>
                    <Image
                      source={
                        paused
                          ? require('../../../assets/images/play-button.png')
                          : require('../../../assets/images/pause.png')
                      }
                      style={styles.playForwardBtnImage}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.playActionContainer}
                    onPress={() => {
                      ref.current.seek(parseInt(progress?.currentTime) + 10);
                    }}>
                    <Image
                      source={require('../../../assets/images/forward.png')}
                      style={styles.playForwardBtnImage}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.bottomSliderContainer}>
              <Slider
                style={{width: '60%', height: 70}}
                minimumValue={0}
                maximumValue={progress?.seekableDuration}
                minimumTrackTintColor="yellow"
                maximumTrackTintColor="#ccc"
                thumbTintColor="yellow"
                tapToSeek={true}
                onSlidingStart={() => {
                  // setIsOnslider(true);
                  toggleControlSlider();
                  console.log('onSlidingStart');
                }}
                onSlidingComplete={() => {
                  hideControls();
                }}
                onValueChange={x => {
                  ref.current.seek(x);
                }}
                value={Math.round(progress?.currentTime)}
              />
              <Text style={styles.seekableDurationTxt}>
                {progress?.seekableDuration
                  ? format(progress?.seekableDuration - progress?.currentTime)
                  : null}
              </Text>
              {/* playBackSpeed Text / View */}
              {/* <TouchableOpacity 
                  style={styles.playBackSpeed}
                  onPress={()=>openMenu()}
                  >
                  <MaterialCommunityIcons
                    name="speedometer"
                    size={25}
                    color="white"
                  />
                  <Text style={{color: 'white'}}>Speed (1x)</Text>
                </TouchableOpacity> */}
                 <Menu> 
                <MenuTrigger>
                  <View style={styles.playBackSpeed}> 
                    <MaterialCommunityIcons
                      name="speedometer"
                      size={25}
                      color="white"
                    />
                    <Text style={{color: 'white'}}>Speed ({playBackRate}x)</Text> 
                  </View>
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles} > 
                  <MenuOption onSelect={() => controlPlayBack(0.5)}>
                    <Text style={{textAlign:'left',color:'#fff',fontSize:18}}>0.5x</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => controlPlayBack(1)}>
                    <Text style={{textAlign:'left',color:'#fff',fontSize:18}}>1x</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => controlPlayBack(1.5)}>
                    <Text style={{textAlign:'left',color:'#fff',fontSize:18}}>1.5x</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => controlPlayBack(2)}>
                    <Text style={{textAlign:'left',color:'#fff',fontSize:18}}>2.x</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu> 

              {/* <View 
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Menu
                    visible={playBackMenu}
                    onDismiss={closeMenu}
                    theme={customTheme}
                    anchor={
                      <TouchableOpacity
                        style={styles.playBackSpeed} 
                        onPress={openMenu}>
                        <MaterialCommunityIcons
                          name="speedometer"
                          size={25} 
                          color="white"
                        />
                        <Text style={{color: 'white'}}>Speed ({playBackRate}x)</Text> 
                      </TouchableOpacity>
                    }>
                    <Menu.Item
                      onPress={() => {
                        controlPlayBack(0.5);
                      }}
                      title="0.5x"
                    />
                    <Divider />
                    <Menu.Item
                      onPress={() => {
                        controlPlayBack(1.0);
                      }}
                      title="1.0x"
                    />
                    <Divider />
                    <Menu.Item
                      onPress={() => {
                        controlPlayBack(1.5);
                      }}
                      title="1.5x"
                    />
                    <Divider />
                    <Menu.Item
                      onPress={() => {
                        controlPlayBack(2.0);
                      }}
                      title="2.x"
                    />
                  </Menu>

              </View> */}

              <TouchableOpacity
                onPress={() => {
                  setResizeModeValue(!resizeModeValue);
                }}>
                <Image
                  source={
                    resizeModeValue
                      ? require('../../../assets/images/minimize.png')
                      : require('../../../assets/images/full-size.png')
                  }
                  style={styles.fullScreenImg}
                />
              </TouchableOpacity>
            </View>
            {/* volume slider  */}
            <View style={styles.volumeSlider}>
              <Slider
                style={{
                  width: '90%',
                }}
                step={0.1}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="yellow"
                maximumTrackTintColor="#eee"
                thumbTintColor="yellow"
                tapToSeek={true}
                onSlidingStart={() => {
                  toggleControlSlider();
                  // setIsOnslider(true);
                }}
                onSlidingComplete={() => {
                  // setIsOnslider(false);
                  // toggleControlSlider(false);
                  hideControls();
                }}
                onValueChange={value => {
                  // console.log(value.toFixed(2));
                  setVolSlider(value);
                  setVolume(parseFloat(value.toFixed(2)));
                }}
                value={volSlider}
              />
            </View>
          </Pressable>
        )}
      </Pressable>
    </MenuProvider>
    </View>
  );
};

export default VideoComponent;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#000',
    padding: 0, // Adjust as per your design
    borderWidth:1,
    // borderColor:'yellow',
    // width:'100%'
  },
  playerContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 0,
  },
  videoPlayer: {
    ...StyleSheet.absoluteFillObject,
    // flex: 1,
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
  // controls for video player

  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'space-between',
    padding: 10,
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    // borderWidth: 2,
    // borderColor: '#fff',
  },
  infoActionContainer: {
    flexDirection: 'row',
    flex: 0.9,
    gap: 15,
    padding: 10,
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'yellow',
    // height: 44,
  },
  headerRight: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    padding: 10,
  },
  volumeTextHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // play, pause and foarward
  mediaPlayContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  playForwardActionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playForwardBtnImage: {
    width: 40,
    height: 40,
    tintColor: 'white',
    // marginLeft: 50,
  },
  // slider container

  bottomSliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  seekableDurationTxt: {
    color: '#fff',
    fontSize: 15,
  },
  playBackSpeed: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImg: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  volumeSlider: {
    position: 'absolute',
    zIndex: 5,
    top: '25%',
    right: 0,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%', // Adjust the width as needed
    transform: [{rotate: '270deg'}],
    marginRight: '-3%',
    // borderWidth:2,
  },
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 5,
    borderRadius: 5,
  },
  optionWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    padding: 10,
  },
  optionText: {
    color: 'white',
  },
};
