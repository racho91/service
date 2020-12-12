import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyC_-8PRJ0BVbWGjyAiHVk5u8JS1lR6vZew",
    authDomain: "service-efc58.firebaseapp.com",
    databaseURL: "https://service-efc58.firebaseio.com",
    projectId: "service-efc58",
    storageBucket: "service-efc58.appspot.com",
    messagingSenderId: "658975323831",
    appId: "1:658975323831:web:02c15af39024ce43143f32",
    measurementId: "G-9S6CGFQ410"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth
  // usersCollection,
  // postsCollection,
  // commentsCollection,
  // likesCollection
}