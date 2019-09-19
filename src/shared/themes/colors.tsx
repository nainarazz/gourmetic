// the enums will help with autocompletion and avoid misspelled strings
enum ThemeColor {
	mainBrand = 'mainBrand',
	lightShadeMainBrand = 'lightShadeMainBrand',
	darkShadeMainBrand = 'darkShadeMainBrand',
	secondary = 'secondary',
	lightShadeSecondary = 'lightShadeSecondary',
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
	mainBrand: '#3B9011',
	lightShadeMainBrand: '#97D139',
	darkShadeMainBrand: '#008000',
	secondary: '#F86934',
	lightShadeSecondary: '#FA9621',
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
