{ 
/// 

console .log( '... initializing ...' ) 

let process = requireTemplate `process` 
let cp = requireTemplate `child_process` 
let fs = requireTemplate `fs` 

// TextEncoder https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder 
// TextDecoder https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder 
let encoder = new TextEncoder() 
let decoder = new TextDecoder( 'euc-kr' ) 

console .log( decoder .encoding ) 
console .log( decoder .decoding ) 

consoleTemplate `require ..d 가힣 ` 

console .log( decoder .decoding ) 

let locale = 'ko-kr' 

let now = new Date() 
let publishingDate = yymmdd( now ) 
let publishingTime = hhmmss( now ) 

console .log({ publishingDate, publishingTime }) 

let publishingFilenmae = `logWeb${ publishingDate }_${ publishingTime }` 

// exit < process < nodejs https://nodejs.org/api/process.html#process_process_exit_code 
// process .exit() 

/// exec < child_process < nodejs https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback 
// execTemplate `start http://google.com` 

// .. functions .. 

// DateTimeFormat < Intl https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat 
// formatToParts < dateTimeFormat < Intl https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts 

function yymmdd( dateValue ) { 
	let dateFormat = new class { 
		dateStyle = 'short' 
		} // -- {} // -- dateFormat 
	let nowDateParts = new Intl .DateTimeFormat( locale, dateFormat ) .formatToParts( now ) 
	let y, m, d 
	
	for ( let { type, value } of nowDateParts ) { 
		switch( true ) { 
			case type === 'year' : 
				y = value 
				break 
			case type === 'month' : 
				m = value 
				break 
			case type === 'day' : 
				d = value 
				break 
			} // -- switch true 
		} // -- for of nowDateParts 
	let twos = v => `00${ v }` .slice( -2 ) 
	let [ yy, mm, dd ] = [ y, m, d ] .map( twos ) 
	
	return `${ yy }${ mm }${ dd }` 
	} // -- yymmdd() 

function hhmmss( timeValue ) { 
	let timeFormat = new class { 
		timeStyle = 'medium' 
		// hour12 = false 
		hourCycle = 'h23' 
		} // -- {} // -- timeFormat 
	let nowTimeParts = new Intl .DateTimeFormat( locale, timeFormat ) .formatToParts( now ) 
	let h, m, s 
	
	for ( let { type, value } of nowTimeParts ) { 
		switch( true ) { 
			case type === 'hour' : 
				h = value 
				break 
			case type === 'minute' : 
				m = value 
				break 
			case type === 'second' : 
				s = value 
				break 
			} // -- switch true 
		} // -- for of nowTimeParts 
	let twos = v => `00${ v }` .slice( -2 ) 
	let [ hh, mm, ss ] = [ h, m, s ] .map( twos ) 
	
	return `${ hh }${ mm }${ ss }` 
	} // -- hhmmsss() 

function execTemplate( ... ar ) { 
	// with cp 
	let command = rawValue( ... ar ) 
	cp .exec( command ) 
	} // -- execTemplate() 

function consoleTemplate( ... ar ) { 
	let t = rawValue( ... ar ) 
	let et = encoder .encode( t ) 
	let dt = decoder .decode( et ) 
	console .log( et ) 
	console .log( t, dt, encodeURI( dt ) ) 
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