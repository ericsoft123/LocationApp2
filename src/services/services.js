import axios from 'axios';
import {config} from '../config';

//export function search_venue(lat_value,lng_value){
export async function search_venue(lat_value,lng_value){
   
    //
          
    try {
               
  // var lat_value=-29.723338;        
    //var lng_value=31.063621;    
        const response= await axios.get(`${config.foursquare_url}/venues/search?`,{
              params:{
                client_id:config.foursquare_clientid,
                client_secret:config.foursquare_clientsecret,
                v:config.foursquare_v,
                 ll:lat_value+","+lng_value,//latitude and longitude value i.e -29.723338,31.063621
                intent:"browse",
                radius:config.radius_val,
                limit:config.limit_val,

         
              }
            });
       // console.log(response);
      return response;
    } catch (error) {
        console.log(error);
    }
    //

}
export function get_venue_photos(latitude,longitude){
    try {
           
        const response= axios.get(`${config.flickr_url}flickr.photos.search`,{
         params:{
            api_key:config.flickr_key,
           lat:latitude,
           lon:longitude,
           format:'json',
      nojsoncallback:'1',
         }
       });
  // console.log(response);
 return response;
} catch (error) {
   console.log(error);
}
       

}


export function get_coordinates(address){
    try {
        // var location='21 Main st Boston MA ';
         //var location=$('#autocomplete_location').val();
   // var location='109 Aldrovande Palace, 6 Jubilee Grove, Umhlanga Ridge, Durban';
   const response= axios.get(`${config.googleapi_url}/geocode/json?`,{
     params:{
       address:address,
       key:config.googleapi_key,
     }
   });
   // console.log(response);
   return response;
   } catch (error) {
    console.log(error);
   }
}
export const get_photo_detail=async(photo_id)=>{
//
try {
           
    const response= await axios.get(`${config.flickr_url}flickr.photos.getInfo`,{
          params:{
             api_key:config.flickr_key,
             photo_id:photo_id,
      
      format:'json',
       nojsoncallback:'1',
            
          }
        });
   // console.log(response);
  return response;
} catch (error) {
    console.log(error);
}
//

}