import { Question } from '../types';

export const category2Questions: Question[] = [
  {
    id: 6,
    question: "What is Compute Engine?",
    answer: "Compute Engine is GCP's Infrastructure-as-a-Service (IaaS) offering that allows you to provision, run, and scale virtual machines (VMs) on Google's global infrastructure. It provides full control over the operating system, disk storage, memory, and CPU configurations.",
    category: "Compute Services",
    explanation: "Compute Engine offers pre-defined machine families (General Purpose, Compute-Optimized, Memory-Optimized, Accelerator-Optimized with GPUs) or allows you to build custom machines (exact CPU/RAM combinations). You are billed per-second for what you run. It supports features like live migration (keeping VMs online during physical host maintenance) and persistent disks (zonal, regional, or SSD).",
    example: {
      title: "Creating a VM Instance via CLI",
      description: "Quickly provision an Ubuntu virtual machine with customized specifications.",
      cli: "# Spin up a General Purpose e2-medium instance with Ubuntu in us-central1-a\ngcloud compute instances create my-first-vm \\\n  --zone=us-central1-a \\\n  --machine-type=e2-medium \\\n  --image-family=ubuntu-2204-lts \\\n  --image-project=ubuntu-os-cloud"
    },
    diagramType: "compute_comparison",
    visualAid: "Shows VM stack: Bare Metal Hypervisor -> Virtual Machine OS -> Application Code & Libraries."
  },
  {
    id: 7,
    question: "What is App Engine?",
    answer: "App Engine is GCP's Platform-as-a-Service (PaaS) offering that allows developers to deploy code directly without managing any underlying virtual machines, operating systems, network load balancers, or server patches. It scales automatically based on traffic demand.",
    category: "Compute Services",
    explanation: "With App Engine, you write code, specify a simple YAML configuration file, and deploy. The service handles container packaging, route mappings, version management, and scaling. It is divided into two environments: Standard (sandboxed runtimes, extremely fast scaling, zero-cost when idle) and Flexible (runs Docker containers on Compute Engine VMs, supports any runtime, slower startup).",
    example: {
      title: "Defining an App Engine configuration",
      description: "App Engine requires an app.yaml file in your project root to describe the runtime environment.",
      code: "# app.yaml for Node.js app\nruntime: nodejs18\ninstance_class: F1\nautomatic_scaling:\n  target_cpu_utilization: 0.65\n  min_instances: 1",
      cli: "# Deploy code directly to App Engine\ngcloud app deploy"
    },
    diagramType: "compute_comparison",
    visualAid: "PaaS Stack: App Engine Platform Management -> User Application Code."
  },
  {
    id: 8,
    question: "App Engine Standard vs Flexible?",
    answer: "App Engine Standard runs applications inside sandbox environments with fixed, supported language runtimes, scaling up and down (to zero) in milliseconds. App Engine Flexible runs applications in Docker containers on underlying Compute Engine VMs, supporting custom libraries, SSH access, and any language, but scaling is slower (minutes) and it cannot scale to zero instances.",
    category: "Compute Services",
    explanation: "Choose App Engine Standard if your app is written in standard runtimes (Node, Python, Go, Java), has highly erratic spikes in traffic, or needs to run at absolute minimum cost when inactive. Choose App Engine Flexible if you need custom libraries, compile C extensions, require background tasks, need local write access to the filesystem, or want to connect directly to traditional internal networks.",
    example: {
      title: "Comparing App Engine Configurations",
      description: "Flexible environment configuration requires specifying 'env: flex' and custom resource requirements.",
      code: "# app.yaml for Flexible environment\nruntime: custom\nenv: flex\n\nresources:\n  cpu: 2\n  memory_gb: 4\n  disk_size_gb: 10",
      cli: "# Deploy custom docker app\ngcloud app deploy"
    },
    diagramType: "compute_comparison",
    visualAid: "Side-by-side comparison illustrating Standard (sandboxed micro-VMs, zero-idle) vs Flexible (Docker containers on full VMs)."
  },
  {
    id: 9,
    question: "What is Cloud Run?",
    answer: "Cloud Run is a fully managed serverless container runtime that enables you to run stateless containerized applications without thinking about infrastructure. It automatically scales containers from zero up to hundreds of instances based on HTTP request concurrency, and you pay only for resources consumed during active request processing.",
    category: "Compute Services",
    explanation: "Cloud Run is built on Knative, a Kubernetes-based open-standard API. It bridges the gap between serverless flexibility and container power. Because it runs standard containers, you can write your code in any language, use any binary, and rely on any package. It offers two execution modes: Cloud Run Services (for web apps/APIs responding to web requests) and Cloud Run Jobs (for batch processing and tasks that run to completion).",
    example: {
      title: "Deploying a Node App to Cloud Run",
      description: "Build, package and deploy a container with a single command.",
      cli: "# Build container in cloud and deploy to Cloud Run securely\ngcloud run deploy my-web-service \\\n  --source=. \\\n  --region=us-central1 \\\n  --allow-unauthenticated"
    },
    diagramType: "compute_comparison",
    visualAid: "Serverless Container Scaling: Web requests invoke instances. 0 requests = 0 running containers. 100 requests = dynamic parallel replicas."
  },
  {
    id: 10,
    question: "Cloud Run vs App Engine vs Compute Engine — when to use which?",
    answer: "Use Compute Engine (IaaS) for full OS access, running legacy software, stateful applications, or specific network protocols. Use Cloud Run (Serverless Container) for modern stateless APIs, microservices, and containerized apps with dynamic scaling needs. Use App Engine (PaaS) for traditional monolithic web apps where you want a completely managed, developer-centric code deployment with no Docker containerization.",
    category: "Compute Services",
    explanation: "Compute Engine is high effort, high control. App Engine is low effort, medium control (with vendor lock-in). Cloud Run is low effort, high flexibility, because standard containers are completely portable across GCP, AWS, or local developer rigs, preventing vendor lock-in while preserving serverless cost efficiency.",
    example: {
      title: "Decision Matrix Summary",
      description: "Which compute platform should you choose based on your stack?",
      code: "1. Raw VM/Stateful/Monolith: Compute Engine\n2. Containerized/Stateless API/Scale-to-zero: Cloud Run\n3. Source-to-Deployment (Standard runtime): App Engine\n4. Complex Kubernetes ecosystem: GKE"
    },
    diagramType: "compute_comparison",
    visualAid: "Interactive decision tree guiding the user from application features to the optimal GCP compute service."
  },
  {
    id: 11,
    question: "What is Google Kubernetes Engine (GKE)?",
    answer: "Google Kubernetes Engine (GKE) is a secure, enterprise-grade managed Kubernetes service for deploying, scaling, and managing containerized applications at scale using Google's network and high-performance VM infrastructure.",
    category: "Compute Services",
    explanation: "GKE abstracts the complexity of manually bootstrapping a Kubernetes cluster. Google manages the Kubernetes Control Plane (API server, scheduler, database) for free, offering high availability and automated updates. GKE handles automatic node upgrades, node auto-repair, and seamless integration with GCP networking (VPC routes, Load Balancers, Cloud Logging, and IAM auth).",
    example: {
      title: "Spinning up a Standard GKE Cluster",
      description: "Commands to create a managed GKE cluster and fetch connection keys.",
      cli: "# Create GKE cluster with 3 nodes\ngcloud container clusters create gcp-prep-cluster \\\n  --zone=us-central1-a \\\n  --num-nodes=3\n\n# Configure kubectl tool with connection credentials\ngcloud container clusters get-credentials gcp-prep-cluster --zone=us-central1-a"
    },
    diagramType: "gke_autopilot",
    visualAid: "Architecture of GKE: Master Node (Control Plane managed by Google) overseeing multiple Worker Nodes (VMs hosting Pods)."
  },
  {
    id: 12,
    question: "What is a Kubernetes Pod?",
    answer: "A Pod is the smallest, most basic deployable unit in Kubernetes. It represents a single instance of a running process in your cluster and can contain one or more containers (such as an application container and a sidecar logging helper) that share the same network namespace, IP address, port range, and storage volumes.",
    category: "Compute Services",
    explanation: "Containers inside a single Pod communicate with each other using 'localhost'. They are tightly coupled, scheduled together on the same physical VM node, and share a lifecycle. Typically, pods are ephemeral and are managed by controllers like Deployments or StatefulSets rather than being run in isolation.",
    example: {
      title: "Writing a Pod Specification file",
      description: "A Kubernetes YAML manifest defining a simple pod running an Nginx container.",
      code: "# pod.yaml\napiVersion: v1\nkind: Pod\nmetadata:\n  name: nginx-pod\n  labels:\n    app: web\nspec:\n  containers:\n  - name: my-web-container\n    image: nginx:alpine\n    ports:\n    - containerPort: 80",
      cli: "# Deploy pod definition\nkubectl apply -f pod.yaml"
    },
    diagramType: "gke_autopilot",
    visualAid: "Inside a Pod: Network Namespace & Volumized Disk shared between App Container and Sidecar Container."
  },
  {
    id: 13,
    question: "What is GKE Autopilot?",
    answer: "GKE Autopilot is a revolutionary, fully provisioned mode of operation for GKE where Google manages your entire cluster's nodes, scaling, operations, and security. Instead of managing underlying virtual machine nodes, you simply declare your Kubernetes resources (pods, deployments) and Google bills you only for the exact CPU, memory, and storage that your pods actively request.",
    category: "Compute Services",
    explanation: "In GKE Standard, you manage the worker nodes (machine types, sizing, autoscaling groups) and pay for the VMs, even if they run half-empty. In GKE Autopilot, Google handles node provisioning and scaling automatically. GKE Autopilot pre-hardens the cluster configurations with security best practices, eliminating administrative overhead and ensuring optimal cluster resource efficiency.",
    example: {
      title: "Creating a GKE Autopilot Cluster",
      description: "Provisioning a cluster in Autopilot mode is simpler because node settings are omitted.",
      cli: "# Spin up an enterprise-grade Autopilot cluster\ngcloud container clusters create-auto autopilot-cluster \\\n  --region=us-central1"
    },
    diagramType: "gke_autopilot",
    visualAid: "Visualizer illustrating the paradigm shift: Standard (You manage and pay for VMs) vs Autopilot (Google manages VMs, you declare Pod requirements)."
  },
  {
    id: 14,
    question: "What is Cloud Functions?",
    answer: "Cloud Functions is GCP's serverless Function-as-a-Service (FaaS) offering. It allows developers to deploy single-purpose snippets of code that execute in response to background events (like Cloud Storage file uploads, Pub/Sub messages, or direct HTTPS triggers) without managing any server runtime.",
    category: "Compute Services",
    explanation: "Cloud Functions are highly ephemeral and optimized for event-driven pipelines. When an event fires, the runtime bootstraps, executes the code, and spins down. Version 2 of Cloud Functions is powered by Cloud Run and Eventarc, allowing functions to run longer (up to 60 minutes), support concurrent request handling, and receive events from over 90+ GCP resource types.",
    example: {
      title: "Deploying an Event-Driven Function",
      description: "Deploy a function that is triggered whenever a file is uploaded to a specific Cloud Storage bucket.",
      cli: "# Deploy an upload-handler function triggered by a Cloud Storage event\ngcloud functions deploy handleUpload \\\n  --gen2 \\\n  --runtime=nodejs18 \\\n  --region=us-central1 \\\n  --trigger-event-type=google.cloud.storage.object.v1.finalized \\\n  --trigger-resource=my-uploads-bucket"
    },
    diagramType: "cold_start",
    visualAid: "Event-Driven Pipeline: Upload File to Storage -> Eventarc Trigger -> Cloud Function Invocation -> Database Log."
  },
  {
    id: 15,
    question: "Cloud Functions vs Cloud Run?",
    answer: "Cloud Functions is designed for simple, lightweight, single-purpose code snippets reacting to infrastructure events (FaaS). Cloud Run is designed for full, multi-endpoint web applications, microservice architectures, and complex containerized codebases (Serverless Containers).",
    category: "Compute Services",
    explanation: "Use Cloud Functions for simple glue code: image resizing on upload, payload translation, or Slack alerts. Use Cloud Run if your application has routing (like an Express or Django backend), needs custom system binaries, processes concurrent requests in a single container, or needs to run in a highly portable container format that you can test locally on your laptop.",
    example: {
      title: "Comparison Decision Matrix",
      description: "Structural comparisons between both serverless paradigms.",
      code: "Cloud Functions (gen2):\n- Best for: Event glue code, simple integrations\n- Max duration: 60 mins\n- Dev packaging: Code source directly\n\nCloud Run:\n- Best for: Web Applications, APIs, microservices\n- Max duration: 60 mins\n- Dev packaging: Dockerfile (fully custom environment)"
    },
    diagramType: "cold_start",
    visualAid: "Two-column grid comparison highlighting functional triggers: Single event handler (Functions) vs Multi-route API server (Run)."
  },
  {
    id: 37,
    question: "What is a managed instance group (MIG)?",
    answer: "A Managed Instance Group (MIG) is a collection of identical Compute Engine virtual machines that are managed as a single entity using an Instance Template. MIGs support automated horizontal scaling, health monitoring with autohealing, and rolling upgrades.",
    category: "Compute Services",
    explanation: "If a VM in a MIG fails a health check or crashes, the MIG automatically deletes and recreates a fresh instance (autohealing). MIGs can automatically scale up or down based on CPU, load balancer utilization, or Pub/Sub queue depth. They can be zonal (all VMs in one zone) or regional (VMs distributed across zones for max survival).",
    example: {
      title: "Creating an Instance Template and MIG",
      description: "Define a configuration and use it to instantiate a Managed Instance Group.",
      cli: "# Create a reusable configuration template\ngcloud compute instance-templates create web-template \\\n  --machine-type=e2-micro \\\n  --image-family=debian-11 \\\n  --image-project=debian-cloud\n\n# Create a MIG using that template across three zones\ngcloud compute instance-groups managed create regional-mig \\\n  --template=web-template \\\n  --region=us-central1 \\\n  --zones=us-central1-a,us-central1-b,us-central1-c \\\n  --size=3"
    },
    diagramType: "load_balancer",
    visualAid: "MIG lifecycle diagram: Template Engine -> VM Node Pool -> Autohealer replacing bad nodes."
  },
  {
    id: 38,
    question: "What is autoscaling in GCP?",
    answer: "Autoscaling in GCP is the mechanism that dynamically adjusts the number of active computing resources (virtual machines in MIGs, Kubernetes Pods, or serverless container instances) in response to real-time workloads and policies.",
    category: "Compute Services",
    explanation: "Autoscaling ensures you always have enough computing power during high-demand events (like Black Friday sales) while saving massive operational costs by turning off idle resources during low-activity hours. For Compute Engine, it is governed by an Autoscaler associated with a MIG. For Kubernetes, it is handled by the Horizontal Pod Autoscaler (HPA) and Cluster Autoscaler.",
    example: {
      title: "Configuring a MIG Autoscaler",
      description: "Set the scaling rules based on CPU target utilization.",
      cli: "# Autoscale the MIG between 2 and 10 instances targeting 60% average CPU utilization\ngcloud compute instance-groups managed set-autoscaling regional-mig \\\n  --region=us-central1 \\\n  --min-num-replicas=2 \\\n  --max-num-replicas=10 \\\n  --target-cpu-utilization=0.60"
    },
    diagramType: "cold_start",
    visualAid: "Line chart visualizing scaling events: Traffic spike correlates with instance scale-out, traffic drop triggers scale-in."
  },
  {
    id: 53,
    question: "What is a Cloud Function's cold start?",
    answer: "A cold start is the initial startup latency that occurs when a serverless function receives a request after being idle. Because there are no active container instances running, the system must allocate compute infrastructure, pull your container/code package, initialize the language runtime, and run your global setup code before processing the request.",
    category: "Compute Services",
    explanation: "Subsequent requests are handled by 'warm' instances, executing in milliseconds. Cold starts are triggered when a function is called for the first time, after being idle long enough for GCP to reclaim the container, or during traffic spikes when GCP must scale out and boot additional concurrent container instances.",
    example: {
      title: "Simulating and Visualizing Latency",
      description: "Diagramming the phases of request-to-response duration.",
      code: "Cold Start phases:\n1. Provision VM: ~100-300ms\n2. Load Runtime (Node/Python): ~200-500ms\n3. Initialize User Code: ~100-1000ms (depends on imports)\n4. Active Request Handler: ~20ms (Warm speed)"
    },
    diagramType: "cold_start",
    visualAid: "Chronological timeline detailing the latency differences between an Idle (Cold) request and an Active (Warm) request."
  },
  {
    id: 54,
    question: "How would you reduce cold start latency?",
    answer: "To reduce cold starts: 1) Configure a minimum number of idle instances (keeps VMs warm); 2) Optimize code size by trimming unnecessary node_modules/dependencies; 3) Use efficient programming runtimes with fast boot signatures (like Go, Node, or Python instead of heavy Java spring setups); 4) Optimize global code by lazy-loading heavy libraries inside individual handlers rather than in the root scope.",
    category: "Compute Services",
    explanation: "In Cloud Run and Cloud Functions gen2, you can specify `--min-instances`. This instructs Google to maintain a designated baseline of active instances, eliminating cold starts entirely for baseline traffic volumes, though you will pay for these idle instances.",
    example: {
      title: "Deploying with Min Instances to Avoid Cold Starts",
      description: "Keep 2 container instances warmed up at all times to handle instantaneous traffic.",
      cli: "# Configure Cloud Run service with a warm instance pool\ngcloud run deploy high-perf-api \\\n  --source=. \\\n  --region=us-central1 \\\n  --min-instances=2 \\\n  --max-instances=10"
    },
    diagramType: "cold_start",
    visualAid: "Interactive slider comparing execution timelines with 0 min-instances vs 1 min-instances."
  },
  {
    id: 65,
    question: "What is the difference between horizontal and vertical scaling in GCP context?",
    answer: "Horizontal scaling (scaling out/in) means adding or removing machine replicas to distribute work (e.g., changing GKE pods from 3 to 10). Vertical scaling (scaling up/down) means increasing or decreasing the physical resource capacity (CPU, RAM, Disk) of an existing machine (e.g., upgrading a VM from e2-medium to n2-standard-4).",
    category: "Compute Services",
    explanation: "GCP strongly favors horizontal scaling because it delivers high elasticity, resilience, and requires zero downtime (rolling updates can maintain zero downtime). Vertical scaling usually requires stopping the VM instance or restarting the container, causing service interruption unless paired with highly complex active-active clustering configurations.",
    example: {
      title: "Programmatic Horizontal Scaling",
      description: "Instantly scaling a GKE Deployment horizontally using kubernetes CLI.",
      cli: "# Scale horizontal pod replicas from 3 to 10 instantly\nkubectl scale deployment my-web-app --replicas=10"
    },
    diagramType: "spot_vm",
    visualAid: "Visual grid: Horizontal scaling adding identical boxes vs Vertical scaling growing one singular box larger."
  },
  {
    id: 66,
    question: "What is preemptible/Spot VM in GCP?",
    answer: "Spot VMs (formerly Preemptible VMs) are highly discounted virtual machine instances (up to 90% cheaper than standard rates) that leverage excess, idle Google data center capacity. The trade-off is that GCP can reclaim (preempt) these instances at any time with a 30-second notice if standard-paying customers require the capacity.",
    category: "Compute Services",
    explanation: "Spot VMs have no maximum duration (unlike the legacy Preemptible VMs which had a 24-hour limit). They are ideal for fault-tolerant, stateless, batch-processing workloads, render farms, CI/CD runners, or containerized Kubernetes worker pools where individual node dropouts do not impact overall system availability.",
    example: {
      title: "Provisioning a Spot VM",
      description: "Create a Spot VM with preemption configuration using gcloud.",
      cli: "# Create a Spot VM with highly discounted rates\ngcloud compute instances create batch-runner-01 \\\n  --zone=us-central1-a \\\n  --machine-type=n2-standard-4 \\\n  --provisioning-model=SPOT \\\n  --instance-termination-action=DELETE"
    },
    diagramType: "spot_vm",
    visualAid: "A dynamic auction-capacity diagram showing standard on-demand VMs driving out Spot VMs when physical resource demand hits maximum."
  },
  {
    id: 87,
    question: "What is the difference between Cloud Run and GKE for container deployment?",
    answer: "Cloud Run is a fully serverless container runtime designed for simple, fast deployments, automatically scaling down to zero and requiring zero cluster or infrastructure upkeep. GKE is a full container orchestration platform that provides complete Kubernetes API control, custom networking, stateful storage integration, and advanced multi-service coordination, but requires cluster management overhead.",
    category: "Compute Services",
    explanation: "Use Cloud Run for modern stateless applications, REST APIs, or background microservices. Choose GKE if you need a full service mesh, have stateful workloads (like running your own databases or Elasticsearch clusters), require specific third-party Kubernetes Operators, need to run daemonsets, or want to manage hundreds of interconnected services using native Kubernetes manifests.",
    example: {
      title: "Comparing Manifest Complexity",
      description: "Cloud Run uses a single command or lightweight spec; GKE uses complex multi-resource Kubernetes YAMLs (Service, Deployment, Ingress).",
      code: "# GKE requires multiple manifests like this Deployment:\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: app-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: api\n  template:\n    metadata:\n      labels:\n        app: api\n    spec:\n      containers:\n      - name: main\n        image: gcr.io/my-project/api:v1"
    },
    diagramType: "gke_autopilot",
    visualAid: "Spectrum slider mapping Ease of Use vs Operational Control from Cloud Run (fastest/serverless) to GKE Autopilot to GKE Standard (full control)."
  },
  {
    id: 88,
    question: "What is a sidecar container pattern in GKE?",
    answer: "The sidecar container pattern is a Kubernetes architecture where a secondary, helper container is run alongside the main application container inside the exact same Pod. It shares the same storage volumes, network interfaces, and IP address, extending or enhancing the primary container's functionality.",
    category: "Compute Services",
    explanation: "Sidecars are commonly used for peripheral infrastructure tasks: continuous log forwarding (e.g., Fluentd), metric collection agents, secure proxy routers (like Google's Cloud SQL Auth Proxy), or service mesh data-planes (like Envoy in Istio). This preserves separation of concerns, keeping the main application container completely clean of infrastructure-specific code.",
    example: {
      title: "GKE Pod Manifest with a Cloud SQL Auth Proxy Sidecar",
      description: "This deployment runs the main app and the Cloud SQL Auth Proxy together in the same pod.",
      code: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: app-with-sidecar\nspec:\n  template:\n    spec:\n      containers:\n      # Main Application Container\n      - name: main-app\n        image: gcr.io/my-project/web-app:1.0\n        ports:\n        - containerPort: 8080\n      # Cloud SQL Auth Proxy Sidecar Container\n      - name: cloud-sql-proxy\n        image: gcr.io/cloud-sql-connectors/cloud-sql-proxy:2.1.0\n        args: [\"my-project:us-central1:my-database\"]"
    },
    diagramType: "gke_autopilot",
    visualAid: "Exploded view of a Pod containing App Container and Proxy Sidecar talking to each other over localhost ports."
  },
  {
    id: 89,
    question: "What is Anthos?",
    answer: "Anthos is Google's hybrid and multi-cloud platform that lets you build, manage, and coordinate Kubernetes clusters consistently across on-premises data centers, Google Cloud, AWS, and Azure.",
    category: "Compute Services",
    explanation: "Anthos provides a unified management plane. It includes Anthos Config Management (for git-ops based cluster configuration sync) and Anthos Service Mesh (for secure multi-cluster service communication). Anthos decouples application logic from specific cloud environments, ensuring consistent operations, compliance, and developer experiences everywhere.",
    example: {
      title: "Anthos GitOps Sync Concept",
      description: "Manage clusters globally by pushing configuration files to a centralized Git repository.",
      code: "Git Repo (Single Source of Truth)\n  └── namespaces/\n        ├── prod-env.yaml (Syncs instantly to GCP GKE)\n        └── onprem-env.yaml (Syncs instantly to On-Premises VMware Cluster)"
    },
    diagramType: "default",
    visualAid: "Unified dashboard visualization controlling local bare metal clusters, AWS EKS, and GCP GKE from a single console."
  },
  {
    id: 90,
    question: "How would you implement blue-green or canary deployments in GCP?",
    answer: "Blue-Green deployment involves running two identical production environments (Blue is active, Green is idle with the new code). You test on Green, then swap the load balancer target. Canary deployment involves routing a tiny fraction of live user traffic (e.g., 5%) to the new version to verify stability, then gradually increasing traffic to 100%.",
    category: "Compute Services",
    explanation: "In GCP, this is natively supported. Cloud Run allows split-traffic routing across revisions by percentage in a single service. GKE supports this via Kubernetes Services (label swapping) or natively via an Ingress controller / Service Mesh like Istio.",
    example: {
      title: "Canary Traffic Splitting in Cloud Run",
      description: "Route 90% of traffic to the stable revision and 10% to the new release candidate.",
      cli: "# Direct precise traffic splits between two revisions\ngcloud run services update-traffic my-web-service \\\n  --to-revisions=my-service-v1=90,my-service-v2-rc=10 \\\n  --region=us-central1"
    },
    diagramType: "load_balancer",
    visualAid: "Interactive slider that lets you control traffic split percentage between Revision A and Revision B and see visual user routing."
  },
  {
    id: 91,
    question: "What is the purpose of health checks in GCP load balancing/autoscaling?",
    answer: "Health checks are automated periodic probes (using HTTP, HTTPS, TCP, or SSL) that query your backend instances to determine if they are actively capable of handling traffic. Unhealthy instances are automatically taken out of the load balancer rotation and, in Managed Instance Groups, destroyed and replaced.",
    category: "Compute Services",
    explanation: "Health checks prevent user requests from failing by ensuring traffic is sent only to healthy, running servers. They typically look for specific HTTP status codes (like 200 OK) or specific response strings. You must configure VPC firewall rules to allow GCP's global probe IP ranges to access your instances' ports.",
    example: {
      title: "Creating a Health Check via CLI",
      description: "Configure a health check that probes '/health' every 5 seconds, declaring failure after 2 consecutive timeouts.",
      cli: "# Create HTTP health check targeting route /health\ngcloud compute health-checks create http my-http-health-check \\\n  --port=8080 \\\n  --request-path=/health \\\n  --check-interval=5s \\\n  --timeout=5s \\\n  --unhealthy-threshold=2 \\\n  --healthy-threshold=2"
    },
    diagramType: "load_balancer",
    visualAid: "Load balancer probing backend nodes; displays a red cross on a non-responsive server and routes traffic exclusively to green checkmark nodes."
  }
];
