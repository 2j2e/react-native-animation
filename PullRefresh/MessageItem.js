import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

export default class MessageItem extends Component {
  constructor() {
    super();
    this.state = {
      appearance: new Animated.Value(0),
      bounce: new Animated.Value(2),
    }
  }

  componentDidMount() {
    Animated.parallel([
      // Opacity animation from 0 to 1
      Animated.timing(this.state.appearance, {
        toValue: 1,
        duration: 500,
        delay: (this.props.index || 1) * 120
      }),
      // Bounce animation from 2 to 1
      Animated.timing(this.state.bounce, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(6),
        delay: (this.props.index || 1) * 120
      })
    ]).start();
  }

  render() {
    const style = {
      ...styles.container,
      opacity: this.state.appearance,
      // Bind(interpolcate) appearance animation values to margin
      marginTop: this.state.appearance.interpolate({
        inputRange: [0, 1],
        outputRange: [60, 18],
      }),
      transform: [{
        scale: this.state.bounce
      }]
    }
    return (
      <Animated.View style={style}></Animated.View>
    )
  }
}

const styles = {
  container: {
    backgroundColor: '#efefef',
    borderRadius: 5,
    height: 65,
    width: '90%',
    marginLeft: '5%',
    marginTop: 40
  }
};