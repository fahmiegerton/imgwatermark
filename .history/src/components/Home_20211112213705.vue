<template lang="pug">
.container.mx-auto.p-4
	.flex.flex-wrap.-mx-2.overflow-hidden
		div(class="w-auto overflow-hidden sm:my-2 sm:px-2")
			.bg-green-400
				h1 {{msg}}
		div(class="w-1/2 overflow-hidden sm:my-2 sm:px-2")
			.bg-green-400
				h1 {{text}}
</template>

<script setup>
// import { ref } from 'vue'

defineProps({
	msg: String
})

let text = 'How are you today?'

// const count = ref(0)
</script>