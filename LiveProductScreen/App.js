/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

const data = {
  title: 'Google\nHome Mini',
  price: '54',
  photos: [
    {
      url: require('./images/google_home_1.png'),
      controlsBackground: '#d0d2d1',
      controlsText: '#a3a5a6',
      background: '#e9e7e7',
      pricePosition: 'bottom',
      start: -100,
      stop: -120,
      style: {
        left: -100,
        top: -90,
        resizeMode: 'contain',
        height: 650,
      }
    },
    {
      url: require('./images/google_home_2.png'),
      background: '#fee3e3',
      controlsBackground: '#f5c7ca',
      controlsText: '#cca8aa',
      pricePosition: 'top',
      start: -310,
      stop: -290,
      style: {
        left: -310,
        resizeMode: 'cover',
        top: 200,
        height: 300
      }
    },
    {
      url: require('./images/google_home_4.png'),
      background: '#c5cbd3',
      controlsBackground: '#a2adb9',
      controlsText: '#8b8c94',
      pricePosition: 'bottom',
      start: -60,
      stop: -110,
      style: {
        left: -30,
        resizeMode: 'contain',
        top: 60,
        width: 1000,
      }
    },
  ]
};

const START_PRODUCT_INDEX = 0;

// Helpers
const backgroundColor = (orig, backgroundColor) => ({...orig, backgroundColor});
const borderColor = (orig, borderColor) => ({...orig, borderColor});
const color = (orig, color) => ({...orig, color});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      imageAnimX: new Animated.Value(data.photos[START_PRODUCT_INDEX].start),
      productIndex: START_PRODUCT_INDEX,
      amount: 1,
    };
  }

  componentDidMount() {
    this.changeProduct(this.state.productIndex);
  }

  componentDidUpdate(nextProps, nextState) {
    /* Highly important to run animation only after state changes
       to properly track productIndex change
    */
    if (this.state.productIndex !== nextState.productIndex) {
      this.changeProduct(this.state.productIndex);
    }
  }

  changeProduct(index) {
    const product = data.photos[index];
    const params = {
      toValue: product.stop,
      duration: 5000,
      easing: Easing.out(Easing.circle)
    };
    Animated.timing(this.state.imageAnimX, params).start();
  }

  onProductChange = (index) => {
    // Set product index and animation start point
    this.setState({ productIndex: index, imageAnimX: new Animated.Value(data.photos[index].start) });
  }

  onPlusPress = () => {
    this.setState({ amount: this.state.amount + 1 });
  }

  onMinusPress = () => {
    this.setState({ amount: this.state.amount - 1 });
  }

  render() {
    const { productIndex, amount, imageAnimX } = this.state;
    const product = data.photos[productIndex];

    // Customize UI colors based on selected product (color)
    const containerStyles = backgroundColor(styles.container, product.background);
    const imageStyles = {...product.style, left: imageAnimX};
    const titleStyles = backgroundColor(styles.title, product.controlsBackground);
    const priceLineStyles = {...styles.priceLine, ...(product.pricePosition === 'top' ? styles.priceTop : styles.priceBottom)};
    const currencyStyles = color(styles.currency, product.controlsBackground);
    const priceStyles = color(styles.price, product.controlsBackground);
    const numBtnStyles = backgroundColor(styles.controlsNum, product.controlsBackground);
    const numBtnTextStyles = color(styles.controlsNumText, product.controlsText);
    const cartBtnStyles = borderColor(styles.cartBtn, product.controlsText);
    const cartBtnTextStyles = color(styles.cartBtnText, product.controlsText);
    return (
      <View style={containerStyles}>
        <View style={styles.priceLayer}>
          <View style={priceLineStyles}>
            <Text style={currencyStyles}>$</Text>
            <Text style={priceStyles}>{data.price}</Text>
          </View>
        </View>
        <View style={{...styles.imageLayer}}>
          <Animated.Image source={product.url} style={imageStyles} />
        </View>
        <View style={styles.topLayer}>
          <View><Text style={titleStyles}>{data.title}</Text></View>
          <View style={styles.changeColor}>
            <TouchableOpacity style={{...styles.changeColorBtn, backgroundColor: '#efeff0'}} onPress={() => this.onProductChange(0)}></TouchableOpacity>
            <TouchableOpacity style={{...styles.changeColorBtn, backgroundColor: '#f38b89'}} onPress={() => this.onProductChange(1)}></TouchableOpacity>
            <TouchableOpacity style={{...styles.changeColorBtn, backgroundColor: '#52677f'}} onPress={() => this.onProductChange(2)}></TouchableOpacity>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={numBtnStyles} onPress={this.onMinusPress}>
              <Text style={numBtnTextStyles}>–</Text>
            </TouchableOpacity>
            <Text style={styles.amount}>{amount}</Text>
            <TouchableOpacity style={numBtnStyles} onPress={this.onPlusPress}>
              <Text style={numBtnTextStyles}>＋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={cartBtnStyles}>
              <Text style={cartBtnTextStyles}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  // Price Layer
  priceLayer: {
    position: 'absolute',
    zIndex: 0,
  },
  priceLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  currency: {
    fontSize: 20,
    marginTop: 14,
    fontWeight: '900',
  },
  price: {
    fontWeight: '900',
    fontSize: 70,
  },
  priceTop: {
    top: 200,
    left: 190,
  },
  priceBottom: {
    marginTop: 430,
  },
  // End Price Layer
  imageLayer: {
    top: 0,
    zIndex: 1,
  },
  transitionLayer: {
    zIndex: 2
  },
  topLayer: {
    position: 'absolute',
    zIndex: 3,
  },
  title: {
    color: '#413941',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 27,
    marginTop: 60,
    marginLeft: 20,
    paddingHorizontal: 8,
    paddingTop: 8,
    borderWidth: 1, 
    borderRadius: 10,
    borderColor: 'transparent',
    overflow: 'hidden'
  },
  changeColor: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 20
  },
  changeColorBtn: {
    marginLeft: 15,
    borderRadius: 50,
    height: 20,
    width: 20,
  },
  controls: {
    flexDirection: 'row',
    paddingLeft: 15,
    marginTop: 345
  },
  controlsNum: {
    width: 28,
    height: 28,
    borderRadius: 28,
    marginLeft: 13
  },
  controlsNumText: {
    width: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 25,
    color: '#a5a5ab'
  },
  amount: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 12,
    lineHeight: 25,
    color: '#413941',
    width: 10,
    textAlign: 'center'
  },
  cartBtn: {
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: 30,
    backgroundColor: '#f7f7f6',
  },
  cartBtnText: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 30,
    color: '#a5a5ab'
  },
  debug: {
    borderColor: 'red',
    borderWidth: 1
  }
};
