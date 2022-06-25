export enum Sender {
    React,
    Content
}

export interface ChromeMessage {
    from: Sender,
    message: any
}

export interface SBWindow {
    gameData: string
}

export interface GameData{
    today: DayData,
    tomorrow: DayData
}

export interface DayData{
    answers: string[]
}