export class Status {
  // 親タイプ（父）
  private static readonly PARENT_TYPE_FATHER = 0
  // 親タイプ（母）
  private static readonly PARENT_TYPE_MOTHER = 1

  // タスクステータス（未完了）
  private static readonly TASK_STATUS_NOT_COMPLETED = 0
  // タスクステータス（完了）
  private static readonly TASK_STATUS_COMPLETED = 1

  // タスクタイミング（全て）
  private static readonly TASK_TIMING_ALL = 99
  // タスクタイミング（妊娠初期）
  private static readonly TASK_TIMING_EARLY = 0
  // タスクタイミング（妊娠中期）
  private static readonly TASK_TIMING_MIDDLE = 1
  // タスクタイミング（妊娠後期）
  private static readonly TASK_TIMING_LATE = 2
  // タスクタイミング（出産後）
  private static readonly TASK_TIMING_AFTER = 3

  /**
   * 親タイプ（父）を取得
   * @returns number
   */
  public static getParentTypeFather(): number {
    return this.PARENT_TYPE_FATHER
  }

  /**
   * 親タイプ（母）を取得
   * @returns number
   */
  public static getParentTypeMother(): number {
    return this.PARENT_TYPE_MOTHER
  }

  /**
   * タスクステータス（未完了）を取得
   * @returns number
   */
  public static getTaskStatusNotCompleted(): number {
    return this.TASK_STATUS_NOT_COMPLETED
  }

  /**
   * タスクステータス（完了）を取得
   * @returns number
   */
  public static getTaskStatusCompleted(): number {
    return this.TASK_STATUS_COMPLETED
  }

  /**
   * タスクタイミング（全て）を取得
   * @returns number
   */
  public static getTaskTimingAll(): number {
    return this.TASK_TIMING_ALL
  }

  /**
   * タスクタイミング（妊娠初期）を取得
   * @returns number
   */
  public static getTaskTimingEarly(): number {
    return this.TASK_TIMING_EARLY
  }

  /**
   * タスクタイミング（妊娠中期）を取得
   * @returns number
   */
  public static getTaskTimingMiddle(): number {
    return this.TASK_TIMING_MIDDLE
  }

  /**
   * タスクタイミング（妊娠後期）を取得
   * @returns number
   */
  public static getTaskTimingLate(): number {
    return this.TASK_TIMING_LATE
  }

  /**
   * タスクタイミング（出産後）を取得
   * @returns number
   */
  public static getTaskTimingAfter(): number {
    return this.TASK_TIMING_AFTER
  }
}
