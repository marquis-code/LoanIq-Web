<!-- <template>
	<date-picker
		:value="dateInput"
		:format="format"
		:type="type"
		:placeholder="placeholder"
		:range="range"
		:disabled-date="disabledDate"
		class="w-full min-w-[230px]"
		:value-type="valueType"
		:disabled="disabled"
		:editable="editable"
		:clearable="clearable"
		:time-picker-options="timePickerOptions"
		:show-time-panel="showTimePanel"
		@update:value="handleDate"
	>
		<template #header="{ emit }">
			<button class="mx-btn mx-btn-text" @click="emit(new Date())">
				Today
			</button>
		</template>
	</date-picker>
</template>

<script setup lang="ts">
import DatePicker from 'vue-datepicker-next'

import props from './props'

const emit = defineEmits(['update:modelValue'])

const propsValue = defineProps({
  ...props
})

const dateInput = ref(propsValue.modelValue)

const handleDate = (date: any) => {
	dateInput.value = date
	emit('update:modelValue', date)
}

</script>

<style>
@import url('./themes/styles.css');
.date-picker {
  background-color: blue;
}
</style> -->


<template>
	<date-picker
		:value="dateInput"
		:format="format"
		:type="type"
		:placeholder="placeholder"
		:range="range"
		:disabled-date="disableFutureDates"
		class="w-full min-w-[230px]"
		:value-type="valueType"
		:disabled="disabled"
		:editable="editable"
		:clearable="clearable"
		:time-picker-options="timePickerOptions"
		:show-time-panel="showTimePanel"
		@update:value="handleDate"
	>
		<template #header="{ emit }">
			<button class="mx-btn mx-btn-text" @click="emit(new Date())">
				Today
			</button>
		</template>
	</date-picker>
</template>

<script setup lang="ts">
import DatePicker from 'vue-datepicker-next'
import { ref } from 'vue'

import props from './props'

const emit = defineEmits(['update:modelValue'])

const propsValue = defineProps({
  ...props
})

const dateInput = ref(propsValue.modelValue)

// Function to disable future dates
const disableFutureDates = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset time to start of day for accurate comparison
  return date > today
}

const handleDate = (date: any) => {
	dateInput.value = date
	emit('update:modelValue', date)
}
</script>

<style>
@import url('./themes/styles.css');
.date-picker {
  background-color: blue;
}
</style>