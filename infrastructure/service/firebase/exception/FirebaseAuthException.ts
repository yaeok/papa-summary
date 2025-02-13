// FirebaseAuthのカスタム例外クラス
export class FirebaseAuthException extends Error {
  code: string

  constructor(message: string, code: string) {
    super(message)
    this.code = code
    this.name = 'FirebaseAuthException'
  }
}
