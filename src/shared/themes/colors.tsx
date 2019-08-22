// the enums will help with autocompletion and avoid misspelled strings
enum ThemeColor {
	mainBrand = 'mainBrand',
	darkAccent = 'darkAccent',
	lightShade = 'lightShade',
	purple = 'purple',
}

enum Error {
	background = 'background',
	message = 'message',
	border = 'border',
}

enum Border {
	lightgrey = 'lightgrey',
}

export const themeColor: Record<ThemeColor, string> = {
	mainBrand: '#5CB818',
	darkAccent: '#008000',
	lightShade: '#F2F0F2',
	purple: '#8C238C',
};

export const errorColor: Record<Error, string> = {
	background: '#FFBABA',
	message: '#D8000C',
	border: '#D8000C',
};

export const borderColor: Record<Border, string> = {
	lightgrey: 'lightgrey',
};
