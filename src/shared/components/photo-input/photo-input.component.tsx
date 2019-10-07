import React, {
	SFC,
	useEffect,
	useRef,
	useState
	} from 'react';
import { faTimesCircle as clearButton } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Input, Label } from './photo-input.style';
import { InputClearButton } from '../../styles/buttons';

interface PhotoInputProps {
	// tslint:disable:no-any
	handleImageInputChange: (event: any) => void;
	handleClearImage: () => void;
	value: any;
}

export const PhotoInput: SFC<PhotoInputProps> = props => {
	const [selectedFile, setSelectedFile] = useState('');
	const fileInput = useRef(null);

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
		setSelectedFile(''); // clear the preview photo
		props.handleClearImage(); // clear the input in form throught the callback
		if (fileInput.current) {
			// clear the input file element
			(fileInput.current as any).value = '';
		}
		e.preventDefault();
	};

	return (
		<React.Fragment>
			<Input
				id="image"
				type="file"
				accept="image/*"
				ref={fileInput}
				name={'image'}
				onChange={handleChange}
			/>
			<Label htmlFor="image">
				<Image
					alt="image"
					src={
						selectedFile && props.value
							? selectedFile
							: props.value
							? props.value
							: '/static/images/img-default-placeholder.jpg'
					}
				/>
				{selectedFile && props.value && (
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
