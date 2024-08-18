

export enum status {
    Viewed,
    Notviewed
}

type User = {
    id: string,
    name: string,
    profile: string | null
}

export interface notificationFor extends User {}

export interface notificationFrom extends User {}

export type Notification = {
    id: string,
    status: status,
    body: string,
    link: string | null,
    notificationFor_Id: string,
    notificationFrom_Id: string,
    notificationFrom: notificationFrom,
    createdAt: string
}