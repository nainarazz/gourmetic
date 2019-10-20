export const uploadImage = async (file: File | string) => {
	// don't upload images to cloudinary when in development mode
	if (process.env.NODE_ENV !== 'production') {
		return new Promise(res => res(''));
	}

	const cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;

	const preset = process.env.CLOUDINARY_UPLOAD_PRESET || '';
	let response: Response;

	const formData = new FormData();
	formData.append('upload_preset', preset);
	formData.append('file', file);
	formData.append('folder', 'recipes');

	// uploading new image
	response = await fetch(cloudinaryBaseUrl, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Error saving image. ' + response.statusText);
	}

	return response.json();
};
