import * as React from 'react';
import { StyleSheet, Animated } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Button} from 'react-native-elements'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function TimerScreen() {
  const startTime = 25
  const [isRestart, setIsRestart] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  const togglePause = () => {
      setIsActive(!isActive);
  }

  const stop = () => {
      setIsRestart(prevKey => prevKey + 1)
      setIsActive(false);
  }

  // const createPauseStop = () => (
    
  // )
  // React.useEffect(() => {
  //     let interval = null;
  //     if (isActive) {
  //         interval = setInterval(() => {
  //             setTime(time => time - 1) }, 1000);
  //     }
  //     else if (! isActive && time !== startTime) {
  //         clearInterval(interval);
  //     }

  //     return () => clearInterval(interval);  // effect clean-up
  // }, [time, isActive]); // useEffect fires when either 'time' or 'isActive' change

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
          key={isRestart}
          isPlaying={isActive}
          duration={startTime}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={stop}
        >
        {({ remainingTime, animatedColor }) => (
          <Animated.Text style={{color: animatedColor}}>
            {remainingTime}
          </Animated.Text>
        )}
     </CountdownCircleTimer>
      <View style={styles.buttonContainer}>
          <View style={styles.buttonView}>
              <Button
                  onPress={togglePause}
                  title={isActive ? 'Pause' : 'Start'}
              ></Button>
          </View>
          {/* <View style={styles.buttonView}>
              <Button color="red"
                  onPress={stop}
                  title="Stop"
              ></Button>
          </View> */}
      </View>
  </View>
  );
}

const CircularCountdown = () => (
  <CountdownCircleTimer
    isPlaying
    duration={10}
    colors={[
      ['#004777', 0.4],
      ['#F7B801', 0.4],
      ['#A30000', 0.2],
    ]}
    >
      {({ remainingTime, animatedColor }) => (
        <Animated.Text style={{color: animatedColor}}>
          {remainingTime}
        </Animated.Text>
      )}
    </CountdownCircleTimer>
)

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

  buttonContainer: {
  //   flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonView: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: '#DCDCDC'
  },
  button: {
      borderRadius: 0,
      borderWidth: 10,
      color: 'red'
  }
});