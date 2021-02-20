var module 
module ??= {} 

{ 
/// 

let child_process = requireTemplate `child_process` 

let exports = {} 

function execTemplate( ... ar ) { 
	// with child_process 
	let command = rawValue( ... ar ) 
	child_process .exec( command ) 
	} // -- execTemplate() 
/// exec < child_process < nodejs https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback 
// execTemplate `start http://google.com` 

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
	( exports 
	, 
		{ execTemplate 
		, consoleTemplate 
		, requireTemplate 
		, rawValue 
		} 
	) // -- assign 
console .log( module ) 

/// 
} 
