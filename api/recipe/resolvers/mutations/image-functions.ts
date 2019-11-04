import { Image } from 'api/graphql-generated-types/resolvers-types';
import { Stream } from 'stream';
// tslint:disable-next-line:no-var-requires
const cloudinary = require('cloudinary').v2;

// tslint:disable-next-line:no-any
export const uploadImage = async (fileUpload: any): Promise<Image> => {
	if (process.env.NODE_ENV !== 'production') {
		return new Promise(res => res({ secureUrl: '', publicId: '' }));
	}
	return new Promise((resolve, reject) => {
		const stream = fileUpload.createReadStream() as Stream;

		// tslint:disable:no-any
		const cloudinaryStream = cloudinary.uploader.upload_stream(
			{ folder: 'recipes' },
			(err: any, result: any) => {
				if (err) {
					reject('Error uploading photo.' + err);
				}
				resolve({
					secureUrl: result.secure_url,
					publicId: result.public_id,
				});
			}
		);

		stream.pipe(cloudinaryStream);
	});
};

export const deleteImage = async (publicId: string): Promise<string> => {
	if (process.env.NODE_ENV !== 'production') {
		return new Promise(res => res('ok'));
	}
	return new Promise((resolve, reject) => {
		// tslint:disable:no-any
		cloudinary.uploader.destroy(publicId, (err: any, deleteResult: any) => {
			if (err) {
				reject('Error deleting image.' + err);
			}

			resolve((deleteResult && deleteResult.result) || '');
		});
	});
};
