<template lang="pug">
.container.mx-auto.p-4
	.flex.flex-wrap.-mx-2.overflow-hidden
		div(class="sm:1/2 overflow-hidden my-2 px-2")
			.card.shadow-2xl.bg-green-400
				.card-body
					.card-title
						h1 Pengaturan

					//- input.btn.btn-primary(type="file" @input="image = $event.target.files[0]")
					file-selector(v-model="files" :accept="['image/png', 'image/jpeg']" :allowMultiple="false")
						dialog-button.btn.btn-primary + Tambah gambar
					br

					.form-control
						label.label
							span.label-text Teks
						input.input.input-bordered(type="text" v-model="options.text")
		div(class="sm:w-3/4 overflow-hidden my-2 px-2")
			.card.shadow-2xl.bg-green-400
				.card-body
					.card-title
						h1 {{text}}

					//- img(v-if="wmimage || image" :src="wmimage || image")
					div(v-if="files.length > 0")
						//- img(v-for="preview in previews" :key="preview" :src="preview" alt="gambar")
						//- img(:src="preview[0]" alt="gambar")
						img(:src="files[0]" alt="gambar")
						
					p.text-center(v-else) Tidak ada gambar
</template>

<script setup>
import watertext from 'watertext/dist/watertext.core.umd.min'
import { ref, watch } from 'vue'
import { FileSelector, DialogButton } from 'vue3-file-selector'

const files = ref([])
const preview = ref([])
const options = {
	text: 'Sample',
	textSize: 12
}


const toBlob = async (file) => {
	const buffer = await file.arrayBuffer()
	const blob = new Blob([buffer])
	const srcBlob = URL.createObjectURL(blob)

	return srcBlob
}

watch(files, async () => {
	if (files.value.length > 1) files.value.splice(0, (files.value.length - 1))
	preview.value = await Promise.all(
		// files.value.map((file) => console.log(file))
		files.value.map((file) => watertext(file, options), function(err, src) {
			console.log(err)
			return src
		})
	)
})

let image = ref('')
// let wmimage = await watermark.addTextWatermark(image, options)
let wmimage = ref('')

defineProps({
	msg: String
})

let text = 'How are you today?'

// const count = ref(0)
</script>