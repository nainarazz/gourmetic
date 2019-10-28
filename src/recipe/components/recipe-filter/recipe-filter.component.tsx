import React, { FunctionComponent, useRef, useState } from 'react';
import { Chip } from 'src/shared/components/chips/chip.component';
import { defaultRecipeFilters } from 'src/recipe/constants/recipe.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RecipeFilterType } from 'src/recipe/types/recipe.interface';
import { Scrollbars } from 'react-custom-scrollbars';
import {
	FilterWrapper,
	ArrowIcon,
	ChipsContainer,
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
	const scrollBars = useRef();

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

	const onScroll = (direction: string) => {
		if (direction === 'left' && scrollBars.current) {
			// tslint:disable-next-line:no-any
			(scrollBars.current as any).scrollToLeft();
		}
		if (direction === 'right' && scrollBars.current) {
			// tslint:disable-next-line:no-any
			(scrollBars.current as any).scrollToRight();
		}
	};

	return (
		<React.Fragment>
			<FilterWrapper>
				{
					<ArrowIcon onClick={() => onScroll('left')}>
						<FontAwesomeIcon
							icon={leftArrow}
							size={'2x'}
							color={'grey'}
						/>
					</ArrowIcon>
				}
				<Scrollbars
					// tslint:disable-next-line:no-any
					ref={scrollBars as any}
					style={{ width: '95%' }}
					autoHeight
					hideTracksWhenNotNeeded
					universal
					renderView={p => (
						<ChipsContainer {...p} style={{ overflow: 'hidden' }} />
					)}
					autoHide
					autoHideTimeout={500}
				>
					{selectedFilters.map((f, i) => (
						<Chip
							key={f.label + i.toString()}
							label={f.label}
							isSelected={f.isSelected}
							onSelectChip={() => selectFilter(i, f.isSelected)}
						/>
					))}
				</Scrollbars>
				{
					<ArrowIcon onClick={() => onScroll('right')}>
						<FontAwesomeIcon
							icon={rightArrow}
							size={'2x'}
							color={'grey'}
						/>
					</ArrowIcon>
				}
			</FilterWrapper>
		</React.Fragment>
	);
};
