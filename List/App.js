import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import Card from './Card'

const ITEM_HEIGHT = 110;
const ITEM_WIDTH = 190;
const ACTIVE_ITEM_HEIGHT = 150;
const ACTIVE_ITEM_WIDTH = 240;
const data = [
  {
    id: '123',
    title: 'Cash Balance',
    amount: '$5290.34',
    updated: 2,
    logo: require('./images/wells-fargo-logo.png'),
    color: '#f45650'
  },{
    id: '124',
    title: 'Credit Balance',
    amount: '$3210.90',
    updated: 5,
    logo: require('./images/chase-logo.png'),
    color: '#1472c4'
  },{
    id: '125',
    title: 'Cash Balance',
    amount: '$290.32',
    updated: 10,
    logo: require('./images/ally-logo.png'),
    color: '#bb5db2'
  }
];

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 1
    };
  }

  renderItem = (data) => {
    const { activeIndex } = this.state;
    const isActive = data.index === activeIndex;
    const width = isActive ? ACTIVE_ITEM_WIDTH : ITEM_WIDTH; 
    const height = isActive ? ACTIVE_ITEM_HEIGHT : ITEM_HEIGHT; 
    return <Card {...data.item} active={isActive} width={width} height={height} />
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          contentContainerStyle={{height: 200, alignItems: 'center'}}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
});
