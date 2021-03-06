import { pointSegmentDistanceSquared, pointsAligned } from './geom';

test('pointSegmentDistanceSquared', () => {
	expect(pointSegmentDistanceSquared(
		{ x: 0, y: 0},
		{ x: 0, y: 1},
		{ x: 1, y: 1},
	)).toBe(1);

	expect(pointSegmentDistanceSquared(
		{ x: 0, y: 1},
		{ x: 0, y: 0},
		{ x: 1, y: 1},
	)).toBe(1);
});

test('pointsAligned', () => {
	expect(pointsAligned(
		{ x: 0, y: 0},
		{ x: 0, y: 0},
		{ x: 1, y: 1},
	)).toBe(true);

	expect(pointsAligned(
		{ x: 0, y: 0},
		{ x: 1, y: 1},
		{ x: 2, y: 2},
	)).toBe(true);

	expect(pointsAligned(
		{ x: 0, y: 0},
		{ x: 1, y: 1},
		{ x: 1, y: 2},
	)).toBe(false);
});
