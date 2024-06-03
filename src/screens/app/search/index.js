import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Video } from 'react-native-video'; // Assuming you're using Video for playback
import Slider from '@react-native-community/slider';

const CustomSliderWithBufferTime = ({ videoRef, ...props }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [bufferTime, setBufferTime] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const updateTimers = () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        const bufferTime = videoRef.current.seekable.end; // Assuming seekable is defined in your Video component
        setCurrentTime(currentTime);
        setBufferTime(bufferTime);
      }
    };

    const intervalId = setInterval(updateTimers, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, [videoRef]);

  const handleSeek = (value) => {
    videoRef.current.seek(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
      <Slider
        ref={sliderRef}
        style={styles.slider}
        value={currentTime}
        minimumValue={0}
        maximumValue={videoRef.current ? videoRef.current.duration : 0} // Assuming duration is defined in your Video component
        onValueChange={handleSeek}
        {...props}
      />
      <Text style={styles.timeText}>{formatTime(bufferTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginHorizontal: 10,
  },
  slider: {
    flex: 1,
  },
});

// Helper function to format time
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default CustomSliderWithBufferTime;
