export class RoutePath {
  private static readonly LANDING_PAGE = '/'

  private static readonly SIGN_IN_PAGE = '/sign_in'
  private static readonly SIGN_UP_PAGE = '/sign_up'
  private static readonly EMAIL_VERIFICATION_PAGE = '/email_verify'
  private static readonly NEW_PAGE = '/new'

  private static readonly TASK_PAGE = '/tasks'
  private static readonly BUY_PAGE = '/buys'
  private static readonly PROFILE_PAGE = '/profile'

  /**
   * ランディングページのpathを返す
   * @returns string
   */
  public static getLandingPage(): string {
    return this.LANDING_PAGE
  }

  /**
   * サインインページのpathを返す
   * @returns string
   */
  public static getSignInPage(): string {
    return this.SIGN_IN_PAGE
  }

  /**
   * サインアップページのpathを返す
   * @returns string
   */
  public static getSignUpPage(): string {
    return this.SIGN_UP_PAGE
  }

  /**
   * メール認証ページのpathを返す
   * @returns string
   */
  public static getEmailVerificationPage(): string {
    return this.EMAIL_VERIFICATION_PAGE
  }

  /**
   * 新規登録ページのpathを返す
   * @returns string
   */
  public static getNewPage(): string {
    return this.NEW_PAGE
  }

  /**
   * やることページのpathを返す
   * @returns string
   */
  public static getTaskPage(): string {
    return this.TASK_PAGE
  }

  /**
   * かうものページのpathを返す
   * @returns string
   */
  public static getBuyPage(): string {
    return this.BUY_PAGE
  }

  /**
   * プロフィールページのpathを返す
   * @returns string
   */
  public static getProfilePage(): string {
    return this.PROFILE_PAGE
  }
}
