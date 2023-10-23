<template>
  <base-material-card
    :icon="clockIcon"
    :color="clockBgColor"
    class="v-card--material-stats"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:after-heading>
      <div class="ml-auto text-right">
        <div
          v-if="timeout"
          class="body-3 grey--text font-weight-light"
          v-text="'00:00'"
        />
        <div
          v-else
          class="body-3 grey--text font-weight-light"
          v-text="Duration"
        />

        <h3 class="display-2 font-weight-light text--primary">
          {{ value }}
          <br />
          <small>{{ price }}ETH</small>
        </h3>
      </div>
    </template>

    <v-col cols="12" class="px-0">
      <v-divider />
    </v-col>

    <!-- <v-btn icon>
      <v-icon :color="baseIconColor" size="16" class="ml-2 mr-1">
        {{ sunsalCheckBox }}</v-icon
      >
    </v-btn>-->
    <v-row no-gutters justify="space-between">
      <v-col cols="9" class="mr-auto">
        <v-icon :color="baseIconColor" size="16" class="ml-2 mr-1">{{
          sunsalCheckBox
        }}</v-icon>
        <span
          :class="subTextColor"
          class="grey--text font-weight-light"
          v-text="'순살'"
        />
        <div
          :class="subTextColor"
          class="black--text font-weight-regular display-1"
          v-text="'Room Title'"
        />
      </v-col>
      <v-col align="center" cols="3">
        <template v-if="timeout">
          <v-icon
            color="grey"
            size="36"
            class="ml-5 mr-0"
            v-text="'mdi-account-arrow-right'"
          />
        </template>
        <v-btn v-else :color="baseIconColor" dark icon>
          <v-icon
            :color="baseIconColor"
            size="36"
            class="ml-5 mr-0"
            v-text="'mdi-account-arrow-right'"
            @click="$emit('matchRoom', storeName, roomNumber, price)"
          />
        </v-btn>
      </v-col>
      <v-col cols="9">
        <span
          :class="subTextColor"
          class="caption grey--text font-weight-bold"
          v-text="description"
        />
      </v-col>
    </v-row>
  </base-material-card>
</template>

<script>
import Card from "./Card";

let timeInterval;

export default {
  name: "MaterialStatsCard",

  inheritAttrs: false,

  props: {
    ...Card.props,
    icon: {
      type: String,
      required: true
    },
    sunsalCheckBox: {
      type: String,
      default: undefined
    },
    baseIconColor: {
      type: String,
      default: undefined
    },
    subTextColor: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    duration: {
      type: Number,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    price: {
      type: String,
      default: undefined
    },
    matchRoom: {
      type: Function,
      default: undefined
    },
    storeName: {
      type: String,
      default: undefined
    },
    roomNumber: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      durationData: { timer: 0 }
    };
  },
  computed: {
    Duration() {
      const seconds = this.durationData.timer;
      return (
        Math.floor(seconds / 60) + ":" + (seconds % 60 ? seconds % 60 : "00")
      );
    },
    clockIcon() {
      if (this.timeout) {
        return "mdi-clock-remove-outline";
      }
      const minutes = Math.floor(this.durationData.timer / 60);
      return minutes >= 20
        ? "mdi-clock-time-five-outline"
        : minutes >= 5
        ? "mdi-clock-time-eight-outline"
        : "mdi-clock-time-eleven-outline";
    },
    clockBgColor() {
      if (this.timeout) {
        return "grey";
      }
      const minutes = Math.floor(this.durationData.timer / 60);
      return minutes >= 20 ? "green" : minutes >= 5 ? "orange" : "red";
    },
    timeout() {
      if (this.durationData.timer < 0) {
        clearInterval(timeInterval);
        return true;
      }
      return false;
    }
  },
  mounted() {
    console.log("================Created" + Math.floor(Date.now() / 1000));

    // set start timer
    this.durationData.timer = this.duration - Math.floor(Date.now() / 1000);
    console.log(this.Duration);
    // set timer interval
    timeInterval = setInterval(() => (this.durationData.timer -= 1), 1000);
  },
  beforeDestroy() {
    console.log("=============Destroyed" + timeInterval);
    clearInterval(timeInterval);
  }
};
</script>

<style lang="sass">
.v-card--material-stats
  display: flex
  flex-wrap: wrap
  position: relative

  > div:first-child
    justify-content: space-between

  .v-card
    border-radius: 4px
    flex: 0 1 auto

  .v-card__text
    display: inline-block
    flex: 1 0 calc(100% - 120px)
    position: absolute
    top: 0
    right: 0
    width: 100%

  .v-card__actions
    flex: 1 0 100%
</style>
