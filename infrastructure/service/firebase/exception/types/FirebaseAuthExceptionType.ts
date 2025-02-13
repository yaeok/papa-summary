/** firebaseのエラー */
type FirebaseError = {
  code: string
  message: string
  name: string
}

// firebaseのエラーかどうかを判定する
export const isFirebaseError = (e: Error): e is FirebaseError => {
  return 'code' in e && 'message' in e
}
