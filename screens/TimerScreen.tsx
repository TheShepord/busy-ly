import * as React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {Button} from 'react-native-elements'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function TimerScreen() {
  const statesEnum = {
    WORK: 'work',
    BREAK: 'break',
    LONG_BREAK: 'longBreak'
  }

  const workDuration = 5;  // 25
  const breakDuration = 1;  // 5
  const longBreakDuration = 3;  // 15
  const [isRestart, setIsRestart] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [isCompleted, setCompleted] = React.useState([false, false, false, false]);
  const [clockState, setClockState] = React.useState(statesEnum.WORK);

  const togglePause = () => {
      setIsActive(!isActive);
  }

  const stop = () => {
      setIsRestart(prevKey => prevKey + 1);
      setIsActive(false);
  }

  const resetCheckboxes = () => {
    let newCompleted = [...isCompleted];  // duplicates array so that setCompleted renders instantly

    for (let j = 0; j < 4; j++) {
      newCompleted[j] = false;
    }
    setCompleted(newCompleted);
    setClockState(statesEnum.WORK);
    stop();
  }
  
  const updateCheckboxes = () => {
    let i = 0;
    for (; isCompleted[i] && i < 4; i++) {
      ;
    }

    let newCompleted = isCompleted;
    if (i === 4) {  // all checkboxes ticked, reset
      resetCheckboxes();
    }
    else {
      if (i === 3) {  // long break this time!
        setClockState(statesEnum.LONG_BREAK);
      }
      newCompleted = [...isCompleted];  // duplicates array so that setCompleted renders instantly
      newCompleted[i] = true;
      setCompleted(newCompleted);
    }
  }
  
  const timesUp = () => {
    switch (clockState) {
      case statesEnum.WORK:
        setClockState(statesEnum.BREAK);
        updateCheckboxes();
        break;
      case statesEnum.BREAK:
        setClockState(statesEnum.WORK);
        break;
      case statesEnum.LONG_BREAK:
        setClockState(statesEnum.WORK);
        updateCheckboxes();
        break;
    }

    stop();

  }

  const getDuration = () => {
    switch(clockState) {
      case statesEnum.WORK:
        return workDuration;
      case statesEnum.BREAK:
        return breakDuration;
      case statesEnum.LONG_BREAK:
        return longBreakDuration;
      default:
        return workDuration;
    }
  }
  // const createPauseStop = () => (
    
  // )
  // React.useEffect(() => {
  //     let interval = null;
  //     if (isActive) {
  //         interval = setInterval(() => {
  //             setTime(time => time - 1) }, 1000);
  //     }
  //     else if (! isActive && time !== workTime) {
  //         clearInterval(interval);
  //     }

  //     return () => clearInterval(interval);  // effect clean-up
  // }, [time, isActive]); // useEffect fires when either 'time' or 'isActive' change

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
          key={isRestart}
          isPlaying={isActive}
          duration={ getDuration() }
          // } statesEnum.BREAK) ? { isCompleted[2]breakDuration }
          //   : workDuration}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={timesUp}
        >
        {({ remainingTime, animatedColor }) => (
          <Animated.Text style={{color: animatedColor}}>
            {remainingTime}
          </Animated.Text>
        )}
     </CountdownCircleTimer>
     <View style={styles.rowItems}>
      {(isCompleted[0]) ? <MaterialIcons size={30} style={{ marginBottom: -3 }} name="radio-button-checked" color={'black'}/>
                          : <MaterialIcons size={30} style={{ marginBottom: -3 }} name="radio-button-unchecked" color={'black'}/>}
      {(isCompleted[1]) ? <MaterialIcons size={30} style={{ marginBottom: -3 }} name="radio-button-checked" color={'black'}/>
                          : <MaterialIcons size={30} style={{ marginBottom: -3 }} name="radio-button-unchecked" color={'black'}/>}
      {(isCompleted[2]) ? <MaterialIcons size={30} style={{ marginBottom: -3 }} name="radio-button-checked" color={'black'}/>
                          : <MaterialIcons size={30} style={{ marginBottom: -3 }} name="radio-button-unchecked" color={'black'}/>}
      {(isCompleted[3]) ? <MaterialIcons size={30} style={{ marginBottom: -3 }} name="radio-button-checked" color={'black'}/>
                          : <MaterialIcons size={30} style={{ marginBottom: -3 }} name="radio-button-unchecked" color={'black'}/>}
     </View>
      <View style={styles.rowItems}>
          <View style={styles.buttonView}>
              <Button
                  onPress={togglePause}
                  title={isActive ? 'Pause' : 'Start'}
              ></Button>
          </View>
          <View style={styles.buttonView}>
              <Button color="red"
                  onPress={isActive ? stop : resetCheckboxes}
                  title={isActive ? "Stop" : "Restart"}
              ></Button>
          </View>
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
      justifyContent: 'space-evenly',
    },

  rowItems: {
  //   flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
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