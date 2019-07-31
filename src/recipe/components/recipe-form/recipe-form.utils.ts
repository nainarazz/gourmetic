import {
	FormValues,
	Instruction,
	Recipe,
	ReactSelectOptions,
} from './../../types/recipe.interface';

const formatRecipeInstructions = (
	instructions: Instruction[]
): Instruction[] => {
	return instructions.map(
		(instruction, index): Instruction => ({
			...instruction,
			stepNumber: index + 1,
		})
	);
};

const formSelectOptions = (options: ReactSelectOptions[]): string[] =>
	options.map(o => o.value);

export const getFormattedRecipeData = (data: FormValues): Recipe => {
	return {
		...data,
		meals: formSelectOptions(data.meals as ReactSelectOptions[]),
		instructions: formatRecipeInstructions(data.instructions),
		createdAt: new Date(),
		updatedAt: new Date(),
	};
};
