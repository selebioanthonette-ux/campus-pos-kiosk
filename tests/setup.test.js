import test from 'node:test';

test('business logic module loads without browser globals or dependencies', async () => {
  await import('../js/logic.js');
});
