interface IDeviceState {
	isConnected: boolean;
	ip: string;
	mac: string;
	machine: string;
	uptime: number;
	code: number;
	version: string;
}
interface MachineState {
	downtime: number;
	opCount: number;
	errCount: number;
	data: any;
}
