const file = 'archive.zip';
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const tag =
	process.argv[2] ||
	execSync('git describe --tags --abbrev=0')
		.toString('utf-8')
		.trim();
const tag2 = process.argv[3] || 'HEAD';
const gitDiff = `git archive --format=zip --prefix=archive/ ${tag2} \`git diff --name-only ${tag2} ${tag} --diff-filter=ACMR\` -o ${file}`;
exec(gitDiff, (err) => {
	if (err) {
		throw err;
	}
	console.log(`🎉 ${file}`);
});
