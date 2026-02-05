# @mikert/mrm-preset-guardrails

Mrm preset for project guardrails - sets up CI workflows, Husky pre-commit hooks, and lint-staged.

## Usage

```bash
# Run all tasks
npx mrm husky ci-workflow --preset @mikert/guardrails

# Run individual tasks
npx mrm husky --preset @mikert/guardrails
npx mrm ci-workflow --preset @mikert/guardrails
```

## Tasks

### husky

Sets up Husky with lint-staged for pre-commit hooks.

**What it does:**
- Installs `husky` and `lint-staged`
- Adds `prepare` script to package.json
- Creates `.husky/pre-commit` hook
- Configures lint-staged rules

**Default lint-staged rules:**
```json
{
  "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"]
}
```

**Custom configuration:**
```bash
npx mrm husky --preset @mikert/guardrails --config:lintStagedRules='{"*.py": ["black"]}'
```

### ci-workflow

Sets up GitHub Actions CI workflow.

**What it does:**
- Creates `.github/workflows/ci.yml`
- Configures checkout, Node.js setup, and npm install
- Optionally runs lint, build, and test steps

**Default configuration:**
- Node.js version: 20
- Branches: main, master
- Steps: lint, build, test (all enabled)

**Custom configuration:**
```bash
npx mrm ci-workflow --preset @mikert/guardrails --config:nodeVersion=18 --config:runTests=false
```

## Configuration

Create a `~/.mrm/config.json` file to set your defaults:

```json
{
  "preset": "@mikert/guardrails",
  "husky": {
    "lintStagedRules": {
      "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"]
    }
  },
  "ciWorkflow": {
    "nodeVersion": "20",
    "branches": ["main", "develop"]
  }
}
```

## License

MIT
