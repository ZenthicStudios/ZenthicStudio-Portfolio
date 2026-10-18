import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

test("compiled Vercel entry loads in plain Node and preserves HTTP/cache behavior", () => {
  mkdirSync("work", { recursive: true });
  const output = mkdtempSync(resolve("work/runtime-check-"));
  execFileSync(
    process.execPath,
    [
      "node_modules/typescript/bin/tsc",
      "api/roblox-stats.ts",
      "--outDir",
      output,
      "--target",
      "ES2022",
      "--module",
      "NodeNext",
      "--moduleResolution",
      "NodeNext",
      "--strict",
      "--skipLibCheck",
    ],
    { stdio: "pipe" },
  );
  const entry = pathToFileURL(resolve(output, "api/roblox-stats.js")).href;
  // A plain Node child catches missing emitted files that tsx/Vite can conceal.
  const script = `
    import assert from 'node:assert/strict';
    let fail = true;
    globalThis.fetch = async (input) => {
      if (fail) throw Error('Simulated upstream outage');
      const url = new URL(input);
      return Response.json({data: url.hostname === 'games.roblox.com'
        ? url.searchParams.get('universeIds').split(',').map(id => ({id:Number(id),name:'Game '+id,visits:10,playing:1})) : []});
    };
    const {default:handler} = await import(${JSON.stringify(entry)});
    async function request(method) {
      const headers = {}; let body;
      const response = { setHeader:(key,value)=>headers[key]=value, end:value=>body=value };
      await handler({method},response);
      return {status:response.statusCode,headers,body};
    }
    const rejected = await request('POST');
    assert.equal(rejected.status,405);
    assert.equal(rejected.headers.Allow,'GET, HEAD');
    assert.equal(rejected.headers['Cache-Control'],'no-store');
    const outage = await request('GET');
    assert.equal(outage.status,200);
    assert.equal(JSON.parse(outage.body).totalVisits,null);
    assert.equal(outage.headers['Cache-Control'],'no-store');
    fail = false;
    const healthy = await request('GET');
    assert.equal(JSON.parse(healthy.body).games.length,13);
    assert.equal(JSON.parse(healthy.body).stale,false);
    assert.equal(healthy.headers['Cache-Control'],'public, s-maxage=60, stale-while-revalidate=300');
    const head = await request('HEAD');
    assert.equal(head.body,undefined);
    console.log('runtime checks passed');
  `;
  const result = execFileSync(
    process.execPath,
    ["--input-type=module", "--eval", script],
    {
      encoding: "utf8",
      env: { ...process.env, NODE_OPTIONS: "" },
    },
  );
  assert.match(result, /runtime checks passed/);
});
