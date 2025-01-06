<template>
  <v-form
    ref="form"
  >
    <v-row
      v-for="(field,indexKey) in props.fields"
      :key="indexKey"
      no-gutters
    >
      <v-col cols="auto">
        <v-label
          :for="field.key"
          :text="field.title"
          class="pt-2 pr-6 opacity-100 "
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-text-field
          :key="field.key"
          v-model="blackboard[field.key]"
          :counter="field.limit"
          :error-messages="v$[field.key].$errors.map(e => e.$message)"

          bg-color="backgroundGrey"
          density="compact"
          variant="outlined"
          @blur="v$[field.key].$touch"
          @input="v$[field.key].$touch"
          @update:model-value="formUpdate"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";

export interface Blackboard {
  [key: string]: string | number | boolean | undefined;
}

export interface FormProps {
  fields: FieldConfig[],
  informationMatches?: boolean,
  valid?: boolean,
  startingData?: Blackboard,
  returnDifferences?: boolean
}

export interface FieldConfig {
  key: string;
  title: string;
  type: "text" | "email" | "password";
  rules?: {},
  required?: boolean;
  limit?: number;
}

const props = withDefaults(defineProps<FormProps>(), {
  returnDifferences: true,
  startingData: () => {
    return {}
  },

})
const blackboard = reactive<Blackboard>({});
const formRules = reactive(Object.fromEntries(Object.entries(props.fields).map(([key, field]) => [field.key, Object.values(field.rules ?? [])])))
const v$ = useVuelidate(formRules, blackboard)

const emit = defineEmits(["changed", "update:informationMatches", "update:valid"]);


function checkMatches() {
  let match = true;
  for (const key of Object.keys(blackboard)) {
    if (blackboard[key] !== props.startingData[key]) {
      match = false;
    }
  }
  return match
}


async function formUpdate() {
  emit("update:valid", await v$.value.$validate())

  if (props.returnDifferences) {
    const returnings: Blackboard = {}
    for (const key of Object.keys(blackboard)) {
      if (blackboard[key] !== props.startingData[key]) {
        returnings[key] = blackboard[key]
      }
    }
    emit("changed", returnings);
  } else {
    emit("changed", blackboard);
  }

  emit("update:informationMatches", checkMatches())
}

// watch(blackboard, (newValue) => {
//   // console.log(newValue);
// })
watch(() => props.startingData, (value) => {
  for (const key of Object.keys(value)) {
    blackboard[key] = value[key];
  }
});
onMounted(() => {
  for (const key of Object.keys(props.startingData)) {
    blackboard[key] = props.startingData[key];
  }
})


</script>
