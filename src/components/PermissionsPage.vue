<template>
  <v-app>
    <v-main>

      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6">
            <NavigationDrawer />
          </v-col>
          <v-col cols="12" md="6">
            <PermissionsTree/>
          </v-col>
         </v-row>
      </v-container> 

    </v-main>
  </v-app>
</template>

<script>

import NavigationDrawer from "./NavigationDrawer.vue";
import PermissionsTree from "./PermissionsTree.vue";


export default{
    components:{
        NavigationDrawer,PermissionsTree
    }
}


</script> 