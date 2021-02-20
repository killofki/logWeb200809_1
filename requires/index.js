var module 
module ??= {} 

{ 
/// 

let exports = {} 
let path = require( 'path' ) 

// https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder 
for ( let name of require( 'fs' ) .readdirSync( path .join( __dirname ) ) ) { 
	let matching = name .match( /^(.*?)\.jsm$/ ) 
	if ( ! matching ) 
		{ continue } 
	let [, exportName ] = matching 
	let requirePath = path .join( __dirname, name ) 
	let value = require( requirePath ) 
	
	exports [ exportName ] = value 
	} // -- for of readdirSync 

Object .assign( module, { exports } ) 

/// 
} 
