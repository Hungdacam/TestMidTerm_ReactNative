import { Text, SafeAreaView, StyleSheet, View, TextInput, Image,TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
const Stack=createNativeStackNavigator();
const HomeScreen=({navigation})=>{
  const [name, setName]=useState('');
  const handlerGetStarted =()=>{
    navigation.navigate('List',{userName: name})
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.image}>
          <Image source={require('./Image95.png')}/>
        </View>
        <View style={styles.contentPage1}>
          <Text style={styles.titleText}>MANAGE YOUR <br/> TASK</Text>
          <TextInput style={styles.inputName}
          placeholder='Enter your name'
          value={name}
          onChangeText={setName}
          />
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.buttonStarted} onPress={handlerGetStarted}>
            <Text style={styles.buttonText}>
              GET STARTED ->
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}
const Item =({id,title, onSelect, onDelete})=>(
  <TouchableOpacity
  style={styles.item}
  key={id}
  onPress={()=>onSelect(id)}
  >
    <Text style={styles.titleItem}>
      {title}
    </Text>
    <View style={{
      flexDirection:'row'
    }}>
      <TouchableOpacity
      style={{marginRight:10}}>
        <Icon 
          name='pencil'
          size={20}
          color='#00BDD6'
        />
      </TouchableOpacity>
      <TouchableOpacity
      key={id}
      onPress={()=> onDelete(id)}
      >
        <Icon 
          name='times'
          size={20}
          color='#00BDD6'
        />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);
//Tao hook quan li input
function useInput(initialValue){
  const [value, setValue]=useState(initialValue);
  const onChangeText=(newValue)=>{
    setValue(newValue);
  }
  return {
    value, 
    onChangeText,
    setValue
  }
}
const ListScreen =({navigation, route})=>{
  const userName = route.params?.userName || 'Guest'; 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [select, setSelect] = useState(null);
  const input=useInput("");
  //render data
  const refreshData = async ()=> {
    setLoading(true);
    try{
      const response = await fetch('https://6454008bc18adbbdfead590d.mockapi.io/api/v1/api_todolist');
      if (!response.ok){
        throw new Error('Khong lay duoc du lieu');
      }
      const jsonData= await response.json();
      setData(jsonData);
    } catch(error){
        setError(error.message);
    } finally{
      setLoading(false);
    }
  }
  // Ham xoa
  const handlerDelete=async(id) =>{
    try{
      await fetch(`https://6454008bc18adbbdfead590d.mockapi.io/api/v1/api_todolist/${id}`,{method:'DELETE'})
      refreshData();
    } catch (error){
      setError(error.message);
    }
  }
  // Ham xu li khi nhan vao item
  const handlerSelectItem = (id)=>{
    const selectedItem = data.find((item)=>item.id === id);
    if (selectedItem){
    setSelect(selectedItem);
    input.setValue(selectedItem.title);
    }
  }
  useEffect(()=>{
    refreshData();
  },[]);
  if (loading){
    return <Text>
    ...isLoading
    </Text>
  }
  if (error) {
    return <Text>Error: {error}</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerPage2}>
        <TouchableOpacity onPress={
          ()=> navigation.goBack()
        }> 
          <Icon 
          name="arrow-left"
          size={20}
          color="#000"
          style={styles.iconBack}/>
        </TouchableOpacity>
        <View style={styles.infoUser}>
        <Image source={require('./Avatar31.png')}/>
        <View style={styles.headerTextWrap}>
          <Text style={styles.helloText}>Hi {userName}</Text>
          <Text style={styles.helloText2} >Have agrate day a head</Text>
        </View>
        </View>
      </View>

      <View style={styles.searchButtonWrap}>
        <TextInput
        value={input.value}
        onChangeText={input.onChangeText}
        placeholder='Search...'
        style={styles.searchButton}
        />
      </View>
      
      <SafeAreaView style={styles.listItem}>
        <FlatList
          data={data}
          renderItem={({item})=>(
            <Item
              id={item.id}
              title={item.title}
              onSelect={handlerSelectItem}
              onDelete={()=>handlerDelete(item.id)}

            />
          )}
          keyExtractor={(item)=>item.id.toString()}
          contentContainerStyle={{paddingBottom:80}}
          
        />
      </SafeAreaView>
      
      

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>
          +
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{headerShown:false}}
        />
         <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
  },
  headerPage2:{
    height:'10%',
    marginBottom:20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingRight:20,
  },
  infoUser: {
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    paddingRight:20
  },
  iconBack:{
    paddingLeft:20,
  },
  headerTextWrap:{
    marginLeft:20,
  },
  helloText:{
    fontSize:20,
    fontWeight:'bold'
  },
  searchButtonWrap:{
    justifyContent:'center',
    alignItems:'center',
    
  },
  searchButton:{
    borderWidth:1,
    height:40,
    width:'90%',
    borderRadius:5,
    paddingLeft:20,
    borderColor:'#E0E0E0'
  },
  listItem:{
    flex:1,
    marginTop:20
  },
  item:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderWidth:1,
    borderRadius:5,
    borderColor:'#E0E0E0',
    padding:15,
    marginBottom:10
  },
  titleItem:{
    fontSize:20,
    color:'#333'
  },
  addButton:{
    left:'45%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#00BFFF',
    height:50,
    width:50,
    borderRadius:30,
    paddingVertical:20
  },
  addButtonText:{
    color:'white',
    fontSize:30
  }
  
});
