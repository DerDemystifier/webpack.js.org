import { Octokit as GithubAPI } from '@octokit/rest';
import { createActionAuth } from '@octokit/auth-action';
/** @type import('@octokit/rest').Octokit */
let api;
if (
  process.env.CI &&
  process.env.GITHUB_ACTION &&
  (process.env.CI === 'true' || process.env.CI === '1') // see https://github.com/cypress-io/github-action/blob/9674a20f82e9e45ec75aa66038310b00e2f24657/index.js#L223 for CI === '1'
) {
  const auth = createActionAuth();
  const authentication = await auth();
  api = new GithubAPI({
    auth: authentication.token,
  });
  console.log('api is authenticated');
} else {
  api = new GithubAPI();
  console.log('api is not authenticated');
}
export default api;
