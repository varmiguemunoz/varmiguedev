import { existsSync, readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

for (const file of ['.env.local', '.env']) {
  if (!existsSync(file)) continue;
  try {
    const parsed = parseEnv(readFileSync(file, 'utf8'));
    for (const [key, value] of Object.entries(parsed)) {
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {}
}
