import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ON":
      return state
    case "OFF":
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export default NotificationContext