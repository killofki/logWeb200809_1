{ 
/// 

let 
	{ templates 
	, times 
	} = require( './requires' ) 

let 
	{ consoleTemplate 
	, requireTemplate 
	} = templates 

let { openToday } = times 

consoleTemplate `... initializing ...` 

let process = requireTemplate `process` 

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

/// 
}