<template lang="pug">
.container.mx-auto.p-4
	.flex.flex-wrap.-mx-2.overflow-hidden
		div(class="w-auto overflow-hidden sm:my-2 sm:px-2")
			.card.shadow-2xl.bg-green-400
				.card-body
					.card-title
						h1 Pengaturan

					input.btn.btn-primary(type="file")
		div(class="w-1/2 overflow-hidden sm:my-2 sm:px-2")
			.card.shadow-2xl.bg-green-400
				.card-body
					.card-title
						h1 {{text}}

					img(v-if="wmimage || image" :src="wmimage || image")
					p.text-center(v-else)
</template>

<script setup>
import watermark from 'purejswatermark/dist/watermark'
// import { ref } from 'vue'

const options = {
	text: 'Sample',
	textSize: 8
}

let image = ''
let wmimage = await watermark.addTextWatermark(image, options)

defineProps({
	msg: String
})

let text = 'How are you today?'

// const count = ref(0)
</script>