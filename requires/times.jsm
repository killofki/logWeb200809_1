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
	, twosTemplate 
	} = templates 

// File system < nodejs https://nodejs.org/api/fs.html 
let fs = requireTemplate `fs` 
let { promises } = fs 

function openToday( ... ar ) { 
	let openName = rawValue( ... ar ) || 'logWeb' 
	
	let now = new Date() 
	let publishingDate = yymmdd( now ) 
	let publishingTime = hhmmss( now ) 
	
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
	} // -- getParsedDate() 

let dateFormat = new class { 
	dateStyle = 'short' 
	} // -- {} // -- dateFormat 

function yymmdd( dateValue ) { 
	let { year, month, day } = getParsedDate( dateValue, dateFormat ) 
	
	return twosTemplate `${ year }${ month }${ day }` 
	} // -- yymmdd() 

let timeFormat = new class { 
	timeStyle = 'medium' 
	// hour12 = false 
	hourCycle = 'h23' 
	} // -- {} // -- timeFormat 

function hhmmss( timeValue ) { 
	let { hour, minute, second } = getParsedDate( timeValue, timeFormat ) 
	
	return twosTemplate `${ hour }${ minute }${ second }` 
	} // -- hhmmsss() 

// exports 

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