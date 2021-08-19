import { strictEqual } from 'assert';
import { generateTournamentFile } from '../../../../src/tournament';
import { readFileSync, writeFileSync } from 'fs';

describe('Tournament', () => {

    const path = 'tests/unit/spec/tournament/';
    it('normal data', async () => {
        const file = readFileSync(`${path}input/1.txt`, 'utf-8');
        const { arr, output } = generateTournamentFile(file);
        strictEqual(arr.length, 4);
        strictEqual(arr[0][0], 'Devastating Donkeys');
        writeFileSync(`${path}output/1.txt`, output);
    });
});