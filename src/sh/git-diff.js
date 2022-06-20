const exec = require('child_process').execSync;
const tag =
	process.argv[2] ||
	exec('git describe --tags --abbrev=0')
		.toString('utf-8')
		.trim();
const tag2 = process.argv[3] || 'HEAD';
const gitDiff = `git diff --name-only ${tag2} ${tag} --diff-filter=ACMR`;
const list = exec(gitDiff)
	.toString('utf-8')
	.trim();
console.log(list);
