<template>
  <v-app
    style="background-color: #232323; background-image: url('https://i.imgur.com/dgkQvJf.jpeg');  background-repeat: no-repeat;
  background-size: cover; "
  >
    <DefaultAppBar />
    <NavBar />
    <v-main>
      <v-container class="fill-height">
        <v-responsive
          class="align-center fill-height mx-auto "
          max-width="900"
        >
          <v-img
            class="mb-4"
            height="150"
            src="@/assets/KatalystRanch_LogoWhite.webp"
          />

          <v-card
            class="align-center fill-height mx-auto "
            max-width="400"
            variant="elevated"
          >
            <v-card-text class="my-4">
              <div class="text-center">
                <div class="text-body-2 font-weight-light mb-n1">
                  Welcome to
                </div>

                <h1 class="text-h2 font-weight-bold">
                  The Ranch
                </h1>
                <br>
                <div class="text-h4">
                  {{ currentTime.toDateString() }}
                </div>
                <div class="text-h6 font-weight-light">
                  {{ currentTime.toLocaleTimeString() }}
                </div>

                <br>


                <div
                  v-if="currentReservation"
                  class="text-h4 font-weight-bold"
                >
                  {{ currentReservation?.Name }}
                </div>
                <div
                  v-if="currentReservation"
                  class="text-h6 font-weight-light"
                >
                  Party of
                  {{ (parseInt(currentReservation?.Adults) + parseInt(currentReservation?.Children)) }}
                </div>
                <!--        <div v-if="currentReservation" class="text-h5 font-weight-regular">Checkout on {{weekdayMap[currentReservation?.CheckOut.dayOfWeek()]}} </div>-->


                <div
                  v-if="currentReservation"
                  class="text-h5 font-weight-regular"
                >
                  Checkout:
                  {{ formatRelative(new Date(currentReservation.CheckOut * 1000), new Date(Date.now())) }}
                </div>
              </div>
            </v-card-text>
          </v-card>


          <div class="py-4" />
          <!--      <h2 class="text-h4 font-weight-regular">Your Checklist-->
          <!--:</h2>-->
          <div class="py-2" />
          <!--        <v-row>-->
          <!--          <v-col cols="12">-->
          <!--            <v-card-->
          <!--              class="py-4"-->
          <!--              color="surface-variant"-->

          <!--              prepend-icon="mdi-rocket-launch-outline"-->
          <!--              rounded="lg"-->
          <!--              variant="outlined"-->
          <!--            >-->
          <!--              <template #title>-->
          <!--                <h2 class="text-h5 font-weight-bold">-->
          <!--                  Check In-->
          <!--                </h2>-->
          <!--              </template>-->

          <!--              <template #subtitle>-->
          <!--                <div class="text-subtitle-1">-->
          <!--                  We're so glad your here! Let's get you checked in.-->
          <!--                </div>-->
          <!--              </template>-->

          <!--              <template #append>-->
          <!--                <v-btn-->
          <!--                  color="primary"-->
          <!--                  @click="checkIn"-->
          <!--                >-->
          <!--                  Check In-->
          <!--                </v-btn>-->
          <!--              </template>-->
          <!--            </v-card>-->
          <!--          </v-col>-->

          <!--          <v-col cols="12">-->
          <!--            <v-card-->
          <!--              class="py-4"-->
          <!--              color="surface-variant"-->

          <!--              prepend-icon="mdi-invoice-list-outline"-->
          <!--              rounded="lg"-->
          <!--              variant="outlined"-->
          <!--            >-->
          <!--              <template #title>-->
          <!--                <h2 class="text-h5 font-weight-bold">-->
          <!--                  House Rules-->
          <!--                </h2>-->
          <!--              </template>-->

          <!--              <template #subtitle>-->
          <!--                <div class="text-subtitle-1">-->
          <!--                  Take a look at the house rules!-->
          <!--                </div>-->
          <!--              </template>-->
          <!--              <template #append>-->
          <!--                <v-btn-->
          <!--                  color="primary"-->
          <!--                  to="/guides/houseRules"-->

          <!--                  width="204"-->
          <!--                >-->
          <!--                  House Rules-->
          <!--                </v-btn>-->
          <!--              </template>-->
          <!--            </v-card>-->
          <!--          </v-col>-->
          <!--          <v-col cols="12">-->
          <!--            <v-card-->
          <!--              class="py-4"-->
          <!--              color="surface-variant"-->

          <!--              prepend-icon="mdi-wifi"-->
          <!--              rounded="lg"-->
          <!--              variant="outlined"-->
          <!--            >-->
          <!--              <template #title>-->
          <!--                <h2 class="text-h5 font-weight-bold">-->
          <!--                  Wi-Fi-->
          <!--                </h2>-->
          <!--              </template>-->

          <!--              <template #subtitle>-->
          <!--                <div class="text-subtitle-1">-->
          <!--                  Hell yeah! There's Wi-Fi! Scan the QR code with your iOS or Android phone to join-->
          <!--                </div>-->
          <!--              </template>-->

          <!--              <template #text>-->
          <!--                <v-img-->
          <!--                  src="https://i.imgur.com/46y7MTw.png"-->
          <!--                  width="120px"-->
          <!--                />-->
          <!--              </template>-->
          <!--              <template #append>-->
          <!--                <v-menu>-->
          <!--                  <template #activator="{ props }">-->
          <!--                    <v-btn-->
          <!--                      color="primary"-->
          <!--                      v-bind="props"-->
          <!--                    >-->
          <!--                      Wifi Credentials-->
          <!--                    </v-btn>-->
          <!--                  </template>-->
          <!--                  <v-card>-->
          <!--                    <v-card-title>-->
          <!--                      Wifi Information-->
          <!--                    </v-card-title>-->
          <!--                    <v-card-text>-->
          <!--                      Wifi Name: The Ranch <br>-->
          <!--                      Password: VIEWS4DAYS-->
          <!--                    </v-card-text>-->
          <!--                  </v-card>-->
          <!--                </v-menu>-->
          <!--              </template>-->
          <!--            </v-card>-->
          <!--          </v-col>-->
          <!--        </v-row>-->
        </v-responsive>
      </v-container>
      <!--  <Winter style="width: 100vw; height: 100vh; z-index:-1" />-->
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
//
import {formatRelative} from "date-fns";
//
//
import {useCurrentTime} from "./../../../hooks/useCurrentTime"
import {useCurrentReservation} from "./../../../hooks/useCurrentReservation";

const {currentTime} = useCurrentTime();
const {currentReservation} = useCurrentReservation();


async function checkIn() {


}


const weekdayMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

function getWeekday(date: Date) {
  const weekday = date.getDay() as number
  const now = new Date(Date.now())
  if (weekday == now.getDay()) {
    return "Today"
  }
  if (weekday - 1 == now.getDay()) {
    return "Tomorrow"
  }
  return weekdayMap[date.getDay() as number] as string;
}

const date = computed(() => {
  const now = new Date();
  return now.toDateString()
})
const time = computed(() => {
  const now = new Date();
  return now.toTimeString()
})

</script>
