const { openAIClient, promptForgeParser } = require( '../index' );
const path = require('path');

const log = (type, message) => {
    switch( type ) {
        case 'prompt':
            console.log("\n/* prompt: \n", message.split(/\n/).map(line => "\t" + line).join("\n") + "\n*/");
            return message;
            break;
        case 'response':
            console.log( message.split( /\n/ ).filter( line => line.length ).join( "\n" ) );
            return message;
            break;
        default:
            console.error('unknown type', {type, message});
    }
};

promptForgeParser(
    path.resolve( __dirname, '../promptforge-templates/generic-cypress-end-to-end-test/prompt.txt'),
    {
        entryPoint: "www.example.com"
    }
)
    .then(prompt => log( 'prompt', prompt ) )
    .then(openAIClient)
    .then( response => log( 'response', response ) );