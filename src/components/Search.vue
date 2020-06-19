<template>
  <div>


      <!--search-->
  <div class="container">
    
   <div class="form-group">
         <button class="btn btn-danger" v-on:click="search_bycurrentLoc()">Search By Current Location</button>
   </div>
    <div class="input-group" id="indexv">
            
  <vue-google-autocomplete
            ref="address"
            id="map"
            classname="form-control"
            placeholder="Please type your address"
            v-on:placechanged="getAddressData"
            
        >
        </vue-google-autocomplete>
            <div class="input-group-btn">
                <button tabindex="-1" class="btn btn-primary" type="button" id="searchb"  data-target="#myModal" v-on:click="search_byname()"><i class="fa fa-search">search By Name</i></button>
               
               
            </div>
            </div>
    </div>
    <br>
	<!--search-->	
       <h1>Search Location {{search}}</h1>
      <div class="row">
      <DisplayLocation :location_result="location_result"/>
      <DisplayImage :photo_result="photo_result"/>
       </div>
       
     
     
  </div>
</template>

<script>
 import VueGoogleAutocomplete from 'vue-google-autocomplete'
import DisplayLocation from './DisplayLocation';
import DisplayImage from './DisplayImage';
import {get_coordinates,search_venue,get_venue_photos} from '../services/services';//this is where there is a lot of logic
export default {
name:"Search",

 components: {
    
     DisplayLocation,
     DisplayImage,
     VueGoogleAutocomplete

},
data(){
return{
  msg:"",
  location_result:[],
  photo_result:[],
  search:"",
   
}
 },
 mounted() {
            // To demonstrate functionality of exposed component functions
            // Here we make focus on the user input
            this.$refs.address.focus();
        },
methods:{
 getAddressData: function (addressData) {
                this.address = addressData;
               
            },
  async search_bycurrentLoc(){
      this.$getLocation({})
  .then(coordinates => {
    console.log(coordinates);

 search_venue(coordinates.lat,coordinates.lng).then(response => {

    
this.main_search(response);
  });

  });
  },
 async search_byname(){
   
   
console.log(this.address);
if(this.latitude!="undefined"){//searchby latitude and longitude
 var responsedata=await search_venue(this.address.latitude,this.address.longitude);//

this.main_search(responsedata);
}
else{//search by name
//console.log(this.$refs.address.$refs.autocomplete.value);
var coordinates=await get_coordinates(this.$refs.address.$refs.autocomplete.value);//this function accept address from search input
         var response=await search_venue(coordinates.data.results[0].geometry.location.lat,coordinates.data.results[0].geometry.location.lng);

this.main_search(response);
}


 
     
     
    
},
async main_search(response){
var venue_data=response.data.response.venues;
        this.location_result=venue_data;//send location to display location component
//console.log(venue_data);
       

 for(var i=0;i<venue_data.length;i++)
        {

           
            var response_photo=await get_venue_photos(venue_data[i].location.lat,venue_data[i].location.lng);
        
     
     
  
     
    this.photo_result=response_photo.data.photos.photo;//send photo data to display component as props

        
        }

//
      
}

}
}
</script>

<style>

</style>
