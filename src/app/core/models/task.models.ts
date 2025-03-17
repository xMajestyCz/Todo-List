export interface TaskDescription {
    text: string;
    done: boolean;
}
export interface Task {
    title: string;
    descriptions: TaskDescription[];
    date: Date;
    id: string;
    done: boolean;
}