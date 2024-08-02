<template>
  <v-app>
    <v-main>

      <v-container fluid>
        <v-row>
          <v-col cols="12" md="3">
            <NavigationDrawer />
          </v-col>
          <v-col cols="12" md="9">
            <TableComponent />
          </v-col>
         </v-row>
      </v-container> 

    </v-main>
  </v-app>
</template>

<script>

import NavigationDrawer from "./NavigationDrawer.vue";
import TableComponent from "./TableComponent.vue";

export default{
    components:{
        NavigationDrawer,TableComponent
    }
}


</script> 