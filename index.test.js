
var myMod = require('./index');
var gameState = myMod.gameState;

test('the shopping list has beer on it', () => {
    expect(gameState).toContain('sbhelp');
    expect(new Set(gameState)).toContain('sbhelp');
});