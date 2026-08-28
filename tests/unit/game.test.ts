import {describe, expect, it} from 'vitest';
import {createSeed, initialState, levels, parseSeed, stepWorld} from '../../src/game';

describe('game rules', () => {
  it('round-trips every level seed', () => {
    for (const level of levels) {
      expect(parseSeed(createSeed(level.id, level.rules))).toEqual({levelId: level.id, rules: level.rules});
    }
  });

  it('shows each changed state after a step', () => {
    const level = levels[0];
    const state = stepWorld(level, {...level.rules, move: 1}, initialState(level));
    expect(state.player).toEqual({x: 1, y: 2});
    expect(state.collected).toEqual(['1,2']);
    expect(state.score).toBe(1);
    expect(state.diff).toEqual([
      'Position 1,3 → 2,3', 'Turns 0 → 1', 'Seeds 0 → 1', 'Score 0 → 1',
    ]);
  });

  it('reverses direction when the bounce rule meets stone', () => {
    const level = levels[2];
    const state = stepWorld(level, {...level.rules, collide: 'bounce'}, {...initialState(level), direction: 'right'});
    expect(state.player).toEqual({x: 2, y: 2});
    expect(state.direction).toBe('left');
    expect(state.event).toContain('Collision changed direction');
  });

  it('ends the world when the timer is spent', () => {
    const level = levels[0];
    let state = initialState(level);
    const rules = {...level.rules, timer: 3};
    state = stepWorld(level, rules, {...state, direction: 'up'});
    state = stepWorld(level, rules, {...state, direction: 'up'});
    state = stepWorld(level, rules, {...state, direction: 'up'});
    expect(state.status).toBe('lost');
  });

  it('keeps all ten lessons solvable with the hinted rule changes', () => {
    const solutions = [
      {rules: {move: 1}, moves: 'rrrr'},
      {rules: {collect: true}, moves: 'uuuurrrr'},
      {rules: {collide: 'bounce'}, moves: 'rlldd'},
      {rules: {timer: 7}, moves: 'uuurrrr'},
      {rules: {score: 2}, moves: 'ddrrrllrrrdd'},
      {rules: {move: 2}, moves: 'rrd'},
      {rules: {collide: 'bounce'}, moves: 'rdd'},
      {rules: {collect: false}, moves: 'rrrr'},
      {rules: {move: 2, score: 3}, moves: 'uurr'},
      {rules: {move: 1, collide: 'stop', collect: true, timer: 12, score: 2}, moves: 'uuurrrdrruuu'},
    ] as const;
    const direction = {u: 'up', r: 'right', d: 'down', l: 'left'} as const;
    levels.forEach((level, index) => {
      const rules = {...level.rules, ...solutions[index].rules};
      let state = initialState(level);
      for (const move of solutions[index].moves) state = stepWorld(level, rules, {...state, direction: direction[move as keyof typeof direction]});
      expect(state.status, `lesson ${level.id}: ${level.name}`).toBe('won');
    });
  });
});
