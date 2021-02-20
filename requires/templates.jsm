var module ??= {} 

{ 
/// 

let exports = {} 

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

Object .assign( module, { exports } ) 

Object .assign 
	( module 
	, 
		{ execTemplate 
		, consoleTemplate 
		, requireTemplate 
		, rawValue 
		} 
	) // -- assign 

/// 
} 
