import React, { FunctionComponent, useState } from 'react';
import { Chip } from 'src/shared/components/chips/chip.component';
import { defaultRecipeFilters } from 'src/recipe/constants/recipe.constants';
import { FilterWrapper } from './recipe-filter.style';
import { RecipeFilterType } from 'src/recipe/types/recipe.interface';

interface RecipeFiltersProps {
	onSelectFilter: (selectedFilters: string[]) => void;
	initialFilters: string[];
}

export const RecipeFilters: FunctionComponent<RecipeFiltersProps> = props => {
	const filters: RecipeFilterType[] = defaultRecipeFilters.map(filter => ({
		...filter,
		isSelected: props.initialFilters.includes(filter.value),
	}));

	const [selectedFilters, setSelectedFilters] = useState<RecipeFilterType[]>(
		filters
	);

	const selectFilter = (index: number, isSelected: boolean) => {
		const existingFilters = [...selectedFilters];
		existingFilters[index].isSelected = !isSelected;
		setSelectedFilters(existingFilters);

		props.onSelectFilter(
			selectedFilters.filter(f => f.isSelected).map(f => f.value)
		);
	};

	return (
		<React.Fragment>
			<FilterWrapper>
				{selectedFilters.map((f, i) => (
					<Chip
						key={f.label + i.toString()}
						label={f.label}
						isSelected={f.isSelected}
						onSelectChip={() => selectFilter(i, f.isSelected)}
					/>
				))}
			</FilterWrapper>
		</React.Fragment>
	);
};
