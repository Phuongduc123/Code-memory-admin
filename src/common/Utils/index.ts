import { message } from "antd"


export const showNotification = (mess: string, type:string = "error") => {
  message[type](mess);
}