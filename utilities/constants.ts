export const CHARACTER_PREFIX = 'wf-characters';
export const CHARACTER_ASSETS_URL = `${process.env.API_URL ?? 'localhost:8080'}`;
export const WEAPON_PREFIX = 'wf-weapons';
export const WEAPON_ASSETS_URL = `${process.env.API_URL ?? 'localhost:8080'}`;

export const INVALID_CHAR: Array<RegExp> = [/%/g, /_/g];
