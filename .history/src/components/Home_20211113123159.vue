<template lang="pug">
.container.mx-auto.p-4
	.w-full.card.mx-4.overflow-hidden
		.card-body
			.card-title
				h1.font-extrabold imgwatermark 💫
			p Beri Watermark berupa teks pada gambar supaya foto/gambar mu gak dicolong orang. Rekomen untuk yang mau upload foto selfie dengan ktp 🎴.
			.alert.alert-warning.my-2
				.flex-1
					svg.w-6.h-6.mx-2.stroke-current(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24")
						path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z")
					label Semakin besar ukuran berkas foto mu, semakin lama fotomu akan diproses. Prosesnya semua bergantung kepada spek perangkat mu karena prosesnya di proses langsung oleh peramban di perangkat mu dan berkas foto mu tidak dikirim ke server ya.

	.flex.flex-wrap.-mx-2.overflow-hidden.justify-center
		div(class="sm:1/2 overflow-hidden my-2 px-2")
			.card.shadow-2xl.bg-green-400
				.card-body
					.card-title
						h1 Pengaturan

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
							span.label-text Letak Sumbu Y
						input.input.input-bordered(type="number" v-model="options.yoffset" )
						small.text-gray-900.text-italic Hanyak untuk posisi kiri atas dan kanan atas

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
					button.btn.btn-primary(:disabled="preview.length < 1") Unduh 🔥
		div(class="sm:w-3/6 overflow-hidden my-2 px-2")
			.card.shadow-2xl.bg-green-400
				.card-body
					.card-title
						h1 {{loading ? 'Tunggu dulu ya...' : 'Hasil Gambar'}}

					.alert.alert-error.mb-3(v-if="error")
						.flex-1
							svg.w-6.h-6(fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg")
								path(fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd")
							label Uppss! Ada yang gak beres nih. Coba pilih gambar yang lain atau refresh ulang halaman ini 🤔
					div(v-if="preview.length > 0")
						img(:src="preview[0]" alt="gambar")
						
					p.text-center(v-else) Tidak ada gambar

	.m-4.text-center.justify-end.overflow-hidden.flex.flex-wrap.text-gray-400
		small Dibuat dengan 💖 oleh 
			a(href="http://github.com/fahmiegerton") Fahmi.
		small - 
		small Situs ini menggunakan beberapa pustaka sumber terbuka. Cek 
			a(href="http://github.com/fahmiegerton") Kredit.
</template>

<script setup>
import watermark from 'watermarkjs'
import { ref, watch } from 'vue'
import { FileSelector, DialogButton } from 'vue3-file-selector'

const loading = ref(false)
const error = ref(false)
const files = ref([])
const preview = ref([])
const options = {
	text: 'Sample',
	textSize: 12,
	position: 'lowerRight',
	font: 'Calibri',
	colour: '#00FF00FF',
	yoffset: null
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

	loading.value = true
	error.value = false
	let opsiposisi
	let y = options.yoffset
	
	switch (options.position) {
		case 'lowerRight':
			opsiposisi = 'lowerRight'
			break;
		case 'lowerLeft':
			opsiposisi = 'lowerLeft'
			break;
		case 'upperRight':
			opsiposisi = 'upperRight'
			y = options.yoffset || 98
			break;
		case 'upperLeft':
			opsiposisi = 'upperLeft'
			y = options.yoffset || 98
			break;
		case 'center':
			opsiposisi = 'center'
			break;
		default:
			opsiposisi = 'lowerRight'
			break;
	}

	console.log(y)
	preview.value = await Promise.all(
		files.value.map(async (file) => await watermark([file]).dataUrl(watermark.text[opsiposisi](options.text, options.textSize+'em '+(options.font || 'Calibri'), (options.colour.hex || options.colour || '#000'), 0.5, y)).then((url) => url))
	).catch((err) => {
		console.error('Galat:', err)
		error.value = true
		loading.value = false
	})
	.finally(() => {
		loading.value = false
	})
}
</script>