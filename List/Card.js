import React, { Component } from 'react';
import {
  Animated,
  Text,
  View,
  Image
} from 'react-native';

export default class App extends Component {
  render() {
    const { color, logo, left, scale, height, width, title, amount, updated } = this.props;
    const containerStyles = {
      ...styles.container,
      backgroundColor: color,
      marginHorizontal: 5,
      height,
      width,
      transform: [{scale}]
    };
    const logoStyles = {...styles.logo, transform: [{scale}]};
    const titleStyles = {...styles.title, transform: [{scale}]};
    const amountStyles = {...styles.amount, transform: [{scale}]};
    const updatedStyles = {...styles.updated, transform: [{scale}]};
    return (
      <Animated.View style={containerStyles}>
        <Animated.View style={styles.logoContainer}>
          <Animated.Image style={logoStyles} source={logo} />
        </Animated.View>
        <Animated.Text style={titleStyles}>{title.toUpperCase()}</Animated.Text>
        <Animated.Text style={amountStyles}>{amount}</Animated.Text>
        <Animated.Text style={updatedStyles}>Updated {updated} min ago</Animated.Text>
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    borderRadius: 5,
    borderColor: 'transparent',
    padding: 15
  },
  logoContainer: {
    width: '100%',
    alignItems: 'flex-end'
  },
  logo: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 8,
    marginTop: '8%'
  },
  amount: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '1%'
  },
  updated: {
    color: '#fff',
    fontSize: 8,
    marginTop: '14%'
  }
};