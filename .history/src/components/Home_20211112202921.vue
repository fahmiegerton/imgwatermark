<template lang="pug">
h1 hellowww {{ msg }}. {{ text }}
</template>

<script setup>
// import { ref } from 'vue'

defineProps({
	msg: String
})

let text = 'How are you today?'

// const count = ref(0)
</script>