<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <!--      <v-img-->
      <!--        class="mb-4"-->
      <!--        height="150"-->
      <!--        src="@/assets/logo.png"-->
      <!--      />-->

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

        <h1 class="text-h2 font-weight-bold">The Ranch</h1>
      </div>

      <div class="py-4" />
      <h2 class="text-h4 font-weight-regular">Your Checklist
:</h2>
      <div class="py-2" />
      <v-row>
        <v-col cols="12">
          <v-card
            class="py-4"
            color="surface-variant"

            prepend-icon="mdi-rocket-launch-outline"
            rounded="lg"
            variant="outlined"
          >


            <template #title>
              <h2 class="text-h5 font-weight-bold">Check In</h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
             We're so glad your here! Let's get you checked in.
              </div>
            </template>

            <template #append>
              <v-btn  color="primary" to="/nearby">Check In</v-btn>
            </template>



          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card
            class="py-4"
            color="surface-variant"

            prepend-icon="mdi-invoice-list-outline"
            rounded="lg"
            variant="outlined"
          >


            <template #title>
              <h2 class="text-h5 font-weight-bold">House Rules</h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
                Take a look at the house rules!
              </div>
            </template>
            <template #append>
              <v-btn
                color="primary"
                to="/guides/houseRules"

                width="204"
              >
                House Rules
              </v-btn>
            </template>



          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card
            class="py-4"
            color="surface-variant"

            prepend-icon="mdi-wifi"
            rounded="lg"
            variant="outlined"
          >


            <template #title>
              <h2 class="text-h5 font-weight-bold">Wi-Fi</h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
                Hell yeah! There's Wi-Fi! Scan the QR code with your iOS or Android phone to join
              </div>
            </template>

            <template #text>
              <v-img src="https://i.imgur.com/46y7MTw.png" width="120px">
              </v-img>

            </template>
            <template #append>
              <v-menu>
                <template v-slot:activator="{ props }">

                  <v-btn  v-bind="props" color="primary">Wifi Credentials</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    Wifi Information
                  </v-card-title>
                  <v-card-text>
                    Wifi Name: The Ranch <br/>
                    Password: VIEWS4DAYS
                  </v-card-text>

                </v-card>
              </v-menu>


            </template>



          </v-card>
        </v-col>
<!--        <v-col cols="6">-->
<!--          <v-card-->
<!--            append-icon="mdi-open-in-new"-->
<!--            class="py-4"-->
<!--            color="surface-variant"-->
<!--            href="https://vuetifyjs.com/"-->
<!--            prepend-icon="mdi-text-box-outline"-->
<!--            rel="noopener noreferrer"-->
<!--            rounded="lg"-->
<!--            subtitle="Learn about all things Vuetify in our documentation."-->
<!--            target="_blank"-->
<!--            title="Documentation"-->
<!--            variant="text"-->
<!--          >-->
<!--            <v-overlay-->
<!--              opacity=".06"-->
<!--              scrim="primary"-->
<!--              contained-->
<!--              model-value-->
<!--              persistent-->
<!--            />-->
<!--          </v-card>-->
<!--        </v-col>-->

<!--        <v-col cols="6">-->
<!--          <v-card-->
<!--            append-icon="mdi-open-in-new"-->
<!--            class="py-4"-->
<!--            color="surface-variant"-->
<!--            href="https://vuetifyjs.com/introduction/why-vuetify/#feature-guides"-->
<!--            prepend-icon="mdi-star-circle-outline"-->
<!--            rel="noopener noreferrer"-->
<!--            rounded="lg"-->
<!--            subtitle="Explore available framework Features."-->
<!--            target="_blank"-->
<!--            title="Features"-->
<!--            variant="text"-->
<!--          >-->
<!--            <v-overlay-->
<!--              opacity=".06"-->
<!--              scrim="primary"-->
<!--              contained-->
<!--              model-value-->
<!--              persistent-->
<!--            />-->
<!--          </v-card>-->
<!--        </v-col>-->

<!--        <v-col cols="6">-->
<!--          <v-card-->
<!--            append-icon="mdi-open-in-new"-->
<!--            class="py-4"-->
<!--            color="surface-variant"-->
<!--            href="https://vuetifyjs.com/components/all"-->
<!--            prepend-icon="mdi-widgets-outline"-->
<!--            rel="noopener noreferrer"-->
<!--            rounded="lg"-->
<!--            subtitle="Discover components in the API Explorer."-->
<!--            target="_blank"-->
<!--            title="Components"-->
<!--            variant="text"-->
<!--          >-->
<!--            <v-overlay-->
<!--              opacity=".06"-->
<!--              scrim="primary"-->
<!--              contained-->
<!--              model-value-->
<!--              persistent-->
<!--            />-->
<!--          </v-card>-->
<!--        </v-col>-->

<!--        <v-col cols="6">-->
<!--          <v-card-->
<!--            append-icon="mdi-open-in-new"-->
<!--            class="py-4"-->
<!--            color="surface-variant"-->
<!--            href="https://discord.vuetifyjs.com"-->
<!--            prepend-icon="mdi-account-group-outline"-->
<!--            rel="noopener noreferrer"-->
<!--            rounded="lg"-->
<!--            subtitle="Connect with Vuetify developers."-->
<!--            target="_blank"-->
<!--            title="Community"-->
<!--            variant="text"-->
<!--          >-->
<!--            <v-overlay-->
<!--              opacity=".06"-->
<!--              scrim="primary"-->
<!--              contained-->
<!--              model-value-->
<!--              persistent-->
<!--            />-->
<!--          </v-card>-->
<!--        </v-col>-->
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
//

</script>
