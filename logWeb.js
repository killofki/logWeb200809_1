{ 
/// 

let 
	{ templates 
	, times 
	} = require( './requires' ) 

let 
	{ execTemplate 
	, consoleTemplate 
	, requireTemplate 
	, rawValue 
	} = templates 

let 
	{ getParsedDate 
	, yymmdd 
	, hhmmss 
	} = times 

consoleTemplate `... initializing ...` 

let process = requireTemplate `process` 

// File system < nodejs https://nodejs.org/api/fs.html 
let fs = requireTemplate `fs` 
let { promises } = fs 

consoleTemplate `require ..d 가힣 가 나 다 ` 

let [ openingFile, fileName ] = openToday `logWeb` 
console .log({ openingFile }) 

openingFile 
	.then( onOpened ) 
	.catch( aboutError ) 
	// -- openingFile 

// exit < process < nodejs https://nodejs.org/api/process.html#process_process_exit_code 
// process .exit() 

// .. functions .. 

function onOpened( handle ) { 
	console .log({ fileName }) 
	console .log( '<opened>', handle ) 
	handle .appendFile( '가힣' ) 
	process .exit() 
	} // -- onOpened() 

function aboutError( err ) { 
	console .log( '!!!error!!!', err ) 
	process .exit() 
	} // -- aboutError() 

function openToday( ... ar ) { 
	let openName = rawValue( ... ar ) || 'logWeb' 
	
	let now = new Date() 
	let publishingDate = yymmdd( now ) 
	let publishingTime = hhmmss( now ) 
	
	console .log( 'openToday()', { publishingDate, publishingTime } ) 
	
	let publishingFilename = `logWeb${ publishingDate }_${ publishingTime }.txt` 
	
	/// openSync < fs < nodejs 
	let openLogFile = promises .open( publishingFilename, 'a+' ) 
	
	return [ openLogFile, publishingFilename ] 
	} // -- openToday() 

// DateTimeFormat < Intl https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat 
// formatToParts < dateTimeFormat < Intl https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts 

/// 
}