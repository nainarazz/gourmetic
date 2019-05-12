const RECIPES_LIST = [
	{
		_id: '12345',
		name: 'Omelet',
		description: 'Easy to make fried egg',
		meal: ['BREAKFAST', 'LUNCH', 'SUPPER'],
		preptime: 2,
		cookingTime: 2,
		ingredients: [
			{ measurement: 'pieces', quantity: '1/2', item: 'onion' },
			{ measurement: '', quantity: '', item: 'salt' },
			{ measurement: '', quantity: '', item: 'oil' },
			{ measurement: 'piece', quantity: '1', item: 'tomatoes' },
		],
		instructions: [
			{
				imageUrl: '',
				stepNumber: 1,
				description: 'Chop onion and tomatoes',
			},
			{
				imageUrl: '',
				stepNumber: 2,
				description: 'Beat the eggs.',
			},
			{
				imageUrl: '',
				stepNumber: 3,
				description:
					'Mix the onions and tomatoes in the egg. Add salt.',
			},
			{
				imageUrl: '',
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

module.exports = {
	RECIPES_LIST,
};
