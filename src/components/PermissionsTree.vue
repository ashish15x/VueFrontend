<template>
  <v-app>
    <v-main>
      <v-container>
        <v-treeview
          v-if="items.length"
          selectable
          hoverable
          :items="items"
          @input="updatePermissions"
          :value.sync="activeNodes"
        ></v-treeview>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      items: [],
      activeNodes: [],
    };
  },
  computed: {
    ...mapState(['permissions']),
  },
  watch: {
    permissions: 'showPermissions',
 
  },
  created() {
    this.fetchPermissions();
  },
  methods: {
    ...mapActions(['fetchPermissions']),
    
    showPermissions() {
      if (!this.permissions) return;
      this.items = Object.keys(this.permissions).map(role => ({
        name: role,
        id: role,
        children: Object.keys(this.permissions[role]).map(permission => ({
          name: this.permissions[role][permission].label,
          id: `${role}-${permission}`,
          isActive: this.permissions[role][permission].isActive
        }))
      }));
      this.setActiveNodes();
    },

    setActiveNodes() {
      this.activeNodes = [];
      for (const role in this.permissions) {
        for (const permission in this.permissions[role]) {
          if (this.permissions[role][permission].isActive) {
            this.activeNodes.push(`${role}-${permission}`);
          }
        }
      }
      console.log(this.activeNodes)
    },
    updatePermissions(){
      console.log("Option Triggered")
    }
  },
};
</script>
