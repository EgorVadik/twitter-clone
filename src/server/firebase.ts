import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyCaq0kJ79eiS-uqmySCxgdTAbO4fMgawS8',
    authDomain: 'twitter-clone-4d338.firebaseapp.com',
    projectId: 'twitter-clone-4d338',
    storageBucket: 'twitter-clone-4d338.appspot.com',
    messagingSenderId: '268083506093',
    appId: '1:268083506093:web:63b00fdac31d3e36664f24',
}

const app = initializeApp(firebaseConfig)
const store = getStorage(app)

export async function addPfp(file: any, userId: string) {
    const storageRef = ref(store, `pfp/${userId}`)

    const snap = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snap.ref)
    return url
}

export async function addBanner(file: any, userId: string) {
    const storageRef = ref(store, `banner/${userId}`)

    const snap = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snap.ref)
    return url
}

export async function uploadImage(file: any, tweetId: string) {
    const storageRef = ref(store, `tweet-imgs/${tweetId}`)

    const snap = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snap.ref)
    return url
}
