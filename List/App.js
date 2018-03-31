import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Text,
  View,
  ScrollView,
  FlatList,
  PanResponder
} from 'react-native';
import Card from './Card'

const ITEM_HEIGHT = 150;
const ITEM_WIDTH = 240;
const ACTIVE_ITEM_LEFT = ITEM_WIDTH / 2;
const data = [
  {
    id: '123',
    title: 'Cash Balance',
    amount: '$5290.34',
    updated: 2,
    logo: require('./images/wells-fargo-logo.png'),
    color: '#f45650',
    transactions: [{},{},{},{},{},{},{},{},{},{},{},{}],
  },{
    id: '124',
    title: 'Credit Balance',
    amount: '$3210.90',
    updated: 5,
    logo: require('./images/chase-logo.png'),
    color: '#1472c4',
    transactions: [{},{},{},{},{},{},{},{},{},{},{},{}],
  },{
    id: '125',
    title: 'Cash Balance',
    amount: '$290.32',
    updated: 10,
    logo: require('./images/ally-logo.png'),
    color: '#bb5db2',
    transactions: [{},{},{},{},{},{},{},{},{},{},{},{}],
  }
];

export default class App extends Component {
  constructor() {
    super();
    this.transactions = null;
    this.state = {
      activeIndex: 1,
      cardsOffset: new Animated.Value(0),
      swipe: ''
    };

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        // The accumulated gesture distance since becoming responder is
        // 50 - down low sensibility 
        this.state.cardsOffset.setValue(this.state.cardsOffset._value + gestureState.dx / 50);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The accumulated gesture distance since becoming responder is
        this.setState({ swipe: gestureState.dx < 0 ? 'left' : 'right' })
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        //this.setState({ swipe: gestureState.dx < 0 ? 'left' : 'right' })
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.swipe !== this.state.swipe && this.state.swipe !== '')
      this.finishSwipe();
  }

  finishSwipe = () => {
    // Cards stop points, visual representation for better understanding
    const stopPoints = [250, 0, -250];
    // Detect direction
    let changer = this.state.swipe == 'left' ? 1 : -1;
    let animChanger = this.state.swipe == 'right' ? 1 : -1;
    // Set scroll bounderis
    let activeIndex = this.state.activeIndex + changer;
    if (activeIndex < 0)
      activeIndex = 0;
    else if (activeIndex > 2)
      activeIndex = 2;

    // Animate card
    Animated.timing(this.state.cardsOffset, {
      toValue: stopPoints[activeIndex],
      duration: 600,
      easing: Easing.linear
    }).start();
      
    // Scroll bottom transaction list
    this.transactions.scrollToIndex({index: activeIndex});
    this.setState({ activeIndex, swipe: '' });
  }

  renderCard = (data, index) => {
    const { activeIndex } = this.state;
    const isActive = index === activeIndex;
    const scale = isActive ? 1 : 0.8;
    return <Card
      {...data}
      key={index}
      width={ITEM_WIDTH}
      height={ITEM_HEIGHT}
      scale={scale}
    />
  }

  renderTransactions(data) {
    return (
      <ScrollView style={styles.transactionsGroup}>
        {data.item.transactions.map((obj, index) => <View key={index} style={styles.transaction}></View>)}
      </ScrollView>
    );
  }

  render() {
    const { cardsOffset, activeIndex } = this.state;
    const cardsStyles = {
      ...styles.cards, 
      left: cardsOffset
    };

    return (
      <View style={styles.container}>
        <Animated.View style={cardsStyles} {...this._panResponder.panHandlers}>
          {data.map((item, index) => this.renderCard(item, index))}
        </Animated.View>
        <FlatList 
          ref={el => this.transactions = el}
          style={styles.transactions}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderTransactions}
          initialScrollIndex={activeIndex}
          getItemLayout={(data, index) => (
            {length: 300, offset: 320 * index, index}
          )}/>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50
  },
  cards: {
    height: 200,
    flexDirection: 'row'
  },
  transactions: {
    width: '100%',
  },
  transaction: {
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    width: 310
  }
};
