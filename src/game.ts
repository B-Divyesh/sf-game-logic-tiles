export type Direction = 'up' | 'right' | 'down' | 'left';
export type CollisionRule = 'stop' | 'bounce';

export interface Point { x: number; y: number }
export interface Rules {
  move: 1 | 2;
  collide: CollisionRule;
  collect: boolean;
  timer: number;
  score: 1 | 2 | 3;
}

export interface Level {
  id: number;
  name: string;
  lesson: string;
  objective: string;
  hint: string;
  size: number;
  start: Point;
  goal: Point;
  walls: Point[];
  gems: Point[];
  targetScore: number;
  rules: Rules;
}

export interface GameState {
  player: Point;
  direction: Direction;
  turns: number;
  score: number;
  collected: string[];
  status: 'playing' | 'won' | 'lost';
  event: string;
  diff: string[];
}

export const levels: Level[] = [
  {
    id: 1, name: 'The missed seed', lesson: 'Change one value',
    objective: 'Collect the seed, then reach the beacon.',
    hint: 'The explorer jumps past the seed. Change Move to 1 square.',
    size: 5, start: {x: 0, y: 2}, goal: {x: 4, y: 2},
    walls: [{x: 2, y: 1}, {x: 2, y: 3}], gems: [{x: 1, y: 2}], targetScore: 1,
    rules: {move: 2, collide: 'stop', collect: true, timer: 5, score: 1},
  },
  {
    id: 2, name: 'Hands full', lesson: 'Enable an event',
    objective: 'Collect both seeds, then reach the beacon.',
    hint: 'Walking over a seed does nothing. Turn Collect on.',
    size: 5, start: {x: 0, y: 4}, goal: {x: 4, y: 0},
    walls: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 3}], gems: [{x: 0, y: 2}, {x: 3, y: 0}], targetScore: 2,
    rules: {move: 1, collide: 'stop', collect: false, timer: 10, score: 1},
  },
  {
    id: 3, name: 'Stone rebound', lesson: 'Use a collision',
    objective: 'Bounce from stone, collect the seed, and reach the beacon.',
    hint: 'Change Collide to bounce. Aim right into the stone first.',
    size: 5, start: {x: 3, y: 2}, goal: {x: 0, y: 4},
    walls: [{x: 4, y: 2}, {x: 1, y: 3}, {x: 3, y: 4}], gems: [{x: 2, y: 2}], targetScore: 1,
    rules: {move: 1, collide: 'stop', collect: true, timer: 7, score: 1},
  },
  {
    id: 4, name: 'Last light', lesson: 'Change a timer',
    objective: 'Collect both seeds and reach the beacon in seven turns.',
    hint: 'The timer ends too early. Change Timer to 7 turns.',
    size: 5, start: {x: 0, y: 4}, goal: {x: 4, y: 1},
    walls: [{x: 1, y: 3}, {x: 2, y: 3}, {x: 3, y: 3}], gems: [{x: 0, y: 1}, {x: 3, y: 1}], targetScore: 2,
    rules: {move: 1, collide: 'stop', collect: true, timer: 5, score: 1},
  },
  {
    id: 5, name: 'Worth the walk', lesson: 'Change a score rule',
    objective: 'Score 4 points and reach the beacon.',
    hint: 'Two seeds are available. Change Score to 2 per seed.',
    size: 5, start: {x: 0, y: 0}, goal: {x: 4, y: 4},
    walls: [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 3}], gems: [{x: 1, y: 2}, {x: 3, y: 2}], targetScore: 4,
    rules: {move: 1, collide: 'stop', collect: true, timer: 12, score: 1},
  },
  {
    id: 6, name: 'Long stride', lesson: 'Combine movement and layout',
    objective: 'Cross the clearing and reach the beacon in three turns.',
    hint: 'Change Move to 2 squares. One step crosses two squares.',
    size: 6, start: {x: 0, y: 2}, goal: {x: 4, y: 4},
    walls: [{x: 2, y: 1}, {x: 3, y: 4}], gems: [{x: 2, y: 2}], targetScore: 1,
    rules: {move: 1, collide: 'stop', collect: true, timer: 3, score: 1},
  },
  {
    id: 7, name: 'Bank shot', lesson: 'Trace two effects',
    objective: 'Use a rebound, then collect the seed and exit.',
    hint: 'Move 2 squares and set Collide to bounce.',
    size: 6, start: {x: 4, y: 1}, goal: {x: 2, y: 5},
    walls: [{x: 5, y: 1}, {x: 1, y: 3}, {x: 4, y: 4}], gems: [{x: 2, y: 1}], targetScore: 1,
    rules: {move: 2, collide: 'stop', collect: true, timer: 6, score: 1},
  },
  {
    id: 8, name: 'Quiet cargo', lesson: 'Separate movement from collecting',
    objective: 'Reach the beacon without collecting the marked seed.',
    hint: 'Turn Collect off before crossing the marked seed.',
    size: 5, start: {x: 0, y: 2}, goal: {x: 4, y: 2},
    walls: [{x: 1, y: 1}, {x: 3, y: 3}], gems: [{x: 2, y: 2}], targetScore: 0,
    rules: {move: 1, collide: 'stop', collect: true, timer: 5, score: 1},
  },
  {
    id: 9, name: 'Signal chain', lesson: 'Tune several rules',
    objective: 'Score 6 points and reach the beacon in five turns.',
    hint: 'Move 2 squares and score 3 points per seed.',
    size: 6, start: {x: 0, y: 5}, goal: {x: 4, y: 1},
    walls: [{x: 2, y: 4}, {x: 2, y: 2}, {x: 5, y: 2}], gems: [{x: 0, y: 3}, {x: 4, y: 1}], targetScore: 6,
    rules: {move: 1, collide: 'stop', collect: true, timer: 5, score: 1},
  },
  {
    id: 10, name: 'The whole clearing', lesson: 'Design a working rule set',
    objective: 'Collect three seeds, score 6, and reach the beacon.',
    hint: 'Try Move 1, Collect on, Timer 12, and Score 2.',
    size: 6, start: {x: 0, y: 5}, goal: {x: 5, y: 0},
    walls: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 4, y: 2}, {x: 1, y: 4}, {x: 3, y: 4}],
    gems: [{x: 0, y: 2}, {x: 3, y: 2}, {x: 5, y: 3}], targetScore: 6,
    rules: {move: 2, collide: 'bounce', collect: false, timer: 7, score: 1},
  },
];

