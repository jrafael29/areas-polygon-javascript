import config from './config.js'

const targetHost = config.SERVER_HOST
export default {
    StorePolygon: function(){
      return `${targetHost}/store-polygon-with-values`
    },
    GetPolygonAreas: function(){
      return `${targetHost}/get-polygons-with-values`
    },
    DeletePolygonArea: function(id){
      return `${targetHost}/delete-polygon/${id}`
    },
    UpdatePolygonAreaValues: function(id){
      return `${targetHost}/update-polygon-values/${id}`
    },
    UpdatePolygonCoordinates: function(id){
      return `${targetHost}/update-polygon-coordinate/${id}`
    },
    CheckPolygonArea: function(){
      return `${targetHost}/check-polygon-area`
    },
    CheckDistance: function(){
      return `${targetHost}/check-distance`
    }
  }