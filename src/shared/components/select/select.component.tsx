import React, { SFC } from 'react';
import Select from 'react-select';
import { ReactSelectOptions } from '../../../recipe/types/recipe.interface';
import { themeColor } from '../../themes/colors';

interface SelectProps {
	options: ReactSelectOptions[];
	handleChange: (val: ReactSelectOptions) => void;
	selectedValues?: ReactSelectOptions[];
	selectedValue?: ReactSelectOptions;
}

// see react-select doc for options regarding styles
const styles = {
	// tslint:disable-next-line:no-any
	control: (provided: any, state: any) => ({
		...provided,
		// tslint:disable:object-literal-key-quotes
		border: state.isFocused
			? `1px solid ${themeColor.mainBrand}`
			: `1px solid initial`,
		boxShadow: state.isFocused
			? `1px solid ${themeColor.mainBrand}`
			: `1px solid initial`,
		'&:hover': {
			border: state.isFocused
				? `1px solid ${themeColor.mainBrand}`
				: `1px solid initial`,
		},
	}),
};

export const CustomMultiSelect: SFC<SelectProps> = ({
	options,
	handleChange,
	selectedValues,
}) => {
	return (
		<Select
			options={options}
			styles={styles}
			defaultValue={selectedValues}
			closeMenuOnSelect={false}
			isMulti
			// tslint:disable-next-line:no-any
			onChange={(e: any) => handleChange(e)}
		/>
	);
};

export const CustomSelect: SFC<SelectProps> = ({
	options,
	handleChange,
	selectedValue,
}) => {
	return (
		<Select
			options={options}
			styles={styles}
			defaultValue={selectedValue}
			// tslint:disable-next-line:no-any
			onChange={(e: any) => handleChange(e)}
		/>
	);
};
