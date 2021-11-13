<template lang="pug">
.container.mx-auto.px-4
	h1 {{msg}}! {{text}}
</template>

<script setup>
// import { ref } from 'vue'

defineProps({
	msg: String
})

let text = 'How are you today?'

// const count = ref(0)
</script>