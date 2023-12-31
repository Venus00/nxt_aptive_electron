/* eslint-disable @typescript-eslint/naming-convention */
import Card from 'renderer/components/Card';
import ClockDisplay from 'renderer/components/ClockDisplay';
import HeadLine from 'renderer/components/HeadLine';
import Spinner from 'renderer/components/Spinner';

import GearsImage from '../images/gears.svg';
import TaskImage from '../images/task.svg';
import BubbleImage from '../images/chat_bubble.svg';
import { useSelector } from 'react-redux';
import { DataState } from 'renderer/store/slice/data';
import { RootState } from 'renderer/store/store';

const formatUptime = (seconds: number) => {

	const minutes = Math.floor(seconds / 60) % 60;
	const hours = Math.floor(Math.floor(seconds / 60) / 60);
	let result = '';

	if (hours < 10) result += `0${hours}:`;
	else {
		result += `${hours}:`;
	}

	if (minutes < 10) result += `0${minutes}`;
	else {
		result += minutes;
	}

	return result;
};

const DashboardPage = (props:any) => {

	const {attributes,downTime,upTime} = useSelector((state:RootState)=>state.data)
	console.log(downTime)
	return (
		<>
			<div className="flex w-screen justify-center items-center grow p-8">
				<div className="w-screen h-full grid grid-cols-2 gap-4 bg-slate-200 border border-gray-400 rounded-xl">
					<HeadLine text="DownTime">
						<img alt="ICON" src={TaskImage} className="h-12 w-12" />
					</HeadLine>
					<HeadLine text="  UP TIME">
						<img
							alt="ICON"
							src={GearsImage}
							className="h-12 w-12"
						/>
					</HeadLine>
					<Spinner
						numerator={downTime.value}
						denomerator={60}
						unit={formatUptime(downTime.value)}
					/>
					<div className="p-8">
						<ClockDisplay timer={formatUptime(upTime.value)} />
					</div>
				</div>
			</div>

			<div className="w-screen flex justify-evenly items-center">
				<Card
					icon={BubbleImage}
					title={attributes[0].key}
					body={attributes[0].value}
				/>
				<Card icon={BubbleImage} title={attributes[1].key} body={attributes[1].value} />
				<Card icon={BubbleImage} title={attributes[2].key} body={attributes[2].value} />
				<Card icon={BubbleImage} title={attributes[3].key} body={attributes[3].value} />
			</div>
		</>
	);
};

export default DashboardPage;
