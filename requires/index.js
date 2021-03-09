var module 
module ??= {} 

{ 
/// 

let fs = require( 'fs' ) 
let path = require( 'path' ) 

let templates = require( './templates' ) 
let { rawValue } = templates 

// https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder 

function folderRequire( ... ar ) { 
	let t = rawValue( ... ar ) 
	
	return require( path .join( __dirname, t ) ) 
	} // -- folderRequire() 

let get = ( F, p ) => folderRequire( p ) 

let exports = new Proxy( folderRequire, { get } ) 

Object .assign( module, { exports } ) 

/// 
} 
