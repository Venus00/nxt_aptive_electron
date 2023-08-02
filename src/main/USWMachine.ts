/* eslint-disable no-plusplus */
import { SerialPort } from 'serialport';
import { DelimiterParser } from '@serialport/parser-delimiter';
import { Timer } from 'timer-node';
import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

export enum EventType {
	ON_OP = 'on_op',
	ON_DATA = 'on_data',
	ON_FAIL = 'on_fail',
}

export class USWMachine {
	public isConnected: boolean;

	private port: SerialPort;

	private decoder: DelimiterParser | undefined;

	private path: string;

	private timer: Timer;

	public state: MachineState;

	private onEvent: (event: EventType, payload: any) => void;

	public constructor(
		portPath: string,
		onEventCallback: (event: EventType, payload: any) => void
	) {
		this.isConnected = false;
		this.path = portPath;
		this.onEvent = onEventCallback;
		this.timer = new Timer({ label: 'downtime' });
		this.timer.clear();
		this.timer.start();
		this.state = {
			data: {},
			errCount: 0,
			downtime: 0,
			opCount: 0,
		};

		this.port = new SerialPort(
			{
				path: this.path,
				baudRate: 115200,
				autoOpen: true,
			},
			(err) => {
				if (err) {
					throw new Error("Can't Open Serial Port");
				}
				console.log('Device Connected');
				this.isConnected = true;
				this.decoder = this.port.pipe(
					new DelimiterParser({
						delimiter: ['\n'.charCodeAt(0)],
					})
				);
				this.decoder.on('data', this.handleDeviceMessage.bind(this));
			}
		);

		setInterval(this.hearthBeat.bind(this), 1000);
	}

	public hearthBeat() {
		this.state.downtime = Math.floor(this.timer.ms() / 1000);
		this.onEvent(EventType.ON_DATA, this.state);
	}

	private async handleDeviceMessage(chunk: any) {
		const encodedPayload = chunk.toString();
		const decripted = await AES.decrypt(encodedPayload, 'NXT2022').toString(
			enc.Utf8
		);
		//console.log(decripted);
		const data = JSON.parse(decripted);
		//console.log(data);
		const res: any = {};
		for (let index = 0; index < data.payload.headers.length; index++) {
			const h = data.payload.headers[index];
			if (h.includes('\\') || h.includes('\\r') || h.includes('\\n')) {
				continue;
			} else {
				res[h] = data.payload.data[index];
			}
		}

		this.state.data = res;
		if (
			(res['Error'] && res['Error'] !== '') ||
			(res['Error no.'] && res['Error no.'] !== '200')
		) {
			this.onEvent(
				EventType.ON_FAIL,
				res['Error-Text'] ? res['Error-Text'] : res['Error text']
			);
			this.state.errCount += 1;
		} else {
			this.timer.stop();
			this.timer.clear();
			this.timer.start();
			this.state.downtime = 0;
			this.state.opCount += 1;
			this.onEvent(EventType.ON_OP, 'Operation DONE');
		}
		this.onEvent(EventType.ON_DATA, this.state);
	}
}
