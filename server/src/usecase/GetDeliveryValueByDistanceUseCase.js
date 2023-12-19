
export default class GetDeliveryValueByDistance {
    constructor(){}

    // implementar regra de negocio para o valor da taxa...
    execute(distanceInKm){
        const valueByKm = 5
        const value = Math.floor(distanceInKm) * valueByKm
        return value;
    }
}