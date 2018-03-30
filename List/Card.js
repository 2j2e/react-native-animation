import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

export default class App extends Component {
  render() {
    const { active, color, logo, left, height, width, title, amount, updated } = this.props;
    const containerStyles = {
      ...styles.container,
      backgroundColor: color,
      marginHorizontal: 5,
      left,
      height,
      width
    };
    const logoStyles = active ? styles.logoActive : styles.logo;
    const titleStyles = active ? styles.titleActive : styles.title;
    const amountStyles = active ? styles.amountActive : styles.amount;
    const updatedStyles = active ? styles.updatedActive : styles.updated;

    console.log(this.props);
    return (
      <View style={containerStyles}>
        <View style={styles.logoContainer}>
          <Image style={logoStyles} source={logo} />
        </View>
        <Text style={titleStyles}>{title.toUpperCase()}</Text>
        <Text style={amountStyles}>{amount}</Text>
        <Text style={updatedStyles}>Updated {updated} min ago</Text>
      </View>
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
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  logoActive: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 8,
    marginTop: '5%'
  },
  titleActive: {
    color: '#fff',
    fontSize: 8,
    marginTop: '8%'
  },
  amount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '1%'
  },
  amountActive: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '1%'
  },
  updated: {
    color: '#fff',
    fontSize: 6,
    marginTop: '10%'
  },
  updatedActive: {
    color: '#fff',
    fontSize: 8,
    marginTop: '14%'
  }
};