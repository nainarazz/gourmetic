export const uploadImage = async (file: File) => {
	// don't upload images to cloudinary when in development mode
	if (process.env.NODE_ENV !== 'production') {
		return new Promise(res => res(''));
	}

	const cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/${
		process.env.CLOUDINARY_CLOUD_NAME
	}/image/upload`;
	const preset = process.env.CLOUDINARY_UPLOAD_PRESET || '';
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', preset);
	const response = await fetch(cloudinaryBaseUrl, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Error saving image. ' + response.statusText);
	}

	return response.json();
};
