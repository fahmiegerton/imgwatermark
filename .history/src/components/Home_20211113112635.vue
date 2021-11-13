<template lang="pug">
.container.mx-auto.p-4
	.w-full.card.mx-4.overflow-hidden
		.card-body
			.card-title
				h1.font-extrabold imgwatermark 💫
			p Beri Watermark berupa teks pada gambar supaya foto/gambar mu gak dicolong orang. Rekomen untuk yang mau upload foto selfie dengan ktp 📸.

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
						input.input.input-bordered(type="number" min="5" v-model="options.textSize" placeholder="dalam 'em'")

					.form-control
						label.label
							span.label-text Posisi
						select.select.select-bordered(v-model="options.position")
							option(disabled="disabled" :selected="!options.position") Pilih posisi
							option(v-for="p in posisi" :key="p.value" :selected="options.position === p.value" :value="p.value") {{p.text}}

					.form-control
						label.label
							span.label-text Font
						select.select.select-bordered(v-model="options.font")
							option(disabled="disabled" :selected="!options.font") Pilih font
							option(v-for="(font, index) in fonts" :key="index" :selected="options.font === font") {{font}}

					.form-control
						label.label
							span.label-text Warna
						fk-color-picker(v-model:color="options.colour")

					button.btn.mt-2(@click="refreshimage" :disabled="preview.length < 1" :class="preview.length < 1 ? 'btn-secondary' : 'btn-secondary'") Terapkan
		div(class="sm:w-3/6 overflow-hidden my-2 px-2")
			.card.shadow-2xl.bg-green-400
				.card-body
					.card-title
						h1 {{loading ? 'Tunggu dulu ya...' : 'Hasil Gambar'}}

					div(v-if="preview.length > 0")
						//- img(v-for="preview in previews" :key="preview" :src="preview" alt="gambar")
						img(:src="preview[0]" alt="gambar")
						
					p.text-center(v-else) Tidak ada gambar
</template>

<script setup>
import watermark from 'watermarkjs'
import { ref, watch, watchEffect } from 'vue'
import { FileSelector, DialogButton } from 'vue3-file-selector'

let loading = false
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

watch(files, () => {
	generate()
})

function refreshimage() {
	generate()
}

async function generate() {
	if (files.value.length > 1) files.value.splice(0, (files.value.length - 1))

	loading = true
	let opsiposisi
	let y
	
	switch (options.position) {
		case 'lowerRight':
			opsiposisi = 'lowerRight'
			break;
		case 'lowerLeft':
			opsiposisi = 'lowerLeft'
			break;
		case 'upperRight':
			opsiposisi = 'upperRight'
			y = 76
			break;
		case 'upperLeft':
			opsiposisi = 'upperLeft'
			y = 76
			break;
		case 'center':
			opsiposisi = 'center'
			break;
		default:
			opsiposisi = 'lowerRight'
			break;
	}

	preview.value = await Promise.all(
		files.value.map(async (file) => await watermark([file]).dataUrl(watermark.text[opsiposisi](options.text, options.textSize+'em '+(options.font || 'Calibri'), (options.colour.hex || options.colour || '#000'), 0.5, y)).then((url) => url))
	).finally(() => {
		loading = false
	})
}
</script>