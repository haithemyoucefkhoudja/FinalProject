'use client';
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [isConnected, setIsConnected] = useState(false);
  const [number, setNumber] = useState(0);
  const socket = useRef<WebSocket>(null)
  function incrementNumber() {
    
    if(socket.current){
        socket.current.send(JSON.stringify({ action: 'increment' }));
    }
}
  useEffect(() => {
    if(!socket.current){
    socket.current =  new WebSocket('ws://127.0.0.1:8000/ws/number/');
    socket.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('data:',data)
        setNumber(data.number)
    }
    socket.current.onopen = () => {
        console.log('Connected to server');
        setIsConnected(true)
    };
    
    socket.current.onclose = () =>{
        setIsConnected(false)
    }

}
  }, [number]);

  return (
    <div>
      <p>Status: { isConnected ? "connected" : "disconnected" }</p>
      <p>{number}</p>
      <button onClick={()=>incrementNumber()}>increment</button>
    </div>
  );
}