var module 
module ??= {} 

{ 
/// 

let child_process = require( 'child_process' ) 

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

function rawValue( ... ar ) { 
	let [ rawo ] = ar 
	return rawo ?.raw ? String .raw( ... ar ) 
		: rawo 
	} // -- rawValue() 

function twosTemplate( ... ar ) { 
	let [ rawo, ... others ] = ar 
	let toTwo = others .map( t => `00${ t }` .slice( -2 ) ) 
	return rawo ?.raw ? String .raw( rawo, ... toTwo ) 
		: `00${ rawo }` .slice( -2 ) 
	} // -- twosTemplate() 

Object .assign( module, { exports } ) 

Object .assign 
	( exports 
	, 
		{ execTemplate 
		, consoleTemplate 
		, rawValue 
		, twosTemplate 
		} 
	) // -- assign 

/// 
} 
