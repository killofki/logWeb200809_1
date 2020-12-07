{ 
/// 

console .log( '... initializing ...' ) 

let process = requireTemplate `process` 
let cp = requireTemplate `child_process` 
// File system < nodejs https://nodejs.org/api/fs.html 
let fs = requireTemplate `fs` 
let pfs = fs .promises 

consoleTemplate `require ..d 가힣 가 나 다 ` 

let locale = 'ko-kr' 

let now = new Date() 
let publishingDate = yymmdd( now ) 
let publishingTime = hhmmss( now ) 

console .log({ publishingDate, publishingTime }) 

let publishingFilename = `logWeb${ publishingDate }_${ publishingTime }.txt` 

/// openSync < fs < nodejs 
let openLogFile = pfs .open( publishingFilename, 'a+' ) 

console .log({ openLogFile }) 

openLogFile 
	.then( handle => { 
		console .log({ publishingFilename }) 
		console .log( 'opened', handle ) 
		process .exit() 
		} ) // -- () // -- then 
	.catch( err => { 
		console .log( 'error', err ) 
		process .exit() 
		} ) // -- () // -- catch 

// exit < process < nodejs https://nodejs.org/api/process.html#process_process_exit_code 
// process .exit() 

/// exec < child_process < nodejs https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback 
// execTemplate `start http://google.com` 

// .. functions .. 

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
	// with cp 
	let command = rawValue( ... ar ) 
	cp .exec( command ) 
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