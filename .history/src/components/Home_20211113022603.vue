<template lang="pug">
.container.mx-auto.p-4
	.flex.flex-wrap.-mx-2.overflow-hidden.justify-center
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

					.form-control
						label.label
							span.label-text Ukuran Teks
						input.input.input-bordered(type="number" min="5" v-model="options.textSize")

					.form-control
						label.label
							span.label-text Posisi
						select.select.select-bordered(v-model="options.position")
							option(disabled="disabled" :selected="!options.position") Pilih posisi
							option(v-for="p in posisi" :key="p.value" :selected="options.position === p.value") {{p.text}}

					.form-control
						label.label
							span.label-text Font
						select.select.select-bordered(v-model="options.font")
							option(disabled="disabled" :selected="!options.position") Pilih font
							option(v-for="(font, index) in fonts" :key="index" :selected="options.font === font") {{font}}

					.form-control
						label.label
							span.label-text Warna
						fk-color-picker(v-model:color="options.colour")
		div(class="sm:w-3/6 overflow-hidden my-2 px-2")
			.card.shadow-2xl.bg-green-400
				.card-body
					.card-title
						h1 {{text}}

					//- img(v-if="wmimage || image" :src="wmimage || image")
					div(v-if="files.length > 0")
						//- img(v-for="preview in previews" :key="preview" :src="preview" alt="gambar")
						img(:src="preview[0]" alt="gambar")
						
					p.text-center(v-else) Tidak ada gambar
</template>

<script setup>
import watermark from 'watermarkjs'
import { ref, watch } from 'vue'
import { FileSelector, DialogButton } from 'vue3-file-selector'
// import VueTailwindColorPicker from 'vue-tailwind-color-picker.vue'

const files = ref([])
const preview = ref([])
const options = {
	text: 'Sample',
	textSize: 12,
	position: 'lowerRight',
	font: 'Calibri',
	colour: '#00FF00FF'
}
const posisi = [
	{text: 'Kanan Bawah', value: 'lowerRight'},
	{text: 'Kiri Bawah', value: 'lowerLeft'},
	{text: 'Kanan Atas', value: 'upperRight'},
	{text: 'Kiri Atas', value: 'upperLeft'},
	{text: 'Tengah', value: 'center'}
]
const fonts = ['Calibri', 'Arial', 'Segoe UI', 'Impact', 'Times New Roman', 'Cambria', 'Comic Sans MS', 'Consolas', 'Lithos Pro']
const swatches = [
	'#f94144',
	'#f3722c',
	'#f8961e',
	'#f9c74f',
	'#90be6d',
	'#43aa8b',
	'#577590',
	'#22223b',
	'#4a4e69',
	'#c9ada7'
]
defineProps({
	msg: String
})

let text = 'How are you today?'

const toBlob = async (file) => {
	const buffer = await file.arrayBuffer()
	const blob = new Blob([buffer])
	const srcBlob = URL.createObjectURL(blob)

	return srcBlob
}

watch(files, async () => {
	if (files.value.length > 1) files.value.splice(0, (files.value.length - 1))

	let opsi
	let y
	
	switch (options.position) {
		case 'lowerLeft':
			opsi = watermark.text.lowerLeft
		case 'upperRight':
			opsi = watermark.text.upperRight
			y = 48
		case 'upperLeft':
			opsi = watermark.text.upperRight
			y = 48
		case 'center':
			opsi = watermark.text.upperRight
		default:
			opsi = watermark.text.lowerRight
			break;
	}

	console.log(options.colour)
	preview.value = await Promise.all(
		files.value.map(async (file) => await watermark([file]).dataUrl(opsi(options.text, options.textSize+'em '+(options.font || 'Calibri'), (options.colour || '#000'), 0,5, y)).then((url) => url))
	)
})


function swatchAdded(colour) {
	swatches.push(colour)
}

function swatchDeleted(colour) {
	console.log('Swatch Deleted', colour)
}

// const count = ref(0)
</script>