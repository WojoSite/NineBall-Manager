import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire)

var config = {
  apiKey: 'AIzaSyDJAACUKkmNVZ7enl21Psu23HAxexVOZ0s',
  authDomain: 'bedrock-eeccf.firebaseapp.com',
  databaseURL: 'https://bedrock-eeccf.firebaseio.com',
  projectId: 'bedrock-eeccf',
  storageBucket: 'bedrock-eeccf.appspot.com',
  messagingSenderId: '15065046365'
}

const fireapp = Firebase.initializeApp(config)
export const firedb = fireapp.database()
