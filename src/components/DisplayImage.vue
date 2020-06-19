<template>
    

         <div class="col-md-9">
      
                <div id="imgviews" class="row" >

                        <div class="col-md-4" v-bind:key="photoitem.id" v-for="photoitem in photo_result">
                                <div class="card text-center">
                                        
                                <img :src="'https://farm' + photoitem.farm + '.staticflickr.com/' + photoitem.server + '/' + photoitem.id + '_' + photoitem.secret + '.jpg'" class="thumbnail responsive">
                                <h5 class="title">{{photoitem.title}}</h5>
                
                                <a class="btn btn-primary" href="javascript:void(0)" id="views"
                
                                v-on:click="photo_detail(photoitem.id)">view details</a>
                                
                            </div>	
                        </div>
                </div>
                    <!--Modal Display-->
                     <b-modal ref="viewModal" hide-footer v-bind:title='title'>
                     

            <div v-html="photoview_result">
               
                </div>
              
              
           
         
          <div class="modal-footer">
        
           
          </div>
        

    </b-modal>
                    <!--Modal Display-->
             </div>

         
    
</template>

<script>
import {get_photo_detail} from '../services/services';
export default {
    name:"DisplayImage",
    props:["photo_result"],
     components: {
    
   
  
   
   
  },

     data(){
 return{
     photoview_result:"",
      title:"",
 }

 },
  methods:{
           
    async photo_detail(photo_id)
    {
//
this.$refs['viewModal'].show();
 var response=await get_photo_detail(photo_id);
        //  console.log(response);
       this.farm=response.data.photo.farm;
		this.server=response.data.photo.server;
		this.secret=response.data.photo.secret;
        var url =`https://farm${this.farm}.staticflickr.com/${this.server}/${response.data.photo.id}_${this.secret}.jpg`
     
     this.$refs['viewModal'].show();
this.title="Full Details";
     this.photoview_result=`<div  class="row" >
			<div class="col-md-12 imgdata" >
                    <img src="${url}" />
				</div>
				
				<div class="col-md-12">
			
					<ul class="list-group">
						<li class="list-group-item"><strong>Name:</strong> <span >${response.data.photo.title._content}</span></li>
						<li class="list-group-item"><strong>Username:</strong> <span >${response.data.photo.owner.username}</span></li>
				        <li class="list-group-item"><strong>Location:</strong> <span >${response.data.photo.owner.location}</span></li>
						<li class="list-group-item"><strong>Photo ID:</strong> <span >${response.data.photo.id}</span></li>
						<li class="list-group-item"><strong>Photo Views:</strong> <span >${response.data.photo.views}</span></li>
						<li class="list-group-item"><strong>Date Taken:</strong> <span id="datetake">${response.data.photo.dates.taken}</span></li>
						<li class="list-group-item"><strong>Date Uploaded:</strong> <span id="dateupload">${response.data.photo.dateuploaded}</span></li>
						<li class="list-group-item"><strong>Photo Description:</strong> <span id="descr">${response.data.photo.description._content}</span></li>
						
					
					</ul>
				</div>
			</div>`;
    
//

    }
  }

}
</script>

<style>
 .title{
    overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 400px;
   }
   .imgdata img{
width: 100%;
   }
</style>