<template>
    <v-app>
        <v-content>
            <v-container style="padding:0px;" fluid>
                <router-view>
                    <!-- <v-container fluid></v-container> -->
                </router-view>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>

export default {
    name: 'app',
    data: () => ({
    }),
    computed: {
      // watch: {
      //
      // },
      // methods: {
      //
      //     },
    },
    mounted() {
    }
}
</script>
