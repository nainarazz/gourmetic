import React, { SFC } from 'react';
import Select from 'react-select';
import { ReactSelectOptions } from '../../../recipe/types/recipe.interface';

interface SelectProps {
	options: ReactSelectOptions[];
	handleChange: (val: ReactSelectOptions) => void;
	selectedValues?: ReactSelectOptions[];
	selectedValue?: ReactSelectOptions;
}

export const CustomMultiSelect: SFC<SelectProps> = ({
	options,
	handleChange,
	selectedValues,
}) => {
	return (
		<Select
			options={options}
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
			defaultValue={selectedValue}
			// tslint:disable-next-line:no-any
			onChange={(e: any) => handleChange(e)}
		/>
	);
};
