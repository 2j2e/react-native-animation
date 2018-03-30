import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Text,
  View,
  PanResponder
} from 'react-native';

const WIDTH = 150;
const COUNTER_POSITION = WIDTH / 2 - 30;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      offset: new Animated.Value(0)
    };

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        // The accumulated gesture distance since becoming responder is
        if(gestureState.dx >= -COUNTER_POSITION - 20 && gestureState.dx <= COUNTER_POSITION + 20) {
          this.state.offset.setValue(gestureState.dx)
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The accumulated gesture distance since becoming responder is
        this.changeCounter();
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.changeCounter();
      },
    });
  }

  changeCounter = () => {
    // Left swipe -1, right swipe +1
    let changer = this.state.offset._value > 0 ? 1 : -1;
    let counter = this.state.counter + changer;
    // Stop on 0 value
    counter = counter < 0 ? 0 : counter;
    // Change counter
    this.setState({ counter });
    // Animate counter back
    Animated.timing(this.state.offset, {
      toValue: 0,
      duration: 700,
      easing: Easing.elastic(2.5),
    }).start();
  }

  render() {
    const { counter, offset } = this.state;
    const counterStyles = {...styles.counter, marginLeft: Animated.add(new Animated.Value(COUNTER_POSITION), offset) };
    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer} {...this._panResponder.panHandlers}>
          <View style={styles.sides}>
            <Animated.Text style={styles.minus}>–</Animated.Text>
            <Animated.Text style={styles.plus}>+</Animated.Text>
          </View>
          <Animated.Text style={counterStyles}>{counter}</Animated.Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6D72FE',
  },
  sliderContainer: {
    backgroundColor: '#8D90FE',
    borderRadius: 28,
    height: 60,
    width: WIDTH,
    overflow: 'hidden'
  },
  sides: {
    position: 'absolute',
    zIndex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  minus: {
    width: 40,
    height: 60,
    lineHeight: 57,
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'flex-start'
  },
  plus: {
    width: 40,
    height: 60,
    lineHeight: 57,
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  counter: {
    position: 'absolute',
    zIndex: 0,
    backgroundColor: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    width: 60,
    height: 60,
    lineHeight: 60,
    color: '#6D72FE',
    fontFamily: 'Menlo',
    fontSize: 30,
    textAlign: 'center'
  }
};
