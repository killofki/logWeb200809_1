{ 
/// 

consoleTemplate `require ..ing` 

let process = requireTemplate `process` 
let cp = requireTemplate `child_process` 
let fs = requireTemplate `fs` 

consoleTemplate `require ..d` 

// .. functions .. 

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