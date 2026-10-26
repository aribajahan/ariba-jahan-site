import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../app/api/contact/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const valid = { name: 'Website Test', email: 'test@example.com', organization: 'Example', role: 'Tester', message: 'A test message long enough to pass validation.' };

function handler(send, configured = true) {
  const exports = {};
  const calls = [];
  runInNewContext(compiled, {
    exports,
    require: name => name === 'resend' ? { Resend: class { emails = { send: async payload => { calls.push(payload); return send(payload); } }; } } : require(name),
    process: { env: configured ? { RESEND_API_KEY: 'local-test-placeholder' } : {} },
    console: { error() {} },
  });
  return { POST: exports.POST, calls };
}
const request = body => new Request('https://example.com/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });

test('provider rejection never reports success', async () => {
  const { POST } = handler(() => ({ data: null, error: { name: 'validation_error', message: 'Rejected' } }));
  const response = await POST(request(valid));
  assert.equal(response.status, 502);
  assert.equal((await response.json()).ok, false);
});
test('only an accepted message ID produces success', async () => {
  const { POST, calls } = handler(() => ({ data: { id: 'accepted-test-id' }, error: null }));
  const response = await POST(request(valid));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(calls[0].replyTo, valid.email);
});
test('empty provider response does not produce success', async () => {
  const { POST } = handler(() => ({ data: null, error: null }));
  assert.equal((await POST(request(valid))).status, 502);
});
test('transport exception produces a retryable failure', async () => {
  const { POST } = handler(() => { throw new Error('Transport failure'); });
  assert.equal((await POST(request(valid))).status, 500);
});
test('missing email configuration fails without contacting the provider', async () => {
  const { POST, calls } = handler(() => assert.fail('Provider must not be contacted'), false);
  assert.equal((await POST(request(valid))).status, 503);
  assert.equal(calls.length, 0);
});
test('invalid payload and malformed JSON never contact the provider', async () => {
  const { POST, calls } = handler(() => assert.fail('Provider must not be contacted'));
  for (const value of [null, [], { ...valid, email: 'invalid' }]) assert.equal((await POST(request(value))).status, 400);
  assert.equal((await POST(new Request('https://example.com/api/contact', { method: 'POST', body: '{' }))).status, 400);
  assert.equal(calls.length, 0);
});
test('honeypot submissions are discarded without sending', async () => {
  const { POST, calls } = handler(() => assert.fail('Provider must not be contacted'));
  assert.equal((await POST(request({ ...valid, company_website: 'spam' }))).status, 200);
  assert.equal(calls.length, 0);
});
