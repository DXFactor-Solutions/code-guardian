# Code Guardian
## AI-Driven Code Review
This repository serves as a centralized hub for AI-driven code reviews using Azure OpenAI's GPT-4 model. It supports language-specific code review configurations and can automatically detect the programming language for each pull request (PR). The workflow analyzes code changes, generates feedback, and posts comments directly on the PR.

### Features
- Automated Code Review: Automatically generates AI-driven code review comments for pull requests.
- Multi-language Support: Customize prompts for different programming languages.
- PR Integration: Posts AI-generated comments directly to the pull request.
- Customizable Prompts: Define system and user prompts for different languages in a configuration file.
- GitHub Action Workflow: Easily integrates into any project using GitHub Actions.

### How It Works
1. When a pull request is opened, edited, or synchronized, the workflow fetches the code diff between the current branch and its base.
2. The code diff is sent to Azure OpenAI along with language-specific prompts.
3. Azure OpenAI's GPT-4 model generates code review comments.
4. The action posts the comments directly to the pull request via the GitHub CLI (gh).

### Setup Instructions
### Step 1: Add the Workflow to Your Project Repository
Create a workflow file in your project repository .github/workflows/project-workflow.yml and reference the shared AI-Driven Code Review workflow from the common repository:
```yaml
name: Project Code Review

on:
  pull_request:
    types: [opened, edited, reopened, synchronize]

permissions:
  contents: read
  pull-requests: write

jobs:
  run_code_review:
    uses: your-org/common-repo/.github/workflows/ai-driven-review.yml@main
    with:
      azure_openai_api_key: ${{ secrets.AZURE_OPENAI_API_KEY }}
      language: nodejs #optional
      custom_prompt: 'You are a highly skilled Node.js code reviewer. Please review the following code and suggest improvements.' #optional
  run_lint_code_review:
    uses: DXFactor-Solutions/code-guardian/.github/workflows/code-review-linting.yml@main_new
    with:
      language: nodejs  #optional
```

#### Step 2: Configure Secrets
Add the following secrets to your project repository under Settings > Secrets and variables:

- AZURE_OPENAI_API_KEY: Your Azure OpenAI API key to authenticate the API request.
