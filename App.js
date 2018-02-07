import React from 'react';
import { StyleSheet, Text, View, Image,TouchableHighlight, TextInput,  PanResponder,
  Animated,Button, TouchableOpacity,  NativeModules,
  LayoutAnimation,} from 'react-native';

const fbImage ='https://graph.facebook.com/1283467065035647/picture?height=500' //get picture from facebook id 
// issue 1: resize the picture without losing the whole view 

class FadeInView extends React.Component {
    state = {
      fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    }
  
    componentDidMount() {
      Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 10000,              // Make it take a while
        }
      ).start();                        // Starts the animation
    }
  
    render() {
      let { fadeAnim } = this.state;
  
      return (
        <Animated.View                 // Special animatable View
          style={{
            ...this.props.style,
            opacity: fadeAnim,         // Bind opacity to animated value
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }
  
  //const { UIManager } = NativeModules;

  //UIManager.setLayoutAnimationEnabledExperimental &&
  //UIManager.setLayoutAnimationEnabledExperimental(true);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};}
  componentWillMount(){
    this.pan = new Animated.ValueXY()

    this.cardPanResponder = PanResponder.create({ 
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([ //used animated event to move the card with the user gesture
        null,
        {dx:this.pan.x, dy:this.pan.y}, //animated values
      ]),
      onPanResponderRelease: () => {
         Animated.spring(this.pan,{
           toValue: {x:0, y:0}, // the page rotate back to center when dropped
           friction: 5.5,

         }).start()
        },
    })
  }
  //state = {
   // w: 400,
    //h: 50,
  //};

 // _onPress = () => {
    // Animate the update
    //LayoutAnimation.spring();
    //this.setState({w: this.state.w + 15, h: this.state.h + 15})}
  render() {
    const rotateCard = this.pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['10deg','0deg','-10deg'],
    })
    const animatedStyle = {
      transform: [
        {translateX: this.pan.x},
        {translateY: this.pan.y},
        {rotate: rotateCard},
      ],
    }
    return (
      <Animated.View  //animated turns the component into animated component
      {...this.cardPanResponder.panHandlers} //spread operator allows to deconstrust an object (...) is the spread operator
      style={[styles.container,animatedStyle]}> 
         {/*<View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FadeInView style={{width: 250, height: 30, backgroundColor: 'royalblue', paddingBottom:5, marginBottom:5}}/*  fades in the color of the text */
         
         //> 
        //<Text style={styles.text }> Welcome! </Text> 
        //</FadeInView>
    }
        <Text style={styles.text }> Welcome! </Text>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FadeInView style={{width: 150, height: 200, paddingTop: 10}}>
      
      <Image 
        style={{flex: 1,  width:150, alignItems:'center', marginTop: 5}}
         source = {{uri: fbImage}} />
        </FadeInView>  
      
       <View style={{margin:20}}>
       
      <Text style={{fontSize:20, color:'green'}}> Angelina Jolie, 42 </Text>
      <Text style={{fontSize:15, color:'grey'}}> Film Actress, Director, Producer, Activist </Text>
      
      <View style={{padding: 10}}>
      <TextInput
        style={styles.input}
        placeholder="Translate word into pizza!"
        onChangeText={(text) => this.setState({text})}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
     
     
     {/* <View style={[styles.box, {width: this.state.w, height: this.state.h}]} />
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Press me!</Text>
        </View>
      </TouchableOpacity>
    */}
                    <View style={styles.button}> 
                  <Button   
                    onPress={() => Button.styles.color = 'blue'}
                    title="Click me!" />
                  </View>
                </View>
             </View>
             </View>

        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#5f9ea0',
    margin: 10,
    marginTop: 100,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
   
  },
  text:{
    textAlign:'center',
    fontSize:15, 

  },
  searchInput:{
    
    margin:5,
    height:40,
    width: 250,
    fontSize:18,
    borderWidth:1,
    color:'black',
    borderColor:'maroon',
    borderRadius:1,

  },
  input:{
    height: 40,   
    width: 250,
    fontSize:18,
    borderWidth:1,
    paddingLeft: 10,
    color:'black',
    borderColor:'black',
    borderRadius:1,
  },
  button:{
   
    margin:10,
    borderRadius:8,
    backgroundColor: '#6495ed',
  
    borderWidth:2,
    height:40,
    //position: 'absolute',
    //justifyContent: 'center',
    //alignItems:'center',
    
  },
  

});