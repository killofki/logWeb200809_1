var module 
module ??= {} 

{ 
/// 

let exports = {} 

let locale = 'ko-kr' 

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

Object .assign( module, { exports } ) 
Object .assign 
	( exports 
	, 
		{ getParsedDate 
		, yymmdd 
		, hhmmss 
		} 
	) // -- assign 

} 