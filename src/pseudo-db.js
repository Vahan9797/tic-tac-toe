const Range = (start, end) => Array(end - start + 1).fill().map((_, index) => start + index);

export default {
	matrices: [
		{
			size: 3,
			cellSize: 100,
			winSteps: 3,
			winCount: 1
		},
		{
			size: 4,
			cellSize: 100,
			winSteps: 4,
			winCount: 1
		},
		{
			size: 5,
			cellSize: 90,
			winSteps: 5,
			winCount: 1
		},
		{
			size: 6,
			cellSize: 80,
			winSteps: 6,
			winCount: 1
		},
		{
			size: 7,
			cellSize: 70,
			winSteps: 7,
			winCount: 1
		},
		{
			size: 8,
			cellSize: 60,
			winSteps: 8,
			winCount: 1
		},
		{
			size: 9,
			cellSize: 55,
			winSteps: 9,
			winCount: 1
		},
		{
			size: 10,
			cellSize: 50,
			winSteps: 10,
			winCount: 1
		}
	],

	colors: {
		primary: '337ab7',
		danger: 'd9534f',
		info: '5bc0de',
		warning: 'f0ad4e',
		success: '5cb85c',
	},
};

export { Range };