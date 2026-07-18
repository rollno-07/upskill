export interface Question {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  explanation: string;
  example: string;
  diagramType: 'pipeline' | 'container-vs-vm' | 'k8s-pod' | 'blue-green' | 'gitops' | 'observability' | 'error-budget' | 'testing-pyramid' | 'branching' | 'chaos-monkey' | 'health-check' | 'load-balancer' | 'autoscaling' | 'iac';
}

export const CATEGORIES = [
  'Introduction & Culture',
  'CI/CD & Release Strategies',
  'Infrastructure as Code (IaC)',
  'Containers & Orchestration',
  'Deployment Strategies',
  'Git & Branching Workflows',
  'Testing & DevSecOps',
  'Monitoring, Observability & SRE',
  'Scaling & Operations'
];

export const questionsData: Question[] = [
  {
    id: 1,
    category: 'Introduction & Culture',
    difficulty: 'Easy',
    question: 'What is DevOps?',
    answer: 'A set of practices/culture combining software development and IT operations, aiming to shorten the development lifecycle and deliver reliably through automation and collaboration.',
    explanation: 'DevOps is not a single tool or a specific role; it is a cultural movement and methodology. It bridges the gap between software developers (Dev) and IT operations (Ops) to foster collaboration, reduce silos, and establish continuous delivery pipelines.',
    example: 'A team transitioning to DevOps replaces manual server deployments with automated pipelines triggered by git push commands, reducing deployment times from days to minutes.',
    diagramType: 'pipeline'
  },
  {
    id: 2,
    category: 'Introduction & Culture',
    difficulty: 'Easy',
    question: 'What problem does DevOps solve?',
    answer: 'Reduces friction/silos between dev and ops teams, historically causing slow, error-prone, manual releases and finger-pointing during incidents.',
    explanation: 'Historically, Developers wanted speed (pushing new features), while Operations wanted stability (keeping servers running, denying risky changes). This created a "Wall of Confusion". DevOps aligns incentives by making both teams co-responsible for both feature delivery and system reliability.',
    example: 'Using shared on-call shifts, joint post-mortems, and integrated monitoring dashboards, Devs and Ops collaborate on incidents instead of shifting blame.',
    diagramType: 'pipeline'
  },
  {
    id: 3,
    category: 'Introduction & Culture',
    difficulty: 'Easy',
    question: 'What is the DevOps lifecycle?',
    answer: 'Commonly visualized as an infinite loop: plan, code, build, test, release, deploy, operate, monitor — feeding back into planning.',
    explanation: 'The infinity loop illustrates that software delivery is an ongoing, circular process of continuous feedback and improvement. Every stage informs the next, creating a closed feedback loop.',
    example: 'Monitoring tools detect high latency in production, which triggers automatic incident creation. The Dev team plans and writes a code fix, which is built, tested, and released back to production.',
    diagramType: 'pipeline'
  },
  {
    id: 4,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Easy',
    question: 'What is Continuous Integration (CI)?',
    answer: 'Frequently merging code changes into a shared branch, with automated builds/tests run on every change to catch issues early.',
    explanation: 'CI requires developers to integrate code into a shared mainline branch multiple times a day. Every commit triggers an automated build and test pipeline to prevent integration hell.',
    example: 'A developer creates a Pull Request in GitHub. Instantly, GitHub Actions spins up a container, installs dependencies, runs the test suite, and lints the code. If any test fails, merging is blocked.',
    diagramType: 'pipeline'
  },
  {
    id: 5,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Easy',
    question: 'What is Continuous Delivery (CD)?',
    answer: 'Ensuring code is always in a deployable state after passing CI, with deployment to production a manual (but low-risk, automatable) decision.',
    explanation: 'Continuous Delivery ensures every change that passes automated testing is packaged and staged, so it can be deployed to production at any moment with a single click.',
    example: 'The CI pipeline successfully compiles code and runs tests. It then builds a production Docker image, uploads it to an Artifact Registry, and deploys it to a staging environment where users or product managers can review and manually click "Approve for Prod".',
    diagramType: 'pipeline'
  },
  {
    id: 6,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Easy',
    question: 'What is Continuous Deployment?',
    answer: 'Every change that passes automated tests is automatically deployed to production without manual intervention — the fullest form of automation.',
    explanation: 'Continuous Deployment goes a step beyond Continuous Delivery by removing the manual approval gate. If a change passes all quality gates in the pipeline, it goes live immediately to production users.',
    example: 'An engineer commits a bug fix to the main branch. The automated pipeline builds it, passes all tests, deploys to canary, verifies health metrics, and promotes it to 100% of production. No humans had to approve or run manual commands.',
    diagramType: 'pipeline'
  },
  {
    id: 7,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Easy',
    question: 'CI/CD vs Continuous Deployment — what\'s the distinction?',
    answer: 'Continuous Delivery stops just short of auto-deploying to prod (human approval gate); Continuous Deployment removes that gate entirely.',
    explanation: 'In Continuous Delivery, the business decides when to release (manual gate). In Continuous Deployment, the pipeline decides when to release (automatic). Both require identical automated testing rigor, but have different risk appetites and deployment cadences.',
    example: 'A banking application uses Continuous Delivery due to regulatory compliance (requiring human release sign-off). An online game server uses Continuous Deployment to push hotfixes instantly.',
    diagramType: 'pipeline'
  },
  {
    id: 8,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Easy',
    question: 'What is Infrastructure as Code (IaC)?',
    answer: 'Managing and provisioning infrastructure through machine-readable definition files (Terraform, CloudFormation) rather than manual configuration.',
    explanation: 'IaC treats infrastructure (virtual machines, networks, load balancers, databases) as software. Developers write declarative or imperative code to define resources, which is stored in git and executed by an orchestrator.',
    example: 'Instead of clicking buttons in the AWS or GCP console to create an EC2 instance, you write a `main.tf` Terraform file declaring the server, then run `terraform apply`.',
    diagramType: 'iac'
  },
  {
    id: 9,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Easy',
    question: 'Why is IaC valuable?',
    answer: 'Reproducibility, version control/history via git, easier rollback, consistency across environments, and reduced configuration drift.',
    explanation: 'Because infrastructure is represented as files, you gain git history, code reviews for infrastructure, the ability to instantly tear down and rebuild environments, and standard automated deployments.',
    example: 'An entire replica staging environment can be provisioned in minutes by executing the same Terraform configuration used for production with a different variables file.',
    diagramType: 'iac'
  },
  {
    id: 10,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Medium',
    question: 'What is configuration drift?',
    answer: 'When a system\'s actual configuration gradually diverges from its intended/documented state due to manual, untracked changes.',
    explanation: 'Drift occurs when engineers SSH into servers or make direct manual changes in cloud consoles without updating the IaC codebase. This makes environments inconsistent and leads to unexpected deploy failures.',
    example: 'An on-call engineer manually increases a server\'s RAM during an incident. Months later, a Terraform apply runs and overwrites the RAM back to the original smaller value, triggering another crash.',
    diagramType: 'iac'
  },
  {
    id: 11,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Medium',
    question: 'What is idempotency in the context of infrastructure automation?',
    answer: 'Running the same automation/script multiple times produces the same end state without unintended side effects — critical for safe, repeatable infrastructure changes.',
    explanation: 'An idempotent script ensures that if the system is already in the desired state, running the script does nothing. If the system is partially in the desired state, it only applies the missing changes.',
    example: 'In Terraform, if you declare 3 servers and run `apply`, it creates them. If you run `apply` again immediately, Terraform reads the live state, sees 3 servers exist, and changes absolutely nothing.',
    diagramType: 'iac'
  },
  {
    id: 12,
    category: 'Containers & Orchestration',
    difficulty: 'Easy',
    question: 'What is Docker?',
    answer: 'A platform for packaging applications and their dependencies into portable, isolated containers that run consistently across environments.',
    explanation: 'Docker uses OS-level virtualization to deliver software in packages called containers. Containers are isolated from each other and bundle their own software, libraries, and configuration files.',
    example: 'A Node.js app requiring Node v18 and specific native libraries is packaged into a Docker image. It runs identically on a developer\'s macOS, a staging Ubuntu server, and a AWS Fargate cluster.',
    diagramType: 'container-vs-vm'
  },
  {
    id: 13,
    category: 'Containers & Orchestration',
    difficulty: 'Easy',
    question: 'What is a container vs a virtual machine?',
    answer: 'Containers share the host OS kernel, making them lightweight/fast to start; VMs virtualize an entire OS, making them heavier but more isolated.',
    explanation: 'Virtual Machines (VMs) run on top of a hypervisor, and each VM contains a complete guest operating system, virtual drivers, and virtual memory. Containers share the host OS kernel and isolate user spaces using Linux namespaces and cgroups, eliminating guest OS overhead.',
    example: 'Booting a new VM takes 2 minutes and consumes 2GB of RAM baseline. Booting a new Docker container takes 200 milliseconds and consumes 15MB of RAM.',
    diagramType: 'container-vs-vm'
  },
  {
    id: 14,
    category: 'Containers & Orchestration',
    difficulty: 'Easy',
    question: 'What is a Dockerfile?',
    answer: 'A text file with instructions for building a Docker image — base image, dependencies, commands to run.',
    explanation: 'A Dockerfile is a recipe. Each line in a Dockerfile represents a layer in the resulting container image. Layers are cached, speeding up rebuilds when only small files change.',
    example: 'A sample Dockerfile:\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["node", "index.js"]\n```',
    diagramType: 'container-vs-vm'
  },
  {
    id: 15,
    category: 'Containers & Orchestration',
    difficulty: 'Easy',
    question: 'What is a Docker image vs a container?',
    answer: 'An image is a static, immutable template; a container is a running (or stopped) instance of that image.',
    explanation: 'Think of a Docker image as a class (or blueprint), and a Docker container as an object (or instance) of that class. You can spin up multiple containers from a single image.',
    example: 'You pull the standard `nginx:alpine` image. It sits passively on your disk. You then run `docker run -d -p 80:80 nginx:alpine`, which creates a running, active container process serving web traffic.',
    diagramType: 'container-vs-vm'
  },
  {
    id: 16,
    category: 'Containers & Orchestration',
    difficulty: 'Easy',
    question: 'What is Docker Compose?',
    answer: 'A tool for defining and running multi-container applications via a single YAML config, useful for local dev environments.',
    explanation: 'Compose simplifies local orchestrations. Instead of running separate verbose `docker run` commands for your frontend, backend, and database, you declare them in a `docker-compose.yml` file and launch them together.',
    example: 'A `docker-compose.yml` defining an app service and a postgres db service, allowing you to run `docker-compose up` to boot both, pre-configured with network links.',
    diagramType: 'container-vs-vm'
  },
  {
    id: 17,
    category: 'Containers & Orchestration',
    difficulty: 'Easy',
    question: 'What is Kubernetes?',
    answer: 'An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.',
    explanation: 'While Docker runs individual containers, Kubernetes (K8s) manages clusters of host machines running thousands of containers. It handles health monitoring, automatic scaling, load balancing, rollout pacing, and self-healing.',
    example: 'If a physical server in your cluster dies, Kubernetes detects it, finds another healthy server, and automatically restarts the affected containers there to prevent service interruption.',
    diagramType: 'k8s-pod'
  },
  {
    id: 18,
    category: 'Containers & Orchestration',
    difficulty: 'Easy',
    question: 'What is a Kubernetes Pod?',
    answer: 'The smallest deployable unit — one or more containers sharing network/storage, scheduled together.',
    explanation: 'A Pod is the basic building block of Kubernetes. Usually, a Pod contains a single primary container, but it can contain "sidecar" containers (e.g. for logging, proxies) that must run in close proximity and share localhost network space.',
    example: 'A Pod running a Node.js web application container alongside a log-shipping sidecar container that watches local log files and streams them to a central server.',
    diagramType: 'k8s-pod'
  },
  {
    id: 19,
    category: 'Containers & Orchestration',
    difficulty: 'Easy',
    question: 'What is a Kubernetes Deployment?',
    answer: 'A resource managing a set of replica Pods, handling rolling updates and rollbacks declaratively.',
    explanation: 'Deployments describe the desired state of your applications. The Deployment controller is a loop that constantly checks if the actual running Pods match the defined count and version, creating or destroying replicas as needed.',
    example: 'You specify `replicas: 3` and an image version in a Deployment YAML. Kubernetes ensures exactly 3 pods run. When you update the image version, it coordinates a zero-downtime rolling update.',
    diagramType: 'k8s-pod'
  },
  {
    id: 20,
    category: 'Containers & Orchestration',
    difficulty: 'Easy',
    question: 'What is a Kubernetes Service?',
    answer: 'A stable network endpoint that routes traffic to a dynamic set of Pods (which come and go as they scale/restart).',
    explanation: 'Pods are ephemeral and get assigned dynamic, changing IP addresses whenever they restart. A Service acts as a persistent abstraction layer with a static IP and DNS name, forwarding incoming requests to healthy Pods matching specific selectors.',
    example: 'An internal Service named `backend-service` routes requests to any Pod carrying the label `app: backend`. Frontend code simply connects to `http://backend-service`.',
    diagramType: 'k8s-pod'
  },
  {
    id: 21,
    category: 'Containers & Orchestration',
    difficulty: 'Medium',
    question: 'What is a Kubernetes ConfigMap?',
    answer: 'A resource for storing non-sensitive configuration data separately from application code/images.',
    explanation: 'ConfigMaps let you decouple environment-specific configuration values (such as feature flags, API base URLs, or files) from container images, ensuring the same image can be deployed across Dev, QA, and Prod.',
    example: 'Storing `LOG_LEVEL = "debug"` in a ConfigMap in your Dev namespace, while storing `LOG_LEVEL = "warn"` in your Production namespace.',
    diagramType: 'k8s-pod'
  },
  {
    id: 22,
    category: 'Containers & Orchestration',
    difficulty: 'Medium',
    question: 'What is a Kubernetes Secret?',
    answer: 'Similar to ConfigMap but intended for sensitive data (passwords, tokens), base64-encoded (not encrypted by default without additional setup).',
    explanation: 'Secrets store sensitive credentials like database passwords or API keys. They are injected as environment variables or mounted files. Note that base64 is NOT encryption; it merely prevents accidental visual exposure. Cluster-level encryption-at-rest must be enabled separately.',
    example: 'Creating a secret named `db-credentials` containing base64 encoded user/pass, which is mounted into the database client Pod as environment variables.',
    diagramType: 'k8s-pod'
  },
  {
    id: 23,
    category: 'Containers & Orchestration',
    difficulty: 'Medium',
    question: 'What is a Helm chart?',
    answer: 'A packaging format for Kubernetes applications, bundling manifests/templates/values for easier reuse and versioned deployment.',
    explanation: 'Helm is often called the "package manager for Kubernetes" (like npm or apt). Instead of copying and pasting complex YAML files for each environment, you use templates and supply a simple `values.yaml` file containing variables.',
    example: 'Installing a complete, production-ready PostgreSQL cluster (including statefulsets, services, and pvcs) with a single command: `helm install my-db bitnami/postgresql`.',
    diagramType: 'k8s-pod'
  },
  {
    id: 24,
    category: 'Containers & Orchestration',
    difficulty: 'Medium',
    question: 'What is a rolling update in Kubernetes?',
    answer: 'Gradually replacing old Pod instances with new ones, maintaining availability throughout the deployment.',
    explanation: 'A rolling update deploys a new version of your application with zero downtime. It spins up a new pod (v2), waits for it to pass health checks, routes traffic to it, and then terminates an old pod (v1). This process repeats until all pods are running v2.',
    example: 'Configuring `maxSurge: 1` and `maxUnavailable: 0`. This ensures that during a release, Kubernetes adds one new pod first, verifies health, and never drops below the original target capacity.',
    diagramType: 'k8s-pod'
  },
  {
    id: 25,
    category: 'Deployment Strategies',
    difficulty: 'Medium',
    question: 'What is a canary deployment?',
    answer: 'Rolling out a new version to a small subset of traffic/instances first, monitoring for issues before a full rollout.',
    explanation: 'Named after coal miners placing canaries in mines, this strategy deploys a new release to only 1-5% of real users. If errors spike, the canary is rolled back immediately, sparing the rest of the user base.',
    example: 'A music app deploys code to 2% of active sessions. It monitors the crash rate dashboard. If no alarms trigger for 1 hour, it increases traffic allocation to 25%, 50%, then 100%.',
    diagramType: 'blue-green'
  },
  {
    id: 26,
    category: 'Deployment Strategies',
    difficulty: 'Medium',
    question: 'What is blue-green deployment?',
    answer: 'Running two identical environments (current and new); traffic is switched over instantly once the new version is verified, enabling quick rollback.',
    explanation: 'You maintain two separate complete environments: "Blue" (currently serving users) and "Green" (staged with new code). Once Green is verified healthy, you modify the load balancer routing to instantly flip traffic from Blue to Green.',
    example: 'Flipping a DNS record or router target from Blue cluster to Green cluster. If a critical memory leak is discovered 5 minutes later, you instantly flip the router back to Blue.',
    diagramType: 'blue-green'
  },
  {
    id: 27,
    category: 'Deployment Strategies',
    difficulty: 'Medium',
    question: 'Canary vs blue-green — key difference?',
    answer: 'Canary gradually shifts a percentage of traffic over time; blue-green switches all traffic at once between two fully separate environments.',
    explanation: 'Canary is a gradual, risk-mitigating rollout focused on monitoring early real-world feedback. Blue-Green is an instant-switch deployment focused on rapid deployment and instantaneous rollback capability.',
    example: 'Canary is great for massive consumer platforms (like Facebook) where a minor bug on 1% of traffic is tolerable. Blue-green is great for enterprise systems requiring instant atomic switches.',
    diagramType: 'blue-green'
  },
  {
    id: 28,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Easy',
    question: 'What is a build pipeline?',
    answer: 'An automated sequence of steps (build, test, package, deploy) that code changes pass through on the way to production.',
    explanation: 'A build pipeline provides a repeatable, visible, and automated software release workflow. It starts with a code change and ends with code running in production.',
    example: 'A Jenkinsfile or GitLab CI YAML declaring stages: \n1. Install -> 2. Run Unit Tests -> 3. Run Linter -> 4. Compile Webpack -> 5. Package Docker -> 6. Push Registry.',
    diagramType: 'pipeline'
  },
  {
    id: 29,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Easy',
    question: 'What is a build artifact?',
    answer: 'The output of a build process — a compiled binary, Docker image, or packaged application ready for deployment.',
    explanation: 'Artifacts are the concrete, unchangeable files produced by the compile/package stage. They should be built once and promoted through various environments (testing, staging, prod) without modification.',
    example: 'A `.jar` file for Java, a compiled Go executable, a `.zip` containing static build assets, or a tagged Docker image layer.',
    diagramType: 'pipeline'
  },
  {
    id: 30,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Easy',
    question: 'What is an artifact repository?',
    answer: 'A storage system (e.g. Artifact Registry, Nexus, JFrog Artifactory) for versioned build artifacts/container images/packages.',
    explanation: 'An artifact repository is a secure, version-controlled library for binaries and container images. It acts as the single source of truth for deployment targets.',
    example: 'After a successful build on main, the CI tool uploads the package `payment-service:v2.1.0` to Google Artifact Registry. Kubernetes later pulls that exact image to run.',
    diagramType: 'pipeline'
  },
  {
    id: 31,
    category: 'Git & Branching Workflows',
    difficulty: 'Medium',
    question: 'What is GitOps?',
    answer: 'A practice where the desired state of infrastructure/applications is declared in git, and automated tooling continuously reconciles the actual state to match it.',
    explanation: 'In GitOps, Git is the single source of truth. Software (like ArgoCD or Flux) runs inside the cluster, compares the declared Git configurations with the running cluster, and "pulls" the changes to sync them, preventing configuration drift.',
    example: 'A developer edits a Git repository YAML file changing replicas from 2 to 5. ArgoCD detects the commit, alerts on the drift, and automatically instructs Kubernetes to scale the pods to 5.',
    diagramType: 'gitops'
  },
  {
    id: 32,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is the purpose of feature flags in a DevOps/release context?',
    answer: 'Decouple deployment from release — code can be deployed to production dark (disabled) and enabled gradually/instantly without a new deployment.',
    explanation: 'Feature flags (toggles) allow code to go to production safely turned off. This speeds up branch merging (reducing integration pain) and allows operations/product teams to enable features dynamically.',
    example: 'A new payment checkout UI is deployed to production. It is hidden behind `isNewCheckoutEnabled`. The product manager logs into LaunchDarkly and flips the flag to 10% of users, verifying no errors occur before a full release.',
    diagramType: 'pipeline'
  },
  {
    id: 33,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is a rollback and why is it important?',
    answer: 'Reverting to a previous known-good version after a failed/problematic deployment; important for minimizing downtime/impact when issues are detected post-release.',
    explanation: 'No matter how rigorous the testing, production failures happen. Rollback mechanisms must be automated, predictable, and fast, returning the system to a safe state in seconds.',
    example: 'A new backend version starts throwing 500 errors. The engineer triggers a rollback in Helm: `helm rollback payment-gateway 14`, instantly pointing the deployment back to the healthy revision 14.',
    diagramType: 'pipeline'
  },
  {
    id: 34,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Medium',
    question: 'What is monitoring vs observability?',
    answer: 'Monitoring tracks predefined metrics/alerts for known failure modes; observability is the broader ability to understand a system\'s internal state from its outputs (logs, metrics, traces), including for unknown/unanticipated issues.',
    explanation: 'Monitoring tells you *when* a system is failing (e.g., CPU is at 99%). Observability helps you ask *why* a completely unexpected failure is happening, tracing the root cause across a complex microservice landscape.',
    example: 'Monitoring: An alert sounds because 5xx HTTP response codes exceed 5%. Observability: You run a trace query to find why requests containing specific user tokens are hanging on a downstream database query.',
    diagramType: 'observability'
  },
  {
    id: 35,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Easy',
    question: 'What are the three pillars of observability?',
    answer: 'Logs, metrics, and traces.',
    explanation: 'These three types of telemetry work together:\n- Metrics: High-level numerical indicators (great for spotting trends/anomalies).\n- Logs: Detailed text records of specific local events (great for debugging individual steps).\n- Traces: Request flows across distributed services (great for tracking latency bottlenecks).',
    example: 'A user reports checkout failed. A Metric graph shows a spike in 500s. A Trace reveals the latency was inside the payment microservice. The Logs of that specific container show a connection timeout to the bank API.',
    diagramType: 'observability'
  },
  {
    id: 36,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Easy',
    question: 'What is a metric?',
    answer: 'A numerical measurement over time (e.g. request count, latency, CPU usage) used for monitoring/alerting.',
    explanation: 'Metrics are structured, compact, and optimized for real-time querying. They are categorized into Counters (always increase), Gauges (go up and down), and Histograms (distribution of values).',
    example: 'Prometheus collects a gauge metric `node_memory_Active_bytes` every 15 seconds to track baseline host RAM usage.',
    diagramType: 'observability'
  },
  {
    id: 37,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Hard',
    question: 'What is distributed tracing?',
    answer: 'Tracking a single request\'s journey across multiple services/microservices, useful for pinpointing latency/errors in complex systems.',
    explanation: 'When a user triggers a request, the gateway injects a unique correlation ID (trace ID) into the HTTP headers. As other microservices communicate, they pass this ID along. Services log their entry/exit times (spans) to a tracing tool like Jaeger.',
    example: 'Viewing a OpenTelemetry waterfall graph showing a search request spending 15ms in Auth, 80ms in Search API, and 120ms in a specific Redis query.',
    diagramType: 'observability'
  },
  {
    id: 38,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Medium',
    question: 'What is an SLA, SLO, and SLI?',
    answer: 'SLI: a specific measured indicator (e.g. request latency); SLO: an internal target for that indicator (e.g. 99% of requests under 200ms); SLA: an external, often contractual, commitment tied to SLOs with consequences if breached.',
    explanation: 'SRE frameworks use these defined metrics to keep teams aligned:\n- SLI (Service Level Indicator): The raw metric (e.g., Latency, Error Rate).\n- SLO (Service Level Objective): The goal we set internally (e.g., SLI < 200ms for 99.9% of requests).\n- SLA (Service Level Agreement): The legal promise to customers (e.g., "If we fail to meet 99% uptime, we refund 10% of bill"). SLA is always more relaxed than the SLO.',
    example: 'SLI is "Uptime". SLO is "99.9% Uptime". SLA is "99.0% Uptime". This gives the engineering team a 0.9% safety margin before legal penalties occur.',
    diagramType: 'error-budget'
  },
  {
    id: 39,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Hard',
    question: 'What is an error budget?',
    answer: 'The allowable amount of unreliability (based on SLO) before a team must prioritize stability work over new feature development.',
    explanation: 'An error budget is the inverse of your SLO. If your availability SLO is 99.9%, your error budget is 0.1%. When the budget is exhausted due to incidents, release gates lock automatically, forcing devs to focus purely on bug-fixes and architectural resilience.',
    example: 'An application handles 1,000,000 requests/month. A 99.9% SLO allows 1,000 failed requests. If an incident triggers 900 failures, 90% of the monthly error budget is burned. Only 100 more failures are allowed before feature deployments are paused.',
    diagramType: 'error-budget'
  },
  {
    id: 40,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Medium',
    question: 'What is on-call rotation?',
    answer: 'A schedule where team members take turns being responsible for responding to production incidents/alerts outside normal work hours.',
    explanation: 'On-call ensures 24/7/365 cluster availability. Modern SRE advocates for healthy rotations, multi-tier escalation schedules, and fair compensation to prevent developer burnout.',
    example: 'Using PagerDuty, a team distributes on-call duties: Engineer A is primary on-call this week. If an alert sounds, Engineer A has 15 minutes to acknowledge, or it automatically escalates to Engineer B.',
    diagramType: 'error-budget'
  },
  {
    id: 41,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Medium',
    question: 'What is a runbook?',
    answer: 'Documented step-by-step procedures for diagnosing/resolving specific known operational issues or incidents.',
    explanation: 'A runbook (or playbook) takes the panic out of 3:00 AM incidents. When an alert triggers, it should link directly to a runbook page so the on-call engineer can follow clear, pre-tested instructions to resolve the issue.',
    example: 'An alert for "Database Disk Space > 90%" links to a runbook showing command sequences to identify bloated logs, compress archival tables, and trigger disk expansion.',
    diagramType: 'error-budget'
  },
  {
    id: 42,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Medium',
    question: 'What is a post-mortem / incident review?',
    answer: 'A blameless analysis conducted after an incident to understand root cause and identify preventive actions, focused on systemic improvement rather than individual fault.',
    explanation: 'Post-mortems are the engine of DevOps learning. They document: what went wrong, what was the timeline, why did it happen (the Five Whys), and what action items will prevent this from happening ever again.',
    example: 'Following a major outage, the team meets to analyze how a bad configuration bypassed tests, writing Jira tickets to add schema validators to the build pipeline.',
    diagramType: 'error-budget'
  },
  {
    id: 43,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Easy',
    question: 'What does "blameless" mean in a post-mortem culture?',
    answer: 'Focusing on process/system failures rather than individual mistakes, encouraging honest reporting and learning rather than fear of punishment.',
    explanation: 'If engineers fear being fired or blamed for errors, they will cover up mistakes, leading to catastrophic systemic failures. A blameless culture assumes everyone is smart and trying their best, and that system weaknesses are what allowed the human error to cascade.',
    example: 'Instead of: "Engineer Bob ran a bad command and deleted the DB". Blameless: "Our CLI tool lacked safety warnings or double-confirmation prompts, and allowed single-step global destructive actions. We will implement RBAC and confirmation prompts."',
    diagramType: 'error-budget'
  },
  {
    id: 44,
    category: 'Scaling & Operations',
    difficulty: 'Easy',
    question: 'What is a load balancer\'s role in a DevOps context?',
    answer: 'Distributes traffic across multiple instances for availability/scalability, and enables zero-downtime deployments by shifting traffic away from instances being updated.',
    explanation: 'Load balancers sit in front of servers, presenting a single virtual IP. They check server health and spread requests. During updates, they are critical for slowly draining traffic off old instances to prevent broken connections.',
    example: 'An Nginx load balancer directs incoming HTTPS requests in a round-robin fashion across 4 identical backend pods, bypassing Pod #3 which failed a local /health check.',
    diagramType: 'load-balancer'
  },
  {
    id: 45,
    category: 'Scaling & Operations',
    difficulty: 'Easy',
    question: 'What is horizontal vs vertical scaling?',
    answer: 'Horizontal: adding more instances/nodes; vertical: increasing the resources (CPU/RAM) of an existing instance — horizontal scaling is generally favored for resilience and elasticity.',
    explanation: 'Vertical scaling (Scaling Up) has hardware limits and introduces single points of failure. Horizontal scaling (Scaling Out) is theoretically infinite, supports seamless zero-downtime rolling updates, and ensures that if one instance crashes, others pick up the load.',
    example: 'Vertical: Upgrading an AWS EC2 instance from a `t3.medium` to a `t3.2xlarge`. Horizontal: Adding 3 more replicas of a web container inside a K8s replica pool.',
    diagramType: 'autoscaling'
  },
  {
    id: 46,
    category: 'Scaling & Operations',
    difficulty: 'Medium',
    question: 'What is autoscaling?',
    answer: 'Automatically adjusting the number of running instances based on load/metrics, within configured minimum/maximum bounds.',
    explanation: 'Autoscaling ensures you only pay for what you use. In Kubernetes, the Horizontal Pod Autoscaler (HPA) queries metric servers (CPU/Memory usage or HTTP request volume) and scales the pod replica count up or down automatically.',
    example: 'During a Black Friday shopping spike, the CPU load exceeds 75%. The HPA immediately increases pod count from 3 to 15. At midnight, when traffic subsides, it scales back down to 3 to save cost.',
    diagramType: 'autoscaling'
  },
  {
    id: 47,
    category: 'Scaling & Operations',
    difficulty: 'Easy',
    question: 'What is a health check?',
    answer: 'A periodic probe verifying a service instance is functioning correctly, used to determine load balancer routing and auto-healing/restart decisions.',
    explanation: 'Kubernetes defines three health checks:\n- Liveness Probe: Determines if a container needs to be restarted.\n- Readiness Probe: Determines if a container is ready to accept user traffic.\n- Startup Probe: Disables other probes until the app has finished booting.',
    example: 'A liveness probe hits `/api/healthz` every 10s. If the container is locked in a deadlock, the probe fails 3 times, prompting Kubernetes to immediately restart the container.',
    diagramType: 'health-check'
  },
  {
    id: 48,
    category: 'Scaling & Operations',
    difficulty: 'Hard',
    question: 'What is chaos engineering?',
    answer: 'Deliberately injecting failures into a system in a controlled way to test its resilience and uncover weaknesses before they cause real incidents.',
    explanation: 'Chaos engineering shifts testing from simulated environments into real, unpredictable production. By proving our systems can survive unexpected failures (network drops, hardware crashes, server termination), we build absolute confidence.',
    example: 'Netflix runs "Chaos Monkey", a daemon that randomly terminates virtual machines in their production AWS cluster. Since their microservices are designed with circuit breakers, no users notice.',
    diagramType: 'chaos-monkey'
  },
  {
    id: 49,
    category: 'Testing & DevSecOps',
    difficulty: 'Medium',
    question: 'What is the "shift-left" principle in DevOps?',
    answer: 'Moving testing, security, and quality checks earlier in the development process (closer to "the left" of the pipeline timeline) rather than catching issues late.',
    explanation: 'In traditional software lifecycles, testing and security are final gates done right before deployment, resulting in expensive, late-stage redesigns. Shift-left integrates checks into the IDE and the earliest CI commits.',
    example: 'An engineer installs an IDE extension that highlights security flaws as they write code, catching SQL Injection vectors before the code even leaves their machine.',
    diagramType: 'testing-pyramid'
  },
  {
    id: 50,
    category: 'Testing & DevSecOps',
    difficulty: 'Medium',
    question: 'What is DevSecOps?',
    answer: 'Integrating security practices/tooling throughout the DevOps pipeline (shift-left security) rather than treating security as a separate, later-stage gate.',
    explanation: 'DevSecOps ensures that "Security is everyone\'s responsibility." Instead of having an audit team review code once a quarter, security scanning is automated inside the daily pipeline.',
    example: 'Every pipeline build executes static analysis (SAST), software composition analysis (SCA) to check dependencies, and docker vulnerability scanning before releasing.',
    diagramType: 'testing-pyramid'
  },
  {
    id: 51,
    category: 'Testing & DevSecOps',
    difficulty: 'Medium',
    question: 'What is static code analysis / SAST?',
    answer: 'Scanning source code for vulnerabilities/bugs without executing it, often integrated as an automated CI pipeline step.',
    explanation: 'Static Application Security Testing (SAST) analyzes raw code syntax against known patterns of security vulnerabilities, poor coding styles, and potential logical bugs.',
    example: 'SonarQube scans a Java PR and blocks the build because it found a hardcoded password or an unclosed database connection block on line 42.',
    diagramType: 'testing-pyramid'
  },
  {
    id: 52,
    category: 'Testing & DevSecOps',
    difficulty: 'Hard',
    question: 'What is DAST?',
    answer: 'Dynamic Application Security Testing — testing a running application for vulnerabilities by simulating attacks against it.',
    explanation: 'Unlike SAST which looks inside the code, DAST operates from the outside (black-box). It interacts with a running staging environment, executing simulated penetration tests (like SQL injections, XSS payloads, and open-port scans).',
    example: 'An automated OWASP ZAP script is triggered inside the CD pipeline to execute attack payloads against the newly-deployed QA API endpoint.',
    diagramType: 'testing-pyramid'
  },
  {
    id: 53,
    category: 'Testing & DevSecOps',
    difficulty: 'Medium',
    question: 'What is dependency scanning?',
    answer: 'Automated checking of a project\'s dependencies against known vulnerability databases, flagging risky packages.',
    explanation: 'Modern apps consist of up to 90% open-source third-party dependencies. Dependency scanning (or SCA) parses `package.json`, `pom.xml`, etc., maps them against databases like the CVE (Common Vulnerabilities and Exposures), and fails builds if critical risks are found.',
    example: 'GitHub Dependabot alerts a repo that its imported `lodash` version is vulnerable to prototype pollution, and auto-generates a Pull Request upgrading it to a patched version.',
    diagramType: 'testing-pyramid'
  },
  {
    id: 54,
    category: 'Testing & DevSecOps',
    difficulty: 'Medium',
    question: 'What is secrets management in a CI/CD context?',
    answer: 'Storing sensitive credentials (API keys, DB passwords) securely (e.g. in a vault/secrets manager) rather than hardcoding them in source code or pipeline configs.',
    explanation: 'Pipelines must be fully automated but have secure boundaries. Secrets management tools use short-lived tokens, encryption-at-rest, audit logs, and dynamic generation to keep credentials safe.',
    example: 'A Jenkins job requests a temporary, 5-minute AWS database credential from HashiCorp Vault using its secure pipeline token, bypassing any hardcoded secrets on the Jenkins disk.',
    diagramType: 'testing-pyramid'
  },
  {
    id: 55,
    category: 'Testing & DevSecOps',
    difficulty: 'Easy',
    question: 'Why should secrets never be committed to version control?',
    answer: 'Git history retains them indefinitely even if later removed, exposing credentials to anyone with repo access (or if the repo becomes public/leaked).',
    explanation: 'Even if you overwrite a secret and make a new commit, the credential remains fully visible in the Git commit history. Attackers scan public and private repositories using automated scrapers to hijack keys within seconds.',
    example: 'An engineer accidentally commits an AWS access key. Within 3 minutes, automated bots harvest it, spin up 100 EC2 instances for crypto mining, and leave the company with a massive bill.',
    diagramType: 'testing-pyramid'
  },
  {
    id: 56,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Easy',
    question: 'What is an environment (dev/staging/prod) and why maintain separate ones?',
    answer: 'Isolated deployment targets mirroring production at different fidelity levels, letting changes be validated progressively before reaching real users.',
    explanation: 'Separate environments isolate risk. Developing directly in production leads to outages. Progressive pipelines promote builds from Dev (developer experiments) to Staging (production clone with mock data) before hitting Prod.',
    example: 'An API change is first deployed to Dev for testing by developers. Then, QA verifies it in Staging under synthetic load. Finally, it is pushed to Production during off-peak hours.',
    diagramType: 'pipeline'
  },
  {
    id: 57,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Easy',
    question: 'What is the purpose of a staging environment?',
    answer: 'A production-like environment for final validation/testing before deploying to actual production, catching issues that unit tests alone might miss.',
    explanation: 'Staging acts as a rehearsals stage. It mimics production hardware, configuration, networking, and databases as closely as possible. It is the ultimate checkpoint for performance and integration checks.',
    example: 'A team runs end-to-end Cypress UI tests in their staging environment to ensure the login flow connects successfully to the replicated authentication directory.',
    diagramType: 'pipeline'
  },
  {
    id: 58,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is a smoke test in a deployment pipeline?',
    answer: 'A quick set of basic checks run immediately after deployment to confirm the application is minimally functional before considering the deployment successful.',
    explanation: 'Originating in hardware testing, "smoke testing" means plugging a device in to see if it catches fire. In software, it is a rapid, non-exhaustive validation suite targeting core critical endpoints.',
    example: 'Immediately after staging a deploy, the pipeline hits the root `/` URL, the health endpoint, and performs a single simple mock login. If they respond HTTP 200 within 1 second, the pipeline proceeds; otherwise, it rollbacks.',
    diagramType: 'pipeline'
  },
  {
    id: 59,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is zero-downtime deployment?',
    answer: 'Deploying a new version without any service interruption for users, typically via rolling updates or blue-green switching.',
    explanation: 'Zero-Downtime is essential for modern high-velocity environments where deploys happen during business hours. It is achieved by keeping both old and new versions running simultaneously during transition, and cleanly routing traffic.',
    example: 'Using AWS Elastic Beanstalk Blue/Green or Kubernetes Rolling Updates to release code without throwing any "502 Bad Gateway" errors to active checkout carts.',
    diagramType: 'pipeline'
  },
  {
    id: 60,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is a deployment strategy\'s rollback plan, and why must it be defined upfront?',
    answer: 'A clear, tested procedure for reverting if a deployment fails — defining it before deploying (not improvising during an incident) reduces downtime/risk during actual failures.',
    explanation: 'If a release goes south, you cannot afford to waste time drafting commands under pressure. A rollback plan declares exact scripts, data scripts, and criteria that automate reversing the changes.',
    example: 'A deployment runbook includes: "If average response time exceeds 400ms for 3 minutes, execute `./rollback.sh` which triggers `helm rollback` and database migration schema reversions."',
    diagramType: 'pipeline'
  },
  {
    id: 61,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Easy',
    question: 'What is the purpose of tagging/versioning releases?',
    answer: 'Enables precise tracking of what code is running where, and provides clear rollback targets if an issue is traced to a specific release.',
    explanation: 'Without clear version tags, identifying which commit broke a system is a needle in a haystack. Version tags tie deployed binary artifacts directly to git commits.',
    example: 'By tagging a production Docker image as `v1.4.2` (corresponding to Git tag `v1.4.2`), engineers can quickly check the exact git diff between `v1.4.1` and `v1.4.2` to find the source of an incident.',
    diagramType: 'pipeline'
  },
  {
    id: 62,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is semantic versioning (semver)?',
    answer: 'A versioning scheme (MAJOR.MINOR.PATCH) where increments signal the nature of changes — major for breaking changes, minor for new features, patch for bug fixes.',
    explanation: 'SemVer provides a mathematical language for dependency safety:\n- MAJOR increment: incompatible API breaking changes.\n- MINOR increment: backward-compatible functionality additions.\n- PATCH increment: backward-compatible bug fixes.',
    example: 'Upgrading a dependency from `2.1.4` to `2.2.0` is safe (minor release), but upgrading to `3.0.0` requires checking for breaking API changes.',
    diagramType: 'pipeline'
  },
  {
    id: 63,
    category: 'Git & Branching Workflows',
    difficulty: 'Medium',
    question: 'What is a monorepo vs polyrepo?',
    answer: 'Monorepo: all projects/services in a single repository; polyrepo: each project/service has its own separate repository — tradeoffs around coordinated changes vs independent team autonomy.',
    explanation: 'Monorepos (used by Google/Meta) make code sharing, global refactoring, and atomic multi-service commits easy, but require sophisticated build caching. Polyrepos give teams absolute control over their own repos and pipelines but make cross-service updates complex.',
    example: 'Monorepo: Frontend and backend code reside in `/frontend` and `/backend` within one git repo. Polyrepo: Frontend resides in `github.com/org/web` and Backend resides in `github.com/org/api`.',
    diagramType: 'branching'
  },
  {
    id: 64,
    category: 'Git & Branching Workflows',
    difficulty: 'Medium',
    question: 'What is trunk-based development?',
    answer: 'A branching strategy where developers integrate small, frequent changes directly into a single main branch, avoiding long-lived feature branches.',
    explanation: 'In Trunk-Based Development, developers push directly to "trunk" (or main) or merge short-lived feature branches (<24 hrs) continuously. This prevents massive git merge conflicts ("merge hell") and forces the team to keep the codebase always green.',
    example: 'A developer writes a small feature, merges it within 4 hours, and hides incomplete parts behind a feature flag. They avoid having a separate branch open for weeks.',
    diagramType: 'branching'
  },
  {
    id: 65,
    category: 'Git & Branching Workflows',
    difficulty: 'Medium',
    question: 'How does trunk-based development support CI/CD?',
    answer: 'Frequent small merges reduce integration conflicts and keep the main branch always close to deployable, aligning naturally with continuous integration practices.',
    explanation: 'Since everyone integrates code daily, automated tests run constantly on the actual shared trunk. Feedback is immediate, regressions are pinpointed quickly, and continuous delivery remains achievable.',
    example: 'Because merges to the trunk are small, the test suite completes in under 5 minutes, allowing fast feedback loops and enabling multiple production releases per day.',
    diagramType: 'branching'
  },
  {
    id: 66,
    category: 'Git & Branching Workflows',
    difficulty: 'Easy',
    question: 'What is a feature branch workflow?',
    answer: 'Developing each feature in its own branch, merged into main via pull request after review, as opposed to trunk-based development\'s direct frequent commits.',
    explanation: 'Common in open-source and standard GitFlow, features are isolated on branches (e.g. `feature/user-profile`) until fully finished and audited. This ensures high-intensity reviews but can lead to branch stagnation.',
    example: 'An engineer works on a search feature inside `feature/search` for 5 days. Before merging, they must pull main and resolve 12 merge conflicts introduced by other team members.',
    diagramType: 'branching'
  },
  {
    id: 67,
    category: 'Git & Branching Workflows',
    difficulty: 'Easy',
    question: 'What is a pull request (PR) / merge request review process for in DevOps?',
    answer: 'Peer code review before merging, often gated by required passing CI checks (tests, linting) before allowing the merge.',
    explanation: 'PRs are the social gatekeepers. They enable knowledge sharing, catch bugs before they merge, and act as a secure boundary ensuring that at least two sets of eyes review all changes entering main.',
    example: 'Setting up repository branch protection rules in GitHub: "Require 1 approving review" and "Require status checks to pass (CI Build)" before merging to `main`.',
    diagramType: 'branching'
  },
  {
    id: 68,
    category: 'Git & Branching Workflows',
    difficulty: 'Easy',
    question: 'What is a linter and why include it in CI?',
    answer: 'Static analysis tool enforcing code style/catching common errors automatically; including it in CI ensures consistency without relying on manual review catching every issue.',
    explanation: 'Linters prevent bike-shedding (arguing about semicolons, spacing, or brace styles in PR reviews). By enforcing code rules programmatically, human reviewers can focus on logical architecture and business security.',
    example: 'Running `eslint .` in a CI step to instantly reject a PR if it contains unused variables or incorrect ES module syntax.',
    diagramType: 'branching'
  },
  {
    id: 69,
    category: 'Testing & DevSecOps',
    difficulty: 'Easy',
    question: 'What is test automation\'s role in a CI/CD pipeline?',
    answer: 'Automatically running unit/integration/e2e tests on every change, catching regressions before they reach production without manual testing bottlenecks.',
    explanation: 'Manual QA is slow and cannot scale. Test automation guarantees that every release is guarded by a comprehensive, repeatable suite that checks thousands of logical flows in seconds.',
    example: 'A developer refactors a helper function. Upon git push, the automated test suite detects a regression in the discount calculation and alerts the developer before QA ever sees it.',
    diagramType: 'testing-pyramid'
  },
  {
    id: 70,
    category: 'Testing & DevSecOps',
    difficulty: 'Medium',
    question: 'What is the testing pyramid?',
    answer: 'A model suggesting many fast unit tests at the base, fewer integration tests in the middle, and a small number of slow/brittle end-to-end tests at the top.',
    explanation: 'To maintain rapid, cost-effective CI pipelines:\n- Unit Tests (bottom): fast, cheap, tests single functions.\n- Integration Tests (middle): slower, tests service communication.\n- E2E Tests (top): very slow, expensive, tests the entire UI-to-DB system. Keep E2E tests minimal to avoid sluggish pipelines and flakiness.',
    example: 'A pipeline runs 800 Unit tests (takes 10s), 50 Integration tests (takes 1 min), and 5 Cypress UI E2E tests (takes 5 mins).',
    diagramType: 'testing-pyramid'
  },
  {
    id: 71,
    category: 'Containers & Orchestration',
    difficulty: 'Easy',
    question: 'What is containerization\'s benefit for CI/CD consistency?',
    answer: 'Ensures the app runs in an identical environment across dev, test, and production, eliminating "works on my machine" issues from environment mismatches.',
    explanation: 'Containerization packages the absolute system runtime (dependencies, OS packages, configuration) inside the image. This guarantees that if it works in a container on a local machine, it will run identically in a production cluster.',
    example: 'Avoiding errors where a Python script fails in production because the host Linux server runs Python 3.8 while the developer used Python 3.10 locally.',
    diagramType: 'container-vs-vm'
  },
  {
    id: 72,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Medium',
    question: 'What is an immutable infrastructure approach?',
    answer: 'Instead of patching/updating servers in place, new instances are built from updated images/configs and old ones are replaced entirely — reduces drift and inconsistency.',
    explanation: 'Under mutable infrastructure, servers are patched over time (`apt-get upgrade`), causing server states to slowly drift. Under immutable infrastructure, servers are "read-only". To update an app, you build a new virtual image and deploy fresh servers, destroying the old ones.',
    example: 'Updating an application by building a new Amazon Machine Image (AMI) with the updated source code, spinning up a new Auto Scaling group, and destroying the old VM group.',
    diagramType: 'iac'
  },
  {
    id: 73,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Medium',
    question: 'What is the difference between mutable and immutable infrastructure?',
    answer: 'Mutable: servers are updated/patched in place over time; immutable: servers are never modified after creation, only replaced — immutable is generally preferred for consistency/reliability.',
    explanation: 'Mutable infrastructure is cheaper for small systems but leads to "snowflake servers" (servers with unique, undocumented configurations that cannot be rebuilt easily). Immutable infrastructure prevents config drift completely.',
    example: 'Mutable: SSH-ing into 10 nodes to manually run `yum install package`. Immutable: Re-running a Packer image builder and executing a Terraform script to swap node instances.',
    diagramType: 'iac'
  },
  {
    id: 74,
    category: 'Scaling & Operations',
    difficulty: 'Hard',
    question: 'What is a service mesh?',
    answer: 'Infrastructure layer (e.g. Istio, Linkerd) managing service-to-service communication in microservices — handling retries, load balancing, mTLS, and observability transparently.',
    explanation: 'As microservices grow, writing networking code (retries, timeouts, security) in every single application is redundant. A Service Mesh injects a sidecar proxy (e.g. Envoy) into every Pod, intercepting and managing all network traffic.',
    example: 'Configuring a mutual TLS (mTLS) requirement across all microservices so that all pod-to-pod communications are fully encrypted and authenticated automatically without app modifications.',
    diagramType: 'chaos-monkey'
  },
  {
    id: 75,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Medium',
    question: 'What is the purpose of centralized logging in a distributed system?',
    answer: 'Aggregating logs from many services/instances into one searchable place, since individually SSH-ing into each instance to check logs doesn\'t scale.',
    explanation: 'In a microservice architecture, a single user click might trigger 15 requests across 10 pods. Finding a stack trace across dynamic, short-lived containers requires a central indexing collector.',
    example: 'All Kubernetes pods stream their stdout logs to a local FluentBit daemon, which aggregates them into Elasticsearch, allowing developers to query and filter them instantly using Kibana.',
    diagramType: 'observability'
  },
  {
    id: 76,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Easy',
    question: 'What tools are commonly used for centralized logging?',
    answer: 'ELK/EFK stack (Elasticsearch/Fluentd/Kibana), Splunk, or cloud-native options like CloudWatch Logs/Cloud Logging.',
    explanation: 'The industry has standard options:\n- ELK/EFK: Open-source standard (Elasticsearch database, Fluentd/Logstash log shipper, Kibana dashboard).\n- Grafana Loki: A modern, cost-effective log aggregator that indexes labels instead of full text.\n- SaaS platforms: Datadog, Splunk, or New Relic which handle high volume seamlessly.',
    example: 'Configuring an EFK stack where Fluentd running as a DaemonSet harvests logs from `/var/log/containers` on all Kubernetes worker nodes.',
    diagramType: 'observability'
  },
  {
    id: 77,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Easy',
    question: 'What is Prometheus?',
    answer: 'An open-source monitoring/alerting system that scrapes and stores time-series metrics, commonly paired with Grafana for visualization.',
    explanation: 'Unlike traditional push monitors, Prometheus uses a pull-based architecture. It periodically queries "metrics endpoints" (e.g., `/metrics`) of targets, storing the data in a highly optimized time-series database (TSDB) and supporting PromQL queries.',
    example: 'Prometheus scrapes the `/metrics` endpoint of a backend service every 15s, saving `http_requests_total{status="500"}` which is used to trigger Slack alerts.',
    diagramType: 'observability'
  },
  {
    id: 78,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Easy',
    question: 'What is Grafana?',
    answer: 'A visualization/dashboarding tool commonly used to display metrics from sources like Prometheus.',
    explanation: 'Grafana is the visual layer of observability. It connects to various databases (Prometheus, InfluxDB, CloudWatch, Postgres) and builds interactive, beautiful real-time dashboards with widgets, graphs, and maps.',
    example: 'Creating a dashboard displaying real-time cluster health, detailing active Pod CPU usage, memory allocations, network traffic, and outstanding alert triggers.',
    diagramType: 'observability'
  },
  {
    id: 79,
    category: 'Monitoring, Observability & SRE',
    difficulty: 'Medium',
    question: 'What is the purpose of alerting thresholds, and a common pitfall?',
    answer: 'Notifying teams when metrics breach defined limits; a common pitfall is alert fatigue from too many low-signal alerts, causing real issues to get missed/ignored.',
    explanation: 'Alerts must be actionable. Alerting on basic machine thresholds (e.g., CPU > 85%) leads to noise because systems might operate high but safely. Alert instead on actual user-facing degradation (e.g., error rates or latency SLOs).',
    example: 'A team disables alerts for 90% disk usage on test environments, replacing them with a single alert that sounds only if the production database has less than 2 hours of disk capacity left at current growth rates.',
    diagramType: 'error-budget'
  },
  {
    id: 80,
    category: 'Scaling & Operations',
    difficulty: 'Medium',
    question: 'What is capacity planning?',
    answer: 'Forecasting future resource needs based on growth trends, to provision infrastructure proactively rather than reactively scrambling during unexpected load.',
    explanation: 'While autoscaling handles micro-spikes, capacity planning looks at seasonal growth. It analyzes CPU/Disk consumption rates over months to secure discounts, adjust server types, or provision bare-metal links ahead of time.',
    example: 'Using historical metric queries over 6 months to forecast that database storage will exhaust in 3 months, scheduling a low-risk maintenance window to expand volume sizes.',
    diagramType: 'autoscaling'
  },
  {
    id: 81,
    category: 'Scaling & Operations',
    difficulty: 'Medium',
    question: 'What is a load test and why run one before major releases?',
    answer: 'Simulating high traffic/usage against a system to verify it holds up under expected (and beyond-expected) load before real users encounter issues.',
    explanation: 'A load test identifies architectural bottlenecks (e.g. database locks, thread pooling limits, or memory leaks) that are invisible under simple unit/integration testing environments.',
    example: 'Running an Apache JMeter or k6 script simulating 5,000 users searching and buying items simultaneously on a staging environment to observe when the server response time degrades.',
    diagramType: 'autoscaling'
  },
  {
    id: 82,
    category: 'Scaling & Operations',
    difficulty: 'Medium',
    question: 'What is the difference between a load test and a stress test?',
    answer: 'Load test verifies behavior under expected peak conditions; stress test pushes beyond expected limits to find the actual breaking point and failure behavior.',
    explanation: 'Load testing validates that the system can meet its SLA. Stress testing is "testing to fail". It determines how the application behaves when overwhelmed: does it crash gracefully (with custom errors) or does it experience database corruption and cascade?',
    example: 'Load testing: Simulating expected peak of 1,000 orders/minute. Stress testing: Cranking traffic to 15,000 orders/minute to verify if the payment queue holds or if database connection limits lock up.',
    diagramType: 'autoscaling'
  },
  {
    id: 83,
    category: 'Scaling & Operations',
    difficulty: 'Easy',
    question: 'What is the purpose of a CDN in a DevOps/performance context?',
    answer: 'Caches static content at edge locations near users, reducing origin server load and improving latency globally.',
    explanation: 'Content Delivery Networks (CDNs) distribute static assets (JS, CSS, images, video) to regional "Edge Servers". Instead of a London user downloading a 10MB image from a California database, the CDN serves it from a London server in milliseconds.',
    example: 'Setting up Cloudflare in front of a website. 85% of static content requests are served directly from Cloudflare cache edge, dropping origin server CPU load from 60% to 5%.',
    diagramType: 'load-balancer'
  },
  {
    id: 84,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Medium',
    question: 'What is the 12-Factor App methodology?',
    answer: 'A set of best practices for building cloud-native, scalable applications — covering config, dependencies, stateless processes, disposability, and more.',
    explanation: 'Created by Heroku engineers, the 12-Factor App design pattern guarantees that applications are highly portable, easily containerized, ready for elastic cloud environments, and easily automated.',
    example: 'Adhering to the "Stateless Processes" factor: Sessions are stored in Redis instead of the server\'s memory, allowing containers to scale horizontally or restart at any second.',
    diagramType: 'iac'
  },
  {
    id: 85,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Easy',
    question: 'Why should config be stored in environment variables rather than in code (12-Factor principle)?',
    answer: 'Keeps sensitive/environment-specific values out of source control, and allows the same build artifact to run correctly across dev/staging/prod without code changes.',
    explanation: 'Config changes across environments (Dev DB vs Prod DB). If config is baked into the code, you must build separate images for separate environments. Environment variables allow the identical Docker container image to run safely anywhere.',
    example: 'In code, you read `process.env.DB_HOST`. In Kubernetes, you inject this host from a local ConfigMap unique to each namespace, keeping the application container universal.',
    diagramType: 'iac'
  },
  {
    id: 86,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Medium',
    question: 'What is disposability in the 12-Factor context?',
    answer: 'Processes should start up fast and shut down gracefully, supporting elastic scaling and robust deployment without data loss/corruption during restarts.',
    explanation: 'Disposability means containers can be destroyed or spawned instantly. When a container receives a `SIGTERM` signal, it must stop accepting new requests, finish outstanding transactions, release database links, and exit cleanly in seconds.',
    example: 'A Node.js app intercepts `process.on(\'SIGTERM\')`, waits for active HTTP connections to drain, then exits. It takes under 3s to shut down, allowing Kubernetes to quickly replace it during updates.',
    diagramType: 'iac'
  },
  {
    id: 87,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is a webhook and how is it used in CI/CD?',
    answer: 'An HTTP callback triggered by an event (e.g. a git push), commonly used to automatically kick off a CI/CD pipeline run.',
    explanation: 'Instead of pipelines continuously polling GitHub every 10 seconds (which wastes bandwidth and API limits), GitHub sends a push POST request ("webhook") to the CI tool immediately when code is pushed.',
    example: 'A developer merges a PR. GitHub instantly triggers a webhook to `https://jenkins.company.com/github-webhook`, which starts the exact test-and-deploy workflow.',
    diagramType: 'pipeline'
  },
  {
    id: 88,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is a build cache and why does it matter for CI speed?',
    answer: 'Reusing previously computed build outputs/dependencies (rather than rebuilding from scratch every time) significantly speeds up CI pipeline runs.',
    explanation: 'CI pipelines must be fast to keep developer productivity high. If a pipeline takes 30 minutes, developers get distracted. Reusing layer caches for Docker or node_modules caches cuts pipeline time drastically.',
    example: 'GitHub Actions caches `~/.npm` based on `package-lock.json` hash. If packages didn\'t change, npm install takes 10s instead of 3 minutes.',
    diagramType: 'pipeline'
  },
  {
    id: 89,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is parallelization in CI pipelines?',
    answer: 'Running independent test/build steps concurrently rather than sequentially, reducing overall pipeline duration.',
    explanation: 'If your test suite has 10 independent test blocks, running them one-by-one is slow. By spinning up multiple runners, you can execute them in parallel, yielding massive speed boosts.',
    example: 'Dividing test suites into 4 parallel blocks. Overall pipeline completion drops from 12 minutes to 3.5 minutes, keeping feedback snappy.',
    diagramType: 'pipeline'
  },
  {
    id: 90,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is the difference between a CI server and a CD tool (conceptually, not by product name)?',
    answer: 'CI focuses on integrating and validating code changes (build/test); CD focuses on delivering/deploying validated changes to environments — often the same tool handles both in practice.',
    explanation: 'CI is about quality assurance and integration (code compilation, linting, tests). CD is about release management (handling kubernetes configurations, green/blue switches, release packaging, environment promotion).',
    example: 'CI verifies: "This Java code compiles and passes 900 unit tests." CD executes: "Take the verified binary and push it to AWS ECS cluster using a blue-green router."',
    diagramType: 'pipeline'
  },
  {
    id: 91,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is the role of approval gates in a CD pipeline?',
    answer: 'Manual checkpoints (e.g. before production deploy) requiring explicit human sign-off, balancing automation speed with control over risk-sensitive releases.',
    explanation: 'Approval gates are typical in Continuous Delivery. They block promotion until business owners, QA leads, or operations sign off, bridging fully automated testing with corporate governance requirements.',
    example: 'The pipeline builds and tests code, deploys to Staging, then locks. It triggers a Slack notification: "Release v2.0 is ready for Staging QA review. Approve?". Once QA clicks "Approve", the production deploy resumes.',
    diagramType: 'pipeline'
  },
  {
    id: 92,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Medium',
    question: 'What is infrastructure drift detection?',
    answer: 'Automated comparison between defined IaC state and actual live infrastructure, flagging manual/unauthorized changes that have diverged from the source of truth.',
    explanation: 'To enforce Git as the sole truth of your hardware, drift detectors (e.g. Terraform Cloud drifts, AWS drift detection, or ArgoCD auto-sync) compare live state with git files and trigger alerts on modifications.',
    example: 'A developer manually adds an inbound rule to a Security Group. At midnight, Terraform drift scan detects the rule, sends an alert, and automatically deletes it to preserve git configuration state.',
    diagramType: 'iac'
  },
  {
    id: 93,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Medium',
    question: 'What is the purpose of environment parity (dev/staging/prod being as similar as possible)?',
    answer: 'Reduces "works in staging, breaks in prod" surprises by minimizing configuration/version differences between environments.',
    explanation: 'If staging runs Postgres 11 on a tiny single container, but production runs highly cluster-available Postgres 14 with custom security plugins, tests run in staging cannot reliably predict production behavior.',
    example: 'Using identical Helm charts across Staging and Production namespaces, modifying only resource constraints (CPU/RAM sizing) and scaling bounds, preserving exact software configurations.',
    diagramType: 'iac'
  },
  {
    id: 94,
    category: 'Infrastructure as Code (IaC)',
    difficulty: 'Medium',
    question: 'What is a common cause of "it works on my machine" issues, and how does DevOps address it?',
    answer: 'Environment inconsistencies (OS, dependency versions, config); addressed via containerization and IaC ensuring consistent environments across all stages.',
    explanation: '"It works on my machine" happens because developers use unique local systems (macOS, specific Node versions, local environment paths). DevOps enforces standard containers, so code executes in the identical Linux environment locally and on servers.',
    example: 'A team mandates the use of Docker Compose for local dev. Every team member works on an isolated alpine container, eliminating macOS vs Windows file path bugs.',
    diagramType: 'iac'
  },
  {
    id: 95,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is the purpose of a deployment freeze?',
    answer: 'Temporarily halting new deployments (e.g. during a high-traffic event or holiday period) to reduce risk of introducing instability when quick response to issues might be harder.',
    explanation: 'During peak seasonal traffic, maintaining 100% stability is primary. Deploying new features increases risk. Freezes stop routine changes, while still allowing critical hotfixes if reviewed under strict crisis workflows.',
    example: 'An e-commerce app implements a deployment freeze from Black Friday (Nov 24) to Cyber Monday (Nov 28). No feature PRs are merged to prevent outages during high-earning sales periods.',
    diagramType: 'pipeline'
  },
  {
    id: 96,
    category: 'CI/CD & Release Strategies',
    difficulty: 'Medium',
    question: 'What is a change advisory board (CAB) and why do some teams move away from it?',
    answer: 'A formal review process for approving changes before deployment; many high-velocity DevOps teams replace/reduce heavy CAB processes with automated testing/canary releases, since manual gates slow down frequent small deployments.',
    explanation: 'CAB meetings introduce massive delivery bottlenecks. In classic corporate IT, a board reviews changes every two weeks, forcing massive, risky code drops. High-velocity DevOps replaces CAB reviews with rigorous CI/CD tests, audit logs, and automated canary promotions.',
    example: 'A company transitions from weekly CAB reviews to a secure Git approval flow, cutting average feature lead time from 10 days to 3 hours.',
    diagramType: 'pipeline'
  },
  {
    id: 97,
    category: 'Introduction & Culture',
    difficulty: 'Medium',
    question: 'What is the relationship between DevOps and SRE (Site Reliability Engineering)?',
    answer: 'SRE is often described as a specific implementation of DevOps principles, applying software engineering approaches (error budgets, automation) specifically to operations/reliability work.',
    explanation: 'A popular saying is: `class SRE implements DevOps`. While DevOps is a general philosophy of speed and collaboration, SRE (designed by Google) is a concrete engineering framework with prescriptive practices (SLOs, Error Budgets, and spending 50% time on coding automation).',
    example: 'A DevOps culture advocates for blameless reviews. SRE implements this by requiring standard post-mortem documents and auto-updating the team\'s stability budget rules.',
    diagramType: 'pipeline'
  },
  {
    id: 98,
    category: 'Introduction & Culture',
    difficulty: 'Medium',
    question: 'What is a common metric for measuring DevOps performance (DORA metrics)?',
    answer: 'Deployment frequency, lead time for changes, mean time to recovery (MTTR), and change failure rate.',
    explanation: 'The DevOps Research and Assessment (DORA) group identified 4 key metrics that predict elite organizational performance:\n- Deployment Frequency: How often code is shipped.\n- Lead Time for Changes: How long code takes to go from commit to production.\n- MTTR (Mean Time to Recovery): Time taken to restore service during incidents.\n- Change Failure Rate: Percentage of deploys causing production incidents.',
    example: 'An elite company deploys multiple times a day, has a lead time under 1 hour, recovers from incidents in under 15 minutes, and has a change failure rate under 5%.',
    diagramType: 'pipeline'
  },
  {
    id: 99,
    category: 'Introduction & Culture',
    difficulty: 'Medium',
    question: 'Why does high deployment frequency correlate with lower risk, counter to intuition?',
    answer: 'Small, frequent changes are easier to reason about, test, and roll back individually than large infrequent batches where many changes are bundled together, making root cause harder to isolate when something breaks.',
    explanation: 'Deploying once a month rolls up 200 changes from 15 developers. If it breaks, finding which change caused the failure is a debugging nightmare. Deploying 10 times a day rolls up only 1-2 small changes. If it breaks, the culprit is immediately obvious and simple to revert.',
    example: 'Releasing a single button color update and checking latency. If a minor delay occurs, you know exactly which commit is responsible.',
    diagramType: 'pipeline'
  },
  {
    id: 100,
    category: 'Introduction & Culture',
    difficulty: 'Medium',
    question: 'How would a frontend engineer typically interact with DevOps practices day-to-day?',
    answer: 'Writing/maintaining CI pipeline configs for builds/tests, working with Docker for local dev parity, understanding deployment pipelines enough to debug failed builds, and following environment/secrets conventions the team has established.',
    explanation: 'Frontend developers do not work in isolation. They write Dockerfiles for React/Vite compilation, manage CDN caching headers, configure webhook callbacks for automated client builds, adjust staging environment setups, and monitor Core Web Vitals using Sentry metrics.',
    example: 'A React engineer updates `.github/workflows/deploy.yml` to optimize yarn dependency caching, speeding up static assets deployment to Cloudfront by 4 minutes.',
    diagramType: 'pipeline'
  }
];
