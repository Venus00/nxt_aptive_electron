/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { Outlet } from 'react-router-dom';
import AppBar from './components/AppBar';

import APTIVImage from './images/Aptiv_logo.svg';
import NextronicImage from './images/nextronic_logo.svg';
import DashboardPage from './pages/DashboardPage';
import { useEffect, useState } from 'react';

const AppLayout = () => {
	
	const [data,setData] = useState<any>(null);
	useEffect(() => {

		function connect() {
			var ws = new WebSocket('ws://192.168.10.209:1880/data');
		 
			ws.onmessage = function(event) {
			setData(JSON.parse(event.data))
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
	
	return (
		<div className="h-screen w-screen flex flex-col justify-between items-center bg-slate-100">
			<AppBar logo={APTIVImage} icon={NextronicImage} data={data}/>
			<DashboardPage data={data}/>
			{/* <div className="w-screen p-4 flex justify-center items-center">
				<img src={NextronicImage} alt="NEXTRONIC" />
			</div> */}
		</div>
	);
};

export default AppLayout;

