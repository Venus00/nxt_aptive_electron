import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateDataState } from "./slice/data";

export default function Dispatch() {

    const dispatch = useDispatch()
	const clientRef = useRef<WebSocket | null>(null);
	const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(null);
    useEffect(() => {

		if (waitingToReconnect) {
			return;
		}
		if(!clientRef.current) {
			const client = new WebSocket('ws://localhost:1880/data');
			clientRef.current = client;
			client.onclose = function() {
				if(clientRef.current)
				{
					console.log('connection closed by the servr');
				}
				else
				{
					console.log('useEffect Distroy');
					return;
				}

				if(waitingToReconnect) return;
				console.log('ws is closed');
				setWaitingToReconnect(true);

				setTimeout(()=> setWaitingToReconnect(null),1000);
			};
			client.onopen = () => {
				console.log('ws opened');
			  };
			client.onerror = (e) => console.error(e);
			if (waitingToReconnect) {
				return;
			};
			client.onmessage = function(event) {
				dispatch(updateDataState(JSON.parse(event.data)))
			};
			 	
		return () => {
			console.log('distroy');
			clientRef.current = null;
			client.close();
		};


		}
	
	  }, [waitingToReconnect]);
	  return null;
}