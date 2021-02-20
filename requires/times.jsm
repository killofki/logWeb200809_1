var module 
module ??= {} 

{ 
/// 

let exports = {} 

let locale = 'ko-kr' 

let templates = require( './templates.jsm' ) 

let 
	{ rawValue 
	, requireTemplate 
	} = templates 

// File system < nodejs https://nodejs.org/api/fs.html 
let fs = requireTemplate `fs` 
let { promises } = fs 

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
	
	let typedValue = ({ type, value }) => 
		({ [ type ] : value }) 
		// -- typedValue() 
	let reducedDate = Object .assign( ... nowDateParts .map( typedValue ) ) 
	
	return reducedDate 
	} // -- yymmdd() 

let twos = v => `00${ v }` .slice( -2 ) 

let dateFormat = new class { 
	dateStyle = 'short' 
	} // -- {} // -- dateFormat 

function yymmdd( dateValue ) { 
	let { year, month, day } = getParsedDate( dateValue, dateFormat ) 
	let [ yy, mm, dd ] = [ year, month, day ] .map( twos ) 
	
	return `${ yy }${ mm }${ dd }` 
	} // -- yymmdd() 

let timeFormat = new class { 
	timeStyle = 'medium' 
	// hour12 = false 
	hourCycle = 'h23' 
	} // -- {} // -- timeFormat 

function hhmmss( timeValue ) { 
	let { hour, minute, second } = getParsedDate( timeValue, timeFormat ) 
	let [ hh, mm, ss ] = [ hour, minute, second ] .map( twos ) 
	
	return `${ hh }${ mm }${ ss }` 
	} // -- hhmmsss() 

Object .assign( module, { exports } ) 
Object .assign 
	( exports 
	, 
		{ openToday 
		, getParsedDate 
		, yymmdd 
		, hhmmss 
		} 
	) // -- assign 

} 