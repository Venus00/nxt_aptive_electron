import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDataState } from "./slice/data";


export default function Dispatch() {

    const dispatch = useDispatch()

    useEffect(() => {

		function connect() {
			var ws = new WebSocket('ws://localhost:1880/data');
		 
			ws.onmessage = function(event) {
			dispatch(updateDataState(JSON.parse(event.data)))
			};
		  
			ws.onclose = function(e) {
			  console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
			  setTimeout(function() {
				connect();
			  }, 1000);
			};
			ws.onerror = function(err) {
				setTimeout(function() {
					connect();
				  }, 1000);
			};
		}
		connect()
		return () => {
		};
	  }, []);
	  return null;
}