import { Question } from '../types';

export const category3Questions: Question[] = [
  {
    id: 16,
    question: "What is Cloud Storage?",
    answer: "Cloud Storage is GCP's fully managed, highly durable, secure object storage service for storing unstructured data like images, videos, logs, and backups. It offers flat, non-hierarchical storage where files are stored as objects inside designated buckets.",
    category: "Storage & Databases",
    explanation: "Cloud Storage is designed for global scale, offering up to 11 nines (99.999999999%) of durability. It supports strong global consistency, meaning that as soon as you write or update an object, it is instantly readable by anyone with permissions worldwide. Buckets can be configured with granular IAM, object versioning, customer-managed encryption keys (CMEK), and custom lifecycles.",
    example: {
      title: "Creating a Bucket and Copying Objects",
      description: "Use the gsutil utility or gcloud storage CLI to manage objects.",
      cli: "# Create a regional bucket in us-central1\ngcloud storage buckets create gs://gcp-interview-assets-100 \\\n  --location=us-central1\n\n# Upload a local file to the storage bucket\ngcloud storage cp dashboard-screenshot.png gs://gcp-interview-assets-100/"
    },
    diagramType: "storage_classes",
    visualAid: "Object Storage Flat Layout: Bucket -> Unique Object key mapping metadata and raw binary payload."
  },
  {
    id: 17,
    question: "What are Cloud Storage storage classes?",
    answer: "The four primary Cloud Storage classes are Standard (frequent access, highest performance, no retrieval fees), Nearline (accessed less than once a month, 30-day min retention), Coldline (accessed less than once a quarter, 90-day min retention), and Archive (accessed less than once a year, 365-day min retention, cheapest storage cost, highest retrieval fees).",
    category: "Storage & Databases",
    explanation: "Storage classes let you optimize costs based on how often you read files. Standard is perfect for active web assets, user uploads, or streamable content. Nearline is suited for monthly reports. Coldline is great for cold disaster recovery archives. Archive is ideal for long-term compliance backups. Moving objects to colder storage classes reduces storage fees but introduces access fees and minimum storage duration charges.",
    example: {
      title: "Creating a Bucket with a Coldline Storage Class",
      description: "Provision a bucket pre-configured for cold backup storage.",
      cli: "# Create a Coldline bucket in europe-west3 (Frankfurt)\ngcloud storage buckets create gs://enterprise-backups-2026 \\\n  --default-storage-class=COLDLINE \\\n  --location=europe-west3"
    },
    diagramType: "storage_classes",
    visualAid: "Interactive bar chart comparing Storage Cost vs Data Retrieval Cost for all 4 storage classes."
  },
  {
    id: 18,
    question: "What is Cloud SQL?",
    answer: "Cloud SQL is a fully managed relational database service that makes it easy to set up, maintain, manage, and scale PostgreSQL, MySQL, and SQL Server databases on Google Cloud.",
    category: "Storage & Databases",
    explanation: "Cloud SQL handles OS patching, hardware provisioning, backups, replicas, and minor version upgrades automatically. It supports High Availability (HA) deployments by maintaining an active-active sync with a standby failover instance in a different zone. While powerful, Cloud SQL is a traditional relational database and is constrained to vertical scaling for write operations.",
    example: {
      title: "Provisioning a PostgreSQL High-Availability Instance",
      description: "Create a production-ready PostgreSQL database with multi-zone HA failover enabled.",
      cli: "# Create highly available PostgreSQL 14 instance\ngcloud sql instances create prod-pg-db \\\n  --database-version=POSTGRES_14 \\\n  --tier=db-custom-2-7680 \\\n  --region=us-central1 \\\n  --availability-type=REGIONAL"
    },
    diagramType: "spanner_vs_sql",
    visualAid: "Primary Database Zone A replication to Standby Database Zone B with automated VIP routing."
  },
  {
    id: 19,
    question: "What is Cloud Spanner?",
    answer: "Cloud Spanner is Google's enterprise-grade, globally distributed, horizontally scalable, strongly consistent relational database service that combines the scaling advantages of NoSQL databases with the transactional consistency (ACID) of standard SQL databases.",
    category: "Storage & Databases",
    explanation: "Cloud Spanner is designed to solve the physical scalability limits of traditional relational databases (like MySQL/PostgreSQL). While traditional databases require vertical upgrades, Spanner can scale horizontally across regions and continents simply by adding node instances, maintaining synchronous global consistency without locking up. It achieves this using synchronized atomic clocks (TrueTime API) across Google's datacenters.",
    example: {
      title: "Creating a Cloud Spanner Instance",
      description: "Provision a globally distributed multi-regional Spanner instance.",
      cli: "# Spin up a Spanner instance using a multi-region configuration\ngcloud spanner instances create global-spanner-db \\\n  --config=nam-eur-asia1 \\\n  --description=\"Global Transaction Engine\" \\\n  --nodes=2"
    },
    diagramType: "spanner_vs_sql",
    visualAid: "Interactive visualizer comparing Cloud SQL (Single Primary VM + Read Replicas) vs Cloud Spanner (Multi-master global cluster synced via TrueTime clocks)."
  },
  {
    id: 20,
    question: "What is Firestore?",
    answer: "Firestore is a fully managed, serverless, cloud-native NoSQL document database designed for mobile, web, and server application development. It stores data in JSON-like documents grouped into collections, supports rich queries, and offers real-time synchronization.",
    category: "Storage & Databases",
    explanation: "Firestore is the successor to Firebase's Realtime Database. It features a scalable document-model structure where each document can contain nested fields, subcollections, and complex datatypes. It handles synchronization natively, allowing client SDKs to listen for live data changes. It also supports seamless offline data caching, caching reads and writing queues locally until a network reconnects.",
    example: {
      title: "Structuring Firestore Data",
      description: "A typical structure of a Firestore document within a 'users' collection.",
      code: "Collections: users/\n  └── Document ID: candidate_01\n        ├── name: \"Jane Doe\"\n        ├── role: \"GCP Architect\"\n        └── certificates: [\"Cloud Digital Leader\", \"Professional Cloud Architect\"]\n        └── subcollection: activity_logs/\n               └── doc_01: { timestamp: \"2026-07-18\", action: \"Completed Test\" }"
    },
    diagramType: "firebase_arch",
    visualAid: "Real-time client-to-cloud visualizer showing document state syncing instantly from server to multiple web browser interfaces."
  },
  {
    id: 21,
    question: "What is BigQuery?",
    answer: "BigQuery is a fully managed, serverless, highly scalable enterprise multi-cloud data warehouse designed for running lightning-fast SQL queries and machine learning models over petabytes of data without any infrastructure management.",
    category: "Storage & Databases",
    explanation: "BigQuery decouples storage from compute, allowing each to scale independently. Behind the scenes, it stores data in a highly compressed columnar format (Capacitor) and distributes SQL queries across thousands of compute workers (Dremel engine) connected by a high-speed network (Jupiter). It operates on a pay-per-scan or flat-rate compute pricing model.",
    example: {
      title: "Querying a Public Dataset in BigQuery",
      description: "Run standard ANSI SQL directly against terabytes of public logs.",
      code: "-- Count public repository contributions on GitHub\nSELECT language, COUNT(*) as repos\nFROM `bigquery-public-data.github_repos.languages`\nCROSS JOIN UNNEST(language)\nGROUP BY language\nORDER BY repos DESC\nLIMIT 10"
    },
    diagramType: "bigquery_perf",
    visualAid: "Columnar Storage visualization: Queries scanning only targeted columns, contrasting with traditional row-by-row relational scans."
  },
  {
    id: 50,
    question: "What is BigQuery partitioning and why does it matter?",
    answer: "BigQuery partitioning is the process of splitting a massive table into smaller physical segments (partitions) based on a specific column, typically a timestamp, date, or integer range. It matters because it dramatically reduces query costs and execution time by allowing BigQuery to scan only the physical partitions that match your filter criteria.",
    category: "Storage & Databases",
    explanation: "If you have a 10-terabyte database of daily logs, a query filtering for 'yesterday' without partitioning scans the entire 10TB. If you partition the table by date, BigQuery only reads the single partition containing yesterday's logs (perhaps only 10GB), meaning you pay 1,000x less and get results in seconds.",
    example: {
      title: "Creating a Partitioned Table",
      description: "SQL statement to create a table partitioned by log date.",
      code: "-- Create logs table partitioned by the ingestion date\nCREATE TABLE my_dataset.application_logs\n(\n  log_id STRING,\n  log_time TIMESTAMP,\n  message STRING\n)\nPARTITION BY DATE(log_time);"
    },
    diagramType: "bigquery_perf",
    visualAid: "Physical partition slices: Showing a query bypass 98% of the data by targeting a single date segment."
  },
  {
    id: 51,
    question: "What is BigQuery clustering?",
    answer: "BigQuery clustering is the process of automatically sorting and organizing table data within each partition based on the values of one or more specified columns (up to 4). It optimizes query performance for queries that utilize filters (WHERE clauses) or groupings (GROUP BY) on those specific columns.",
    category: "Storage & Databases",
    explanation: "Clustering is complementary to partitioning. While partitioning splits data into coarse buckets (like calendar dates), clustering organizes the records within each of those date buckets. For instance, if you cluster by 'customer_id', BigQuery stores records belonging to the same customer close together physically, making scans for individual customer files lightning fast.",
    example: {
      title: "Creating a Partitioned and Clustered Table",
      description: "SQL statement creating a high-performance table combining both physical optimization features.",
      code: "CREATE TABLE my_dataset.sales_records\n(\n  sale_date DATE,\n  store_id INT64,\n  customer_id STRING,\n  revenue NUMERIC\n)\nPARTITION BY sale_date\nCLUSTER BY store_id, customer_id;"
    },
    diagramType: "bigquery_perf",
    visualAid: "Detailed nested block layout showing sorted data clustering within date partition buckets."
  },
  {
    id: 52,
    question: "How would you control costs in BigQuery?",
    answer: "To proactively control costs in BigQuery: 1) Always use partitioning and clustering to minimize scanned bytes; 2) Avoid 'SELECT *' — specify only the exact columns you need; 3) Set up query budget limits (maximum bytes billed per query); 4) Run 'Dry Run' queries before execution to calculate cost; 5) Configure table expiration limits for transient tables; 6) Utilize cost alert notifications in GCP Billing.",
    category: "Storage & Databases",
    explanation: "Because BigQuery pricing is directly tied to the volume of data scanned (on-demand), inefficient query practices can result in unexpected charges. Running a dry run is highly recommended for CI/CD integrations or automated query scripts.",
    example: {
      title: "Executing a Dry Run with gcloud CLI",
      description: "Calculate query byte scans without actually executing or incurring costs.",
      cli: "# Dry run a query to inspect predicted data scans before paying\ngcloud bigquery query \\\n  --dry_run \\\n  --use_legacy_sql=false \\\n  \"SELECT name FROM \`my-proj.my_ds.users\` WHERE age > 21\""
    },
    diagramType: "bigquery_perf",
    visualAid: "Budget dashboard simulation highlighting cost trends and the 'SELECT *' warning indicator."
  },
  {
    id: 81,
    question: "What's the difference between Cloud Storage and a database like Cloud SQL?",
    answer: "Cloud Storage is an object storage service designed for storing raw, unstructured files (blobs like files, images, backups) with no querying capability over internal content. Cloud SQL is a relational database designed for storing structured, tabular data (rows and columns) that supports highly complex relational queries, multi-table joins, and transactional consistency.",
    category: "Storage & Databases",
    explanation: "You would never store raw user images inside a Cloud SQL database, nor would you store your users' transactional accounts as text files inside Cloud Storage. A standard cloud architecture utilizes both: store the raw image files in Cloud Storage, and store the metadata (such as the public URL, upload timestamp, and owner ID) inside Cloud SQL.",
    example: {
      title: "Cooperative Storage Setup Concept",
      description: "How both systems interact within a backend Node controller.",
      code: "// Save file metadata and path in cooperation\nconst imageUrl = uploadToCloudStorage(imageBuffer);\nawait db.query(\"INSERT INTO user_photos (user_id, url) VALUES ($1, $2)\", [userId, imageUrl]);"
    },
    diagramType: "spanner_vs_sql",
    visualAid: "Dual-column comparison detailing structural access patterns, cost metrics, and ideal storage formats."
  },
  {
    id: 82,
    question: "What is signed URL in Cloud Storage?",
    answer: "A Signed URL is a special, time-limited URL that grants temporary read, write, or delete access to a specific Cloud Storage object. It uses cryptographic signatures (typically from a Service Account) to authorize actions without requiring the user to have a Google account or active GCP credentials.",
    category: "Storage & Databases",
    explanation: "Signed URLs are critical for secure direct file sharing and client uploads. Instead of having a client upload a heavy file to your web server (which consumes bandwidth and resources) only for the web server to upload it to GCP, the server generates a signed URL allowing the browser to upload the file directly to Cloud Storage safely.",
    example: {
      title: "Generating a Signed URL via Node.js SDK",
      description: "How to generate a secure, 15-minute write URL from a secure server environment.",
      code: "import { Storage } from '@google-cloud/storage';\nconst storage = new Storage();\n\nasync function getWriteUrl(bucketName, fileName) {\n  const [url] = await storage.bucket(bucketName).file(fileName).getSignedUrl({\n    version: 'v4',\n    action: 'write',\n    expires: Date.now() + 15 * 60 * 1000, // 15 minutes\n    contentType: 'image/png',\n  });\n  return url;\n}"
    },
    diagramType: "storage_classes",
    visualAid: "Sequence diagram: Client requests URL -> Server returns Signed URL -> Client uploads direct to Cloud Storage Bucket."
  },
  {
    id: 83,
    question: "How would you handle large file uploads directly from a browser to GCP?",
    answer: "To handle large file uploads efficiently, generate a secure Signed URL with a 'write' action server-side. Pass this URL back to the client browser, which then performs an HTTP PUT request to upload the heavy binary file directly into the designated Cloud Storage bucket.",
    category: "Storage & Databases",
    explanation: "This pattern is highly scalable. It eliminates application server bottlenecks, avoids memory exhaustion on the backend, and leverages Google's global CDN ingestion edge for extremely fast upload speeds. For massive files (greater than 5GB), you should implement resumable uploads via the Cloud Storage API.",
    example: {
      title: "Frontend Javascript Upload Snippet",
      description: "Client-side code executing a direct upload using the generated Signed URL.",
      code: "// Browser javascript direct PUT upload\nasync function uploadFile(signedUrl, file) {\n  const response = await fetch(signedUrl, {\n    method: 'PUT',\n    body: file,\n    headers: {\n      'Content-Type': file.type\n    }\n  });\n  if (response.ok) {\n    console.log('Upload complete!');\n  }\n}"
    },
    diagramType: "storage_classes",
    visualAid: "Flow chart detailing upload paths, showing why passing files through the backend server is an anti-pattern."
  },
  {
    id: 84,
    question: "What is the purpose of a Cloud Storage lifecycle rule?",
    answer: "The purpose of a Cloud Storage lifecycle rule is to automate cost optimization by defining actions (like deleting objects or transitioning them to cheaper storage classes like Coldline/Archive) based on specific conditions (such as object age, version count, or creation date).",
    category: "Storage & Databases",
    explanation: "Instead of writing manual cleanup cron jobs, you attach a lifecycle policy to your bucket. For example, you can define a rule: 'Any object in the bucket older than 30 days should be automatically demoted to Nearline' or 'Delete all older versions of objects if a newer version has been uploaded for more than 14 days.'",
    example: {
      title: "Defining a Lifecycle Rule via JSON",
      description: "A lifecycle policy configuration that deletes files after 365 days.",
      code: "{\n  \"rule\": [\n    {\n      \"action\": {\"type\": \"Delete\"},\n      \"condition\": {\"age\": 365}\n    }\n  ]\n}",
      cli: "# Apply the policy configuration to a bucket\ngcloud storage buckets update gs://logs-bucket --lifecycle-file=policy.json"
    },
    diagramType: "storage_classes",
    visualAid: "Step-by-step physical timeline: Standard Object (Day 1) -> Nearline (Day 30) -> Coldline (Day 90) -> Delete (Day 365)."
  },
  {
    id: 85,
    question: "What is multi-region vs dual-region vs regional Cloud Storage bucket?",
    answer: "A Regional bucket stores data in a single geographic region (cheapest, lowest latency for local compute). A Dual-Region bucket replicates your data across two specific regions with an SLA, offering regional disaster survival and geo-redundancy. A Multi-Region bucket replicates your data across a large geographic area spanning multiple regions (e.g., 'US' or 'EU'), offering maximum availability and geo-redundancy.",
    category: "Storage & Databases",
    explanation: "Choose Regional if your compute instances (like VMs or Cloud Run) are in the same region and you want maximum download speed at lowest cost. Choose Dual-Region or Multi-Region for backups, critical assets, or if you are serving content internationally behind a Cloud CDN global load balancer.",
    example: {
      title: "Creating a Dual-Region Bucket via CLI",
      description: "Replicate objects synchronously between Iowa and South Carolina regions.",
      cli: "# Create a dual-region bucket in us-central1 and us-east1\ngcloud storage buckets create gs://critical-geo-redundant-assets \\\n  --location=us-central1,us-east1"
    },
    diagramType: "storage_classes",
    visualAid: "World map highlight showing replication zones and the distance threshold for fault-tolerance SLA."
  },
  {
    id: 86,
    question: "How would you design disaster recovery for a GCP-hosted application?",
    answer: "Designing disaster recovery (DR) for a GCP-hosted application involves: 1) Deploying resources across multiple regions with automated DNS/Load Balancer failover; 2) Implementing cross-region data replication (using Cloud Spanner multi-region, Cloud SQL cross-region replicas, and Multi-Region Cloud Storage buckets); 3) Establishing automated backups with lifecycle retention; 4) Writing Infrastructure as Code (Terraform) to re-create the environment quickly; 5) Conducting periodic recovery drills.",
    category: "Storage & Databases",
    explanation: "You must establish targets for Recovery Point Objective (RPO - maximum acceptable data loss duration) and Recovery Time Objective (RTO - maximum acceptable downtime duration). Multi-region Active-Active architectures provide near-zero RTO/RPO but are costly and complex. Active-Passive (warm standby or cold backup rebuilds) balances cost while guaranteeing survival under catastrophic regional failures.",
    example: {
      title: "Creating a Cross-Region Cloud SQL Replica via CLI",
      description: "Setup a disaster recovery standby read replica of your primary database in another region.",
      cli: "# Create a cross-region read replica in us-east1 pointing to your primary db in us-central1\ngcloud sql instances create prod-db-dr-replica \\\n  --master-instance-name=prod-pg-db \\\n  --region=us-east1"
    },
    diagramType: "load_balancer",
    visualAid: "Disaster Recovery topology showing traffic shifting from offline Region A to online warm-standby Region B via Load Balancer and DNS routing."
  }
];
