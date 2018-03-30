/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  FlatList,
  PanResponder
} from 'react-native';
import MessageItem from './MessageItem';

const INDICATOR_HEIGHT = 40;

type Props = {};
export default class App extends Component<Props> {
  constructor () {
    super()
    this.state = {
      // Loader top offset
      loaderScrollOffset: 0,
      // Loader swipe status
      loaderSwipe: false,
      // Loader icon visibility
      loaderShow: false,
      // Loader height animation
      loaderAnimAppearance: new Animated.Value(0),
      // Is data loaded
      loaded: false,
      // New message animation
      newMessageAnimation: new Animated.Value(0),
    };

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        this.setState({ loaderSwipe: true });
      },

      onPanResponderMove: (evt, gestureState) => {
        // The accumulated gesture distance since becoming responder is
        const offset = gestureState.dy < 150 ? gestureState.dy : 150;
        const loaderShow = offset > 130;
        this.setState({ loaderScrollOffset: offset, loaderShow });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The accumulated gesture distance since becoming responder is
        const offset = gestureState.dy < 150 ? gestureState.dy : 150;
        this.setState({ loaderScrollOffset: offset, loaderShow: true });
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
        this.setState({ loaderSwipe: false, loaderShow: false, loaderScrollOffset: gestureState.dy });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.loaded !== this.state.loaded) {
      // Animate new message counter appearance
      Animated.timing(this.state.newMessageAnimation, {
        toValue: 1,
        duration: 600,
        easing: Easing.elastic(3),
      }).start();
    }
    // Handle 
    if (prevState.loaderShow !== this.state.loaderShow) {
      if(this.state.loaderShow) {
        // Animate loader appearance
        Animated.timing(this.state.loaderAnimAppearance, {
          toValue: 1,
          duration: 500
        }).start();
        // Emulate data API call
        setTimeout(() => this.setState({ loaded: true, loaderShow: false }), 2000)
      } else {
        // Animate loader disappearance 
        Animated.timing(this.state.loaderAnimAppearance, {
          toValue: 0,
          duration: 300
        }).start();
      }
    }
  }

  render() {
    const { loaderSwipe, loaderShow, loaderScrollOffset, loaderAnimAppearance, loaded, newMessageAnimation } = this.state;
    const loaderContainer = {
      ...styles.loaderContainer,
      // Use offset if data is not loaded or use animation to collapse loader
      height: !loaded ? loaderScrollOffset : loaderAnimAppearance.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150],
      })
    };
    const loaderStyles = {
      ...styles.loader,
      opacity: loaderAnimAppearance
    }
    const contentStyles = {
      ...styles.content,
      // Use offset if data is not loaded or use animation to move content up
      marginTop: !loaded ? loaderScrollOffset : loaderAnimAppearance.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150],
      })
    };
    const newMessagesStyles = {
      ...styles.newMessages,
      // Direct bind to animation value
      opacity: newMessageAnimation,
      // Interpolate animation to scale values
      transform: [{ 
        scale: newMessageAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1.5, 1],
        })
      }]
    };
    const messages = [{key: 1},{key: 2},{key: 3}];
    return (
      <View {...this._panResponder.panHandlers}>
        {loaderSwipe && (
          <Animated.View style={loaderContainer}>
            {loaderShow && <Animated.Image source={require('./images/infinity-loader.gif')} style={loaderStyles} />}
          </Animated.View>
        )}
        <Animated.View style={contentStyles}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Inbox</Text>
            {loaded && <Animated.Text style={newMessagesStyles}>3</Animated.Text>}
          </View>
          <View style={styles.titleBreak}></View>
          {!loaded && <Text style={styles.noMessages}>You haven't received any{'\n'} messages yet.</Text>}
        </Animated.View>
        {loaded && (
          <View style={styles.listContainer}>
            <FlatList
              data={messages}
              keyExtractor={(item) => item.key.toString()}
              renderItem={(item) => <MessageItem {...item} />}
            />
          </View>
        )}
      </View>
    )
  }
}

const styles = {
  container: {
    height: '100%',
    width: '100%'
  },
  loaderContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 100,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#2B2C2F',
  },
  loader: {
    marginTop: -200,
    resizeMode: 'contain',
    width: '100%',
  },
  content: {
    paddingHorizontal: '8%',
    overflow: 'visible',
    top: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  newMessages: {
    marginLeft: 15,
    marginTop: 8,
    paddingTop: 1,
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#1ec1d4',
    borderRadius: 12.5,
    width: 25,
    height: 25,
    overflow: 'hidden'
  },
  titleBreak: {
    width: 35,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    marginBottom: 20
  },
  noMessages: {
    color: '#8e8e8e',
    fontSize: 17
  },
  listContainer: {
    
  }
};
