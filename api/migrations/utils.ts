// tslint:disable-next-line:no-any
export const pickRandom = (data: any[]) =>
	data[Math.floor(Math.random() * data.length)];
