{ 
/// 

consoleTemplate `require ..ing 가나 ` 

let process = requireTemplate `process` 
let cp = requireTemplate `child_process` 
let fs = requireTemplate `fs` 

consoleTemplate `require ..d 가힣 ` 

let locale = 'ko-kr' 

let now = new Date() 
let nowDateParts = yymmdd( now ) 
let nowTimeParts = hhmmss( now ) 

console .log( nowDateParts, nowTimeParts ) 

// DateTimeFormat < Intl https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat 
// formatToParts < dateTimeFormat < Intl https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts 

function yymmdd( dateValue ) { 
	let dateFormat = new class { 
		dateStyle = 'short' 
		} // -- {} // -- dateFormat 
	let nowDateParts = new Intl .DateTimeFormat( locale, dateFormat ) .formatToParts( now ) 
	
	return nowDateParts 
	} // -- yymmdd() 

function hhmmss( timeValue ) { 
	let timeFormat = new class { 
		timeStyle = 'medium' 
		// hour12 = false 
		hourCycle = 'h23' 
		} // -- {} // -- timeFormat 
	let nowTimeParts = new Intl .DateTimeFormat( locale, timeFormat ) .formatToParts( now ) 
	
	return nowTimeParts 
	} // -- hhmmsss() 

// exit < process < nodejs https://nodejs.org/api/process.html#process_process_exit_code 
// process .exit() 

/// exec < child_process < nodejs https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback 
// execTemplate `start http://google.com` 

// .. functions .. 

function execTemplate( ... ar ) { 
	// with cp 
	let command = rawValue( ... ar ) 
	cp .exec( command ) 
	} // -- execTemplate() 

function consoleTemplate( ... ar ) { 
	let t = rawValue( ... ar ) 
	console .log( t ) 
	} // -- consoleTemplate() 

function requireTemplate( ... ar ) { 
	let filename = rawValue( ... ar ) 
	return require( filename ) 
	} // -- requireTemplate() 

function rawValue( ... ar ) { 
	let [ rawo ] = ar 
	return rawo ?.raw ? String .raw( ... ar ) 
		: rawo 
	} // -- rawValue() 

/// 
}