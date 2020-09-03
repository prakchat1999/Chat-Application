import React from "react";
import io from "socket.io-client";
import { statement } from "@babel/template";

export const CTX = React.createContext();

const initState = {
  general: [
    // { from: "aaron", msg: "hello" },
    // { from: "arnold", msg: "hello" },
    // { from: "archer", msg: "hello" }
  ],
  relevant: [
    // { from: "aaron", msg: "hello" },
    // { from: "aaron", msg: "hello" },
    // { from: "aaron", msg: "hello" }
  ]
};

function reducer(state, action) {
    // console.log("State looks like: ", state)
//   state is allChats
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECIEVE_MESSAGE":
        console.log("RECIEVE_MESSAGE called")
        state = {...state, [topic]: [...state[topic].push({from, msg})]}
        // topic is general or topic2 in this case
    //   return {
    //     ...state,
    //     [topic]: [
    //         ...state[topic],
    //         { from, msg }
    //     ]
    //   }
        return state;
    default:
      return state
  }
}

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
  console.log("socket.emit: ", value)
}

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  const user = "prakhar" + Math.random(100).toFixed(2);
 
  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
        dispatch({type: 'RECIEVE_MESSAGE', payload: msg});
        console.log("After changing the state is: ", allChats)
    });
  }
  console.log("After if statement the state is: ", allChats)
  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}