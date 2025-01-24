export class Label {
  /** 妊娠初期ラベル */
  private static readonly TASK_TIMING_EARLY = '妊娠初期'
  /** 妊娠中期ラベル */
  private static readonly TASK_TIMING_MIDDLE = '妊娠中期'
  /** 妊娠後期ラベル */
  private static readonly TASK_TIMING_LATE = '妊娠後期'
  /** 出産後ラベル */
  private static readonly TASK_TIMING_AFTER = '出産後'

  /** パパラベル */
  private static readonly PARENT_TYPE_FATHER = 'パパ'
  /** ママラベル */
  private static readonly PARENT_TYPE_MOTHER = 'ママ'

  /**
   * 妊娠初期ラベルを取得
   * @returns string
   */
  public static getTaskTimingEarly(): string {
    return this.TASK_TIMING_EARLY
  }

  /**
   * 妊娠中期ラベルを取得
   * @returns string
   */
  public static getTaskTimingMiddle(): string {
    return this.TASK_TIMING_MIDDLE
  }

  /**
   * 妊娠後期ラベルを取得
   * @returns string
   */
  public static getTaskTimingLate(): string {
    return this.TASK_TIMING_LATE
  }

  /**
   * 出産後ラベルを取得
   * @returns string
   */
  public static getTaskTimingAfter(): string {
    return this.TASK_TIMING_AFTER
  }

  /**
   * パパラベルを取得
   * @returns string
   */
  public static getParentTypeFather(): string {
    return this.PARENT_TYPE_FATHER
  }

  /**
   * ママラベルを取得
   * @returns string
   */
  public static getParentTypeMother(): string {
    return this.PARENT_TYPE_MOTHER
  }
}
