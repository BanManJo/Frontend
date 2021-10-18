<template>
  <v-dialog v-model="alert.modal" max-width="400">
    <v-card>
      <br />
      <v-card-title>
        {{content}}
        <v-spacer />

        <v-icon aria-label="Close" @click="alert.modal = false">mdi-close</v-icon>
      </v-card-title>

      <v-card-text class="pb-6 pt-12 text-center">
        <v-btn class="mr-3" text @click="alert.modal = false">No</v-btn>
        <v-btn color="success" text @click="$emit('confirm')">Yes</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AlertDialog",
  props: {
    content: {
      type: String,
      default: "",
    },
    alert: {
      type: Object,
      default: {},
    },
    confirm: {
      type: Function,
      default: () => {
        return;
      },
    },
  },
};
</script>

<style>
</style>