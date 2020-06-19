<template>

   <div class="col-md-3">
       <h3>List of Address</h3>
                <ul class="list-group"  v-bind:key="locationitem.id" v-for="locationitem in location_result">
                        <li class="list-group-item">{{locationitem.location.formattedAddress.toString()}}</li>
                   
                  </ul>
              </div>
</template>

<script>
export default {
name:"DisplayLocation",
props:["location_result"]
}
</script>

<style>

</style>