<template lang="pug">
.container.mx-auto.p-4
	.flex.flex-wrap.-mx-2.overflow-hidden
		div(class="w-auto overflow-hidden sm:my-2 sm:px-2")
			.card.shadow-2xl.bg-green-400
				.card-body
					.card-title
						h1 Pengaturan

					//- input.btn.btn-primary(type="file" @input="image = $event.target.files[0]")
					file-selector(v-model="file" :accept="['image/png', 'image/jpeg']" :allowMultiple="false")
						dialog-button.btn.btn-primary + Tambah gambar
		div(class="w-1/2 overflow-hidden sm:my-2 sm:px-2")
			.card.shadow-2xl.bg-green-400
				.card-body
					.card-title
						h1 {{text}}

					//- img(v-if="wmimage || image" :src="wmimage || image")
					div(v-if="files.length > 0")
						//- img(v-for="preview in previews" :key="preview" :src="preview" alt="gambar")
						p yeay ada
						
					p.text-center(v-else) Tidak ada gambar
</template>

<script setup>
// import watermark from 'purejswatermark/packages/watermark'
import { ref, watch } from 'vue'
import { FileSelector, DialogButton } from 'vue3-file-selector'

const files = ref([])
const previews = ref([])

const preview = ref()

const toBlob = async (file) => {
	const buffer = await file.arrayBuffer()
	const blob = new Blob([buffer])
	const srcBlob = URL.createObjectURL(blob)

	return srcBlob
}

// watch(files, async () => {
// 	console.log(files.value)
// 	previews.value = await Promise.all(
// 		files.value.map((file) => toBlob(file))
// 	)
// })

watch(files, async () => {
	console.log(files.value)
	// preview.value = await Promise.all(
	// 	toBlob(files.value)
	// )
})

const options = {
	text: 'Sample',
	textSize: 8
}

let image = ref('')
// let wmimage = await watermark.addTextWatermark(image, options)
let wmimage = ref('')

defineProps({
	msg: String
})

let text = 'How are you today?'

// const count = ref(0)
</script>