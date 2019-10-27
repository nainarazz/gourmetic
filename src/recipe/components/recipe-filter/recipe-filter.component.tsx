import React, { FunctionComponent, useState } from 'react';
import { Chip } from 'src/shared/components/chips/chip.component';
import { defaultRecipeFilters } from 'src/recipe/constants/recipe.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RecipeFilterType } from 'src/recipe/types/recipe.interface';
import {
	ChipsContainer,
	FilterWrapper,
	ArrowIcon,
} from './recipe-filter.style';
import {
	faArrowLeft as leftArrow,
	faArrowRight as rightArrow,
} from '@fortawesome/free-solid-svg-icons';

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
				<ArrowIcon>
					<FontAwesomeIcon
						icon={leftArrow}
						size={'2x'}
						color={'grey'}
					/>
				</ArrowIcon>
				<ChipsContainer>
					{selectedFilters.map((f, i) => (
						<Chip
							key={f.label + i.toString()}
							label={f.label}
							isSelected={f.isSelected}
							onSelectChip={() => selectFilter(i, f.isSelected)}
						/>
					))}
				</ChipsContainer>
				<ArrowIcon>
					<FontAwesomeIcon
						icon={rightArrow}
						size={'2x'}
						color={'grey'}
					/>
				</ArrowIcon>
			</FilterWrapper>
		</React.Fragment>
	);
};
