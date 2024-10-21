import { Text, SafeAreaView, StyleSheet, View, TextInput, Image,TouchableOpacity } from 'react-native';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image}>
        <Image source={require('./Image95.png')}/>
      </View>
      <View style={styles.contentPage1}>
        <Text style={styles.titleText}>MANAGE YOUR <br/> TASK</Text>
        <TextInput style={styles.inputName}
        placeholder='Enter your name'
        />
      </View>
      <View style={styles.buttonWrap}>
        <TouchableOpacity style={styles.buttonStarted}>
          <Text style={styles.buttonText}>
            GET STARTED ->
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  image:{
    marginTop:50,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:'40%'
  },
  contentPage1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:'30%'
  },
  titleText:{
    textAlign:'center',
    color:'#7C59CB',
    fontWeight:'bold',
    fontSize:23
  },
  inputName:{
    marginTop:30,
    borderWidth:1,
    height:35,
    width:'80%',
    borderRadius:10,
    paddingLeft:20
  },
  buttonWrap:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    height:'20%'
  },
  buttonStarted:{
    backgroundColor:'#00BCD5',
    width:'50%',
    height:40,
    borderRadius:10,
   
    justifyContent:'center',
    alignItems:'center',
    marginBottom:50
  },
  buttonText:{
    color:'white',
  }
  
});
