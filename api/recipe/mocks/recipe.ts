export const RECIPES_LIST = [
	{
		_id: '12345',
		name: 'Omelet',
		description: 'Easy to make fried egg',
		meal: ['BREAKFAST', 'LUNCH', 'SUPPER'],
		preptime: 2,
		cookingTime: 2,
		ingredients: ['1/2 onion', 'salt', 'oil', 'tomatoes'],
		instructions: [
			{
				image: '',
				stepNumber: 1,
				description: 'Chop onion and tomatoes',
			},
			{
				image: '',
				stepNumber: 2,
				description: 'Beat the eggs.',
			},
			{
				image: '',
				stepNumber: 3,
				description:
					'Mix the onions and tomatoes in the egg. Add salt.',
			},
			{
				image: '',
				stepNumber: 4,
				description: 'Fry egg.',
			},
		],
		yield: 1,
		image: '',
		dietLabels: [],
		isPublic: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];
