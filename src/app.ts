import *  as  readlineSync from 'readline-sync';
import  {  Casino  }  from  './casino' ;



let  casino  =  new  Casino ( "Las vegas" ,  20 ,  100 ) ;

console.log ( `Bienvenido al casino ${ casino . getName ( ) } ` ) ;

casino.login ( ) ;

let  ​​cantidadDeFichas  =  casino . getPlayer ( ) . getTokens ( ) ;
console.log( `Ud cuenta con ${ cantidadDeFichas } fichas actualmente. Necesita un minimo de 50 fichas para poder jugar` ) ;
let  buytokens  =  readlineSync . keyInYNStrict ( "¿Desea comprar fichas?" ) ;

if ( buytokens ) {
    casino.buyTokens ( ) ;
    console.log
     ( `Ud cuenta con ${ casino . getPlayer ( ) . getTokens ( ) } fichas` )
}

