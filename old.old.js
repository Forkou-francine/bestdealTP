

/**
 * @typedef {Object} Forfait
 * @property {string} nom
 * @property {number} sms
 * @property {number} appels
 * @property {number} data
 * @property {number} prix
 * @property {number} duree 
 */

/**
 * @typedef {Object} Demande
 * @property {number} sms
 * @property {number} appels
 * @property {number} data
 * @property {number} price
 * @property {number} duree 
 */



/**
 * @param {Demande} data
 * @param {Array<Forfait>} forfait
 * @returns {Array<Forfait>}
 */
function BestOptions(data,forfait){
    let selectForfait = getForfait(data.price, forfait)
    let res = []
    selectForfait = selectForfait.sort((a,b) => {
         if(a.prix < b.prix){
             return 1
         }
         if(a.prix > b.prix){
             return -1
         }
         return 0
    })
    selectForfait.forEach((forf) => {
         if(forf.prix == data.price){
             res.push([forf])
         }else{
             let f = []
             let fp = []
             f.push(forf)
             selectForfait.forEach((it) => {
                 if(it != forf && (forf.prix + it.prix ) < data.price){
                     let i = 0
                     let s = sum(f)
                     while (s < data.price) {
                         
                     }
                 }else if(it != forf && (forf.prix + it.prix ) == data.price){
                     res.push([forf,it])
                 }
             })
         }
    })
 
    return res
 }
 
 /**
  * @param {Array<Forfait>} forfait
  * @returns {number}
  */
 function sum(forfait){
     let s = 0
     forfait.forEach((it) => s += it.prix)
     return s
 }
 
 /**
  * @param {Forfait} f
  * @param {Array<Forfait>} forfait
  * @returns {Array<any>}
  */
 function getCombinaison(f,forfait){
     let combinaison = []
 
 
     
 
     return combinaison
 }
 
 
 
 /**
  * @param {number} price
  * @param {Array<Forfait>} forfait
  * @returns {Array<Forfait>}
  */
 function getForfait(price,forfait){
     console.log(forfait)
     return forfait.filter((it) => it.prix <= price)
 }
 
 export {BestOptions}