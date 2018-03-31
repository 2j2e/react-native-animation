import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Button from 'apsl-react-native-button'
import LottieView from 'lottie-react-native';

const animations = [
  require(`./animations/servishero_loading.json`),
  require(`./animations/loading.json`),
  require(`./animations/i\'m_thirsty!.json`),
  require(`./animations/data.json`)
];


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      animationIndex: 0
    };
  }

  componentDidMount() {
    this.animation.play();
  }

  onChange = (index) => {
    // No, you can't dynamicly change LottiwView source :(
    this.setState({ animationIndex: index });
  }

  render() {
    const { animationIndex } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <Button style={styles.button} textStyle={styles.buttonText} onPress={() => this.onChange(0)}>1</Button>
          <Button style={styles.button} textStyle={styles.buttonText} onPress={() => {this.onChange(1)}}>2</Button>
          <Button style={styles.button} textStyle={styles.buttonText} onPress={() => this.onChange(2)}>3</Button>
          <Button style={styles.button} textStyle={styles.buttonText} onPress={() => this.onChange(3)}>4</Button>
        </View>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          source={animations[animationIndex]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 50
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Avenir',
  },
  button: {
    borderColor: '#f39c12',
    backgroundColor: '#e98b39',
    width: 40,
    marginHorizontal: 10
  }
});
