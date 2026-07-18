import { Question } from '../types';

export const category5Questions: Question[] = [
  {
    id: 22,
    question: "What is Pub/Sub?",
    answer: "Pub/Sub (Publisher/Subscriber) is a fully managed, real-time, global asynchronous messaging service designed to decouple services that produce events (publishers) from services that process those events (subscribers).",
    category: "DevOps & Pipelines",
    explanation: "Pub/Sub provides secure, highly available, and reliable messaging. A publisher sends a message to a named 'Topic' without knowing who will consume it. Pub/Sub replicates this message across multiple storage disks inside a region and delivers it to all active 'Subscriptions' associated with that topic. It forms the backbone of event-driven cloud architectures and streaming analytics.",
    example: {
      title: "Publishing a Message via CLI",
      description: "Create a topic and publish a JSON payload representing a user event.",
      cli: "# Create a new Pub/Sub topic\ngcloud pubsub topics create user-signups\n\n# Publish a message to the topic\ngcloud pubsub topics publish user-signups \\\n  --message='{\"userId\": \"u992\", \"email\": \"new@user.com\"}'"
    },
    diagramType: "pubsub_flow",
    visualAid: "Asynchronous decoupling: Publisher -> Pub/Sub Topic -> Subscriptions (App Service / Analytics / Data Lake)."
  },
  {
    id: 29,
    question: "What is Cloud Build?",
    answer: "Cloud Build is GCP's fully managed CI/CD (Continuous Integration / Continuous Deployment) service that allows you to import source code, run unit tests, compile packages, build container images, and deploy software across Google Cloud platforms.",
    category: "DevOps & Pipelines",
    explanation: "Cloud Build executes builds as a series of sequential 'build steps'. Each build step is run inside a specialized Docker container (e.g., node, docker, maven, gcloud). You define your build lifecycle in a YAML or JSON file named 'cloudbuild.yaml'. It scales dynamically with zero pre-allocated compute, and you pay only for the exact minutes your build container executes.",
    example: {
      title: "Writing a cloudbuild.yaml Configuration",
      description: "A simple configuration file to compile a Node application, build a Docker container, and push it to Artifact Registry.",
      code: "# cloudbuild.yaml\nsteps:\n  # Step 1: Install npm packages and test\n  - name: 'gcr.io/cloud-builders/npm'\n    args: ['install']\n  # Step 2: Build the Docker container\n  - name: 'gcr.io/cloud-builders/docker'\n    args: ['build', '-t', 'us-central1-docker.pkg.dev/$PROJECT_ID/app-repo/web:v1', '.']\nimages:\n  - 'us-central1-docker.pkg.dev/$PROJECT_ID/app-repo/web:v1'"
    },
    diagramType: "ci_cd_pipeline",
    visualAid: "Continuous pipeline pipeline flow: Git Push -> Cloud Build Trigger -> Build Steps -> Container Registry."
  },
  {
    id: 30,
    question: "What is Artifact Registry?",
    answer: "Artifact Registry is a fully managed, secure service for storing, managing, and scanning container images and build package dependencies (such as npm, Maven, Python, or NuGet packages). It is the modern, feature-rich successor to Container Registry (GCR).",
    category: "DevOps & Pipelines",
    explanation: "Artifact Registry allows you to establish regional repositories, closer to GKE or Cloud Run for ultra-fast pulls. It integrates with IAM for fine-grained read/write security, supports VPC Service Controls, and offers automatic vulnerability scanning to check container images for known exploits during push pipelines.",
    example: {
      title: "Creating a Docker Repository",
      description: "Create a regional repository to store your Docker images.",
      cli: "# Create a Docker repository in us-central1\ngcloud artifacts repositories create app-repo \\\n  --repository-format=docker \\\n  --location=us-central1 \\\n  --description=\"Production Docker Repository\""
    },
    diagramType: "ci_cd_pipeline",
    visualAid: "Artifact Hub: Accepting secure container pushes from CI pipelines and serving rapid container pulls to GKE clusters."
  },
  {
    id: 31,
    question: "What is Cloud Monitoring (formerly Stackdriver)?",
    answer: "Cloud Monitoring is an enterprise observation and alerting service that collects performance metrics, health checks, and system events from GCP infrastructure, custom applications, and third-party databases, presenting them on customizable visual dashboards.",
    category: "DevOps & Pipelines",
    explanation: "Cloud Monitoring allows you to set up alert policies so that you are immediately notified (via email, Slack, PagerDuty, or Webhooks) if system metrics fall out of bounds — for example, if your average CPU load exceeds 85% for more than 5 minutes. It integrates with native system agents and allows tracking of Service Level Indicators (SLIs) like latency and error rates.",
    example: {
      title: "Querying Metrics via MQL Outline",
      description: "Using Monitoring Query Language to track CPU consumption.",
      code: "fetch gce_instance\n| metric 'compute.googleapis.com/instance/cpu/utilization'\n| group_by 5m, mean(val())\n| every 5m"
    },
    diagramType: "monitoring_logging",
    visualAid: "Dashboard visualizer tracking metric trends, displaying red threshold lines and firing alert events to Slack."
  },
  {
    id: 32,
    question: "What is Cloud Logging?",
    answer: "Cloud Logging is a fully managed, real-time log ingestion, storage, and analysis service capable of collecting petabytes of system, infrastructure, security, and custom application log streams at scale.",
    category: "DevOps & Pipelines",
    explanation: "Any output printed to standard out (stdout) or standard error (stderr) by serverless runtimes or containers is automatically intercepted and structured into Cloud Logging. You can search logs instantly using Log Explorer and the Log Analytics SQL engine. Logs can be routed to BigQuery for analytics, Cloud Storage for compliance archiving, or Pub/Sub for real-time security processing.",
    example: {
      title: "Writing structured logs in Nodejs",
      description: "Print a structured JSON line that Cloud Logging automatically parses into queryable metadata fields.",
      code: "console.log(JSON.stringify({\n  severity: \"ERROR\",\n  message: \"Database connection failed\",\n  transactionId: \"tx_83921\",\n  latency_ms: 1250\n}));"
    },
    diagramType: "monitoring_logging",
    visualAid: "Logging pipeline: App processes -> stdout stream -> Ingested by Fluentd -> Searchable in Log Explorer."
  },
  {
    id: 33,
    question: "What is a Cloud Scheduler?",
    answer: "Cloud Scheduler is a fully managed, serverless enterprise cron job service that allows you to automate the execution of tasks (such as triggering HTTP endpoints, sending Pub/Sub messages, or invoking Cloud Functions) on a precise, recurring schedule.",
    category: "DevOps & Pipelines",
    explanation: "Instead of configuring fragile cron utilities on a dedicated virtual machine that could crash, Cloud Scheduler handles scheduling globally at high availability. If a target is offline, it can retry based on configured backoff limits. Schedules are declared using standard crontab expressions (e.g., '*/15 * * * *' for every 15 minutes).",
    example: {
      title: "Creating a Daily Database Backup Trigger",
      description: "Set up a Cloud Scheduler job that sends a trigger message to a backup Pub/Sub topic every day at midnight.",
      cli: "# Create a daily job firing at midnight UTC\ngcloud scheduler jobs create pubsub trigger-backups \\\n  --schedule=\"0 0 * * *\" \\\n  --topic=db-backup-signals \\\n  --message-body=\"start\" \\\n  --time-zone=\"UTC\""
    },
    diagramType: "pubsub_flow",
    visualAid: "Cron clock triggers target: Cloud Scheduler -> Sends secure post request -> Triggers clean up function."
  },
  {
    id: 34,
    question: "What is Cloud Tasks?",
    answer: "Cloud Tasks is a fully managed, asynchronous task queue service that allows you to manage and execute distributed worker tasks outside your main application workflow, offering granular control over delivery rate, concurrency, retries, and timing.",
    category: "DevOps & Pipelines",
    explanation: "If an app needs to send 10,000 emails, doing so synchronously inside the HTTP handler would crash the server or cause timeouts. Instead, the app server creates 10,000 lightweight tasks inside a Cloud Tasks queue. Cloud Tasks delivers those payloads to worker endpoints progressively, ensuring you don't overwhelm your downstream systems or run out of memory.",
    example: {
      title: "Enqueuing a Task via Node.js SDK",
      description: "How to enqueue a secure background web worker request.",
      code: "import { CloudTasksClient } from '@google-cloud/tasks';\nconst client = new CloudTasksClient();\n\nasync function createTask(queuePath, payload) {\n  await client.createTask({\n    parent: queuePath,\n    task: {\n      httpRequest: {\n        httpMethod: 'POST',\n        url: 'https://worker-api.company.com/send-email',\n        body: Buffer.from(JSON.stringify(payload)).toString('base64'),\n        headers: { 'Content-Type': 'application/json' },\n      },\n    },\n  });\n}"
    },
    diagramType: "pubsub_flow",
    visualAid: "Queue buffering: Web Server enqueues Tasks -> Cloud Tasks Queue rates and throttles -> Handled by Worker Pod pool."
  },
  {
    id: 39,
    question: "What is the Cloud SDK / gcloud CLI?",
    answer: "The Google Cloud SDK is a set of command-line tools for installing, managing, and interacting with GCP services, featuring the primary 'gcloud' CLI utility along with 'gsutil' (legacy Cloud Storage manager) and 'bq' (BigQuery manager).",
    category: "DevOps & Pipelines",
    explanation: "The gcloud CLI is highly powerful, enabling scriptable configuration of your entire cloud environment. It supports output formatting (like json, yaml, text, or custom table projections) and allows powerful filtering. Best practice is to run gcloud commands inside scripts or CI pipelines to avoid human console errors.",
    example: {
      title: "Querying and Filtering Resources",
      description: "Show only running Compute Engine VMs in a specific zone using native CLI filters.",
      cli: "# List VMs, showing only name and status of active running machines\ngcloud compute instances list \\\n  --filter=\"status=RUNNING AND zone:us-central1-a\" \\\n  --format=\"table(name, status, zone)\""
    },
    diagramType: "ci_cd_pipeline",
    visualAid: "Local Terminal -> Decodes security token -> Interacts with GCP REST APIs over HTTPS."
  },
  {
    id: 45,
    question: "What is Secret Manager?",
    answer: "Secret Manager is a secure, fully managed storage service for sensitive metadata like API keys, database passwords, SSL certificates, and credentials, offering secure access control, automatic versioning, and unified IAM encryption.",
    category: "DevOps & Pipelines",
    explanation: "Hardcoding secrets into your source code (or committing them to Git) is a major security compromise. Secret Manager encrypts secrets at rest using AES-256 keys. Services like Cloud Run or Compute Engine can fetch secrets securely at startup or during execution using IAM permissions assigned to their service accounts.",
    example: {
      title: "Creating and Retrieving a Secret",
      description: "Store an API key and fetch it using the command-line.",
      cli: "# Create a new secret container\ngcloud secrets create DB_PASSWORD --replication-policy=\"automatic\"\n\n# Add the secret payload (Version 1)\necho -n \"super-secret-pass\" | gcloud secrets versions add DB_PASSWORD --data-file=-\n\n# Read the secret payload (Requires Secret Manager Secret Accessor role)\ngcloud secrets versions access 1 --secret=\"DB_PASSWORD\""
    },
    diagramType: "secret_manager",
    visualAid: "Shows Secret Manager securely decrypting a DB password and injecting it directly into a Cloud Run service memory namespace."
  },
  {
    id: 55,
    question: "What is Cloud Composer?",
    answer: "Cloud Composer is a fully managed workflow orchestration service built on the popular open-source Apache Airflow platform, used to author, schedule, and monitor complex data pipelines spanning multiple clouds and systems.",
    category: "DevOps & Pipelines",
    explanation: "In Cloud Composer, you express workflows as Directed Acyclic Graphs (DAGs) written in Python. Airflow schedules tasks sequentially or in parallel based on defined dependencies, automatically handling retries, notifying administrators of failures, and providing a powerful dashboard to trace pipeline execution steps.",
    example: {
      title: "Writing a Simple Airflow DAG",
      description: "A Python DAG scheduling a sequential export-to-bigquery workflow.",
      code: "# sample_dag.py\nfrom airflow import DAG\nfrom airflow.providers.google.cloud.operators.bigquery import BigQueryExecuteQueryOperator\nfrom datetime import datetime\n\ndefault_args = { 'start_date': datetime(2026, 1, 1) }\n\nwith DAG('daily_analytics', default_args=default_args, schedule_interval='@daily') as dag:\n    run_sql = BigQueryExecuteQueryOperator(\n        task_id='run_daily_sales_sql',\n        sql='SELECT count(*) FROM `my_ds.sales` WHERE date = current_date()',\n        use_legacy_sql=False\n    )"
    },
    diagramType: "default",
    visualAid: "Directed Acyclic Graph (DAG) flowchart executing sequentially: Extract data -> Transform in Spark -> Load to BigQuery -> Build Report."
  },
  {
    id: 56,
    question: "What is Dataflow?",
    answer: "Dataflow is a fully managed, serverless, high-performance service for unified stream and batch data processing based on the open-source Apache Beam programming model.",
    category: "DevOps & Pipelines",
    explanation: "Dataflow handles the complex task of distributed processing. When you submit an Apache Beam pipeline, Dataflow automatically provisions a cluster of VMs, partitions your input dataset, distributes processing workers, and scales the worker pool up or down dynamically depending on processing volume. It handles stream processing (continuous live windowing) and batch processing (historical log analysis).",
    example: {
      title: "Submitting a Dataflow Job Template",
      description: "Execute a pre-built Google Template to stream data from Pub/Sub into BigQuery directly.",
      cli: "# Start a Dataflow stream to ingest real-time events into BigQuery\ngcloud dataflow jobs run stream-signups-job \\\n  --gcs-location=gs://dataflow-templates-us-central1/latest/PubSub_to_BigQuery \\\n  --region=us-central1 \\\n  --parameters=inputTopic=projects/my-project/topics/user-signups,outputTableSpec=my-project:analytics.signups"
    },
    diagramType: "pubsub_flow",
    visualAid: "Continuous pipeline pipeline: Streaming Device Data -> Pub/Sub Topic -> Dataflow (Windowing & Parsing) -> BigQuery Tables."
  },
  {
    id: 57,
    question: "What is Cloud Endpoints?",
    answer: "Cloud Endpoints is an API management system that allows you to secure, monitor, analyze, and set quotas on your APIs using an Extensible Service Proxy (ESP) deployed directly in front of your backend services.",
    category: "DevOps & Pipelines",
    explanation: "Endpoints uses an ESP container (based on Nginx) as a reverse-proxy gateway. It intercepts client requests, validates API keys or Firebase Auth tokens, applies rate limits, and exports metric telemetry to Cloud Logging/Monitoring, allowing your backend servers to focus solely on executing business logic.",
    example: {
      title: "Configuring API Specification in OpenAPI",
      description: "Configure security rules and routing guidelines using standard OpenAPI YAML formats.",
      code: "# openapi.yaml snippet\nswagger: \"2.0\"\ninfo:\n  title: \"Secure Echo API\"\n  version: \"1.0.0\"\nhost: \"echo-api.endpoints.my-project.cloud.goog\"\npaths:\n  /echo:\n    get:\n      operationId: \"echo\"\n      responses:\n        200:\n          description: \"Success\""
    },
    diagramType: "dns_flow",
    visualAid: "API Call Flow: Client -> API Gateway/Proxy -> Authentication check -> Backend Service."
  },
  {
    id: 58,
    question: "What is API Gateway (GCP)?",
    answer: "API Gateway is a fully serverless, secure API hosting service designed specifically for routing, securing, and managing public entry points in front of other serverless GCP backends like Cloud Run, Cloud Functions, and App Engine.",
    category: "GCP Core & Architecture",
    explanation: "Unlike Cloud Endpoints (which requires deploying and managing proxy containers on VMs or Kubernetes), API Gateway is 100% serverless. It auto-scales to handle any volume of requests with no underlying virtual machines to configure, providing a unified hostname for your APIs while handling authentication and rate-limiting rules.",
    example: {
      title: "Deploying an API Gateway configuration",
      description: "Map an API gateway URL to a background serverless Cloud Function.",
      code: "# api-spec.yaml\nswagger: '2.0'\ninfo:\n  title: serverless-gateway\n  version: 1.0.0\npaths:\n  /hello:\n    get:\n      x-google-backend:\n        address: https://us-central1-my-project.cloudfunctions.net/helloFunction\n      responses:\n        200:\n          description: Successful response"
    },
    diagramType: "dns_flow",
    visualAid: "Client Browser -> API Gateway (Verifies API Key) -> Forwards cleanly to internal Cloud Function."
  },
  {
    id: 63,
    question: "How would you set up CI/CD to deploy a React app to GCP automatically?",
    answer: "To set up automated CI/CD: 1) Push source code to a git repository (GitHub/GitLab); 2) Configure a Cloud Build Trigger linked to that repository; 3) Write a 'cloudbuild.yaml' pipeline that executes npm test, runs npm run build, and deploys the compiled static HTML/CSS files to a Cloud Storage bucket or Firebase Hosting using gcloud CLI steps.",
    category: "DevOps & Pipelines",
    explanation: "Automating deployments ensures that human developers never push raw assets manually from their laptops. This enforces testing, audits changes via commits, and guarantees a reproducible deployment artifact in production.",
    example: {
      title: "Automated Deploy cloudbuild.yaml",
      description: "This build file installs packages, compiles production files, and synchronizes the dist output to a public Cloud Storage bucket.",
      code: "steps:\n  # Install and build React\n  - name: 'gcr.io/cloud-builders/npm'\n    args: ['install']\n  - name: 'gcr.io/cloud-builders/npm'\n    args: ['run', 'build']\n  # Sync compiled output to hosting bucket\n  - name: 'gcr.io/cloud-builders/gsutil'\n    args: ['-m', 'rsync', '-r', '-d', 'dist/', 'gs://my-react-spa-bucket']"
    },
    diagramType: "ci_cd_pipeline",
    visualAid: "CI/CD Pipeline: Git Commit -> Webhook -> Cloud Build -> Compiles Static dist/ -> Synced to Firebase Hosting / Cloud Storage."
  },
  {
    id: 64,
    question: "What is a Cloud Build trigger?",
    answer: "A Cloud Build Trigger is a configuration that listens to events in a connected source code repository (such as a GitHub commit, a merge pull request, or a tag creation) and automatically fires off a designated Cloud Build pipeline in response.",
    category: "DevOps & Pipelines",
    explanation: "Triggers can be filtered to run only if modifications occur within specific file path subdirectories (e.g., only trigger backend builds if changes happen inside the '/server/' directory). Triggers can also substitute environment variables dynamically during the build execution.",
    example: {
      title: "Creating a Trigger via CLI",
      description: "Configure a trigger that runs a build whenever a push is merged to the 'main' branch.",
      cli: "# Create GitHub commit trigger for main branch\ngcloud beta builds triggers create github \\\n  --name=\"prod-deploy-trigger\" \\\n  --repo-name=\"gcp-prep-app\" \\\n  --repo-owner=\"candidate\" \\\n  --branch-pattern=\"^main$\" \\\n  --build-config=\"cloudbuild.yaml\""
    },
    diagramType: "ci_cd_pipeline",
    visualAid: "Visual webhook listener capturing code commits and launching execution agents."
  },
  {
    id: 67,
    question: "What is the shared responsibility model in cloud computing?",
    answer: "The Shared Responsibility Model states that Google is responsible for the security 'OF' the cloud (securing global data centers, core hypervisors, and networks), while you, the customer, are responsible for security 'IN' the cloud (securing your database configurations, IAM permissions, source code, data encryption, and network firewall rules).",
    category: "DevOps & Pipelines",
    explanation: "If you leave a Cloud Storage bucket completely open to the public ('allUsers' as Storage Object Admin) and an attacker steals your database backup, that is your responsibility. If a physical hard disk fails inside a Google warehouse or a hypervisor container is bypassed due to a chip defect, that is Google's responsibility. The division of labor shifts depending on whether you use IaaS, PaaS, or serverless services.",
    example: {
      title: "Responsibility Shift Summary",
      description: "Understanding your responsibility boundaries depending on the platform choice.",
      code: "1. Compute Engine (IaaS): You manage OS, patching, firewalls, data, apps.\n2. Cloud Run (Serverless): Google manages OS, patching, scaling. You manage code and IAM.\n3. BigQuery (SaaS): Google manages everything. You manage SQL queries and table IAM access."
    },
    diagramType: "default",
    visualAid: "Visual layered block chart showing client vs cloud provider boundaries spanning Compute Engine, Cloud Run, and BigQuery."
  },
  {
    id: 68,
    question: "How would you monitor application errors in a GCP-hosted app?",
    answer: "To monitor application errors, integrate GCP's Error Reporting service, which automatically parses and aggregates application logs to detect exception stack traces (such as Node.js uncaught exceptions or Python tracebacks). It groups identical crashes, tracks frequency, and sends push alert signals to developers.",
    category: "DevOps & Pipelines",
    explanation: "Error Reporting integrates out-of-the-box with Cloud Logging. It analyzes standard error streams and logs that match known trace patterns. You can connect it directly to your Bug tracker or view a chronological diagnostic graph showing exactly when code crashes peaked in production.",
    example: {
      title: "Logging a queryable Exception in Node.js",
      description: "Log an error stack trace that Google's Error Reporting service automatically extracts.",
      code: "try {\n  throw new Error(\"Payment gateway timeout!\");\n} catch (err) {\n  // Print stack trace to stderr; Error Reporting intercepts it instantly\n  console.error(err.stack);\n}"
    },
    diagramType: "monitoring_logging",
    visualAid: "Application Crash -> Log stream -> Exception Regex Matcher -> Unified Error Dashboard with Stack Trace details."
  },
  {
    id: 69,
    question: "What is a Cloud Pub/Sub subscription?",
    answer: "A Pub/Sub Subscription is a named resource that represents a stream of messages from a specific Topic that must be delivered to and acknowledged by a subscriber application.",
    category: "DevOps & Pipelines",
    explanation: "Publishing a message to a topic does nothing unless there is an active subscription attached to it. Pub/Sub supports multi-cast; if you attach 3 independent subscriptions to a single topic, a copy of every published message is sent to all 3 subscriptions. This allows multiple distinct worker systems (e.g., Inventory, Emailer, and Analytics) to process the same event in parallel.",
    example: {
      title: "Creating a Subscription via CLI",
      description: "Attach a message pull subscription to an existing topic.",
      cli: "# Create a subscription named 'inventory-worker' on the 'signups' topic\ngcloud pubsub subscriptions create signup-subscription \\\n  --topic=user-signups \\\n  --ack-deadline=30"
    },
    diagramType: "pubsub_flow",
    visualAid: "Topic distributing identical messages into two distinct subscriptions: Email Sender and Analytics Tracker."
  },
  {
    id: 70,
    question: "Push vs pull subscription in Pub/Sub?",
    answer: "A Push subscription automatically delivers messages to a specified public HTTPS endpoint as soon as they are published, ideal for lightweight serverless receivers like Cloud Functions. A Pull subscription stores messages inside Pub/Sub queue disks until a worker application requests (polls) them, ideal for long-running batch workers or GKE pods.",
    category: "DevOps & Pipelines",
    explanation: "Push is easy, fast, and serverless, but requires a public HTTP URL that must process requests quickly (otherwise Pub/Sub times out). Pull allows workers to control processing speed, pulling batches of messages only when they have spare CPU capacity, which is excellent for handling massive workload spikes without crashing downstream databases.",
    example: {
      title: "Creating a Push Subscription",
      description: "Setup a push subscription routing messages directly to an HTTPS endpoint.",
      cli: "# Create a push subscription linking messages directly to a Cloud Run API\ngcloud pubsub subscriptions create run-push-sub \\\n  --topic=user-signups \\\n  --push-endpoint=https://my-web-api-rffk.a.run.app/api/signup-hook"
    },
    diagramType: "pubsub_flow",
    visualAid: "Side-by-side: Pub/Sub pushing POST payloads to Webhook endpoint vs Worker app polling TCP pull requests from Pub/Sub queue."
  },
  {
    id: 71,
    question: "What is at-least-once delivery in Pub/Sub, and what does that imply for consumers?",
    answer: "At-least-once delivery is Pub/Sub's guarantee that every message will be delivered to a subscription's consumers at least one time. It implies that due to network timeouts, retries, or server dropouts, a single message may occasionally be delivered multiple times. Therefore, consumers MUST write their message-processing logic to be idempotent (handling duplicate messages safely).",
    category: "DevOps & Pipelines",
    explanation: "If Pub/Sub sends a message and your worker processes it, but the worker crashes or the network drops right before sending the Acknowledgment (ACK) signal back to GCP, Pub/Sub assumes the message was lost and delivers it again to another worker. If the message was 'Deduct $10 from account', processing it twice would be disastrous unless your database checks for pre-existing transaction IDs first.",
    example: {
      title: "Idempotent Processing Code Concept",
      description: "Check if the unique message UUID has already been processed in your database before executing operations.",
      code: "async function processSignupMessage(message) {\n  const messageId = message.id;\n  \n  // Check if we've already completed this specific message ID\n  const alreadyProcessed = await db.query(\"SELECT 1 FROM processed_messages WHERE id = $1\", [messageId]);\n  if (alreadyProcessed.rows.length > 0) {\n    console.log('Duplicate message ignored:', messageId);\n    return; // Already done!\n  }\n  \n  // Execute core logic and record message as completed in a transaction\n  await db.transaction(async (tx) => {\n    await tx.query(\"INSERT INTO users (email) VALUES ($1)\", [message.data.email]);\n    await tx.query(\"INSERT INTO processed_messages (id) VALUES ($1)\", [messageId]);\n  });\n}"
    },
    diagramType: "pubsub_flow",
    visualAid: "Network loop showing: Publish -> Deliver -> Worker process -> Network crash -> Redeliver -> Idempotent check blocks duplicate."
  },
  {
    id: 72,
    question: "What is the purpose of a dead-letter topic in Pub/Sub?",
    answer: "A Dead-Letter Topic (DLT) is a secondary Pub/Sub topic where messages are automatically routed if subscriber applications fail to process them successfully after a designated number of retry attempts (typically due to parsing errors or corrupted data schemas).",
    category: "DevOps & Pipelines",
    explanation: "Without a DLT, a corrupted message (e.g., bad JSON format) would repeatedly fail processing, trigger retries, and get stuck in a loop, consuming server CPU and blocking subsequent valid messages. By routing these poison-pill messages to a DLT, they are isolated for developers to audit, debug, or reprocess later, while the main worker queue continues moving smoothly.",
    example: {
      title: "Configuring a Subscription with a Dead-Letter Topic",
      description: "Associate a Dead-Letter Topic with a subscription, specifying 5 maximum delivery attempts.",
      cli: "# 1. Create the Dead Letter Topic\ngcloud pubsub topics create signups-dead-letter\n\n# 2. Attach it to your active subscription\ngcloud pubsub subscriptions create signups-main-sub \\\n  --topic=user-signups \\\n  --dead-letter-topic=signups-dead-letter \\\n  --max-delivery-attempts=5"
    },
    diagramType: "pubsub_flow",
    visualAid: "Pipeline showing a corrupted message failing 5 times, getting automatically ejected to the Dead-Letter box while healthy messages continue."
  },
  {
    id: 75,
    question: "What is Terraform's role when working with GCP?",
    answer: "Terraform is an open-source Infrastructure-as-Code (IaC) tool that allows you to define, provision, version-control, and manage Google Cloud Platform physical and virtual resources using human-readable configuration files written in HashiCorp Configuration Language (HCL).",
    category: "DevOps & Pipelines",
    explanation: "Instead of clicking buttons in the GCP Console or running hundreds of gcloud CLI scripts, you write declarative Terraform files (e.g., `main.tf`) that describe your desired infrastructure. Terraform calculates the dependencies, builds a state model, and securely provisions resources. When changes are made, it updates only modified resources, keeping environments perfectly synced.",
    example: {
      title: "Writing a Simple Terraform Configuration",
      description: "Declaring a VPC Network and a Storage Bucket in HCL.",
      code: "# main.tf\nprovider \"google\" {\n  project = \"my-project-id\"\n  region  = \"us-central1\"\n}\n\nresource \"google_compute_network\" \"vpc_network\" {\n  name                    = \"terraform-vpc\"\n  auto_create_subnetworks = false\n}\n\nresource \"google_storage_bucket\" \"assets_bucket\" {\n  name     = \"my-terraform-assets-2026\"\n  location = \"US\"\n  force_destroy = true\n}"
    },
    diagramType: "ci_cd_pipeline",
    visualAid: "Terraform workflow: Write Code (.tf) -> Run Plan -> Apply Changes -> GCP APIs provision resources."
  },
  {
    id: 76,
    question: "Why use Infrastructure as Code instead of manual console changes?",
    answer: "Infrastructure as Code (IaC) is preferred over manual configurations because it: 1) Guarantees Reproducibility across multiple identical environments (Dev, Test, Prod); 2) Enables Version Control and auditing via git pull requests; 3) Prevents configuration drift (accidental manual settings changes); 4) Automates documentation; 5) Speeds up disaster recovery by allowing you to rebuild entire environments in minutes.",
    category: "DevOps & Pipelines",
    explanation: "Clicking through the console to create a complex environment with subnets, firewall rules, databases, and Kubernetes clusters takes hours and is extremely prone to human mistakes (e.g., forgetting a port rule). With IaC, deploying the exact same setup to another region or duplicating it for a QA team is as simple as executing 'terraform apply'.",
    example: {
      title: "Standard IaC Pipeline",
      description: "Git branch -> Peer Review HCL changes -> Merge -> Terraform automatically runs inside CI pipeline.",
      code: "Local machine: edit main.tf\n  └── git commit & push to GitHub\n        └── CI runs: terraform plan\n              └── Peer approves PR\n                    └── Merge triggers: terraform apply (Cloud automatically builds)"
    },
    diagramType: "ci_cd_pipeline",
    visualAid: "Interactive slider comparing human mouse clicks on a console (prone to error) vs automation execution scripts (deterministic)."
  },
  {
    id: 77,
    question: "What is a GCP quota and why does it exist?",
    answer: "A GCP Quota is a physical limit placed on your Google Cloud resource consumption (such as the number of CPU cores you can provision, the volume of API calls you can make, or the count of external IP addresses allowed in a project). It exists to prevent runaway costs from accidental code loops and to protect against abuse/malicious attacks.",
    category: "DevOps & Pipelines",
    explanation: "Quotas also ensure fair resource allocation across Google's massive global customer base. There are Rate Quotas (e.g., 60 API requests per minute, which reset automatically) and Allocation Quotas (e.g., 24 physical CPU cores in us-central1, which persist until resources are deleted). When you hit an allocation quota, creating new resources is blocked until you delete old resources or request a quota increase.",
    example: {
      title: "Viewing Active Quotas",
      description: "List CPU and network quotas in a specific region using gcloud.",
      cli: "# List current Compute Engine regional CPU limits and usage\ngcloud compute regions describe us-central1 \\\n  --format=\"value(quotas)\""
    },
    diagramType: "quota_limit",
    visualAid: "Speedometer-style gauge showing a project hitting 80% of its regional vCPU quota, triggering warnings."
  },
  {
    id: 78,
    question: "How would you request a quota increase?",
    answer: "To request a quota increase, navigate to the GCP Console's 'IAM & Admin > Quotas & System Limits' page. Filter for the specific service and region, select the target constraint, click 'Edit Quotas', input your desired limit along with a business justification, and submit. Small requests are approved automatically, while massive requests are reviewed by Google Cloud Support.",
    category: "DevOps & Pipelines",
    explanation: "When submitting a quota increase, you must explain your business use case: 'Expanding production Kubernetes cluster to handle holiday traffic.' Google reviews these to ensure physical hardware capacity is available in the target data centers to honor your requests.",
    example: {
      title: "Command-Line Quota Navigation Hints",
      description: "Locate active limits to prepare support tickets programmatically.",
      cli: "# Filter quotas to inspect only those that are nearing their limits\ngcloud beta billing accounts list"
    },
    diagramType: "quota_limit",
    visualAid: "Support Ticket sequence: Quota Exceeded -> Submit Request -> Automated Validation / Agent Review -> Quota Bumped."
  },
  {
    id: 79,
    question: "What is Cloud Trace?",
    answer: "Cloud Trace is a distributed tracing service that collects latency data from your microservice applications, helping developers visualize how requests flow through complex systems and locate performance bottlenecks.",
    category: "DevOps & Pipelines",
    explanation: "If a user click takes 5 seconds to load, Cloud Trace generates a waterfall timeline graph. This graph breaks down the 5 seconds: showing that the API Gateway took 10ms, the payment function took 2,400ms, and the SQL database query took 2,500ms. This pinpoints the slow database query as the root cause, preventing developers from wasting time optimizing healthy sections of code.",
    example: {
      title: "Distributed Waterfall Concept",
      description: "How individual nested service hops are mapped chronologically.",
      code: "GET /checkout (5000ms)\n  ├── Auth Check: (50ms)\n  ├── Fetch Inventory: (150ms)\n  └── Process Stripe Payment (4800ms) ⚠️ Bottleneck detected!"
    },
    diagramType: "monitoring_logging",
    visualAid: "Interactive waterfall diagram showing nested API requests across three serverless microservices with highlighted latency bars."
  },
  {
    id: 80,
    question: "What is Cloud Profiler?",
    answer: "Cloud Profiler is a continuous, low-overhead profiling service that analyzes the CPU and memory consumption of your applications in production, helping developers identify code performance hotspots and reduce resource costs.",
    category: "DevOps & Pipelines",
    explanation: "Unlike debuggers that run locally, Cloud Profiler runs in the background of active production environments with less than 1% performance impact. It displays resource usage using interactive Flame Graphs. This enables developers to find specific lines of code or sorting algorithms that are consuming excessive CPU cycles, saving money on server sizing.",
    example: {
      title: "Flame Graph Interpretation",
      description: "The wider a horizontal bar in the flame graph, the more CPU/Memory that function occupies in the execution stack.",
      code: "Flame Graph Hierarchy:\n[main app block: 100% CPU]\n  ├── [parseJSON(): 75% CPU] ⚠️ Needs optimization (JSON library is slow!)\n  └── [saveDB(): 25% CPU]"
    },
    diagramType: "monitoring_logging",
    visualAid: "Interactive Flame Graph showing deep nested code stack blocks, highlighting wide processing blocks."
  },
  {
    id: 92,
    question: "How do you manage secrets for a Cloud Run service?",
    answer: "To manage secrets for Cloud Run: 1) Store the sensitive passwords or API keys inside Secret Manager; 2) Grant the 'Secret Manager Secret Accessor' IAM role to the Cloud Run service's dedicated Service Account; 3) Reference the secret inside the Cloud Run configuration, mapping it either as an Environment Variable or mounting it as a secure file inside the container filesystem.",
    category: "DevOps & Pipelines",
    explanation: "This pattern separates secrets from configuration. It ensures secrets are never hardcoded inside your Dockerfile, committed to git repositories, or visible in standard logs, keeping credentials fully protected. The secrets are fetched securely in memory only during container execution.",
    example: {
      title: "Deploying Cloud Run with Secret Reference",
      description: "Instruct Cloud Run to fetch DB_PASS from Secret Manager and expose it as a local environment variable.",
      cli: "# Deploy Cloud Run service injecting secret values securely in memory\ngcloud run deploy secure-api \\\n  --image=gcr.io/my-project/api:v1 \\\n  --service-account=my-api-sa@my-project.iam.gserviceaccount.com \\\n  --set-secrets=\"DB_CONNECTION_STRING=DB_PASSWORD:latest\" \\\n  --region=us-central1"
    },
    diagramType: "secret_manager",
    visualAid: "Architecture showing: Container requests DB_PASSWORD -> GCP validates Service Account -> Fetches from Secret Manager -> Maps as internal ENV."
  },
  {
    id: 95,
    question: "How would you estimate/control costs proactively in a GCP project?",
    answer: "To proactively control costs: 1) Use the GCP Pricing Calculator during architectural design; 2) Set up Budgets and aggressive Alert Thresholds (e.g., notify at 50%, 80%, and 100% predicted spend); 3) Configure automated billing export to BigQuery for SQL-based cost analysis; 4) Apply auto-shutdown scripts/schedules for development environments; 5) Utilize Spot VMs for batch pipelines; 6) Apply lifecycle rules to storage buckets.",
    category: "DevOps & Pipelines",
    explanation: "Billing exports to BigQuery allow you to write SQL queries to track costs down to the individual resource ID, project, or developer tag, helping you pinpoint exactly which virtual machine or experimental database is spiking your monthly invoice.",
    example: {
      title: "Analyzing Billing via SQL",
      description: "Query BigQuery billing exports to locate which service is driving up costs.",
      code: "-- Find top 5 most expensive GCP services in the billing export\nSELECT service.description, SUM(cost) as total_cost\nFROM `my-project.gcp_billing.gcp_billing_export_v1`\nGROUP BY service.description\nORDER BY total_cost DESC\nLIMIT 5;"
    },
    diagramType: "quota_limit",
    visualAid: "Visual billing dashboard tracing monthly costs alongside customized alert trigger flags."
  }
];
