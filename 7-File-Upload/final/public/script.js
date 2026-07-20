const fileUpload = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const message = document.getElementById('message');

fileUpload.addEventListener( 'submit', async (e) => {
	e.preventDefault();

	message.textContent = ""

	let files = fileInput.files
	console.log(files)
	
	if (files.length > 3) {
		message.textContent = "Maximum 3 files allowed.";
		return;
	}

	let formData = new FormData();

	for (const file of files){
		formData.append('file', file);
	}

	console.log(formData)

	try{
		const response = await axios.post('/api/v1/upload', formData)
		console.log(response.data)
		message.textContent = response.data.msg
	}
	catch(err){
		console.log(err)
		message.textContent = err.response.data.msg
	}

})