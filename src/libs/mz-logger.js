import debug from 'debug';

export default function logger(logName) {
	return {
		trace: debug(`${logName}:trace`),
		debug: debug(`${logName}:debug`),
		log: debug(`${logName}:log`),
		info: debug(`${logName}:info`),
		warn: debug(`${logName}:warn`),
		error: debug(`${logName}:error`)
	};
}
