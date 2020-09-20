import * as React from 'react';
import { StyleSheet, Animated, Vibration} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import {LinearGradient, BVLinearGradient} from 'react-native-linear-gradient';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TimerScreen() {
  const statesEnum = {
    WORK: 'work',
    BREAK: 'break',
    LONG_BREAK: 'longBreak'
  }

  const workDuration = 5;  // 25min
  const breakDuration = 1;  // 5min
  const longBreakDuration = 3;  // 15min
  const [isRestart, setIsRestart] = React.useState(0);
  const [isStopped, setIsStopped] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(true);
  const [isCompleted, setCompleted] = React.useState([false, false, false, false]);
  const [clockState, setClockState] = React.useState(statesEnum.WORK);

  const togglePause = () => {
      // setIsActive(!isPaused);
      setIsPaused(!isPaused);
      setIsStopped(false);
  }

  const stop = () => {
      setIsRestart(prevKey => prevKey + 1);
      setIsStopped(true);
      setIsPaused(true);
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
    // Vibration.vibrate([1000, 2000, 3000], true)

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

  const pad = (num: number, size: number) => {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }
  const minuteSecondsFormat = (currTime: number) => {
    const minutes = Math.floor(currTime / 60)
    const seconds = currTime % 60

    return `${pad(minutes, 2)}:${pad(seconds, 2)}`
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
          isPlaying={!isPaused}
          duration={ getDuration() }
          size={360}
          strokeWidth={24}
          // isLinearGradient={true}
          // gradientUniqueKey={}
          // } statesEnum.BREAK) ? { isCompleted[2]breakDuration }
          //   : workDuration}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={timesUp}
        >
        {({ remainingTime, animatedColor }) => (
          <View style={{flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Text></Text>
            <Animated.Text style={{color: animatedColor, fontSize: 64, marginTop: 0}}>
              {minuteSecondsFormat(remainingTime)}
            </Animated.Text>
            {(() => {
                if (clockState === statesEnum.BREAK) {
                  return <Text style={{fontSize: 32, textAlign: 'center', marginTop: 0}}>Time to connect!</Text>
                }
                else if (isStopped) {
                  return <Text style={{fontSize: 32, textAlign: 'center', marginTop: 0}}>Ready?</Text>
                }
                else if (clockState === statesEnum.WORK) {
                  return <Text style={{fontSize: 32, textAlign: 'center', marginTop: 0}}>GRIND TIME</Text>
                }
                else {
                  return <Text style={{fontSize: 32, textAlign: 'center', marginTop: 0}}>Time to connect!</Text>
                }
            })()}
          </View>
        )}
     </CountdownCircleTimer>
     <View style={styles.checkBoxRow}>
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
                  title={isPaused ? 'Start' : 'Pause'}
                  titleStyle={{fontSize: 32, color: '#4169E1'}}
                  containerStyle={{backgroundColor:'#FFFFFF'}}
                  buttonStyle={{borderTopWidth: 4, borderBottomWidth: 4, borderLeftWidth: 4, borderRightWidth: 2, borderColor: '#F5F5F5', backgroundColor: '#FFFFFF'}}
                  // ViewComponent={LinearGradient}
                  // linearGradientProps={{
                  //   colors: ['#FFFFFF', '#FFFFFF'],
                  //   start: { x: 0, y: 0.5 },
                  //   end: { x: 0, y: 0.5 },
                  // }}
              ></Button>
          </View>
          <View style={styles.buttonView}>
              <Button
                  onPress={(isStopped) ? resetCheckboxes :  stop}
                  title={(isStopped) ? "Restart" : "Stop" }
                  titleStyle={{fontSize: 32, color: '#800000'}}
                  buttonStyle={{borderTopWidth: 4, borderBottomWidth: 4, borderLeftWidth: 2,  borderRightWidth: 4, borderColor: '#F5F5F5', backgroundColor: '#FFFFFF'}}
                  // ViewComponent={LinearGradient}
                  // linearGradientProps={{
                  //   colors: ['#FFFFFF', '#FFFFFF'],
                  //   start: { x: 0, y: 0.5 },
                  //   end: { x: 0, y: 0.5 },
                  // }}
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
      justifyContent: 'flex-end',
    },
  checkBoxRow: {
    //   flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      margin: 15
  },
  rowItems: {
  //   flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonView: {
    flex: 1,
    marginTop: 50
    // borderWidth: 1,
    // borderColor: '#DCDCDC'
  },
  button: {
      borderRadius: 0,
      borderWidth: 10
  }
});