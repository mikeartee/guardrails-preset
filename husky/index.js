const { packageJson, install } = require('mrm-core');
const fs = require('fs');
const path = require('path');

function task() {
  // Default lint-staged rules
  const lintStagedRules = {
    '*.{js,ts,tsx}': ['eslint --fix', 'prettier --write'],
    '*.{json,md,yml,yaml}': ['prettier --write']
  };

  // Install dependencies
  install(['husky', 'lint-staged']);

  // Update package.json
  const pkg = packageJson();

  // Add prepare script for husky
  pkg.merge({
    scripts: {
      prepare: 'husky'
    },
    'lint-staged': lintStagedRules
  });

  pkg.save();

  // Create .husky directory if it doesn't exist
  const huskyDir = path.join(process.cwd(), '.husky');
  if (!fs.existsSync(huskyDir)) {
    fs.mkdirSync(huskyDir, { recursive: true });
  }

  // Create pre-commit hook
  const preCommitPath = path.join(huskyDir, 'pre-commit');
  const preCommitContent = `npx lint-staged\n`;

  fs.writeFileSync(preCommitPath, preCommitContent);

  // Make executable on Unix systems
  try {
    fs.chmodSync(preCommitPath, 0o755);
  } catch (e) {
    // Windows doesn't need chmod
  }

  console.log('✓ Husky and lint-staged configured');
  console.log('  Run "npm install" to activate hooks');
}

task.description = 'Setup Husky pre-commit hooks with lint-staged';
module.exports = task;
