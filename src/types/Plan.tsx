/* 用于储存计划核心数据 */
export interface Task {
    id: string              //使用uuid生成
    title: string           //计划标题
    description: string     //计划描述
    isCompleted: boolean    //完成情况
}

export interface PlanState {
    tasks: Task[]    //储存所有任务
}
