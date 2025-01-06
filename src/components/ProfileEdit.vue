<template>
  <v-container fluid>
    <FormBuilder
      v-if="auth.userInformation !== null"
      :fields="formFields"
      :starting-data="auth.userInformation"
      @changed="(v)=>sendData=v"
      @update:valid="(v)=>valid=v"
      @update:information-matches="(v)=>informationMatches=v"
    />
    <v-toolbar color="transparent">
      <v-spacer />
      <v-btn
        :disabled="!valid || informationMatches"
        :loading="loading"
        color="primary"
        variant="elevated"
        @click="submit"
      >
        Submit
      </v-btn>
    </v-toolbar>
  </v-container>
</template>
<script lang="ts" setup>

import {email, maxLength, required, url} from "@vuelidate/validators";
import {useAuthStore} from "@/stores/auth";
import type {Blackboard, FieldConfig} from "@/components/FormBuilder.vue";
import {axiosInstance} from "@/plugins/axios";
import {removeNullValues} from "@/utils/objectUtils";
import {SendError, SendSuccess} from "@/plugins/sweetalert";

const auth = useAuthStore()
const informationMatches = ref(true)
const valid = ref(true)
const loading = ref(false)

const formFields: FieldConfig[] = [
  {
    key: "name",
    title: "Name",
    type: "text",
    required: true,
    limit: 32,
    rules: [required, maxLength(32)]
  },
  {
    key: "email",
    title: "Email",
    type: "text",
    required: true,
    limit: 32,
    rules: [required, email, maxLength(32)]
  },
  {
    key: "avatar",
    title: "Avatar",
    type: "text",
    required: true,
    limit: 256,
    rules: [url, maxLength(256)]
  }
]

const sendData = ref(undefined)

function submit() {
  // console.log(sendData)
  loading.value = true
  const dataToSend = sendData.value
  if (dataToSend !== undefined) {
    const newData = {...auth.userInformation, ...dataToSend as Blackboard};

    axiosInstance.post("/api/users/setUser", removeNullValues(newData)).then(async () => {
      await auth.fetchUser()
      loading.value = false
      await SendSuccess("User updated.")
    }).catch((err) => {
      loading.value = false
      SendError(err);
    })
  }
}


onMounted(() => {
  // userInformation.value = {...auth.userInformation as UserInformation};
  // originalUserInformation.value = {...auth.userInformation as UserInformation};
})

</script>
