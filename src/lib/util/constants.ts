import { getRootData } from '@sapphire/pieces';
import { join } from 'node:path';

export const mainFolder = getRootData().root;
export const rootFolder = join(mainFolder, '..');

export const defaultColor = '#070511';
export const fakeQueue = [
	{
		name: 'Neph',
		avatar: 'https://media.discordapp.net/attachments/1029728202358259762/1033058794340618310/4892e36efdf899249d5740c75cbca35b.png?width=455&height=455',
		id: '535345364565789657',
		short_description: 'The best customisable economy and game bot.'
	}
];
