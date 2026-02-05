const { yaml, makeDirs } = require('mrm-core');

function task() {
  // Default configuration
  const nodeVersion = '20';
  const runTests = true;
  const runLint = true;
  const runBuild = true;
  const branches = ['main', 'master'];

  // Create .github/workflows directory
  makeDirs('.github/workflows');

  // Build workflow file
  const workflow = yaml('.github/workflows/ci.yml');

  // Build steps array
  const steps = [
    { uses: 'actions/checkout@v4' },
    {
      name: 'Setup Node.js',
      uses: 'actions/setup-node@v4',
      with: {
        'node-version': nodeVersion,
        cache: 'npm'
      }
    },
    {
      name: 'Install dependencies',
      run: 'npm ci'
    }
  ];

  if (runLint) {
    steps.push({
      name: 'Lint',
      run: 'npm run lint --if-present'
    });
  }

  if (runBuild) {
    steps.push({
      name: 'Build',
      run: 'npm run build --if-present'
    });
  }

  if (runTests) {
    steps.push({
      name: 'Test',
      run: 'npm test --if-present'
    });
  }

  // Merge workflow configuration
  workflow.merge({
    name: 'CI',
    on: {
      push: { branches },
      pull_request: { branches }
    },
    jobs: {
      build: {
        'runs-on': 'ubuntu-latest',
        steps
      }
    }
  });

  workflow.save();

  console.log('✓ GitHub Actions CI workflow configured');
  console.log(`  Node.js version: ${nodeVersion}`);
  console.log(`  Branches: ${branches.join(', ')}`);
}

task.description = 'Setup GitHub Actions CI workflow';
module.exports = task;
