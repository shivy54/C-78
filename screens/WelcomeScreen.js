import React, { Component } from 'react';

import { View, StyleSheet, Text,
   Image, TouchableOpacity,TextInput,
    Alert, Modal, ScrollView, 
    KeyboardAvoidingView } from 'react-native';

import SantaAnimation from '../components/SantaClaus.js';

import db from '../config';

import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
     modalVisible:'false',
     firstName:'',
     lastName:'',
     address:'',
     contact:'',
     confirmPassword:'',
    }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Logged in")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password, Conpassword) =>{
    if(password !== Conpassword){
      return (
        Alert.alert("Password does not match")
      )
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      return Alert.alert("User Added Successfully")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
    db.collection('Users').add({
     firstName:this.state.firstName,
     lastName:this.state.lastName,
     contact:this.state.contact,
     address:this.state.address,
     emailId:this.state.emailId,
    })
  }
  }

  ShowModal =()=>{
    return(
      <Modal
      animationType='fade'
      transparent={true}
      visible={this.state.modalVisible}>
        <View>
          <ScrollView style={{width:'100%'}}>
            <KeyboardAvoidingView style={styles.key}>
              <Text style={styles.title}>Registeration</Text>
              <TextInput style={styles.formtext}
              placeholder={'First Name'}
              onChangeText={(text)=>{
                this.setState({
                  firstName:text
                })
              }}
              />
              <TextInput style={styles.formtext}
              placeholder={'Last Name'}
              onChangeText={(text)=>{
                this.setState({
                  lastName:text
                })
              }}
              />
              <TextInput style={styles.formtext}
              placeholder={'phone no'}
              maxLength={10}
              keyboardType={"numeric"}
              onChangeText={(text)=>{
                this.setState({
                  contact:text
                })
              }}
              />
              <TextInput style={styles.formtext}
              placeholder={'address'}
              multiline={true}
              onChangeText={(text)=>{
                this.setState({
                 address:text
                })
              }}
              />
              <TextInput style={styles.formtext}
              placeholder={'emailId'}
              keyboardType={"email-address"}
              onChangeText={(text)=>{
                this.setState({
                  emailId:text
                })
              }}
              />
              <TextInput style={styles.formtext}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text)=>{
                this.setState({
                  Password:text
                })
              }}
              />
              <TextInput style={styles.formtext}
              placeholder={'Confirm Password'}
              secureTextEntry={true}
              onChangeText={(text)=>{
                this.setState({
                  confirmPassword:text
                })
              }}
              />
              <View>
                <TouchableOpacity style={styles.register} onPress={
                  ()=>{
                   this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                  }}>
                    <Text style={styles.registerText}>Register:)</Text>
                  </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>

    )
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
        <SantaAnimation/>
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.showModal()}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
lottie

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  }
})
