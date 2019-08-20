import React, { SFC, useEffect, useState } from 'react';
import { faTimesCircle as clearButton } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Input, Label } from './photo-input.style';
import { InputClearButton } from '../../styles/buttons';

interface PhotoInputProps {
	// tslint:disable-next-line:no-any
	handleImageInputChange: (event: any) => void;
}

export const PhotoInput: SFC<PhotoInputProps> = props => {
	const [selectedFile, setSelectedFile] = useState('');

	// clean up object url
	useEffect(() => () => URL.revokeObjectURL(selectedFile), []);

	// tslint:disable-next-line:no-any
	const handleChange = (e: any) => {
		if (e.currentTarget.files[0]) {
			setSelectedFile(URL.createObjectURL(e.currentTarget.files[0]));
		}
		props.handleImageInputChange(e);
	};

	// tslint:disable-next-line:no-any
	const removePhoto = (e: any) => {
		setSelectedFile('');
		e.preventDefault();
	};

	return (
		<React.Fragment>
			<Input
				id="image"
				type="file"
				accept="image/*"
				name={'image'}
				onChange={handleChange}
			/>
			<Label htmlFor="image">
				<Image
					alt="image"
					src={
						selectedFile ||
						'/static/images/img-default-placeholder.jpg'
					}
				/>
				{selectedFile && (
					<InputClearButton
						type="button"
						style={{
							position: 'absolute',
							right: '10px',
							top: '10px',
							background: '#fff',
							borderRadius: '50%',
							padding: '0',
							lineHeight: '0',
						}}
						onClick={removePhoto}
					>
						<FontAwesomeIcon
							icon={clearButton}
							size={'2x'}
							color="red"
						/>
					</InputClearButton>
				)}
			</Label>
		</React.Fragment>
	);
};
