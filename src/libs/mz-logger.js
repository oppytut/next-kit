import debug from 'debug';

const logger = logName => ({
	trace: debug(`${logName}:trace`),
	debug: debug(`${logName}:debug`),
	log: debug(`${logName}:log`),
	info: debug(`${logName}:info`),
	warn: debug(`${logName}:warn`),
	error: debug(`${logName}:error`)
});

export default logger;
