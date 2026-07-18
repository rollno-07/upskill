export interface QuestionData {
  id: number;
  question: string;
  answer: string;
  category: string;
  concept: string;
  visualType: 'pipeline' | 'deployment' | 'docker' | 'db-migration' | 'git-flow' | 'general';
  codeExample?: string;
  keyTakeaway: string;
}

export const CATEGORIES = {
  FUNDAMENTALS: "CI/CD Fundamentals",
  PIPELINES: "Pipeline Config & CI Tools",
  DEPLOYMENTS: "Deployment Strategies",
  TESTING: "Testing & Quality Gates",
  OPTIMIZATION: "Build Optimization & Containers",
  SECURITY: "Secrets, Config & Security",
  GIT_GITOPS: "Git, Monorepos & GitOps",
  METRICS_CAREER: "Metrics, Observability & Careers"
};

export const questionsData: QuestionData[] = [
  {
    id: 1,
    question: "What does CI/CD stand for?",
    answer: "Continuous Integration and Continuous Delivery/Deployment.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Continuous Delivery vs Deployment",
    visualType: "pipeline",
    keyTakeaway: "CI/CD bridges development and operations through automated workflows.",
    codeExample: `# Conceptual representation
Build -> Test -> Package -> [Delivery (manual release) | Deployment (auto release)]`
  },
  {
    id: 2,
    question: "What is Continuous Integration?",
    answer: "The practice of frequently merging code changes into a shared branch, with automated builds/tests run on every change.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Continuous Integration",
    visualType: "pipeline",
    keyTakeaway: "Early verification avoids 'integration hell' at the end of feature cycles.",
    codeExample: `# Simple GitHub Action triggered on push to main
name: CI
on:
  push:
    branches: [ main ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Tests
        run: npm test`
  },
  {
    id: 3,
    question: "Why does CI matter?",
    answer: "Catches integration issues/bugs early and often, rather than discovering conflicts/breakage only during a large, infrequent merge.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Continuous Integration Benefit",
    visualType: "pipeline",
    keyTakeaway: "Finding a bug during local PR integration is 10x cheaper to fix than in production.",
    codeExample: `# Fast-feedback loop workflow
Commit Change -> Push Branch -> Automate Build/Test -> Green/Red PR Status -> Safe Merge`
  },
  {
    id: 4,
    question: "What is Continuous Delivery?",
    answer: "Ensuring code is always in a deployable state after passing all automated checks, with actual deployment to production a manual decision/trigger.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Continuous Delivery",
    visualType: "deployment",
    keyTakeaway: "Keeps business logic ready for immediate shipping, leaving release timing to business needs.",
    codeExample: `# GitHub Actions workflow for CD with an manual gate
name: Release CD
on:
  release:
    types: [published]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: ./deploy-to-prod.sh`
  },
  {
    id: 5,
    question: "What is Continuous Deployment?",
    answer: "Extends Continuous Delivery by automatically deploying every change that passes all pipeline checks, with no manual approval gate.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Continuous Deployment",
    visualType: "deployment",
    keyTakeaway: "Eliminates human delays between code completion and customer value.",
    codeExample: `# Continuous deployment setup on main branch build success
on:
  push:
    branches: [main]
jobs:
  cd:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Live
        run: npx caprover deploy --app my-app`
  },
  {
    id: 6,
    question: "What's the key difference between Continuous Delivery and Continuous Deployment?",
    answer: "Delivery stops just short of production with a manual approval step; Deployment removes that step entirely, deploying automatically.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Delivery vs Deployment",
    visualType: "deployment",
    keyTakeaway: "Continuous Delivery has a human checkpoint. Continuous Deployment is fully hands-off.",
    codeExample: `Delivery:   Build -> Test -> Staging -> [Manual Approval Gate] -> Production
Deployment: Build -> Test -> Staging -> [Automatic Gate Check]  -> Production`
  },
  {
    id: 7,
    question: "What is a CI/CD pipeline?",
    answer: "A defined, automated sequence of stages (build, test, package, deploy) that code passes through on its way to being released.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Pipeline Structure",
    visualType: "pipeline",
    keyTakeaway: "Pipelines formalize and repeat your release process reliably.",
    codeExample: `stages:
  - build
  - test
  - scan
  - deploy`
  },
  {
    id: 8,
    question: "What is a pipeline stage?",
    answer: "A distinct phase in the pipeline (e.g. 'build', 'unit test', 'deploy to staging'), each with its own pass/fail outcome gating progression to the next.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Pipeline Stages",
    visualType: "pipeline",
    keyTakeaway: "Splitting into stages provides structured checkpoints and speeds up debugging.",
    codeExample: `# Sequential Pipeline stage configuration
jobs:
  build: { ... }
  test:
    needs: build
    steps: { ... }
  deploy:
    needs: test
    steps: { ... }`
  },
  {
    id: 9,
    question: "What triggers a CI/CD pipeline run?",
    answer: "Commonly a git push, a pull request being opened/updated, a merge to a specific branch, a scheduled time, or a manual trigger.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Pipeline Triggers",
    visualType: "pipeline",
    keyTakeaway: "Webhooks connect git events directly to the orchestration engine.",
    codeExample: `on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    - cron: '0 0 * * *' # Daily midnight
  workflow_dispatch: # Manual button`
  },
  {
    id: 10,
    question: "What is a build step?",
    answer: "Compiling/transpiling source code and packaging it into a deployable artifact (binary, container image, bundle).",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Build Step",
    visualType: "pipeline",
    keyTakeaway: "Converts developers' readable code into optimized, executable forms.",
    codeExample: `# Standard modern build script configuration
npm ci
npm run build # Triggers esbuild / vite / tsc`
  },
  {
    id: 11,
    question: "What is a build artifact?",
    answer: "The output of the build step — ready to be tested and/or deployed.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Build Artifact",
    visualType: "pipeline",
    keyTakeaway: "Artifacts should be immutable, versioned, and stored securely.",
    codeExample: `- name: Upload Artifacts
  uses: actions/upload-artifact@v4
  with:
    name: release-bundle
    path: dist/`
  },
  {
    id: 12,
    question: "What is an artifact repository?",
    answer: "A storage system for versioned build artifacts/container images (e.g. Artifact Registry, Nexus, Docker Hub, npm registry).",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Artifact Repositories",
    visualType: "docker",
    keyTakeaway: "Guarantees a centralized, historical registry of exactly what went to production.",
    codeExample: `# Pushing built image to artifact repository
docker tag app:latest gcr.io/my-project/app:v1.0.0
docker push gcr.io/my-project/app:v1.0.0`
  },
  {
    id: 13,
    question: "What is a CI/CD 'runner' or 'agent'?",
    answer: "The machine/container/process that actually executes the pipeline's steps.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Runners and Agents",
    visualType: "pipeline",
    keyTakeaway: "Orchestrated dynamically to run jobs in clean isolation.",
    codeExample: `jobs:
  run-job:
    runs-on: ubuntu-22.04 # Specifies the environment / runner type`
  },
  {
    id: 14,
    question: "What is a self-hosted runner vs a cloud-hosted runner?",
    answer: "Self-hosted: you manage the machine executing pipeline jobs (more control, more maintenance); cloud-hosted: the CI provider manages ephemeral infrastructure for you.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Runner Environments",
    visualType: "pipeline",
    keyTakeaway: "Self-hosted saves costs and accesses local networks, cloud-hosted eliminates operations overhead.",
    codeExample: `runs-on: self-hosted # For custom internal physical/virtual machines
# vs
runs-on: ubuntu-latest # Cloud-hosted micro-VM`
  },
  {
    id: 15,
    question: "What is pipeline-as-code?",
    answer: "Defining your CI/CD pipeline configuration in a version-controlled file (e.g. '.github/workflows/*.yml', 'Jenkinsfile') rather than through a UI, enabling review/history like any other code.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Pipeline-as-Code",
    visualType: "pipeline",
    keyTakeaway: "Allows pipelines to be versioned, branched, audited, and code-reviewed.",
    codeExample: `# Defined in repo root at /.github/workflows/ci.yml
name: Pipeline As Code
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Full history tracked in Git!"`
  },
  {
    id: 16,
    question: "What are common CI/CD tools?",
    answer: "GitHub Actions, GitLab CI/CD, Jenkins, CircleCI, Travis CI, Azure DevOps Pipelines, AWS CodePipeline, Google Cloud Build.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Ecosystem Tools",
    visualType: "general",
    keyTakeaway: "Modern trends favor tight Git repository integrations (GitHub/GitLab) over external engines.",
    codeExample: `# Different formats:
- GitHub Actions: .github/workflows/main.yml
- GitLab CI/CD: .gitlab-ci.yml
- Jenkins: Jenkinsfile (declarative/scripted Groovy)`
  },
  {
    id: 17,
    question: "What is a GitHub Actions 'workflow'?",
    answer: "A YAML-defined automated process triggered by repository events, composed of one or more jobs.",
    category: CATEGORIES.PIPELINES,
    concept: "GitHub Workflows",
    visualType: "pipeline",
    keyTakeaway: "The high-level container that schedules and reacts to your Git repository lifecycle.",
    codeExample: `name: Main Workflow
on: [push, pull_request]
jobs:
  first-job:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Workflow running"`
  },
  {
    id: 18,
    question: "What is a GitHub Actions 'job'?",
    answer: "A set of steps that run on the same runner, potentially running in parallel with other jobs in the workflow unless dependencies are specified.",
    category: CATEGORIES.PIPELINES,
    concept: "GitHub Jobs",
    visualType: "pipeline",
    keyTakeaway: "Jobs are isolated blocks of work. They can scale out in parallel for performance.",
    codeExample: `jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [{ run: npm run lint }]
  test:
    runs-on: ubuntu-latest
    steps: [{ run: npm test }] # Runs in parallel with 'lint'!`
  },
  {
    id: 19,
    question: "What is a GitHub Actions 'step'?",
    answer: "An individual task within a job — running a command or using a reusable 'action'.",
    category: CATEGORIES.PIPELINES,
    concept: "GitHub Steps",
    visualType: "pipeline",
    keyTakeaway: "Steps run sequentially on the runner. State/filesystem is shared within the job.",
    codeExample: `steps:
  - name: Checkout Code # Step 1
    uses: actions/checkout@v4
  - name: Run Audit # Step 2
    run: npm audit`
  },
  {
    id: 20,
    question: "What is a GitHub Action (reusable)?",
    answer: "A packaged, reusable unit of automation (e.g. 'actions/checkout') that can be referenced in a workflow step.",
    category: CATEGORIES.PIPELINES,
    concept: "Reusable Actions",
    visualType: "pipeline",
    keyTakeaway: "Saves rewriting logic for boilerplate actions (setup NodeJS, AWS login, caches).",
    codeExample: `# Using official, community-verified actions
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20'`
  },
  {
    id: 21,
    question: "What is a Jenkinsfile?",
    answer: "A file defining a Jenkins pipeline as code, typically written in Groovy-based declarative or scripted syntax.",
    category: CATEGORIES.PIPELINES,
    concept: "Jenkinsfile Syntax",
    visualType: "pipeline",
    keyTakeaway: "Provides enterprise-grade flexibility for classic self-hosted CI servers.",
    codeExample: `pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}`
  },
  {
    id: 22,
    question: "What is the difference between declarative and scripted Jenkins pipelines?",
    answer: "Declarative: structured, simpler, more opinionated syntax; scripted: full Groovy scripting flexibility, more complex but more powerful for edge cases.",
    category: CATEGORIES.PIPELINES,
    concept: "Jenkins Paradigms",
    visualType: "pipeline",
    keyTakeaway: "Use declarative for 95% of pipelines; reserve scripted for dynamically compiled stages.",
    codeExample: `// Scripted style uses node and procedural script blocks:
node {
    stage('Build') {
        try {
            sh './compile.sh'
        } catch (err) {
            currentBuild.result = 'FAILED'
        }
    }
}`
  },
  {
    id: 23,
    question: "What is a 'matrix build'?",
    answer: "Running the same pipeline job across multiple combinations of variables (e.g. multiple Node versions/OSes) in parallel to test broad compatibility.",
    category: CATEGORIES.PIPELINES,
    concept: "Matrix Configurations",
    visualType: "pipeline",
    keyTakeaway: "Essential for libraries, SDKs, and open-source requiring wide OS/runtime support.",
    codeExample: `strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [18, 20, 22]
runs-on: \${{ matrix.os }} # Will run 9 separate jobs in parallel!`
  },
  {
    id: 24,
    question: "What is caching in a CI pipeline used for?",
    answer: "Reusing previously downloaded dependencies/build outputs across runs to significantly speed up pipeline execution.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "CI Pipeline Caching",
    visualType: "docker",
    keyTakeaway: "Prevents fetching unchanged files (e.g. node_modules, maven .m2) on every single build.",
    codeExample: `- name: Cache node modules
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('/package-lock.json') }}
    restore-keys: |
      \${{ runner.os }}-node-`
  },
  {
    id: 25,
    question: "What is a common thing to cache in a Node.js CI pipeline?",
    answer: "The 'node_modules' directory or the package manager's cache (npm/yarn cache), keyed by the lockfile hash.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Node.js Caching",
    visualType: "docker",
    keyTakeaway: "Using the lockfile as a cache key ensures updates occur automatically when dependencies change.",
    codeExample: `# Using setup-node's built-in caching engine
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'`
  },
  {
    id: 26,
    question: "What happens if you don't invalidate cache correctly?",
    answer: "Stale dependencies/build outputs can cause incorrect test results or subtly broken builds that pass locally but fail (or vice versa) in CI.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Cache Invalidation Problems",
    visualType: "docker",
    keyTakeaway: "A stale cache will trick pipelines into compiling with mismatched local state.",
    codeExample: `# ALWAYS incorporate lockfile hash in key. Do NOT use static strings.
key: cache-v1 # BAD! Stale dependencies will never update.
key: cache-\${{ hashFiles('package-lock.json') }} # GOOD!`
  },
  {
    id: 27,
    question: "What is a pipeline 'gate' or 'quality gate'?",
    answer: "A required condition (passing tests, code coverage threshold, security scan) that must succeed before the pipeline proceeds to the next stage.",
    category: CATEGORIES.TESTING,
    concept: "Quality Gates",
    visualType: "pipeline",
    keyTakeaway: "Forces objective standards of health and security automatically before releasing code.",
    codeExample: `# Quality Gate: Check test coverage and block if < 80%
- name: Check Jest Coverage Gate
  run: |
    COVERAGE=$(npx jest --coverage | grep "All files" | awk '{print $4}' | cut -d. -f1)
    if [ "$COVERAGE" -lt 80 ]; then
      echo "Coverage ($COVERAGE%) is below quality gate threshold (80%)!"
      exit 1
    fi`
  },
  {
    id: 28,
    question: "What is branch protection and how does it relate to CI?",
    answer: "Repository settings requiring CI checks to pass (and often review approval) before a branch can be merged, enforcing quality gates at the git level.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Branch Protection Enforcements",
    visualType: "git-flow",
    keyTakeaway: "Protects stable branches from human oversight or bypasses.",
    codeExample: `Branch: main
  - Required Status Check: "build_and_test"
  - Required Pull Request Reviews: 1
  - Dismiss stale reviews on new commits`
  },
  {
    id: 29,
    question: "What is a status check in the context of pull requests?",
    answer: "The pass/fail result of a CI pipeline run, displayed directly on the PR, often required before merging is allowed.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Pull Request Status Checks",
    visualType: "git-flow",
    keyTakeaway: "Provides instant feedback to reviewers and authors on commit validity.",
    codeExample: `# REST API status update payload
POST /repos/owner/repo/statuses/{sha}
{
  "state": "success",
  "context": "CI/CD Build-Test",
  "target_url": "https://ci.example.com/job/42"
}`
  },
  {
    id: 30,
    question: "What is the purpose of running tests in CI rather than relying solely on local testing?",
    answer: "Ensures consistency (same environment for everyone), catches issues before merge regardless of whether a developer remembered to test locally, and provides an auditable record of test results.",
    category: CATEGORIES.TESTING,
    concept: "Authoritative CI Testing",
    visualType: "pipeline",
    keyTakeaway: "Solves the 'it works on my machine' excuse by utilizing clean, isolated sandboxes.",
    codeExample: `# CI Environment Isolation Guarantee
- runs-on: ubuntu-latest # No localized OS configurations / dev environments
- run: npm ci # Performs exact lockfile install`
  },
  {
    id: 31,
    question: "What is a smoke test in a CD pipeline?",
    answer: "A quick, minimal set of checks run immediately after deployment to confirm the application is at least functioning before considering the deploy successful.",
    category: CATEGORIES.TESTING,
    concept: "Smoke Testing",
    visualType: "deployment",
    keyTakeaway: "Fast fail-safes that prove basic system components (DB connections, port bindings) are healthy.",
    codeExample: `# Basic smoke test pinging health-check endpoint
curl --fail --retry 5 --retry-delay 5 https://staging.app/api/health
if [ $? -ne 0 ]; then
  echo "Smoke test failed! Rollback initiated."
  exit 1
fi`
  },
  {
    id: 32,
    question: "What is a deployment environment (in CI/CD tooling terms)?",
    answer: "A named target (e.g. staging, production) with its own configuration/secrets/approval rules, often used to gate or track where a pipeline has deployed.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Named Target Environments",
    visualType: "deployment",
    keyTakeaway: "Allows pipelines to configure specific variables and access control per stage.",
    codeExample: `jobs:
  prod_deploy:
    runs-on: ubuntu-latest
    environment:
      name: Production
      url: https://my-app.com
    steps:
      - run: echo "Deploying with production secrets"`
  },
  {
    id: 33,
    question: "What is a manual approval step in a CD pipeline?",
    answer: "A pipeline pause requiring a human to explicitly approve before proceeding (typically before deploying to production).",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Manual Approvals",
    visualType: "deployment",
    keyTakeaway: "Bridges automated systems and business operations / release coordination.",
    codeExample: `jobs:
  deploy_prod:
    environment: 'production' # Triggers GitHub UI approval popups
    runs-on: ubuntu-latest`
  },
  {
    id: 34,
    question: "What is a rolling deployment?",
    answer: "Gradually replacing old instances with new ones in batches, keeping the service available throughout.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Rolling Deployments",
    visualType: "deployment",
    keyTakeaway: "Cost-efficient since it updates in-place, but old and new versions run concurrently.",
    codeExample: `# Kubernetes rolling update configuration
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1       # Spin up 1 extra instance
      maxUnavailable: 0 # Never take down healthy instances`
  },
  {
    id: 35,
    question: "What is blue-green deployment?",
    answer: "Maintaining two identical environments (blue = current, green = new); traffic switches entirely to green once verified, enabling instant rollback by switching back.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Blue-Green Deployments",
    visualType: "deployment",
    keyTakeaway: "Zero downtime with immediate rollback, but requires double the hosting resources.",
    codeExample: `# Concept of Nginx load balancer router swap
upstream blue_env { server 10.0.0.1:8080; }
upstream green_env { server 10.0.0.2:8080; }

server {
    # Swap active upstream from blue to green
    location / {
        proxy_pass http://green_env; 
    }
}`
  },
  {
    id: 36,
    question: "What is canary deployment?",
    answer: "Releasing a new version to a small subset of traffic/users first, monitoring for issues, before gradually increasing to full rollout.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Canary Deployments",
    visualType: "deployment",
    keyTakeaway: "Minimizes blast radius of bugs by using early adopters/subsets as validation gates.",
    codeExample: `# Istio VirtualService Canary Routing (10% traffic to v2, 90% to v1)
spec:
  http:
    - route:
        - destination:
            host: app-service
            subset: v1
          weight: 90
        - destination:
            host: app-service
            subset: v2
          weight: 10`
  },
  {
    id: 37,
    question: "What is a rollback in CD, and how should it be automated?",
    answer: "Reverting to a previously known-good deployed version; ideally automatable via redeploying a previous artifact/image tag or triggering an infrastructure-level switch (e.g. blue-green swap back).",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Automated Rollbacks",
    visualType: "deployment",
    keyTakeaway: "Rollbacks should be immediate, mechanical, and triggered by automated health alerts.",
    codeExample: `# Automated Kubernetes rollback on deployment failure
kubectl rollout undo deployment/my-app`
  },
  {
    id: 38,
    question: "What is a feature flag's role in decoupling deployment from release?",
    answer: "Code can be deployed to production in a disabled state, then enabled independently (instantly, gradually, or per-segment) without requiring a new deployment.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Feature Flags",
    visualType: "deployment",
    keyTakeaway: "Separates technical operational deployment from logical business launches.",
    codeExample: `// Decoupled feature execution
if (featureFlags.isEnabled('new-dashboard-ui')) {
  renderNewDashboard();
} else {
  renderOldDashboard();
}`
  },
  {
    id: 39,
    question: "What is the purpose of parallelizing pipeline jobs?",
    answer: "Reduces total pipeline duration by running independent steps (e.g. unit tests and linting) concurrently rather than sequentially.",
    category: CATEGORIES.TESTING,
    concept: "Pipeline Parallelization",
    visualType: "pipeline",
    keyTakeaway: "Maximizes infrastructure utilization and speeds up developer feedback loop.",
    codeExample: `# GitHub Jobs run in parallel by default unless 'needs' is defined
jobs:
  unit_test:
    runs-on: ubuntu-latest
  security_scan:
    runs-on: ubuntu-latest
# Both run at the exact same second!`
  },
  {
    id: 40,
    question: "What is a flaky test and why is it a CI/CD concern?",
    answer: "A test that intermittently passes/fails without underlying code changes, often due to timing/async issues — erodes trust in the pipeline and can block/allow bad merges inconsistently.",
    category: CATEGORIES.TESTING,
    concept: "Flaky Tests",
    visualType: "pipeline",
    keyTakeaway: "Flaky tests erode team discipline; developers begin ignoring actual failures.",
    codeExample: `// BAD: Prone to timing/network flakiness
it('fetches users', async () => {
  const data = await fetch('https://api.external/users'); // External dependency!
  expect(data.status).toBe(200); 
});

// GOOD: Isolated/Mocked
it('fetches users', async () => {
  mockExternalApi(200, { users: [] });
  const data = await fetchMockedUsers();
  expect(data.status).toBe(200);
});`
  },
  {
    id: 41,
    question: "How would you address a flaky test in CI?",
    answer: "Investigate and fix the root cause (usually timing/race conditions/test isolation issues) rather than simply retrying or disabling it, since disabling erodes actual test coverage.",
    category: CATEGORIES.TESTING,
    concept: "Resolving Flaky Tests",
    visualType: "pipeline",
    keyTakeaway: "Use automatic retries temporarily, but quarantine flaky tests for systemic debugging.",
    codeExample: `// Quarantine / Skip flaky tests until fixed
it.skip('flaky third-party check', () => { ... });`
  },
  {
    id: 42,
    question: "What is test parallelization/sharding?",
    answer: "Splitting a large test suite across multiple parallel runners/machines to reduce total execution time.",
    category: CATEGORIES.TESTING,
    concept: "Test Sharding",
    visualType: "pipeline",
    keyTakeaway: "Enables massive scaling. 1 hour of tests can become 5 minutes across 12 shards.",
    codeExample: `# Playwright test sharding example
- name: Run Test Shard
  run: npx playwright test --shard=\${{ matrix.shard }}/\${{ matrix.total-shards }}
  strategy:
    matrix:
      shard: [1, 2, 3]
      total-shards: [3]`
  },
  {
    id: 43,
    question: "What is code coverage and how might it be enforced in a pipeline?",
    answer: "The percentage of code executed by tests; pipelines can be configured to fail if coverage drops below a defined threshold.",
    category: CATEGORIES.TESTING,
    concept: "Code Coverage",
    visualType: "pipeline",
    keyTakeaway: "Code coverage is a proxy for test volume, not necessarily test quality.",
    codeExample: `# Codecov integration upload step
- name: Upload coverage reports to Codecov
  uses: codecov/codecov-action@v4
  with:
    token: \${{ secrets.CODECOV_TOKEN }}`
  },
  {
    id: 44,
    question: "What is static analysis / linting's role in CI?",
    answer: "Automatically catching style violations and common bugs before human review, run as an early, fast pipeline step.",
    category: CATEGORIES.TESTING,
    concept: "Static Code Analysis",
    visualType: "pipeline",
    keyTakeaway: "Saves code review cycles by ensuring stylistic and basic technical hygiene.",
    codeExample: `# Fast and cheap step at the top of workflows
- name: Code Linting
  run: |
    npm ci
    npm run lint # Runs ESLint / Prettier check`
  },
  {
    id: 45,
    question: "What is a security scan step (SAST/dependency scanning) in a pipeline?",
    answer: "Automated scanning of source code or dependencies for known vulnerabilities, run as part of the pipeline to catch issues before deployment.",
    category: CATEGORIES.SECURITY,
    concept: "Security Pipelines (DevSecOps)",
    visualType: "pipeline",
    keyTakeaway: "Automates dependency audit checks to prevent supply chain vulnerabilities.",
    codeExample: `# Security auditing in GitHub workflows
- name: Audit Dependencies
  run: npm audit --audit-level=high`
  },
  {
    id: 46,
    question: "What is a container image scan?",
    answer: "Analyzing a built Docker image for known vulnerabilities in its base image/installed packages before it's deployed.",
    category: CATEGORIES.SECURITY,
    concept: "Container Scans",
    visualType: "docker",
    keyTakeaway: "Prevents shipping compromised binaries or outdated runtime engines.",
    codeExample: `# Using Trivy to scan an image
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'docker.io/my-organization/my-app:\${{ github.sha }}'
    format: 'table'
    exit-code: '1' # Fail pipeline if vulnerabilities found
    severity: 'CRITICAL,HIGH'`
  },
  {
    id: 47,
    question: "What is the purpose of tagging a build/artifact with the git commit SHA?",
    answer: "Provides precise traceability between a specific deployed artifact and the exact source code that produced it.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "SHA-Based Artifact Tagging",
    visualType: "docker",
    keyTakeaway: "Eliminates the ambiguity of the mutable 'latest' tag.",
    codeExample: `# Tag Docker image using Git SHA
docker build -t my-app:\${{ github.sha }} .
docker push my-app:\${{ github.sha }}`
  },
  {
    id: 48,
    question: "What is semantic versioning and how does it relate to CI/CD releases?",
    answer: "A MAJOR.MINOR.PATCH versioning scheme; CI/CD pipelines can automate version bumping and changelog generation based on commit conventions.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Semantic Versioning (SemVer)",
    visualType: "git-flow",
    keyTakeaway: "Allows clients and consumers to safely map APIs and updates without unexpected breaking changes.",
    codeExample: `Patch:  v1.0.1 (Bug fix)
Minor:  v1.1.0 (Backward-compatible feature)
Major:  v2.0.0 (Breaking API changes)`
  },
  {
    id: 49,
    question: "What is a changelog and how can it be automated in a pipeline?",
    answer: "A record of changes per release; tools (e.g. semantic-release) can auto-generate it from structured commit messages as part of the release pipeline.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Automated Changelogs",
    visualType: "git-flow",
    keyTakeaway: "Using Conventional Commits (feat, fix, refactor) yields perfect documentation.",
    codeExample: `# Commits that dictate semver and changelogs:
git commit -m "feat(auth): add google sign-in option"
git commit -m "fix(checkout): resolve price calculation error"`
  },
  {
    id: 50,
    question: "What is trunk-based development's relationship to CI/CD?",
    answer: "Frequent small merges directly to a shared main branch keep the codebase continuously integrable, aligning naturally with CI/CD's goal of always-deployable code.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Trunk-Based Development",
    visualType: "git-flow",
    keyTakeaway: "Reduces the complexity of resolving long-lived branching conflicts.",
    codeExample: `Branching Style:
Trunk-Based:  main o--o--o--o--o--o (Short lived branches merged daily)
GitFlow:      develop o--o--o--o
                        \\       /
                        feature o--o (Merged weeks later)`
  },
  {
    id: 51,
    question: "What is a monorepo's specific CI/CD challenge?",
    answer: "Determining which parts of a large single repository actually changed, to avoid rebuilding/retesting unrelated projects on every commit — often solved via path-based triggers or build graph tools.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Monorepos",
    visualType: "pipeline",
    keyTakeaway: "Requires smart pipelines to avoid hours of unnecessary redundant runs.",
    codeExample: `# Turborepo path checking definition (turbo.json)
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}`
  },
  {
    id: 52,
    question: "What is a 'path filter' in a CI workflow?",
    answer: "Configuration that only triggers a pipeline (or specific job) when changes touch specific file paths, useful in monorepos to avoid unnecessary builds.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Path Filtering",
    visualType: "pipeline",
    keyTakeaway: "Saves cloud runner billing credits by isolating workflow triggers.",
    codeExample: `# Trigger workflow ONLY if files in /packages/api are changed
on:
  push:
    paths:
      - 'packages/api/**'`
  },
  {
    id: 53,
    question: "What is the purpose of environment-specific configuration/secrets in a pipeline?",
    answer: "Ensures the correct API keys/URLs/credentials are used depending on which environment (staging/production) is being deployed to, without hardcoding values in the pipeline definition.",
    category: CATEGORIES.SECURITY,
    concept: "Environment Secrets",
    visualType: "deployment",
    keyTakeaway: "Separates secure operational access bounds per stage target.",
    codeExample: `jobs:
  deploy:
    environment: Production
    steps:
      - name: Deploy
        env:
          DATABASE_URL: \${{ secrets.PROD_DB_URL }} # Automatically maps to target enviroment secret`
  },
  {
    id: 54,
    question: "How should secrets be handled in a CI/CD pipeline?",
    answer: "Stored in the CI provider's encrypted secrets store (never in the repository/pipeline YAML directly), injected as environment variables at runtime.",
    category: CATEGORIES.SECURITY,
    concept: "Secrets Management",
    visualType: "pipeline",
    keyTakeaway: "Commiting plaintext credentials represents the most common entry point for cyber threats.",
    codeExample: `# Bad Pattern: hardcoded API Keys
run: deploy --api-key="123-super-secret" # ❌ BAD

# Good Pattern: encrypted environment variable
run: deploy --api-key="\${{ secrets.API_KEY }}" # ✅ GOOD`
  },
  {
    id: 55,
    question: "Why is committing secrets to a repository dangerous even if later removed?",
    answer: "Git history retains old commits indefinitely; anyone with repo access (or if it becomes public) can retrieve the exposed secret from history.",
    category: CATEGORIES.SECURITY,
    concept: "Git History Leakage",
    visualType: "git-flow",
    keyTakeaway: "A git push is immediately copied. Always rotate keys immediately if pushed.",
    codeExample: `# Search git history for leaks using GitGuardian or Trufflehog
trufflehog git file://. --since-commit=HEAD~10`
  },
  {
    id: 56,
    question: "What is a deployment key/service account used for in CI/CD?",
    answer: "A scoped credential allowing the pipeline to authenticate and deploy to a target environment/cloud provider, ideally following least-privilege access.",
    category: CATEGORIES.SECURITY,
    concept: "Least Privilege Service Accounts",
    visualType: "deployment",
    keyTakeaway: "Avoid using full owner admin roles; only delegate write access for target platforms.",
    codeExample: `# Log in to cloud providers using ephemeral credentials (OIDC)
- name: Authenticate to AWS via OIDC
  uses: aws-actions/configure-aws-credentials@v4
  with:
    role-to-assume: arn:aws:iam::111222:role/CI_Deployer
    aws-region: us-east-1`
  },
  {
    id: 57,
    question: "What is an 'ephemeral' build environment?",
    answer: "A fresh, isolated environment (often a container) created for each pipeline run and destroyed afterward, ensuring no leftover state affects subsequent runs.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Ephemeral Environments",
    visualType: "pipeline",
    keyTakeaway: "Prevents dirty builds where assets from prior runs contaminate the current build.",
    codeExample: `# Spin up fresh isolated Docker containers for testing
docker run --rm -v $(pwd):/app node:20-alpine npm run build`
  },
  {
    id: 58,
    question: "Why prefer ephemeral build environments over long-lived build servers?",
    answer: "Prevents configuration drift/contamination between builds, ensuring every pipeline run starts from a truly clean, consistent state.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Configuration Drift Prevention",
    visualType: "pipeline",
    keyTakeaway: "Long-lived VM runners suffer from 'works on build server' because files build up.",
    codeExample: `# Classic issue: Built output from 3 days ago is stored in runner.
# Ephemeral solution: VM is deleted immediately after output upload.`
  },
  {
    id: 59,
    question: "What is a build matrix used for in cross-platform testing?",
    answer: "Running the same test suite across multiple OS/runtime version combinations in parallel, to catch environment-specific issues.",
    category: CATEGORIES.PIPELINES,
    concept: "Cross-Platform Testing",
    visualType: "pipeline",
    keyTakeaway: "Guarantees library compatibility on Windows, Linux, and Mac targets.",
    codeExample: `strategy:
  matrix:
    os: [ubuntu-latest, macos-latest]
    node: [18, 20]`
  },
  {
    id: 60,
    question: "What is dependency caching's tradeoff?",
    answer: "Speeds up builds significantly, but stale/incorrectly-keyed cache can mask real dependency issues or cause subtly incorrect builds if not invalidated properly on lockfile changes.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Caching Tradeoffs",
    visualType: "docker",
    keyTakeaway: "Ensure keys always target lockfiles to force automatic updates.",
    codeExample: `# If you change dependency without modifying package-lock, cache might load old package-lock!`
  },
  {
    id: 61,
    question: "What is a 'dry run' in a deployment pipeline?",
    answer: "Simulating a deployment's effects without actually applying changes, used to preview/validate what would happen (common with Terraform's 'plan' step).",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Deployment Dry Runs",
    visualType: "deployment",
    keyTakeaway: "Allows operators to spot catastrophic architectural modifications before they happen.",
    codeExample: `# Previewing infrastructure adjustments
terraform plan -out=tfplan`
  },
  {
    id: 62,
    question: "What is Terraform's 'plan' vs 'apply' step, in a CI/CD pipeline context?",
    answer: "'plan' previews proposed infrastructure changes for review (often gated by manual approval); 'apply' actually executes those changes.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Infrastructure-as-Code Pipelines",
    visualType: "pipeline",
    keyTakeaway: "Enforces a clear code review stage before changing physical networks.",
    codeExample: `# Classic IaC Pipeline Stages
1. TF Lint / Format Check
2. TF Plan (Output logs posted on Git PR)
3. Merge PR -> TF Apply (Triggers execution)`
  },
  {
    id: 63,
    question: "What is GitOps and how does it relate to CD?",
    answer: "A practice where the desired deployed state lives declaratively in git, and automated tooling (e.g. ArgoCD, Flux) continuously syncs the actual environment to match — effectively making git the deployment trigger/source of truth.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "GitOps Paradigm",
    visualType: "git-flow",
    keyTakeaway: "Git repository becomes the exact declarative mirror of your production clusters.",
    codeExample: `# ArgoCD Application spec watching git repo for changes
apiVersion: argoproj.io/v1alpha1
kind: Application
spec:
  source:
    repoURL: 'https://github.com/my-org/gitops-infra'
    targetRevision: HEAD
    path: k8s-configs`
  },
  {
    id: 64,
    question: "What is the difference between push-based and pull-based deployment models?",
    answer: "Push-based: the CI/CD pipeline actively pushes changes to the target environment; pull-based (GitOps): an agent running in the target environment continuously polls/watches for changes and applies them itself.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Push vs Pull Deployment",
    visualType: "git-flow",
    keyTakeaway: "Pull-based is more secure because production credentials never leave the production cluster.",
    codeExample: `Push:  CI Runner -> AWS Auth -> kubectl apply -f deployment.yaml
Pull:  ArgoCD agent inside AWS cluster -> Pulls from GitHub -> Applies locally`
  },
  {
    id: 65,
    question: "What is a webhook's role in triggering CI/CD?",
    answer: "An HTTP callback fired by an event (e.g. git push) that notifies the CI/CD system to start a pipeline run.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Webhooks",
    visualType: "pipeline",
    keyTakeaway: "Provides the connection string that connects GitHub repositories to Runner platforms.",
    codeExample: `# GitHub sends payload on commit push
POST https://github-actions-runner.io/webhook
Headers: X-GitHub-Event: push
Payload: { "ref": "refs/heads/main", "after": "f8c2e..." }`
  },
  {
    id: 66,
    question: "What is the purpose of a staging environment in a CD pipeline?",
    answer: "A production-like environment to validate a release before it reaches real users, catching issues automated tests alone might miss.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Staging Targets",
    visualType: "deployment",
    keyTakeaway: "Final test flight to confirm integration under real network/database scales.",
    codeExample: `# CD Stage Flow
Build -> Test -> Deploy Staging -> Run Integration Checks -> Manual Signoff -> Production`
  },
  {
    id: 67,
    question: "What is a pre-production smoke test suite typically checking?",
    answer: "Critical user paths (login, checkout, core navigation) work end-to-end after a deployment, before declaring the release successful.",
    category: CATEGORIES.TESTING,
    concept: "E2E Post-Deploy Smoke Checks",
    visualType: "pipeline",
    keyTakeaway: "Ensures mission-critical features are operating before customer exposure.",
    codeExample: `# Cypress smoke test checking login page load
describe('Post-Deploy Smoke Test', () => {
  it('loads the app and auth dashboard', () => {
    cy.visit('https://staging-app.com/login')
    cy.get('h1').should('contain', 'Sign In')
  })
})`
  },
  {
    id: 68,
    question: "What is the purpose of post-deployment monitoring/alerting integrated with a pipeline?",
    answer: "Automatically detecting if a new deployment causes an error rate/latency spike, potentially triggering an automatic rollback.",
    category: CATEGORIES.METRICS_CAREER,
    concept: "Observability Integration",
    visualType: "deployment",
    keyTakeaway: "Completes the feedback loop, showing how production code handles traffic.",
    codeExample: `# Prometheus Alert Rules configuration
- alert: HighErrorRateAfterDeploy
  expr: sum(rate(http_requests_total{status=~"5.."}[1m])) > 10
  labels:
    severity: critical`
  },
  {
    id: 69,
    question: "What is automatic rollback based on health metrics?",
    answer: "A CD pattern where the pipeline monitors key metrics after deployment and automatically reverts if they breach defined thresholds, without waiting for manual intervention.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Self-Healing Pipelines",
    visualType: "deployment",
    keyTakeaway: "Limits client exposure of broken deploys to a brief, automated window.",
    codeExample: `# Pseudo-script for continuous monitoring rollback
for i in {1..10}; do
  ERROR_RATE=$(curl -s https://my-app.com/metrics | grep error_rate)
  if [ "$ERROR_RATE" -gt 5 ]; then
    echo "High error rate detected! Rollback!"
    kubectl rollout undo deployment/my-app
    exit 1
  fi
  sleep 30
done`
  },
  {
    id: 70,
    question: "What is a 'release train' model?",
    answer: "Deploying on a fixed, regular schedule (e.g. every two weeks) regardless of which specific features are ready, as opposed to deploying continuously whenever changes are ready.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Release Trains",
    visualType: "git-flow",
    keyTakeaway: "Provides high predictability for cross-team coordination and mobile store submissions.",
    codeExample: `# Calendar-driven release cadence
Bi-weekly Release Cadence:
Jan 1: Code Freeze -> Jan 3: Test Cycle Complete -> Jan 5: Release Train Deployed`
  },
  {
    id: 71,
    question: "What is the tradeoff of a release train vs continuous deployment?",
    answer: "Release trains provide predictability/batching for coordination (e.g. mobile app store reviews) at the cost of slower feedback; continuous deployment gives fastest feedback/lowest batch risk but requires strong automated testing confidence.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "CD vs Release Trains",
    visualType: "deployment",
    keyTakeaway: "Choose release trains for slow, manual compliance scopes; use CD for fast web products.",
    codeExample: `Continuous Deployment: Push -> Prod (15 minutes feedback)
Release Train:          Push -> Staging -> Wait for Train -> Prod (Up to 14 days delay)`
  },
  {
    id: 72,
    question: "What is a build badge (e.g. 'build passing' shield on a README)?",
    answer: "A visual indicator showing the current CI status of a repository/branch, often linked to the live pipeline dashboard.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Pipeline Status Visibility",
    visualType: "general",
    keyTakeaway: "Fosters transparency and shows confidence in test integrity.",
    codeExample: `![Build Status](https://github.com/my-org/my-repo/actions/workflows/ci.yml/badge.svg)`
  },
  {
    id: 73,
    question: "What is pipeline observability, and why does it matter?",
    answer: "Visibility into pipeline execution time, failure trends, and bottlenecks — helps teams optimize pipeline speed/reliability over time, not just the application it deploys.",
    category: CATEGORIES.METRICS_CAREER,
    concept: "Pipeline Observability",
    visualType: "pipeline",
    keyTakeaway: "You cannot optimize pipeline durations unless you track individual stage performance.",
    codeExample: `# OpenTelemetry pipeline analytics tags
otel.resource.name: ci-pipeline-run
otel.span.name: run-jest-tests
otel.duration_ms: 124000`
  },
  {
    id: 74,
    question: "What is a common cause of slow CI pipelines?",
    answer: "Lack of caching, unnecessary sequential steps that could run in parallel, overly broad test suites run on every change, or oversized Docker image builds without layer caching.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Pipeline Bottlenecks",
    visualType: "pipeline",
    keyTakeaway: "Slow builds discourage small, frequent commits.",
    codeExample: `Sequential Steps:   Build (2m) -> Lint (1m) -> Test (3m) = 6m duration
Parallelized:       Build (2m) + (Lint || Test) (3m)        = 5m duration`
  },
  {
    id: 75,
    question: "What is Docker layer caching and how does it speed up CI builds?",
    answer: "Docker images are built in layers; unchanged layers (e.g. dependency installation, if the lockfile hasn't changed) can be reused from cache instead of rebuilt from scratch.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Docker Layer Caching",
    visualType: "docker",
    keyTakeaway: "Structure your Dockerfiles so slow, infrequent commands run first.",
    codeExample: `# Docker layer optimization pattern
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm ci # Cached layer if package.json didn't modify!
COPY . .
RUN npm run build # Only this step runs on simple source modifications`
  },
  {
    id: 76,
    question: "What is a multi-stage Docker build and why use it in CI/CD?",
    answer: "Using multiple 'FROM' stages in a Dockerfile to separate build-time dependencies from the final runtime image, producing smaller, more secure production images.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Multi-Stage Dockerfiles",
    visualType: "docker",
    keyTakeaway: "Drastically limits the security attack surface and reduces final image sizes.",
    codeExample: `# Stage 1: Compile TypeScript
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Stage 2: Serve compiled code using bare-bones Alpine
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/server.js"]`
  },
  {
    id: 77,
    question: "What is the purpose of a linter/formatter check failing the pipeline rather than just warning?",
    answer: "Enforces consistency as a hard requirement rather than a suggestion easily ignored, keeping the codebase uniformly styled without relying on manual discipline.",
    category: CATEGORIES.TESTING,
    concept: "Enforced Coding Standards",
    visualType: "pipeline",
    keyTakeaway: "Reduces bike-shedding and styling arguments during code reviews.",
    codeExample: `# Pipeline config: fails the build if format doesn't match
- name: Code Styling Check
  run: npx prettier --check .`
  },
  {
    id: 78,
    question: "What is a pre-commit hook and how does it relate to CI?",
    answer: "A local git hook running checks (lint, format) before a commit is even created — catches issues earlier than CI, though CI remains the authoritative/enforced check since local hooks can be bypassed.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Pre-Commit Hooks (Husky)",
    visualType: "git-flow",
    keyTakeaway: "Saves runner credits and time by fixing syntax issues before pushing.",
    codeExample: `# .husky/pre-commit configuration
npm run lint-staged`
  },
  {
    id: 79,
    question: "What is the purpose of running end-to-end tests in a separate, later pipeline stage than unit tests?",
    answer: "E2E tests are slower and more resource-intensive; running fast unit tests first gives quicker feedback and avoids wasting time on E2E if basic logic is already broken.",
    category: CATEGORIES.TESTING,
    concept: "Test Tiering Strategies",
    visualType: "pipeline",
    keyTakeaway: "Enforces the 'fail fast' design model.",
    codeExample: `# Tiered Testing workflow
Unit Tests (30s) -> Integration Tests (2m) -> Deploy Staging -> E2E (15m)`
  },
  {
    id: 80,
    question: "What is a deployment 'approval gate' tied to specific branches/environments used for?",
    answer: "Restricting who can trigger/approve deployments to sensitive environments (like production), adding a controlled human checkpoint for higher-risk releases.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Access Controls",
    visualType: "deployment",
    keyTakeaway: "Enforces division of duties and complies with SOC2/regulatory requirements.",
    codeExample: `Branch: Release-* -> Production Environment
Required Reviewer: SecOps-Lead`
  },
  {
    id: 81,
    question: "What is the purpose of separating 'build once, deploy many times' in a pipeline?",
    answer: "Building a single artifact/image and promoting the exact same one through staging then production (rather than rebuilding per environment) ensures what's tested is exactly what's deployed, avoiding environment-specific build discrepancies.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Build Once, Deploy Anywhere",
    visualType: "pipeline",
    keyTakeaway: "Never compile code multiple times for different targets. Promote compiled artifacts.",
    codeExample: `Compile -> Artifact (v1.2) -> Deploy QA -> Deploy Staging -> Deploy Prod`
  },
  {
    id: 82,
    question: "What is artifact promotion?",
    answer: "Moving a specific, already-built and tested artifact from one environment to the next (e.g. staging to production) rather than rebuilding, preserving consistency.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Artifact Promotion",
    visualType: "docker",
    keyTakeaway: "Guarantees that identical bits tested in pre-production run in live systems.",
    codeExample: `# Promote container by changing registry tags
docker pull registry.local/staging/app:v1.2
docker tag registry.local/staging/app:v1.2 registry.local/production/app:v1.2
docker push registry.local/production/app:v1.2`
  },
  {
    id: 83,
    question: "What is a common anti-pattern where teams rebuild per environment instead of promoting one artifact?",
    answer: "Risk that subtle build differences (dependency resolution, environment variables baked in at build time) mean what passed staging isn't exactly what runs in production.",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Environmental Discrepancies",
    visualType: "pipeline",
    keyTakeaway: "Baking settings inside files at compilation forces risky rebuild cycles.",
    codeExample: `# ❌ BAD: Rebuilding with different arguments
npm run build --env=staging # Rebuild 1
npm run build --env=production # Rebuild 2 (Different dependency could resolve!)`
  },
  {
    id: 84,
    question: "What is the purpose of notifying a team (Slack/email) on pipeline failure?",
    answer: "Ensures failures are noticed and addressed promptly rather than silently blocking future work or leaving broken code in a shared branch.",
    category: CATEGORIES.METRICS_CAREER,
    concept: "Instant Failure Alerts",
    visualType: "pipeline",
    keyTakeaway: "Enables instant reaction. Shared code breaks should be repaired in minutes.",
    codeExample: `# Notify on failure in GitHub Action step
- name: Slack Notification
  if: failure() # Runs only if previous tasks failed
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: \${{ secrets.SLACK_WEBHOOK }}`
  },
  {
    id: 85,
    question: "What is 'fail fast' in a CI pipeline design?",
    answer: "Ordering pipeline steps so quick, cheap checks (linting, unit tests) run before slow, expensive ones (E2E tests, deployment), so failures are caught with minimal wasted time/resources.",
    category: CATEGORIES.TESTING,
    concept: "Fail-Fast Pipelines",
    visualType: "pipeline",
    keyTakeaway: "Saves computational resources and yields quicker developer feedback loops.",
    codeExample: `Fast checks first:
Step 1: Check formatting / syntax (5s) -> Step 2: Unit tests (20s) -> Step 3: Spin up heavy browsers (10m)`
  },
  {
    id: 86,
    question: "What is the purpose of pipeline concurrency limits/queueing?",
    answer: "Prevents overwhelming shared runner infrastructure when many pipeline runs are triggered simultaneously (e.g. multiple PRs pushed at once).",
    category: CATEGORIES.OPTIMIZATION,
    concept: "Concurrency Controls",
    visualType: "pipeline",
    keyTakeaway: "Avoids CPU starvation on shared machines by regulating concurrent compiles.",
    codeExample: `# Restrict workflows to 1 active run at a time per branch
concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true # Terminate older runs if a new commit is pushed`
  },
  {
    id: 87,
    question: "What is a 'required status check' in GitHub branch protection?",
    answer: "A specific CI job that must pass before a PR can be merged into a protected branch, enforced at the platform level regardless of reviewer approval.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Branch Gates",
    visualType: "git-flow",
    keyTakeaway: "Automates rule compliance directly at Git's remote gateway.",
    codeExample: `Protection Rules on branch 'main':
[✓] Require status checks to pass before merging
    - ci/test (Must complete successfully)`
  },
  {
    id: 88,
    question: "What is the difference between a pipeline 'job' and a pipeline 'workflow' (general CI/CD terminology, tool-agnostic)?",
    answer: "A workflow is the overall automated process definition; a job is a distinct unit of work within it, potentially one of several running in parallel or sequence.",
    category: CATEGORIES.PIPELINES,
    concept: "Workflow vs Job",
    visualType: "pipeline",
    keyTakeaway: "Workflows compose logical schedules; Jobs execute target instructions on single hosts.",
    codeExample: `Workflow: Production Release Lifecycle (triggers on tag)
├── Job 1: Build Docker Image (runs on host-A)
└── Job 2: Deploy to Kubernetes Cluster (runs on host-B)`
  },
  {
    id: 89,
    question: "What is a matrix strategy's cost tradeoff?",
    answer: "Testing more combinations (OS/versions) increases confidence in compatibility but multiplies total pipeline execution time/cost proportionally.",
    category: CATEGORIES.PIPELINES,
    concept: "Matrix Costs",
    visualType: "pipeline",
    keyTakeaway: "Be selective; don't run 24 parallel runs if testing 3 covers 99% of environments.",
    codeExample: `Cost = (Number of OS targets) * (Number of Node targets) * (Average job runtime)`
  },
  {
    id: 90,
    question: "What is the purpose of running database migrations as part of a deployment pipeline?",
    answer: "Ensures schema changes are applied consistently and in sync with the application code that depends on them, ideally in a way that's backward-compatible during rolling deployments.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Automated Database Migrations",
    visualType: "db-migration",
    keyTakeaway: "Decouples database administration from manual, error-prone terminal runs.",
    codeExample: `# Running Prisma / Flyway migration step prior to deployment
- name: Run Database Migrations
  run: npx prisma migrate deploy`
  },
  {
    id: 91,
    question: "Why is backward-compatible schema migration important for zero-downtime deployments?",
    answer: "During a rolling deployment, old and new application code versions may run simultaneously against the same database — the schema must support both temporarily.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Zero-Downtime Migrations",
    visualType: "db-migration",
    keyTakeaway: "A database field drop will instantly crash active old-version containers.",
    codeExample: `Old App Container (Reads Field 'A')  \\
                                       ---> Shared Database (Field 'A' MUST remain!)
New App Container (Reads Field 'B')  /`
  },
  {
    id: 92,
    question: "What is an expand-and-contract migration pattern?",
    answer: "First 'expand' the schema to support both old and new code (add new column alongside old), deploy the new code, then later 'contract' by removing the old column once fully migrated — avoids breaking changes mid-deployment.",
    category: CATEGORIES.GIT_GITOPS,
    concept: "Expand and Contract Schema Design",
    visualType: "db-migration",
    keyTakeaway: "Never modify schemas in a single deployment. Split it over multiple releases.",
    codeExample: `Step 1 (Expand): Add column 'user_name_v2', copy old data, write to both.
Step 2 (Deploy): Update code to read from 'user_name_v2'.
Step 3 (Contract): Safely drop old column 'user_name'.`
  },
  {
    id: 93,
    question: "What is the purpose of separating a 'deploy' step from a 'release'/enable step (progressive delivery)?",
    answer: "Allows code to be present in production without being active for all users yet, enabling controlled, gradual exposure via feature flags rather than an all-or-nothing deployment.",
    category: CATEGORIES.DEPLOYMENTS,
    concept: "Progressive Delivery",
    visualType: "deployment",
    keyTakeaway: "Reduces shipping risk by limiting feature blast radius via application level dials.",
    codeExample: `# Deploy: Push compiled bundle to S3 buckets
# Release: Toggle LaunchDarkly feature key for target regions`
  },
  {
    id: 94,
    question: "What is the DORA metric 'change failure rate'?",
    answer: "The percentage of deployments that result in a failure requiring remediation (rollback, hotfix, patch) — a key indicator of deployment quality/pipeline effectiveness.",
    category: CATEGORIES.METRICS_CAREER,
    concept: "DORA Metric: Change Failure Rate",
    visualType: "general",
    keyTakeaway: "High failure rates indicate insufficient testing or oversized change batches.",
    codeExample: `Change Failure Rate = (Failed Deploys / Total Deploys) * 100%`
  },
  {
    id: 95,
    question: "What is 'lead time for changes' as a DORA metric?",
    answer: "The time from code being committed to it successfully running in production — a measure of pipeline/process efficiency.",
    category: CATEGORIES.METRICS_CAREER,
    concept: "DORA Metric: Lead Time",
    visualType: "general",
    keyTakeaway: "Low lead times enable rapid iteration and direct market feedback.",
    codeExample: `Lead Time = Time of Merge to Main - Time of commit creation`
  },
  {
    id: 96,
    question: "What is 'mean time to recovery' (MTTR) as a DORA metric?",
    answer: "The average time taken to restore service after a production incident/failure.",
    category: CATEGORIES.METRICS_CAREER,
    concept: "DORA Metric: MTTR",
    visualType: "general",
    keyTakeaway: "Slashed by automated rolling rollback loops and instant health signals.",
    codeExample: `MTTR = (Time of Resolution - Time of Outage Detect) / Count of Incidents`
  },
  {
    id: 97,
    question: "Why do elite-performing teams (per DORA research) tend to deploy more frequently, not less, despite intuition?",
    answer: "Frequent, small deployments are individually lower-risk and easier to diagnose/rollback than large, infrequent batches bundling many changes together.",
    category: CATEGORIES.METRICS_CAREER,
    concept: "Deployment Frequency Tradeoff",
    visualType: "deployment",
    keyTakeaway: "Smaller changes represent a tiny, easily controlled risk vector compared to massive quarterly releases.",
    codeExample: `Quarterly Release: 1,200 commits (Infinite conflict permutations)
Daily Release:     5 commits (Extremely easy to isolate when something fails!)`
  },
  {
    id: 98,
    question: "What is a common mistake when first introducing CI/CD to a legacy project?",
    answer: "Trying to automate everything at once rather than incrementally — start with basic build/test automation, then progressively add deployment automation, security scans, and more sophisticated strategies.",
    category: CATEGORIES.FUNDAMENTALS,
    concept: "Legacy Integrations",
    visualType: "pipeline",
    keyTakeaway: "Crawl, walk, run. Start with compile and lint checks first.",
    codeExample: `Step 1: Get 'npm build' green in CI.
Step 2: Connect Unit Tests.
Step 3: Build automated staging deploys. (Build incremental trust)`
  },
  {
    id: 99,
    question: "How would you debug a pipeline that passes locally but fails in CI?",
    answer: "Check for environment differences (Node/dependency versions, environment variables, timezone/locale settings, file path case-sensitivity), and review the exact CI logs/step output rather than assuming the cause.",
    category: CATEGORIES.METRICS_CAREER,
    concept: "CI Debugging Best Practices",
    visualType: "pipeline",
    keyTakeaway: "Usually caused by absolute system paths, undeclared environment secrets, or file case mismatches.",
    codeExample: `Local:   import Button from './button' (Mac filesystem is case-insensitive)
CI Host: import Button from './Button' (fails on case-sensitive Linux runners!)`
  },
  {
    id: 100,
    question: "How would a frontend engineer typically contribute to/interact with CI/CD pipelines?",
    answer: "Writing/maintaining workflow config for linting/testing/building the frontend app, ensuring build artifacts (static assets) are correctly produced and cached, and understanding enough of the deployment stage to debug a failed build without necessarily owning the full infrastructure setup.",
    category: CATEGORIES.METRICS_CAREER,
    concept: "Frontend Pipeline Ownership",
    visualType: "pipeline",
    keyTakeaway: "Frontend engineers should own package configs, CDN caching logic, and test suites in pipelines.",
    codeExample: `# Frontend CD pipeline step
- name: Deploy static assets to S3 CDN
  run: aws s3 sync dist/ s3://my-app-cdn/ --cache-control "max-age=31536000"`
}
];
