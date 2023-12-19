import GetDeliveryValueByDistanceUseCase from "./GetDeliveryValueByDistanceUseCase.js";

export default class GetDistanceBetweenTwoPointsUseCase {
    #distanceService
    constructor(distanceService){
        this.#distanceService = distanceService;
        this.getDeliveryValueByDistanceUseCase = new GetDeliveryValueByDistanceUseCase();
    }

    async execute(firstLat, firstLng, secondLat, secondLng){

        const resultService = await this.#distanceService.getDistance(firstLat, firstLng, secondLat, secondLng);
        
        const distanceInKm = resultService.distance;
        const deliveryFee = this.getDeliveryValueByDistanceUseCase.execute(distanceInKm);
        const durationInMinutes = resultService.duration;

        return {
            value: deliveryFee,
            distanceInKm,
            durationInMinutes,
          };
    }

}