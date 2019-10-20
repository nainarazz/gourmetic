import { encode } from './base64';

export interface PaginationOptions {
	first: number;
	after: string;
}

export const paginateArray = <T>(
	paginationOptions: PaginationOptions,
	result: T[]
) => {
	const hasNextPage = result.length > paginationOptions.first;

	//remove extra
	if (hasNextPage) {
		result = result.slice(0, result.length - 1);
	}

	// tslint:disable-next-line:no-any
	const edges = result.map((r: any) => ({
		cursor: encode(r._id!.toString()),
		node: r,
	}));

	return {
		pageInfo: {
			hasNextPage,
		},
		edges,
	};
};
