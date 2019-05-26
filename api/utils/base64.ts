export const encode = (s: string) => Buffer.from(s).toString('base64');
export const decode = (base64String: string) =>
	base64String ? Buffer.from(base64String, 'base64').toString('ascii') : '';
