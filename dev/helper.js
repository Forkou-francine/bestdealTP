

/**
 * @typedef {Object} Forfait
 * @property {string} nom
 * @property {number} valeur
 * @property {number} prix
 * @property {number} duree 
 */


/**
 * @param {number} prix
 * @param {number} duree
 * @param {Array<number>} priorite
 * @param {Array<any>} forfait
 * @returns {Array<Forfait>}
 */
function BestOptions(prix,priorite,duree,forfait){
    /**
     * @type number
     */
    let p = 0;
    /**
     * @type number
     */
    let i = 0;
    /**
     * @type number
     */
    let reste = 0;
    /**
     * @type number
     */
    let k = 0;
    /**
     * @type Array<Forfait>
     */
    let Rep = [];


    for (let i = 0; i < 3; i++) {
        p=priorite[i]+p;
    }

    while (Math.max(priorite[i]) > -1) {
        if( i>2){
            i = 0
        }
        if(Math.max(priorite) == priorite[i]){
            let f = F((priorite[i]/p)*prix + reste, forfait[i], Rep,reste,k)
            Rep = f.Rep; //La fonction F est écrite plus bas
            reste = f.reste;
            priorite[i]=-1;
            k=k+1;
        }
        i=i+1;
    }
	return Rep;
}


/**
 * @param {number} x
 * @param {number} k
 * @param {number} reste
 * @param {Array<Forfait>} opt
 * @param {Array<Forfait>} Rep
 * @returns {Object}
 */
function F(x,opt,Rep,reste,k){
    /**
     * @type number
     */
    let max = 0;
    /**
     * @type number
     */
    let M = 0;
    /**
     * @type Array<number>
     */
    let cache = [];
    /**
     * @type Forfait
     */
    let d;

    for (let j = 0; j < opt.length; j++) {
        if (opt[j].prix > x ) {
            reste = x
            return {Rep, reste}
        }else {
            if (cache[j]>0 ) {
                return cache[j];
            }else{
                cache[j]=F(x-opt[j].prix, opt,Rep,reste,k);
	            M=opt[j].valeur+cache[j];
                if (max < M) {
                    max=M;
                    d.prix = opt[j].prix
                    d.valeur = opt[j].valeur
                    d.duree = opt[j].duree
                    d.nom = opt[j].nom
                }
            }
        }
        
    }
    console.log("test " , d)
    Rep[k].prix = d.prix
    Rep[k].valeur = d.valeur
    Rep[k].duree = d.duree
    Rep[k].nom = d.nom
	return {Rep, reste};
}

/**
 * @param {Array<any>} forfaitJson
 * @returns {Array<any>}
 */
function createForfait(forfaitJson){
    let sms = []
    let appels = []
    let data = []

    for (const forfait of forfaitJson) {
        let d = {
            nom: forfait.nom,
            prix: forfait.prix,
            duree: forfait.validite
        }
        sms.push({...d, valeur: forfait.sms})
        appels.push({...d, valeur: forfait.appels})
        data.push({...d, valeur: forfait.data})
    }

    return [sms,appels,data]
}

export {BestOptions,createForfait}