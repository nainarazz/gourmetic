import React, { SFC } from 'react';
import Select from 'react-select';
import { borderColor, errorColor, themeColor } from '../../themes/colors';
import { ReactSelectOptions } from '../../../recipe/types/recipe.interface';

interface SelectProps {
	options: ReactSelectOptions[];
	handleChange: (val: ReactSelectOptions) => void;
	selectedValues?: ReactSelectOptions[];
	selectedValue?: ReactSelectOptions;
	hasError?: boolean;
}

// see react-select doc for options regarding styles
const getStyles = (hasError: boolean) => {
	return {
		// tslint:disable-next-line:no-any
		control: (provided: any, state: any) => ({
			...provided,
			// tslint:disable:object-literal-key-quotes
			border:
				hasError || (state.isFocused && hasError)
					? `1px solid ${errorColor.border}`
					: state.isFocused
					? `1px solid ${themeColor.mainBrand}`
					: `1px solid ${borderColor.lightgrey}`,
			background: hasError ? errorColor.background : 'initial',
			boxShadow: state.isFocused
				? `1px solid ${themeColor.mainBrand}`
				: `1px solid initial`,
			'&:hover': {
				border:
					state.isFocused && hasError
						? `1px solid ${errorColor.border}`
						: state.isFocused
						? `1px solid ${themeColor.mainBrand}`
						: `1px solid initial`,
			},
		}),
	};
};

export const CustomMultiSelect: SFC<SelectProps> = ({
	options,
	handleChange,
	selectedValues,
	hasError,
}) => {
	return (
		<Select
			options={options}
			styles={getStyles(hasError as boolean)}
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
	hasError,
}) => {
	return (
		<Select
			options={options}
			styles={getStyles(hasError as boolean)}
			defaultValue={selectedValue}
			// tslint:disable-next-line:no-any
			onChange={(e: any) => handleChange(e)}
		/>
	);
};
