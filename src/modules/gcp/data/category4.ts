import { Question } from '../types';

export const category4Questions: Question[] = [
  {
    id: 23,
    question: "What is Cloud Load Balancing?",
    answer: "Cloud Load Balancing is a fully managed, software-defined global and regional traffic distribution service. It routes incoming user requests across pools of healthy backend instances (such as VMs, containers, or serverless services) located in one or more regions to optimize throughput, prevent overloading, and achieve high availability.",
    category: "Networking & Security",
    explanation: "Unlike hardware appliances, Cloud Load Balancing is built on Google's Andromeda SDN and Maglev routing system. It requires no warm-up, instantly scaling to handle massive spikes in traffic. It supports features like SSL/TLS termination, session affinity, HTTP/2, WebSockets, and integrates natively with Cloud CDN for caching and Cloud Armor for security.",
    example: {
      title: "Creating a Global HTTPS Load Balancer Outline",
      description: "A summary of steps required to configure a global anycast IP pointing to a backend service.",
      cli: "# Create a global static anycast IP address\ngcloud compute addresses create lb-ipv4-ip \\\n  --ip-version=IPV4 \\\n  --global\n\n# Associate health checks and create backend service\ngcloud compute backend-services create web-backend-service \\\n  --protocol=HTTP \\\n  --port-name=http \\\n  --health-checks=my-http-health-check \\\n  --global"
    },
    diagramType: "load_balancer",
    visualAid: "Interactive routing: Anycast Single IP -> Global Load Balancer -> Geographically closest healthy Region."
  },
  {
    id: 24,
    question: "What is a VPC in GCP?",
    answer: "A Virtual Private Cloud (VPC) is a secure, isolated, software-defined network (SDN) constructed within Google's physical network infrastructure, enabling your Compute Engine VMs, GKE clusters, and other resources to communicate securely with each other and the outside world.",
    category: "Networking & Security",
    explanation: "VPCs in GCP are unique because they are global. A single VPC can span multiple regions worldwide without requiring complex VPN peerings. Subnets inside a GCP VPC, however, are regional. When you create a subnet, you assign it a regional CIDR block (e.g., '10.0.0.0/24' in 'us-central1'). Dynamic routing is handled automatically using Cloud Routers and BGP.",
    example: {
      title: "Creating a Custom VPC Network and Subnet",
      description: "It is best practice to use custom VPCs rather than the default auto-VPC, ensuring strict control over address spaces.",
      cli: "# Create a custom-mode VPC network (no automatic subnets)\ngcloud compute networks create enterprise-vpc --subnet-mode=custom\n\n# Create a regional subnet within that VPC\ngcloud compute networks subnets create prod-subnet-us \\\n  --network=enterprise-vpc \\\n  --region=us-central1 \\\n  --range=10.120.0.0/24"
    },
    diagramType: "vpc_nat",
    visualAid: "Network topology showing a single Global VPC hosting distinct subnets in US, Europe, and Asia regions, communicating over Google's internal network."
  },
  {
    id: 25,
    question: "What is Cloud CDN?",
    answer: "Cloud CDN (Content Delivery Network) uses Google's global network edge points of presence (PoPs) to cache website assets (images, scripts, styles, video files) closer to your users, accelerating page load speeds, lowering latency, and reducing load on your application backend servers.",
    category: "Networking & Security",
    explanation: "Cloud CDN is enabled simply by toggling a checkbox on your Global External Application Load Balancer. When a user requests a file, Google's routing takes them to the nearest Edge Cache location. If the asset is cached (Cache Hit), it is delivered instantly. If it is missing (Cache Miss), the load balancer fetches it from the backend, caches it for future requests, and sends it to the user.",
    example: {
      title: "Enabling Cloud CDN on an Existing Backend Service",
      description: "Configure caching on your backend service with a single gcloud CLI command.",
      cli: "# Update a backend service to enable Cloud CDN with custom cache rules\ngcloud compute backend-services update web-backend-service \\\n  --enable-cdn \\\n  --cache-mode=CACHE_ALL_STATIC \\\n  --global"
    },
    diagramType: "cdn_cache",
    visualAid: "Visual comparison of load paths: Request without CDN (250ms roundtrip to origin DB) vs Request with CDN Edge Cache (15ms to nearest PoP node)."
  },
  {
    id: 26,
    question: "What is Cloud IAM's principle of least privilege?",
    answer: "The principle of least privilege is a security best practice that dictates users, applications, and service accounts should be granted only the absolute minimum set of permissions necessary to perform their specific business function, and nothing more.",
    category: "Networking & Security",
    explanation: "Following this principle dramatically limits the security blast radius if a user account is hijacked or a service account key is leaked. For example, do not assign the legacy broad 'roles/editor' role to a background log-forwarding service. Instead, create or assign a precise predefined role like 'roles/logging.logWriter', preventing that service from deleting virtual machines or reading sensitive cloud databases.",
    example: {
      title: "Least Privilege Demonstration",
      description: "Bad practice (granting generic Editor role) vs Good practice (granting highly specific log writing permissions).",
      code: "❌ BAD PRACTICE (Over-privileged):\nService Account permissions: roles/editor\n\n✅ GOOD PRACTICE (Least Privilege):\nService Account permissions: roles/logging.logWriter"
    },
    diagramType: "iam_least_privilege",
    visualAid: "A comparative security slider demonstrating full admin blast radius vs locked-down least-privilege boundaries."
  },
  {
    id: 27,
    question: "What is a firewall rule in GCP?",
    answer: "A firewall rule is a secure networking configuration that controls allowed or denied incoming (ingress) and outgoing (egress) traffic to and from VM instances inside your VPC network based on protocols, ports, source/destination IP addresses, and custom network tags.",
    category: "Networking & Security",
    explanation: "GCP VPC firewall rules are stateful, meaning if an inbound connection is permitted, the corresponding outbound return traffic is automatically allowed. Rules are applied using 'network tags' or service accounts attached to VMs. This allows you to apply rules dynamically; for example, applying an 'allow-http-80' firewall rule exclusively to VMs tagged with the label 'web-server'.",
    example: {
      title: "Creating an Ingress Firewall Rule",
      description: "Allow external traffic on port 80 to hit any virtual machine tagged with 'http-server'.",
      cli: "# Create a firewall rule to permit incoming HTTP traffic on port 80\ngcloud compute firewall-rules create allow-http-rule \\\n  --network=enterprise-vpc \\\n  --allow=tcp:80 \\\n  --direction=INGRESS \\\n  --target-tags=http-server \\\n  --source-ranges=0.0.0.0/0"
    },
    diagramType: "vpc_nat",
    visualAid: "VPC boundary showing firewall rules filtering out unauthorized port requests before they reach individual VM interfaces."
  },
  {
    id: 28,
    question: "What is Cloud DNS?",
    answer: "Cloud DNS is a fully managed, highly available, low-latency domain name system (DNS) service running on Google's global network, responsible for translating human-readable web domains (e.g., www.example.com) into physical IP addresses.",
    category: "Networking & Security",
    explanation: "Cloud DNS features a 100% uptime SLA. It can host public zones visible to the entire internet, as well as private DNS zones accessible only within your internal VPC network. Private DNS is critical for secure microservice routing inside enterprise environments.",
    example: {
      title: "Creating a Private DNS Zone",
      description: "Configure an internal DNS suffix to map internal resources securely.",
      cli: "# Create a private DNS zone inside a designated VPC network\ngcloud dns managed-zones create internal-gcp-zone \\\n  --dns-name=internal.company.local. \\\n  --description=\"Internal Microservices DNS\" \\\n  --visibility=private \\\n  --networks=enterprise-vpc"
    },
    diagramType: "dns_flow",
    visualAid: "Sequence diagram: Client browser queries Cloud DNS -> Edge Anycast Resolver returns target IP -> Request routed to VM."
  },
  {
    id: 43,
    question: "What is Workload Identity Federation?",
    answer: "Workload Identity Federation allows workloads running outside of Google Cloud (such as GitHub Actions, AWS EC2, or on-premises servers) to authenticate to GCP and access resources securely using short-lived credentials, without requiring you to download, manage, or rotate long-lived service account JSON keys.",
    category: "Networking & Security",
    explanation: "Storing downloaded service account keys in third-party environments (like GitHub Secrets or local server directories) represents a major security risk; if a key is compromised, attackers get silent, persistent access. Workload Identity Federation establishes a trust relationship between GCP and external OpenID Connect (OIDC) or SAML 2.0 identity providers. External systems exchange their native tokens for short-lived, self-expiring GCP IAM tokens on-the-fly.",
    example: {
      title: "Concept of Workload Identity Trust Flow",
      description: "How GitHub Actions exchanges an OIDC token for a GCP access token dynamically.",
      code: "1. GitHub Actions runner generates an OIDC JWT token.\n2. Runner calls: security-token.googleapis.com/v1/token (STS API).\n3. GCP validates GitHub's signature, exchanges it for short-lived GCP token.\n4. GitHub uses short-lived token to deploy resources securely."
    },
    diagramType: "workload_identity",
    visualAid: "Step-by-step cryptographic exchange showing GitHub Actions securely trading identity assertions for GCP storage access without long-lived keys."
  },
  {
    id: 44,
    question: "Why avoid downloading and storing service account keys?",
    answer: "Downloading service account keys creates severe security vulnerabilities: 1) They are long-lived (often valid for up to 10 years by default); 2) They cannot be easily revoked without affecting other integrations; 3) If committed to git repos or leaked from client systems, they give immediate, unmonitored access to malicious parties; 4) They lack built-in security features like context-aware access.",
    category: "Networking & Security",
    explanation: "Security best practices demand that you use local instance-attached service accounts (which use automatically rotated keys managed by GCP) or rely on Workload Identity Federation for external connections. If you absolutely must generate a key, you should set a strict, short expiration policy and implement automated revocation monitoring.",
    example: {
      title: "GCP Org Policy to Block Service Account Key Creation",
      description: "Prevent developers from generating downloadable JSON keys project-wide.",
      cli: "# Enable Org Policy constraint to block downloadable SA keys\ngcloud resource-manager org-policies enable \\\n  constraints/iam.disableServiceAccountKeyCreation \\\n  --project=my-project-123"
    },
    diagramType: "workload_identity",
    visualAid: "Comparative visual showing leaked JSON key compromise vs safe short-lived tokens automatically self-destructing after 1 hour."
  },
  {
    id: 46,
    question: "What is Cloud Armor?",
    answer: "Cloud Armor is GCP's enterprise-grade security service that provides DDoS (Distributed Denial of Service) mitigation and a WAF (Web Application Firewall) to protect web applications deployed behind your External Application Load Balancers.",
    category: "Networking & Security",
    explanation: "Cloud Armor intercepts traffic at the edge of Google's network, absorbing volumetric layer 3/4 DDoS attacks before they reach your virtual machines. It also provides pre-configured WAF rules to detect and block common layer-7 exploit attempts (like SQL injection, Cross-Site Scripting (XSS), and Remote Code Execution) based on OWASP Top 10 standards.",
    example: {
      title: "Creating a Cloud Armor Security Policy",
      description: "Block access from a specific malicious IP address block and apply it to your load balancer.",
      cli: "# Create a security policy\ngcloud compute security-policies create web-defense-policy\n\n# Add a rule to block a malicious IP range\ngcloud compute security-policies rules create 1000 \\\n  --security-policy=web-defense-policy \\\n  --src-ip-ranges=198.51.100.0/24 \\\n  --action=deny-403 \\\n  --description=\"Block Malicious Botnet\""
    },
    diagramType: "load_balancer",
    visualAid: "Shows malicious requests (SQLi/DDoS) intercepted and dropped by Cloud Armor at the Edge proxy level, while clean traffic is forwarded."
  },
  {
    id: 47,
    question: "What is a Cloud NAT?",
    answer: "Cloud NAT (Network Address Translation) is a fully managed, highly available, distributed network service that allows virtual machines inside private subnets (VMs without external public IP addresses) to securely connect outbound to the internet (for software updates or external APIs) while blocking any incoming internet connections from initiating a contact with them.",
    category: "Networking & Security",
    explanation: "Unlike traditional NAT gateways, Cloud NAT is software-defined and does not rely on a single choke-point VM router. It is co-scheduled across Google's virtual infrastructure, meaning it scales automatically to support any bandwidth without introducing performance bottlenecks. It integrates with Cloud Router to allocate NAT IP pools dynamically.",
    example: {
      title: "Configuring a Cloud NAT Gateway",
      description: "Setup Cloud Router and attach a Cloud NAT gateway to your private VPC subnet.",
      cli: "# Create a Cloud Router in the same region as the private subnets\ngcloud compute routers create custom-nat-router \\\n  --network=enterprise-vpc \\\n  --region=us-central1\n\n# Create the Cloud NAT gateway\ngcloud compute routers nats create nat-config \\\n  --router=custom-nat-router \\\n  --region=us-central1 \\\n  --auto-allocate-nat-external-ips \\\n  --nat-all-subnet-ip-ranges"
    },
    diagramType: "vpc_nat",
    visualAid: "Private Subnet VM -> Private IP -> Cloud NAT Gateway -> Translated Public IP -> Outbound Internet Response -> Private VM."
  },
  {
    id: 48,
    question: "What is the difference between a public and private subnet concept in GCP VPC design?",
    answer: "In GCP, a Subnet is not inherently 'public' or 'private' by default. Rather, whether resources inside a subnet are public or private is determined by: 1) Whether individual VM instances have external public IPs assigned, and 2) Whether VPC firewall rules permit public ingress traffic to reach those resources.",
    category: "Networking & Security",
    explanation: "This differs significantly from platforms like AWS, where subnets are designated 'public' or 'private' based on their routing table associations (i.e., whether they route traffic to an Internet Gateway). In GCP, all subnets are automatically routed to the default internet gateway; traffic blockages are handled entirely at the VM interface level using firewalls and IP allocations.",
    example: {
      title: "Simulating a Private VM Setup in GCP",
      description: "Create an instance with only internal IP addresses, isolating it from inbound internet probes.",
      cli: "# Create a VM with NO external public IP (completely private)\ngcloud compute instances create secure-internal-vm \\\n  --network=enterprise-vpc \\\n  --subnet=prod-subnet-us \\\n  --no-address \\\n  --zone=us-central1-a"
    },
    diagramType: "vpc_nat",
    visualAid: "Comparison illustrating the flat VPC routing table of GCP vs the split subnet routing tables of AWS."
  },
  {
    id: 49,
    question: "What is a Cloud Interconnect?",
    answer: "Cloud Interconnect provides a dedicated physical, high-speed, enterprise-grade private network connection between your on-premises enterprise network and Google Cloud's virtual network, bypassing the public internet.",
    category: "Networking & Security",
    explanation: "It is divided into Dedicated Interconnect (a physical fiber cross-connect co-located in a Google facility, supporting 10G or 100G circuits) and Partner Interconnect (connecting via a supported telecom provider, suitable for lower bandwidth). It is designed for maximum throughput, low latency, high security, and provides significant discounts on outbound data egress costs.",
    example: {
      title: "Interconnect Selection Overview",
      description: "Choosing between Interconnect types based on bandwidth requirements.",
      code: "1. Dedicated Interconnect: Physical direct connection (10 Gbps - 100 Gbps per link)\n2. Partner Interconnect: Connected via Telco partner (50 Mbps - 10 Gbps)\n3. Cloud VPN (IPsec): Encrypted tunnel over public internet (up to 3 Gbps per tunnel)"
    },
    diagramType: "interconnect",
    visualAid: "Enterprise Data Center router connected physically to Google Edge routing facility via a fiber cross-connect line."
  },
  {
    id: 73,
    question: "How would you secure a Cloud Run service so only authenticated requests are allowed?",
    answer: "To secure a Cloud Run service: 1) Revoke the public 'allUsers' permission from the IAM policy (removing anonymous access); 2) Assign the 'Cloud Run Invoker' role exclusively to authorized Google Accounts, Groups, or Service Accounts; 3) Have clients authenticate their requests by generating and passing an OpenID Connect (OIDC) ID token in the Authorization header.",
    category: "Networking & Security",
    explanation: "When Cloud Run receives an authenticated request, it intercepts and validates the token. If the identity inside the token possesses the 'run.routes.invoke' permission, the request is forwarded to your container; otherwise, the client instantly receives a 403 Forbidden error, shielding your container from processing overhead.",
    example: {
      title: "Restricting Access and Invoking via Node.js Client",
      description: "How to invoke a secured Cloud Run service programmatically.",
      code: "import { GoogleAuth } from 'google-auth-library';\nconst auth = new GoogleAuth();\n\nasync function callSecuredService() {\n  const targetUrl = 'https://secured-api-rffk-uc.a.run.app';\n  // Generate ID token for target audience (Cloud Run URL)\n  const client = await auth.getIdTokenClient(targetUrl);\n  const res = await client.request({ url: targetUrl });\n  console.log(res.data);\n}"
    },
    diagramType: "iam_least_privilege",
    visualAid: "Identity Flow: Frontend Server -> Fetches OIDC ID Token -> Calls Secured Cloud Run -> IAM Validates -> Container Processes."
  },
  {
    id: 74,
    question: "What is the difference between a regional and global load balancer in GCP?",
    answer: "A Global Load Balancer (e.g., Global HTTPS Load Balancer) uses a single external anycast IP address to automatically route traffic across healthy backends globally in multiple regions close to the user. A Regional Load Balancer (e.g., Regional Network Load Balancer) distributes traffic exclusively within a single specified region, suitable for internal resources or strict local data residency requirements.",
    category: "Networking & Security",
    explanation: "Global load balancers operate at the Edge of Google's network (Layer 7 proxies) and support SSL offloading and CDN caching. Regional load balancers can be Layer 4 (pass-through TCP/UDP traffic with minimal overhead, keeping original client packets untouched) or Layer 7 regional proxies.",
    example: {
      title: "Querying Existing Load Balancers",
      description: "Inspect active forwarding rules to identify global vs regional bindings.",
      cli: "# List forwarding rules to check IP bindings and regional scopes\ngcloud compute forwarding-rules list"
    },
    diagramType: "load_balancer",
    visualAid: "Visual comparison mapping global anycast routing (US/EU/Asia mapped to one IP) vs regional static routing."
  },
  {
    id: 93,
    question: "What is VPC Service Controls?",
    answer: "VPC Service Controls is an enterprise security feature that allows you to define a secure security perimeter around sensitive GCP managed services (like Cloud Storage, BigQuery, and Firestore), completely preventing data exfiltration even by administrators with legitimate IAM credentials.",
    category: "Networking & Security",
    explanation: "IAM controls 'who' has access. However, if an authorized employee's credentials are stolen, or if a service account is compromised, they could copy data from your secure bucket into an external, public bucket. VPC Service Controls blocks this by creating a physical logical perimeter. Even with full IAM Owner access, API commands that move data outside the perimeter are instantly blocked.",
    example: {
      title: "Concept of Perimeter Blockage",
      description: "How VPC SC prevents cross-boundary data copier attacks.",
      code: "IAM Admin attempts:\nCopy data from ProjectA (inside Security Perimeter) to ProjectB (external bucket)\nRESULT: VPC Service Controls blocks the request with a SECURITY_PERIMETER_VIOLATION error."
    },
    diagramType: "vpc_nat",
    visualAid: "A high-visibility bubble diagram outlining an enterprise secure zone enclosing databases and blocking data exfiltration attempts."
  },
  {
    id: 94,
    question: "What is the principle behind GCP's global network backbone advantage?",
    answer: "Google's global network backbone is a massive, private, fiber-optic infrastructure spanning undersea cables and terrestrial fibers owned and operated directly by Google. The principle is that user traffic enters a Google Edge Point of Presence (PoP) as close to the user as possible, and is then transported entirely over Google's ultra-high-speed private network, bypassing the slow, congested public internet.",
    category: "Networking & Security",
    explanation: "On other clouds, packets might jump between public internet service providers (ISPs) and transit carriers across continents, increasing latency and jitter. In Google Cloud, once traffic reaches the nearest Edge, it travels on dedicated, private Google fiber directly to the target zone, guaranteeing superior routing speeds, stability, and lower packet loss.",
    example: {
      title: "Tracing Packet Route Concept",
      description: "How Google Premium Network routing shortens public routing loops.",
      code: "User (Chicago) ──> Nearest Google PoP (Chicago) ──[ Google Private High-Speed Fiber ]──> Data Center (Frankfurt)"
    },
    diagramType: "interconnect",
    visualAid: "Undersea cable visual route detailing how packet transfers are routed through private nodes compared to messy hops across public web nodes."
  },
  {
    id: 96,
    question: "What is the difference between a custom role and a predefined role in IAM?",
    answer: "A Predefined Role is a curated, ready-to-use role created and automatically updated by Google for specific services (e.g., BigQuery Admin). A Custom Role is a user-defined bundle of specific permissions that you select manually to implement highly tailored, security-hardened authorization structures.",
    category: "Networking & Security",
    explanation: "Predefined roles are simple and maintained by Google; if Google adds a new permission to BigQuery, the BigQuery Admin role is updated automatically. Custom roles give you absolute control but require manual maintenance; if a service evolves and you don't update your custom role, applications might fail on new API features. Custom roles also cannot be assigned to folder scopes.",
    example: {
      title: "Creating a Predefined Role Binding vs Custom Role",
      description: "Commands demonstrating both role types.",
      cli: "# 1. Grant Predefined Role\ngcloud projects add-iam-policy-binding my-project-123 \\\n  --member='user:dev@company.com' \\\n  --role='roles/bigquery.dataViewer'\n\n# 2. Grant Custom Role (assuming already created)\ngcloud projects add-iam-policy-binding my-project-123 \\\n  --member='user:dev@company.com' \\\n  --role='projects/my-project-123/roles/myCustomDataViewer'"
    },
    diagramType: "iam_least_privilege",
    visualAid: "Flow chart detailing administrative maintenance pathways of Google-managed updates vs custom role pipelines."
  },
  {
    id: 97,
    question: "How would you audit who has access to what in a GCP project?",
    answer: "To audit access inside a GCP project: 1) Query the project's active IAM Policy bindings; 2) Analyze Cloud Audit Logs to track actual operations executed by identities; 3) Use the IAM Recommender tool to discover over-privileged accounts; 4) Search GCP Asset Inventory to capture a point-in-time snapshot of resources and their active policies.",
    category: "Networking & Security",
    explanation: "The IAM Recommender is an AI-powered analyzer that looks at historical user activity over the past 90 days. If it discovers that a user is assigned a heavy role (like Owner) but is only listing buckets, it automatically recommends demoting their access to a specific read-only role, enforcing least privilege.",
    example: {
      title: "Querying Project IAM Policies",
      description: "Export the full IAM policy mapping of your active project to search for compromised entries.",
      cli: "# Fetch and save the project-wide IAM policy as a JSON file\ngcloud projects get-iam-policy my-project-123 --format=json > iam-audit.json"
    },
    diagramType: "iam_least_privilege",
    visualAid: "Visual list mapping an identity's excessive permissions alongside the safe, downscaled AI recommendation."
  },
  {
    id: 98,
    question: "What is Cloud Audit Logs?",
    answer: "Cloud Audit Logs is a security auditing service that records a trail of all administrative activities and data accesses across your GCP resources. It is divided into Admin Activity logs (writes/modifications, always enabled at no cost) and Data Access logs (reads/queries of user data, disabled by default due to high log volumes).",
    category: "Networking & Security",
    explanation: "Cloud Audit Logs provide answers to: 'Who did what, where, and when inside my cloud?' Admin Activity logs track events like VM creation, firewall deletions, or bucket modifications. Data Access logs track events like database queries or file downloads. These logs are tamper-proof and are critical for enterprise compliance, security incident forensics, and system auditing.",
    example: {
      title: "Querying Audit Logs via gcloud CLI",
      description: "Search for who deleted a Compute Engine instance in your logs.",
      cli: "# Search audit logs for VM deletion events in the project\ngcloud logging read \\\n  \"resource.type=gce_instance AND protoPayload.methodName=v1.compute.instances.delete\" \\\n  --limit=5"
    },
    diagramType: "monitoring_logging",
    visualAid: "Interactive pipeline: User executes action -> API intercepts -> Write to Audit Logs -> Archive to Cold Storage / Alert Trigger."
  }
];
