import { Question } from '../types';

export const category1Questions: Question[] = [
  {
    id: 1,
    question: "What is GCP?",
    answer: "Google Cloud Platform (GCP) is Google's suite of cloud computing services running on the exact same global, high-performance infrastructure that powers Google's consumer services like Search and YouTube. It provides a wide range of services including compute, storage, networking, database management, machine learning, and developer tools.",
    category: "GCP Core & Architecture",
    explanation: "GCP enables customers to deploy and scale applications quickly without the overhead of physical hardware maintenance. It divides its globally unified network into Regions and Zones, offering high availability, automatic scaling, and powerful analytics. One of GCP's biggest competitive advantages is its private global fiber network, which handles massive inter-regional traffic efficiently.",
    example: {
      title: "Exploring GCP Services with gcloud CLI",
      description: "You can interact with GCP services using the Web Console, REST APIs, or the gcloud Command-Line Interface (CLI). Below is how you authenticate and list active projects.",
      cli: "# Log in to your Google Account\ngcloud auth login\n\n# List all projects currently accessible under your account\ngcloud projects list"
    },
    diagramType: "default",
    visualAid: "Visualizes the physical layered architecture of Google Cloud: Global Private Network -> Regional Clusters -> Zonal Data Centers -> Computing Nodes."
  },
  {
    id: 2,
    question: "What is a GCP Project?",
    answer: "A GCP Project is the fundamental, base-level organizing entity for all resources in Google Cloud. Every resource you create (like virtual machines, database instances, or storage buckets) must belong to exactly one project. Projects contain their own billing settings, API activations, permissions (IAM), and resource quotas.",
    category: "GCP Core & Architecture",
    explanation: "Projects function as isolated isolation boundaries. Resources in project A cannot easily communicate with or share billing with resources in project B unless explicitly wired together via Shared VPC, VPC Peering, or IAM cross-project roles. Each project is uniquely identified by a Project Name (user-defined), a globally unique Project ID (system-wide unique), and a Project Number (numeric unique, assigned by GCP).",
    example: {
      title: "Creating and Activating a Project via CLI",
      description: "Manage projects programmatically or via CLI to automate pipeline isolation.",
      cli: "# Create a new project with a unique ID\ngcloud projects create interview-prep-gcp-2026\n\n# Set the active project in your local gcloud config\ngcloud config set project interview-prep-gcp-2026"
    },
    diagramType: "hierarchy",
    visualAid: "Interactive tree showing: Organization -> Folders -> Projects -> Resources (VMs, Buckets, Databases)."
  },
  {
    id: 3,
    question: "What is IAM in GCP?",
    answer: "Identity and Access Management (IAM) controls 'Who' (identities) has 'What access' (roles/permissions) to 'Which resources' (GCP entities). It provides a secure framework for managing authentication and authorization across all Google Cloud resources.",
    category: "GCP Core & Architecture",
    explanation: "IAM operates on policy binds. An IAM policy is a collection of statements that associate members (like Google accounts, Google groups, or service accounts) with specific roles. A role is a bundle of fine-grained permissions (e.g., 'compute.instances.start'). By assigning roles rather than raw permissions directly to individuals, access control remains highly maintainable.",
    example: {
      title: "Binding an IAM Role to a User",
      description: "Granting read access to a user for a specific storage bucket using the gcloud tool.",
      cli: "# Grant Storage Object Viewer role to a specific user on a project\ngcloud projects add-iam-policy-binding my-project-123 \\\n  --member='user:candidate@gmail.com' \\\n  --role='roles/storage.objectViewer'"
    },
    diagramType: "iam_least_privilege",
    visualAid: "Flow diagram showing: Subject (Identity) -> Role Bindings -> Permitted Actions on a GCP Resource."
  },
  {
    id: 4,
    question: "What are the three types of IAM roles?",
    answer: "The three types of IAM roles in GCP are Basic Roles (Owner, Editor, Viewer), Predefined Roles (service-specific, granular roles maintained by Google), and Custom Roles (user-defined bundles of specific permissions).",
    category: "GCP Core & Architecture",
    explanation: "1. Basic Roles: Extremely broad and legacy. Viewer is read-only. Editor can modify but not manage permissions or billing. Owner has full admin control including IAM modification and billing.\n2. Predefined Roles: Highly granular and tailored for specific services (e.g., 'roles/pubsub.publisher' or 'roles/compute.networkAdmin'). Google updates these automatically as new features release.\n3. Custom Roles: Tailored for high-security environments where predefined roles grant too much. Note: Custom roles cannot be created at the folder level; they must be project-level or org-level, and they require manual upkeep when GCP permissions change.",
    example: {
      title: "Defining a Custom Role via YAML",
      description: "Create a custom IAM role that only allows starting and stopping Compute Engine instances without deleting or editing them.",
      code: "# custom-role.yaml\ntitle: \"Compute Instigator\"\ndescription: \"Can only start and stop VM instances\"\nstage: \"GA\"\nincludedPermissions:\n  - compute.instances.start\n  - compute.instances.stop\n  - compute.instances.list",
      cli: "# Apply the custom role in your project\ngcloud iam roles create computeInstigator \\\n  --project=my-project-123 \\\n  --file=custom-role.yaml"
    },
    diagramType: "iam_least_privilege",
    visualAid: "Visual comparison card demonstrating permission scope sizes: Basic (Gigantic) -> Predefined (Targeted) -> Custom (Ultra-Precise)."
  },
  {
    id: 5,
    question: "What is a Service Account?",
    answer: "A Service Account is a special type of Google Cloud identity that represents a non-human user, typically an application, virtual machine, container, or background job, that needs to make authorized API calls to GCP services.",
    category: "GCP Core & Architecture",
    explanation: "Unlike human users who sign in with email and password, service accounts use cryptographic key pairs to authenticate. When an application runs on a GCP service like Compute Engine or Cloud Run, you can attach a Service Account to it. The system automatically provisions temporary access tokens, eliminating the need to embed secret credentials inside your source code.",
    example: {
      title: "Creating and Attaching a Service Account",
      description: "Below commands create a service account and attach it to a Compute Engine instance.",
      cli: "# Create the service account\ngcloud iam service-accounts create web-app-sa \\\n  --display-name=\"Web App Server SA\"\n\n# Grant the service account permissions to read from Firestore\ngcloud projects add-iam-policy-binding my-project-123 \\\n  --member=\"serviceAccount:web-app-sa@my-project-123.iam.gserviceaccount.com\" \\\n  --role=\"roles/datastore.viewer\""
    },
    diagramType: "workload_identity",
    visualAid: "Shows a VM fetching automated temporary access credentials from the GCP Metadata Server, decoupling keys from code."
  },
  {
    id: 35,
    question: "What is a region vs a zone in GCP?",
    answer: "A Region is a specific, geographically isolated area (such as 'us-central1' or 'europe-west1') that houses multiple high-speed interconnected data centers. A Zone is an isolated fault domain within a region (such as 'us-central1-a', 'us-central1-b') designed to ensure physical separation of power, cooling, and network links.",
    category: "GCP Core & Architecture",
    explanation: "GCP structures its regions so that zones are far enough apart to protect against synchronized disasters (like localized floods or power grid failure), but close enough to enable single-digit millisecond latency between them. Certain services are zonal (like raw Compute Engine virtual disks), others are regional (like Cloud Storage buckets or Cloud SQL in High-Availability mode), and some are multi-regional (like BigQuery or Spanner clusters).",
    example: {
      title: "Querying Available Regions and Zones",
      description: "Listing zones in a specific region to plan high-availability VM topologies.",
      cli: "# List all compute zones within the 'us-central1' region\ngcloud compute zones list --filter=\"region:us-central1\""
    },
    diagramType: "hierarchy",
    visualAid: "Global geographic visualizer mapping a Region containing 3 independent, fiber-connected Zones with latency indicators."
  },
  {
    id: 36,
    question: "Why deploy across multiple zones/regions?",
    answer: "Deploying applications across multiple zones or regions provides High Availability (HA), Fault Tolerance, and Disaster Recovery (DR). It ensures that if a localized datacenter or an entire regional network suffers an outage, traffic is automatically routed to active copies of your service elsewhere.",
    category: "GCP Core & Architecture",
    explanation: "Multi-zonal architectures protect against hardware failure or individual data center upgrades. Multi-regional architectures protect against catastrophic regional outages (e.g., weather-related grid failures) and bring computing resources closer to users globally, lowering overall network roundtrip time. Multi-region deployments are typically orchestrated via Global Load Balancers.",
    example: {
      title: "Deploying a Multi-Zone Web App Setup",
      description: "When creating a Managed Instance Group, you can distribute instances across multiple zones inside a region.",
      cli: "# Create a regional Managed Instance Group spanning 3 zones for maximum fault tolerance\ngcloud compute instance-groups managed create multi-zone-mig \\\n  --region=us-central1 \\\n  --zones=us-central1-a,us-central1-b,us-central1-c \\\n  --size=3 \\\n  --template=web-app-template"
    },
    diagramType: "load_balancer",
    visualAid: "Shows Global Load Balancer routing traffic to Region A or Region B based on health checks, with zone-level failovers inside Region A."
  },
  {
    id: 40,
    question: "What is a GCP Organization?",
    answer: "The Organization is the absolute root node in the Google Cloud resource hierarchy. It represents your company or enterprise in GCP and is automatically mapped to your Google Workspace or Cloud Identity domain.",
    category: "GCP Core & Architecture",
    explanation: "An Organization allows central administrators to control all downstream projects, apply global governance rules, manage unified billing, and enforce compliance policies. All folders and projects created by users automatically sit underneath the Organization node, which ensures that employees cannot create 'shadow' GCP accounts that escape corporate auditing.",
    example: {
      title: "Finding Your GCP Organization ID",
      description: "List the organizations associated with your authorized domain.",
      cli: "# List available organizations to locate your unique 12-digit Organization ID\ngcloud organizations list"
    },
    diagramType: "hierarchy",
    visualAid: "Interactive resource hierarchy mapping corporate root domain down to project directories."
  },
  {
    id: 41,
    question: "What is the GCP resource hierarchy?",
    answer: "The GCP resource hierarchy is a structured tree representing the ownership and management of cloud assets. From top to bottom, it consists of: Organization -> Folders -> Projects -> Resources (VMs, DBs, Buckets). Policies applied at higher levels are inherited by all child resources below them.",
    category: "GCP Core & Architecture",
    explanation: "This structure serves two key purposes: policy inheritance and granular administrative control. If you grant an IAM permission at the Folder level, the user automatically gets that access across all Projects and Resources inside that folder. Similarly, Organization Policies can block certain behaviors (e.g., creating external IPs) for the entire company by setting the constraint at the top node.",
    example: {
      title: "Creating a Folder structure via CLI",
      description: "Folders are used to group projects belonging to different departments or environments (Prod, Dev, QA).",
      cli: "# Create a folder directly under your Organization\ngcloud resource-manager folders create \\\n  --display-name=\"Production-Workloads\" \\\n  --organization=123456789012"
    },
    diagramType: "hierarchy",
    visualAid: "An interactive tree hierarchy that lets you apply IAM policies at the Organization, Folder, or Project level, and witness the inheritance cascade."
  },
  {
    id: 42,
    question: "What is an Org Policy?",
    answer: "An Organization Policy is a set of hard constraints and restrictions enforced globally across your entire GCP resource hierarchy. Unlike IAM (which manages 'who' can do 'what'), Org Policies manage 'what' configurations are permitted on resources, regardless of a user's IAM privileges.",
    category: "GCP Core & Architecture",
    explanation: "Org Policies are a primary weapon for security compliance. An Organization Policy Administrator can apply constraints like: disabling external/public IP generation on VMs, restricting physical resource creation to specific approved geographic regions, or forbidding the creation of public-facing Cloud Storage buckets. These rules instantly override human developer actions, ensuring secure guardrails are maintained.",
    example: {
      title: "Restricting Approved Service Regions",
      description: "Define a policy file to restrict resource creation only to US and Europe regions.",
      code: "# org-policy.yaml\nconstraint: constraints/gcp.resourceLocations\nlistPolicy:\n  allowedValues:\n    - in:us-locations\n    - in:eu-locations",
      cli: "# Set the policy at the root folder level\ngcloud resource-manager folders set-policy 9876543210 \\\n  org-policy.yaml"
    },
    diagramType: "hierarchy",
    visualAid: "Visual comparison showing a Project Owner blocked from creating an VM with a Public IP due to an Organization Policy Constraint, highlighting security guardrails."
  }
];
