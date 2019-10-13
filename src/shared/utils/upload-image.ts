export const uploadImage = async (
	file: File | string,
	isNewImage: boolean,
	previousImagePublicId: string
) => {
	// don't upload images to cloudinary when in development mode
	// if (process.env.NODE_ENV !== 'production') {
	// 	return new Promise(res => res(''));
	// }

	const cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/gourmetic/image/upload`;

	const preset = process.env.CLOUDINARY_UPLOAD_PRESET || 'hkptafbx';
	let response: Response;

	const formData = new FormData();
	formData.append('upload_preset', preset);
	formData.append('file', file);
	formData.append('folder', 'recipes');

	if (isNewImage) {
		// uploading new image
		response = await fetch(cloudinaryBaseUrl, {
			method: 'POST',
			body: formData,
		});
	} else {
		// modifying existing image
		response = await fetch(cloudinaryBaseUrl, {
			method: 'POST',
			body: formData,
		});
		//TODO: deleting image from cloudinary accound
		// formData.append('public_id', previousImagePublicId);
		// deleteImage(previousImagePublicId);
	}

	if (!response.ok) {
		throw new Error('Error saving image. ' + response.statusText);
	}

	return response.json();
};

export const deleteImage = async (publicId: string) => {
	// don't upload images to cloudinary when in development mode
	// if (process.env.NODE_ENV !== 'production') {
	// 	return new Promise(res => res(''));
	// }

	const preset = process.env.CLOUDINARY_UPLOAD_PRESET || 'hkptafbx';

	const cloudinaryBaseUrlDelete = `https://api.cloudinary.com/v1_1/gourmetic/image/destroy`;

	const formData = new FormData();
	// formData.append('upload_preset', preset);
	formData.append('public_id', publicId);
	formData.append('resource_type', 'image');

	const response = await fetch(cloudinaryBaseUrlDelete, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Error deleting image. ' + response.statusText);
	}

	return response.json();
};