const pointKey = ({x, y}: Point) => `${x},${y}`;
const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

export function initialState(level: Level): GameState {
  return {
    player: {...level.start}, direction: 'right', turns: 0, score: 0, collected: [],
    status: 'playing', event: 'Board ready. Choose a direction, then run one turn.', diff: ['No state change yet.'],
  };
}

const vectors: Record<Direction, Point> = {
  up: {x: 0, y: -1}, right: {x: 1, y: 0}, down: {x: 0, y: 1}, left: {x: -1, y: 0},
};
const opposite: Record<Direction, Direction> = {up: 'down', right: 'left', down: 'up', left: 'right'};

export function stepWorld(level: Level, rules: Rules, state: GameState): GameState {
  if (state.status !== 'playing') return state;
  const before = {...state.player};
  let player = {...state.player};
  let direction = state.direction;
  let score = state.score;
  const collected = [...state.collected];
  const events: string[] = [];

  for (let distance = 0; distance < rules.move; distance += 1) {
    let vector = vectors[direction];
    let next = {x: player.x + vector.x, y: player.y + vector.y};
    const blocked = next.x < 0 || next.y < 0 || next.x >= level.size || next.y >= level.size || level.walls.some(wall => samePoint(wall, next));
    if (blocked && rules.collide === 'stop') {
      events.push('Stone stopped the move.');
      break;
    }
    if (blocked) {
      direction = opposite[direction];
      vector = vectors[direction];
      next = {x: player.x + vector.x, y: player.y + vector.y};
      const reboundBlocked = next.x < 0 || next.y < 0 || next.x >= level.size || next.y >= level.size || level.walls.some(wall => samePoint(wall, next));
      events.push(`Collision changed direction to ${direction}.`);
      if (reboundBlocked) break;
    }
    player = next;
  }

  const landingKey = pointKey(player);
  if (rules.collect && level.gems.some(gem => samePoint(gem, player)) && !collected.includes(landingKey)) {
    collected.push(landingKey);
    score += rules.score;
    events.push(`Collected a seed for ${rules.score} point${rules.score === 1 ? '' : 's'}.`);
  }

  const turns = state.turns + 1;
  const allRequired = level.targetScore === 0 ? collected.length === 0 : collected.length === level.gems.length;
  const won = samePoint(player, level.goal) && allRequired && score >= level.targetScore;
  const lost = !won && turns >= rules.timer;
  const status = won ? 'won' : lost ? 'lost' : 'playing';
  if (won) events.push('The beacon is lit. Puzzle solved.');
  if (lost) events.push('The timer ended. Change a rule or reset the world.');
  if (!events.length) events.push(`Moved ${rules.move} square${rules.move === 1 ? '' : 's'}.`);

  const diff = [
    `Position ${before.x + 1},${before.y + 1} → ${player.x + 1},${player.y + 1}`,
    `Turns ${state.turns} → ${turns}`,
    `Seeds ${state.collected.length} → ${collected.length}`,
    `Score ${state.score} → ${score}`,
  ];
  return {player, direction, turns, score, collected, status, event: events.join(' '), diff};
}

export function createSeed(levelId: number, rules: Rules): string {
  const body = `${levelId.toString(36)}${rules.move}${rules.collide === 'bounce' ? 'b' : 's'}${rules.collect ? '1' : '0'}${rules.timer.toString(36)}${rules.score}`;
  let checksum = 0;
  for (const character of body) checksum = (checksum + character.charCodeAt(0)) % 36;
  return `GLT1-${body}-${checksum.toString(36)}`.toUpperCase();
}

export function parseSeed(seed: string): {levelId: number; rules: Rules} | null {
  const match = /^GLT1-([0-9A-Z])([12])([BS])([01])([0-9A-Z])([123])-([0-9A-Z])$/i.exec(seed.trim());
  if (!match) return null;
  const body = match.slice(1, 7).join('').toLowerCase();
  let checksum = 0;
  for (const character of body) checksum = (checksum + character.charCodeAt(0)) % 36;
  if (checksum.toString(36) !== match[7].toLowerCase()) return null;
  const levelId = Number.parseInt(match[1], 36);
  const timer = Number.parseInt(match[5], 36);
  if (!levels.some(level => level.id === levelId) || timer < 3 || timer > 20) return null;
  return {
    levelId,
    rules: {
      move: Number(match[2]) as 1 | 2,
      collide: match[3].toLowerCase() === 'b' ? 'bounce' : 'stop',
      collect: match[4] === '1', timer, score: Number(match[6]) as 1 | 2 | 3,
    },
  };
}
