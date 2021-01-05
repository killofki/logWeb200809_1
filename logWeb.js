{ 
/// 

console .log( '... initializing ...' ) 

let process = requireTemplate `process` 
let child_process = requireTemplate `child_process` 
// File system < nodejs https://nodejs.org/api/fs.html 
let fs = requireTemplate `fs` 
let { promises } = fs 

consoleTemplate `require ..d 가힣 가 나 다 ` 

let locale = 'ko-kr' 

let [ openingFile, fileName ] = openToday `logWeb` 
console .log({ openingFile }) 

openingFile 
	.then( handle => { 
		console .log({ fileName }) 
		console .log( 'opened', handle ) 
		process .exit() 
		} ) // -- () // -- then 
	.catch( err => { 
		console .log( 'error', err ) 
		process .exit() 
		} ) // -- () // -- catch 
	// -- openingFile 

// exit < process < nodejs https://nodejs.org/api/process.html#process_process_exit_code 
// process .exit() 

/// exec < child_process < nodejs https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback 
// execTemplate `start http://google.com` 

// .. functions .. 

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

function getParsedDate( dateValue, dateFormat ) { 
	// with locale 
	let former = new Intl .DateTimeFormat( locale, dateFormat ) 
	let nowDateParts = former .formatToParts( dateValue ) 
	
	let typedValue = ({ type, value }) => ({ [ type ] : value }) 
	let reducedDate = Object .assign( ... nowDateParts .map( typedValue ) ) 
	
	return reducedDate 
	} // -- yymmdd() 

function yymmdd( dateValue ) { 
	let dateFormat = new class { 
		dateStyle = 'short' 
		} // -- {} // -- dateFormat 
	let { year, month, day } = getParsedDate( dateValue, dateFormat ) 
	
	let twos = v => `00${ v }` .slice( -2 ) 
	let [ yy, mm, dd ] = [ year, month, day ] .map( twos ) 
	
	return `${ yy }${ mm }${ dd }` 
	} // -- yymmdd() 

function hhmmss( timeValue ) { 
	let timeFormat = new class { 
		timeStyle = 'medium' 
		// hour12 = false 
		hourCycle = 'h23' 
		} // -- {} // -- timeFormat 
	let { hour, minute, second } = getParsedDate( timeValue, timeFormat ) 
	
	let twos = v => `00${ v }` .slice( -2 ) 
	let [ hh, mm, ss ] = [ hour, minute, second ] .map( twos ) 
	
	return `${ hh }${ mm }${ ss }` 
	} // -- hhmmsss() 

function execTemplate( ... ar ) { 
	// with child_process 
	let command = rawValue( ... ar ) 
	child_process .exec( command ) 
	} // -- execTemplate() 

function consoleTemplate( ... ar ) { 
	let t = rawValue( ... ar ) 
	console .log( t ) 
	// chcp 65001 on cmd https://stackoverflow.com/questions/10878731/utf8-console-log-output-using-node-js 
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