import { AWSQuestion } from '../types';

export const CATEGORIES = [
  'All Concepts',
  'Global Infrastructure',
  'Compute & Containers',
  'Storage & CDN',
  'Networking & VPC',
  'Databases & Caching',
  'Security & IAM',
  'Serverless & Integration',
  'DevOps & IaC',
  'Architecture & Cost'
];

export const awsQuestions: AWSQuestion[] = [
  {
    id: 1,
    question: "What is AWS?",
    answer: "Amazon Web Services (AWS) is a broad, evolving cloud computing platform provided by Amazon. It offers over 200 fully featured services from data centers globally, providing on-demand compute power, storage, databases, networking, and analytics on a pay-as-you-go basis.",
    category: "Global Infrastructure",
    service: "AWS Global",
    difficulty: "Foundational",
    example: "Instead of a company purchasing physical servers, racks, power backup, and cooling systems in their own building, they lease virtual virtualized resources in AWS data centers on-demand.",
    snippet: {
      language: "bash",
      title: "Check AWS CLI Connection Status",
      code: "aws sts get-caller-identity"
    }
  },
  {
    id: 2,
    question: "What is an AWS Region?",
    answer: "An AWS Region is a physical, geographical area containing multiple, isolated, and physically separated Availability Zones (AZs) connected through low-latency, high-redundancy, and fully encrypted private network links.",
    category: "Global Infrastructure",
    service: "AWS Global",
    difficulty: "Foundational",
    example: "Deploying an app in the us-east-1 (N. Virginia) Region to target East Coast US users, and another in eu-west-1 (Ireland) Region to target European users with lowest network latency.",
    snippet: {
      language: "bash",
      title: "List available AWS Regions",
      code: "aws ec2 describe-regions --query \"Regions[].RegionName\" --output table"
    }
  },
  {
    id: 3,
    question: "What is an Availability Zone (AZ)?",
    answer: "An Availability Zone is one or more discrete, isolated data centers with redundant power, networking, and cooling within an AWS Region. AZs are separated by several miles to protect against local disasters (fires, floods), but are close enough to have single-digit millisecond latency between them.",
    category: "Global Infrastructure",
    service: "AWS Global",
    difficulty: "Foundational",
    example: "An AWS Region like us-west-2 has multiple Availability Zones, named us-west-2a, us-west-2b, and us-west-2c. Each of these consists of entirely separate physical buildings.",
    snippet: {
      language: "bash",
      title: "List AZs in Current Region",
      code: "aws ec2 describe-availability-zones --region us-east-1"
    }
  },
  {
    id: 4,
    question: "Why deploy across multiple AZs?",
    answer: "Deploying across multiple AZs provides High Availability, Fault Tolerance, and Disaster Resilience. If a physical issue (power outage, water leak, internet fiber cut) takes down one AZ, your application remains online and continues serving traffic from the secondary AZs with minimal or zero downtime.",
    category: "Global Infrastructure",
    service: "AWS Global",
    difficulty: "Associate",
    example: "Setting up an Application Load Balancer that routes web traffic to EC2 instances in both us-east-1a and us-east-1b. If us-east-1a goes dark, traffic is seamlessly routed entirely to us-east-1b.",
    snippet: {
      language: "hcl",
      title: "Terraform Multi-AZ Subnet Declaration",
      code: `resource "aws_subnet" "subnet_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_subnet" "subnet_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"
}`
    }
  },
  {
    id: 5,
    question: "What is EC2?",
    answer: "Elastic Compute Cloud (EC2) is a web service that provides secure, resizable compute capacity in the cloud. It represents AWS's Infrastructure-as-a-Service (IaaS) offering, allowing users to rent virtual servers ('instances') to run applications with full root OS access.",
    category: "Compute & Containers",
    service: "EC2",
    difficulty: "Foundational",
    example: "Spinning up a Linux virtual machine running Ubuntu to install Apache, Node.js, and host an API. You retain full control to SSH into the instance and customize packages.",
    snippet: {
      language: "bash",
      title: "Launch a basic t3.micro EC2 Instance",
      code: "aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --count 1 --instance-type t3.micro --key-name MyKeyPair"
    }
  },
  {
    id: 6,
    question: "What is an EC2 instance type?",
    answer: "An EC2 instance type represents a specific combination of CPU, Memory, Storage, and Networking capacity optimized for different use cases. Families include General Purpose (T3, M5), Compute-Optimized (C5), Memory-Optimized (R5), Storage-Optimized (I3), and Accelerated/GPU-based (G4).",
    category: "Compute & Containers",
    service: "EC2",
    difficulty: "Foundational",
    example: "Using a t3.micro (cheap, burstable) for a development playground, while using a c5.xlarge (compute-optimized) for running heavy CPU-based video transcoding tasks.",
    snippet: {
      language: "bash",
      title: "Search for specific Instance types",
      code: "aws ec2 describe-instance-types --filters \"Name=instance-type,Values=t3.*\" --query \"InstanceTypes[].[InstanceType,VCpuInfo.DefaultVCpus,MemoryInfo.SizeInMiB]\""
    }
  },
  {
    id: 7,
    question: "What is an AMI?",
    answer: "An Amazon Machine Image (AMI) is a master template that contains the software configuration (operating system, application server, and pre-installed application files) required to launch an EC2 instance.",
    category: "Compute & Containers",
    service: "EC2",
    difficulty: "Foundational",
    example: "Using the official Amazon Linux 2023 AMI to boot up an instance, or creating a custom AMI ('Golden Image') from an existing configured server to deploy identical replicas quickly.",
    snippet: {
      language: "bash",
      title: "List Latest Official Ubuntu AMIs",
      code: "aws ec2 describe-images --owners 099720109477 --filters \"Name=name,Values=ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*\" --query 'sort_by(Images, &CreationDate)[-1].ImageId'"
    }
  },
  {
    id: 8,
    question: "What is an EC2 Security Group?",
    answer: "An EC2 Security Group acts as a stateful, virtual firewall that controls inbound and outbound traffic to one or more EC2 instances at the network interface level. Stateful means if an inbound request is permitted, the outbound response is automatically allowed, regardless of outbound rules.",
    category: "Compute & Containers",
    service: "EC2",
    difficulty: "Associate",
    example: "Creating a security group that allows incoming HTTP (port 80) and HTTPS (port 443) traffic from anywhere in the world, but restricts SSH (port 22) access only to your corporate IP address.",
    snippet: {
      language: "json",
      title: "Security Group Terraform snippet",
      code: `resource "aws_security_group" "web_sg" {
  name        = "web-server-sg"
  description = "Allow inbound web traffic"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`
    }
  },
  {
    id: 9,
    question: "What is Auto Scaling in AWS?",
    answer: "Auto Scaling (specifically EC2 Auto Scaling) automatically adjusts the number of EC2 instances in an Auto Scaling Group (ASG) based on target metrics (like CPU Utilization or Network I/O), scaling out to handle load spikes and scaling in during idle periods to save money.",
    category: "Compute & Containers",
    service: "Auto Scaling",
    difficulty: "Associate",
    example: "Setting an Auto Scaling Group to maintain a minimum of 2 instances, but spin up extra instances automatically up to 10 whenever the average CPU utilization across the pool exceeds 70%.",
    snippet: {
      language: "bash",
      title: "Set Auto Scaling Group Capacity",
      code: "aws autoscaling update-auto-scaling-group --auto-scaling-group-name my-asg --min-size 2 --max-size 10 --desired-capacity 3"
    }
  },
  {
    id: 10,
    question: "What is an Elastic Load Balancer (ELB)?",
    answer: "An Elastic Load Balancer (ELB) automatically distributes incoming application traffic across multiple targets, such as EC2 instances, containers, IP addresses, and Lambda functions, ensuring fault tolerance and high availability.",
    category: "Compute & Containers",
    service: "ELB",
    difficulty: "Associate",
    example: "A single front-end DNS entry points to your load balancer. Traffic hitting the load balancer is split evenly and forwarded to 4 backend EC2 servers running in private subnets.",
    snippet: {
      language: "bash",
      title: "List Load Balancers",
      code: "aws elbv2 describe-load-balancers"
    }
  },
  {
    id: 11,
    question: "What are the types of AWS load balancers?",
    answer: "1. Application Load Balancer (ALB): Operates at Layer 7 (HTTP/HTTPS), supporting path-based and host-based routing. 2. Network Load Balancer (NLB): Operates at Layer 4 (TCP/UDP), optimized for extreme performance and ultra-low latency. 3. Gateway Load Balancer (GWLB): Deploys and manages virtual third-party security appliances.",
    category: "Compute & Containers",
    service: "ELB",
    difficulty: "Professional",
    example: "Using an ALB to route requests hitting '/api' to an API target group, and requests hitting '/static' to a static asset server, while using an NLB for raw TCP socket multiplayer game servers.",
    snippet: {
      language: "bash",
      title: "Create an Application Load Balancer",
      code: "aws elbv2 create-load-balancer --name my-alb --subnets subnet-12345 subnet-67890 --security-groups sg-012345 --type application"
    }
  },
  {
    id: 12,
    question: "What is S3?",
    answer: "Simple Storage Service (S3) is an industry-leading object storage service offering 99.999999999% (11 9s) of durability. It stores data as objects (files) within containers called buckets, accessible globally via HTTP REST endpoints.",
    category: "Storage & CDN",
    service: "S3",
    difficulty: "Foundational",
    example: "Storing user upload profile photos, backing up nightly database dumps, or hosting static asset files (HTML, CSS, JS) for a client-side single page application.",
    snippet: {
      language: "bash",
      title: "Upload an Object to an S3 Bucket",
      code: "aws s3 cp my-photo.png s3://my-unique-bucket-name/uploads/profile.png"
    }
  },
  {
    id: 13,
    question: "What are S3 storage classes?",
    answer: "AWS S3 offers storage classes tailored to different access frequencies and costs: 1. S3 Standard (high throughput, low latency). 2. Intelligent-Tiering (auto-shifts based on usage). 3. Standard-Infrequent Access (lower storage cost, higher access fee). 4. One Zone-IA (stored in only 1 AZ). 5. S3 Glacier & Deep Archive (extremely cheap cold archiving, retrieval times from minutes to hours).",
    category: "Storage & CDN",
    service: "S3",
    difficulty: "Associate",
    example: "Storing newly uploaded documents in S3 Standard. After 30 days of no access, moving them to Standard-IA. After 90 days, archiving them into Glacier Deep Archive to save 90% in storage fees.",
    snippet: {
      language: "bash",
      title: "Copy Object with IA Storage Class",
      code: "aws s3 cp document.pdf s3://my-bucket/archive/ --storage-class STANDARD_IA"
    }
  },
  {
    id: 14,
    question: "What is S3 versioning?",
    answer: "S3 Versioning is a bucket-level feature that keeps multiple variants of an object in the same bucket. It allows you to preserve, retrieve, and restore every version of an object, protecting against accidental overwrites or malicious deletions.",
    category: "Storage & CDN",
    service: "S3",
    difficulty: "Associate",
    example: "If an operator accidental uploads a blank 'index.html' over your live website file, S3 versioning saves the previous copy. You can simply delete the 'Delete Marker' or retrieve version ID 'v_123' to restore the live site.",
    snippet: {
      language: "bash",
      title: "Enable Bucket Versioning",
      code: "aws s3api put-bucket-versioning --bucket my-bucket-name --versioning-configuration Status=Enabled"
    }
  },
  {
    id: 15,
    question: "What is an S3 bucket policy?",
    answer: "An S3 bucket policy is a resource-based Access Control Policy written in JSON that defines permissions for what actions are allowed or denied on objects within that S3 bucket. It can grant public read permissions or restrict access to specific IAM roles/IP ranges.",
    category: "Storage & CDN",
    service: "S3",
    difficulty: "Associate",
    example: "Making a bucket public-readable specifically to serve image assets for a blog website, while blocking any delete actions for everyone except a specific master IAM administrator.",
    snippet: {
      language: "json",
      title: "S3 Public Read Bucket Policy JSON",
      code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-public-bucket/*"
    }
  ]
}`
    }
  },
  {
    id: 16,
    question: "What is a presigned URL in S3?",
    answer: "A presigned URL is a temporary URL generated by an object owner using security credentials, which grants time-limited permission (e.g. 15 minutes) to download or upload an S3 object without requiring the client to have an AWS account or IAM credentials.",
    category: "Storage & CDN",
    service: "S3",
    difficulty: "Professional",
    example: "A backend service authenticates a user. To let them download a paid PDF invoice securely, the backend generates an S3 presigned URL that expires in 5 minutes and returns it to the user's browser.",
    snippet: {
      language: "javascript",
      title: "Generate Presigned S3 URL using Node/SDK",
      code: `import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-east-1" });
const command = new GetObjectCommand({ Bucket: "my-bucket", Key: "invoice-101.pdf" });
const url = await getSignedUrl(client, command, { expiresIn: 300 }); // 5 minutes`
    }
  },
  {
    id: 17,
    question: "What is EBS?",
    answer: "Elastic Block Store (EBS) provides persistent block-level storage volumes for use with EC2 instances. It acts as a raw, unformatted virtual hard drive that can be attached, formatted with a filesystem, and mounted to an instance.",
    category: "Storage & CDN",
    service: "EBS",
    difficulty: "Associate",
    example: "Attaching an EBS 'gp3' SSD volume to an EC2 instance running PostgreSQL to store the actual database transaction log files on a high-throughput, low-latency disk.",
    snippet: {
      language: "bash",
      title: "Create EBS Volume",
      code: "aws ec2 create-volume --volume-type gp3 --size 50 --availability-zone us-east-1a"
    }
  },
  {
    id: 18,
    question: "EBS vs S3?",
    answer: "EBS is Block Storage, attached directly to a single EC2 instance in the same AZ (like an internal hard drive), making it extremely fast for databases but limited in accessibility. S3 is Object Storage, accessible globally via HTTP endpoints from anywhere, highly scaleable, and not tied to any EC2 instance.",
    category: "Storage & CDN",
    service: "EBS",
    difficulty: "Foundational",
    example: "EBS is where you store the operating system and database files for live virtual machines. S3 is where you store massive back-ups, static websites, and file exports.",
    snippet: {
      language: "bash",
      title: "Attach EBS Volume to EC2",
      code: "aws ec2 attach-volume --volume-id vol-012345 --instance-id i-987654 --device /dev/sdf"
    }
  },
  {
    id: 19,
    question: "What is Lambda?",
    answer: "AWS Lambda is a serverless, event-driven Function-as-a-Service (FaaS) compute offering. It allows you to run code without provisioning, managing, or scaling servers. You upload the code, configure triggers, and only pay for the exact millisecond duration your function runs.",
    category: "Serverless & Integration",
    service: "Lambda",
    difficulty: "Foundational",
    example: "Triggering a lightweight script to automatically compress an image whenever it gets uploaded into S3, or handling a simple POST webhook endpoint registered with API Gateway.",
    snippet: {
      language: "javascript",
      title: "Basic AWS Lambda Handler (Node)",
      code: `export const handler = async (event) => {
  const name = event.queryStringParameters?.name || "World";
  return {
    statusCode: 200,
    body: JSON.stringify({ message: \`Hello, \${name}!\` }),
  };
};`
    }
  },
  {
    id: 20,
    question: "What is a Lambda cold start?",
    answer: "A Lambda Cold Start is the initial latency latency delay (usually between 100ms to a few seconds) when a function is triggered after being idle. AWS must provision a microVM container, pull the code, initialize the runtime (Node/Python/Java), and execute the boot logic before executing the handler code.",
    category: "Serverless & Integration",
    service: "Lambda",
    difficulty: "Professional",
    example: "A low-traffic customer facing web portal triggers a Lambda. The first visitor in the morning experiences a 2-second delay because the server container has to spin up fresh.",
    snippet: {
      language: "hcl",
      title: "Terraform Provisioned Concurrency",
      code: `resource "aws_lambda_provisioned_concurrency_config" "warm" {
  function_name                     = aws_lambda_function.api.function_name
  qualifier                         = aws_lambda_function.api.version
  provisioned_concurrent_executions = 5 // Keep 5 execution envs warm at all times
}`
    }
  },
  {
    id: 21,
    question: "How would you reduce Lambda cold start latency?",
    answer: "1. Minimize the deployment package size (strip unused dependencies and devDependencies). 2. Write in lighter-weight runtimes like Node.js or Python instead of Java/C#. 3. Enable Provisioned Concurrency to keep container environments initialized. 4. Reuse database connections outside the primary handler block to take advantage of container reuse.",
    category: "Serverless & Integration",
    service: "Lambda",
    difficulty: "Professional",
    example: "Instantiating the AWS SDK client outside the handler function so it runs once during initialization, rather than on every single invocation.",
    snippet: {
      language: "javascript",
      title: "Optimize SDK Connection Reuse in Lambda",
      code: `import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// ✅ Initialized OUTSIDE the handler - reused on warm containers
const dbClient = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  // Handler logic uses dbClient directly
  return { statusCode: 200 };
};`
    }
  },
  {
    id: 22,
    question: "What is API Gateway?",
    answer: "Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. It handles API authentication, CORS, rate limiting, and routes HTTP traffic directly to Lambda, HTTP endpoints, or other AWS services.",
    category: "Serverless & Integration",
    service: "API Gateway",
    difficulty: "Associate",
    example: "Exposing a public URL 'api.mycompany.com/users'. When a user makes a GET request, API Gateway authenticates the API key and routes the request to a backend 'getUsers' Lambda function.",
    snippet: {
      language: "bash",
      title: "List API Gateway REST APIs",
      code: "aws apigateway get-rest-apis"
    }
  },
  {
    id: 23,
    question: "What is DynamoDB?",
    answer: "Amazon DynamoDB is a fully managed, serverless, single-digit millisecond latency NoSQL database service. It is designed for key-value and document data structures, offering automatic multi-region replication and virtually infinite scaling under heavy traffic load.",
    category: "Databases & Caching",
    service: "DynamoDB",
    difficulty: "Associate",
    example: "Storing shopping cart states, gaming player profiles, or active web session tokens where immediate read/write lookups are critical and relational table joining is not required.",
    snippet: {
      language: "javascript",
      title: "DynamoDB GetItem SDK Call",
      code: `import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const response = await docClient.send(new GetCommand({
  TableName: "Users",
  Key: { userId: "user-12345" }
}));`
    }
  },
  {
    id: 24,
    question: "What is DynamoDB partition key?",
    answer: "A partition key is the primary attribute of a DynamoDB table used as an input to an internal hash function. The output of this function determines the physical storage partition on which the item will reside. Designing a partition key with high cardinality prevents 'hot partitions'.",
    category: "Databases & Caching",
    service: "DynamoDB",
    difficulty: "Professional",
    example: "Using 'UserID' (high variation) as the partition key is a great design, whereas using 'Country' (low variation, e.g. millions of US users) creates a hot partition that throttles throughput.",
    snippet: {
      language: "bash",
      title: "Create DynamoDB Table with Partition Key",
      code: "aws dynamodb create-table --table-name Users --attribute-definitions AttributeName=UserId,AttributeType=S --key-schema AttributeName=UserId,KeyType=HASH --billing-mode PAY_PER_REQUEST"
    }
  },
  {
    id: 25,
    question: "What is RDS?",
    answer: "Relational Database Service (RDS) is a managed relational database service that supports six popular engines: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, and Amazon Aurora. It automates patching, backups, scaling, and high-availability configuration.",
    category: "Databases & Caching",
    service: "RDS",
    difficulty: "Foundational",
    example: "Deploying a classic PostgreSQL database to store e-commerce transactional sales data (orders, items, users) that requires ACID compliance and complex SQL JOIN operations.",
    snippet: {
      language: "bash",
      title: "Launch a PostgreSQL RDS Instance",
      code: "aws rds create-db-instance --db-instance-identifier mydb --db-instance-class db.t3.micro --engine postgres --allocated-storage 20 --master-username dbadmin --master-user-password SuperSecretPassword"
    }
  },
  {
    id: 26,
    question: "What is Aurora?",
    answer: "Amazon Aurora is a fully managed MySQL and PostgreSQL-compatible relational database built for the cloud. It features a distributed, self-healing, auto-scaling storage system that is replicated six ways across three Availability Zones, offering up to 5x the performance of standard MySQL.",
    category: "Databases & Caching",
    service: "RDS",
    difficulty: "Professional",
    example: "A fast-growing SaaS application experiences bottlenecks on standard Postgres. They migrate to Aurora Postgres, allowing them to scale reads across 15 low-latency read replicas in minutes.",
    snippet: {
      language: "bash",
      title: "Describe Aurora Clusters",
      code: "aws rds describe-db-clusters"
    }
  },
  {
    id: 27,
    question: "What is ElastiCache?",
    answer: "Amazon ElastiCache is a fully managed, in-memory caching and data store service supporting Redis or Memcached. It is placed in front of relational databases to cache hot data query results, drastically reducing database read load and latency down to sub-milliseconds.",
    category: "Databases & Caching",
    service: "ElastiCache",
    difficulty: "Associate",
    example: "Caching product catalog data. Instead of hitting RDS on every webpage visit, the backend checks Redis first. If found, it returns the data immediately, avoiding a slow SQL database join.",
    snippet: {
      language: "bash",
      title: "Create ElastiCache Redis Cluster",
      code: "aws elasticache create-cache-cluster --cache-cluster-id my-redis --db-subnet-group-name default --engine redis --cache-node-type cache.t3.micro --num-cache-nodes 1"
    }
  },
  {
    id: 28,
    question: "What is VPC?",
    answer: "Virtual Private Cloud (VPC) is a custom, logically isolated virtual network within your AWS account. It gives you full control over your IP address ranges, subnets, route tables, network gateways, and security settings, mimicking a traditional enterprise network in the cloud.",
    category: "Networking & VPC",
    service: "VPC",
    difficulty: "Associate",
    example: "Carving out a secure IP block '10.0.0.0/16' where your servers live, isolated from other teams or standard public internet traffic.",
    snippet: {
      language: "bash",
      title: "Create a VPC with custom CIDR block",
      code: "aws ec2 create-vpc --cidr-block 10.0.0.0/16"
    }
  },
  {
    id: 29,
    question: "What is a subnet in AWS VPC?",
    answer: "A subnet is a sliced range of IP addresses within your VPC that belongs to a single, specific Availability Zone. Subnets are used to logically isolate and group resources inside your network.",
    category: "Networking & VPC",
    service: "VPC",
    difficulty: "Associate",
    example: "Splitting a VPC CIDR '10.0.0.0/16' into two smaller blocks: Subnet A ('10.0.1.0/24' in us-east-1a) and Subnet B ('10.0.2.0/24' in us-east-1b).",
    snippet: {
      language: "bash",
      title: "Create a Subnet",
      code: "aws ec2 create-subnet --vpc-id vpc-12345 --cidr-block 10.0.1.0/24 --availability-zone us-east-1a"
    }
  },
  {
    id: 30,
    question: "What makes a subnet \"public\" vs \"private\"?",
    answer: "A Public Subnet is configured with a Route Table that sends internet-bound traffic (0.0.0.0/0) directly through an attached Internet Gateway (IGW). A Private Subnet does not have a route to the Internet Gateway; its instances are hidden from direct public internet access.",
    category: "Networking & VPC",
    service: "VPC",
    difficulty: "Associate",
    example: "Putting load balancers and static web proxies in a public subnet to accept internet visitors, while keeping the main database and core back-end servers in private subnets for security.",
    snippet: {
      language: "hcl",
      title: "Terraform Route Table Association for Public Subnet",
      code: `resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public_sub.id
  route_table_id = aws_route_table.public_rt.id
}`
    }
  },
  {
    id: 31,
    question: "What is an Internet Gateway?",
    answer: "An Internet Gateway (IGW) is a horizontally scaled, redundant, and highly available VPC component that allows communication between resources inside your VPC and the public internet. It performs NAT translation for public-facing instances.",
    category: "Networking & VPC",
    service: "VPC",
    difficulty: "Associate",
    example: "Attaching an IGW to your VPC so that public-facing instances with public IP addresses can receive incoming browser visits from the web.",
    snippet: {
      language: "bash",
      title: "Create and Attach Internet Gateway",
      code: "aws ec2 create-internet-gateway && aws ec2 attach-internet-gateway --internet-gateway-id igw-12345 --vpc-id vpc-67890"
    }
  },
  {
    id: 32,
    question: "What is a NAT Gateway?",
    answer: "A Network Address Translation (NAT) Gateway allows instances in a private subnet to securely initiate outbound connections to the internet (e.g. for operating system updates, package downloads) while blocking any incoming connections from the public web.",
    category: "Networking & VPC",
    service: "VPC",
    difficulty: "Associate",
    example: "An EC2 instance in a private database subnet needs to download a security patch from Ubuntu. It sends traffic to the NAT Gateway (residing in the public subnet), which forwards it and returns the download safely.",
    snippet: {
      language: "bash",
      title: "Create a NAT Gateway",
      code: "aws ec2 create-nat-gateway --subnet-id subnet-public123 --allocation-id eipalloc-elasticip123"
    }
  },
  {
    id: 33,
    question: "What is a Security Group vs a Network ACL?",
    answer: "Security Groups are STATEFUL virtual firewalls that operate at the instance/resource level, automatically allowing return traffic. Network ACLs (Access Control Lists) are STATELESS virtual firewalls that operate at the subnet level, requiring explicit rules for both incoming and outgoing traffic.",
    category: "Networking & VPC",
    service: "VPC",
    difficulty: "Professional",
    example: "Allowing inbound HTTP on Port 80 in a Security Group automatically allows the backend's outbound response on high random ports. With a Network ACL, you must manually define rule 100 to allow port 80 inbound, and rule 101 to allow ephemeral ports outbound.",
    snippet: {
      language: "bash",
      title: "Create a Subnet-level Network ACL",
      code: "aws ec2 create-network-acl --vpc-id vpc-12345"
    }
  },
  {
    id: 34,
    question: "What is IAM?",
    answer: "Identity and Access Management (IAM) is a service that helps you securely control access to AWS resources. You use IAM to control who is authenticated (signed in) and authorized (has permissions) to perform actions on resources.",
    category: "Security & IAM",
    service: "IAM",
    difficulty: "Foundational",
    example: "Creating accounts for newly hired engineers, ensuring they can boot EC2 instances but cannot access accounting billing details or delete core databases.",
    snippet: {
      language: "bash",
      title: "Create an IAM User",
      code: "aws iam create-user --user-name john-developer"
    }
  },
  {
    id: 35,
    question: "What is an IAM Role?",
    answer: "An IAM Role is an identity with permission policies that can be assumed by trusted entities, such as an AWS service (e.g. EC2, Lambda) or federated users, for temporary security credentials, avoiding the need for hardcoded long-term access keys.",
    category: "Security & IAM",
    service: "IAM",
    difficulty: "Associate",
    example: "Granting an EC2 instance access to read configuration files in S3. Instead of hardcoding access keys inside the app, you assign an 'S3Reader' IAM Role directly to the EC2 instance.",
    snippet: {
      language: "bash",
      title: "Attach Role to EC2 Instance Profile",
      code: "aws ec2 associate-iam-instance-profile --instance-id i-1234567890 --iam-instance-profile Name=S3ReaderProfile"
    }
  },
  {
    id: 36,
    question: "What is an IAM Policy?",
    answer: "An IAM Policy is a JSON document that defines formal access permissions. It specifies the Actions allowed/denied, the Resources those actions can target, and the Conditions under which permissions apply.",
    category: "Security & IAM",
    service: "IAM",
    difficulty: "Associate",
    example: "An IAM policy document attached to a team of developers that explicitly grants them permission to launch and terminate instances, but only in the us-west-2 region.",
    snippet: {
      language: "json",
      title: "IAM Policy allowing S3 List & Read JSON",
      code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::my-secure-config-bucket",
        "arn:aws:s3:::my-secure-config-bucket/*"
      ]
    }
  ]
}`
    }
  },
  {
    id: 37,
    question: "What is the principle of least privilege in IAM?",
    answer: "The Principle of Least Privilege is the security practice of granting users and applications only the bare minimum permissions necessary to complete their specific tasks, minimizing potential blast radius if credentials are leaked.",
    category: "Security & IAM",
    service: "IAM",
    difficulty: "Foundational",
    example: "An application only needs to read a single table in DynamoDB. Giving it access to read that specific table 'Users' rather than giving it administrator access to all DynamoDB tables (*).",
    snippet: {
      language: "json",
      title: "Least Privilege DynamoDB Policy JSON",
      code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:Query"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:123456789012:table/UserScores"
    }
  ]
}`
    }
  },
  {
    id: 38,
    question: "What is the difference between an IAM User and an IAM Role?",
    answer: "An IAM User is a long-term credentialed identity representing a specific person or service, which has static passwords/access keys. An IAM Role has no passwords or permanent keys; it is assumed dynamically, providing temporary, short-lived security tokens.",
    category: "Security & IAM",
    service: "IAM",
    difficulty: "Associate",
    example: "An operator uses an IAM User with MFA to log in to the AWS Console. An automated Lambda function assumes an IAM Role behind the scenes to execute nightly S3 archival.",
    snippet: {
      language: "bash",
      title: "Assume a Role via CLI to get temporary keys",
      code: "aws sts assume-role --role-arn arn:aws:iam::123456789012:role/BackupRole --role-session-name CLIBackupSession"
    }
  },
  {
    id: 39,
    question: "What is CloudFront?",
    answer: "Amazon CloudFront is a fast, highly secure Content Delivery Network (CDN) service that caches static and dynamic web content globally across hundreds of Edge Locations, minimizing network latency for global visitors.",
    category: "Storage & CDN",
    service: "CloudFront",
    difficulty: "Associate",
    example: "A company hosts their website in a London data center. By using CloudFront, visitors from Sydney, Tokyo, and New York download image assets instantly from cache sites directly in their local cities.",
    snippet: {
      language: "bash",
      title: "Create CloudFront Cache Invalidation",
      code: "aws cloudfront create-invalidation --distribution-id E1234567890 --paths \"/index.html\" \"/css/*\""
    }
  },
  {
    id: 40,
    question: "What is Route 53?",
    answer: "Amazon Route 53 is a highly available, scalable, cloud Domain Name System (DNS) web service. It translates human-friendly domains (e.g. www.example.com) into numeric IP addresses, and offers intelligent health routing (latency, geolocation, failover).",
    category: "Networking & VPC",
    service: "Route 53",
    difficulty: "Associate",
    example: "Using Route 53 Geolocation routing to automatically send South American web visitors to EC2 servers in Sao Paulo (sa-east-1) and US visitors to Northern Virginia (us-east-1).",
    snippet: {
      language: "bash",
      title: "List Route 53 Hosted Zones",
      code: "aws route53 list-hosted-zones"
    }
  },
  {
    id: 41,
    question: "What is CloudWatch?",
    answer: "Amazon CloudWatch is a monitoring and observability service that collects logs, metrics, and events from AWS resources and custom applications, providing visibility into system health, CPU usage, and performance.",
    category: "Monitoring, Operations & IaC",
    service: "CloudWatch",
    difficulty: "Foundational",
    example: "Collecting system logs from your backend application, viewing average CPU graphs of your EC2 fleet, or getting alerted when an API endpoint response time exceeds 1 second.",
    snippet: {
      language: "bash",
      title: "Fetch Metric Statistics via CLI",
      code: "aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=i-12345 --start-time 2026-07-18T00:00:00 --end-time 2026-07-18T12:00:00 --period 3600 --statistics Average"
    }
  },
  {
    id: 42,
    question: "What is a CloudWatch Alarm?",
    answer: "A CloudWatch Alarm is a trigger configured to monitor a specific metric over a defined period. If the metric breaches your configured threshold, the alarm enters an 'ALARM' state and can automatically trigger an Auto Scaling event or send an email notification via SNS.",
    category: "Monitoring, Operations & IaC",
    service: "CloudWatch",
    difficulty: "Associate",
    example: "Creating an alarm that fires an SNS notification email to the DevOps team the moment an RDS Database storage space drops below 10% capacity.",
    snippet: {
      language: "bash",
      title: "Create a CPU High CloudWatch Alarm",
      code: "aws cloudwatch put-metric-alarm --alarm-name CpuHighAlarm --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average --period 300 --threshold 80 --comparison-operator GreaterThanOrEqualToThreshold --dimensions Name=InstanceId,Value=i-123 --evaluation-periods 2 --alarm-actions arn:aws:sns:us-east-1:12345:NotifyDevs"
    }
  },
  {
    id: 43,
    question: "What is CloudTrail?",
    answer: "AWS CloudTrail is an auditing, governance, and compliance service that records every API call made in your AWS account. It logs who made the call, when, from what IP address, and what resources were affected, storing logs in S3.",
    category: "Monitoring, Operations & IaC",
    service: "CloudTrail",
    difficulty: "Associate",
    example: "An administrator notices a critical database was deleted. They search CloudTrail event history to find exactly which IAM username deleted it at 3:14 AM and from which IP.",
    snippet: {
      language: "bash",
      title: "Lookup recent deletion events",
      code: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=DeleteBucket"
    }
  },
  {
    id: 44,
    question: "What is CloudFormation?",
    answer: "AWS CloudFormation is AWS's native Infrastructure-as-Code (IaC) service. It lets you model and set up your AWS resources using JSON or YAML templates, allowing you to launch and manage full cloud environments in a repeatable, automated way.",
    category: "DevOps & IaC",
    service: "CloudFormation",
    difficulty: "Associate",
    example: "Writing a 'network-template.yaml' that declares a VPC, 3 subnets, and a load balancer, and deploying the entire stack into development, testing, and production identically.",
    snippet: {
      language: "yaml",
      title: "Basic S3 Bucket CloudFormation Template",
      code: `AWSTemplateFormatVersion: '2012-10-17'
Description: 'A simple S3 Bucket CloudFormation stack'
Resources:
  MySecureBucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      BucketName: 'my-unique-company-logs-bucket'
      VersioningConfiguration:
        Status: Enabled`
    }
  },
  {
    id: 45,
    question: "CloudFormation vs Terraform?",
    answer: "CloudFormation is AWS-native, tightly integrated but limited only to AWS resources. Terraform (by HashiCorp) is open-source, cloud-agnostic (supports Azure, GCP, Cloudflare, etc.), uses HCL syntax, and manages state file tracking independently.",
    category: "DevOps & IaC",
    service: "Terraform",
    difficulty: "Professional",
    example: "An enterprise deploys multi-cloud apps, using Terraform to provision both an AWS RDS database and an external Auth0 identity provider within the same codebase.",
    snippet: {
      language: "hcl",
      title: "Simple Terraform Provider & Resource",
      code: `provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "example" {
  bucket = "my-company-terraform-bucket"
}`
    }
  },
  {
    id: 46,
    question: "What is an SQS queue?",
    answer: "Simple Queue Service (SQS) is a fully managed message queuing service for decoupling and scaling microservices, distributed systems, and serverless applications asynchronously.",
    category: "Serverless & Integration",
    service: "SQS",
    difficulty: "Foundational",
    example: "A retail checkout backend publishes orders to an SQS queue. A slower inventory shipping service consumes and packs items one-by-one from the queue, preventing backend overload.",
    snippet: {
      language: "bash",
      title: "Send a Message to SQS queue",
      code: "aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/123/MyQueue --message-body '{\"orderId\": 9876}'"
    }
  },
  {
    id: 47,
    question: "Standard vs FIFO SQS queue?",
    answer: "Standard queues offer nearly unlimited throughput, but best-effort ordering and at-least-once delivery (duplicates are possible). FIFO (First-In-First-Out) queues guarantee strict ordering and exactly-once processing, but are limited to 3,000 messages/sec with batching.",
    category: "Serverless & Integration",
    service: "SQS",
    difficulty: "Associate",
    example: "Using SQS FIFO for bank ledger transactions where order is critical (Deposit before Withdraw), while using SQS Standard for mass telemetry analytics logs where speed matters and duplicate entries are acceptable.",
    snippet: {
      language: "bash",
      title: "Create SQS FIFO Queue",
      code: "aws sqs create-queue --queue-name MyFIFOQueue.fifo --attributes FifoQueue=true,ContentBasedDeduplication=true"
    }
  },
  {
    id: 48,
    question: "What is SNS?",
    answer: "Simple Notification Service (SNS) is a fully managed pub/sub (publish/subscribe) messaging service. It allows publishers to fan-out messages to a massive number of subscriber endpoints, including SQS, Lambda, HTTPS webhooks, SMS, and emails.",
    category: "Serverless & Integration",
    service: "SNS",
    difficulty: "Foundational",
    example: "When an order is completed, your application publishes a single 'OrderCompleted' notification to an SNS Topic. SNS fans this message out automatically to three subscribers: the email receipt service, the CRM analytics tracker, and the shipping SQS queue.",
    snippet: {
      language: "bash",
      title: "Publish to an SNS Topic",
      code: "aws sns publish --topic-arn arn:aws:sns:us-east-1:12345:OrderTopic --message 'Order #555 Has Shipped!'"
    }
  },
  {
    id: 49,
    question: "SNS vs SQS?",
    answer: "SNS is a push-based service that fans out messages immediately to multiple subscribers (one-to-many, pub/sub). SQS is a pull-based messaging queue where messages are stored on disk until a single consumer pulls and processes them (one-to-one, point-to-point).",
    category: "Serverless & Integration",
    service: "SNS",
    difficulty: "Foundational",
    example: "Use SNS to announce that an uploaded video is ready. Use SQS to coordinate the individual background transcoding workers taking and processing those heavy video files.",
    snippet: {
      language: "bash",
      title: "Subscribe SQS Queue to SNS Topic",
      code: "aws sns subscribe --topic-arn arn:aws:sns:us-east-1:123:MyTopic --protocol sqs --notification-endpoint arn:aws:sqs:us-east-1:123:MyQueue"
    }
  },
  {
    id: 50,
    question: "What is an ECS?",
    answer: "Elastic Container Service (ECS) is AWS's highly scalable, high-performance container orchestration service designed to run, stop, and manage Docker containers across clusters of EC2 instances or serverless compute (Fargate).",
    category: "Compute & Containers",
    service: "ECS",
    difficulty: "Associate",
    example: "Deploying a multi-container microservice web application consisting of a frontend container, a backend API container, and a scheduled background worker container on AWS.",
    snippet: {
      language: "bash",
      title: "List ECS Clusters",
      code: "aws ecs list-clusters"
    }
  },
  {
    id: 51,
    question: "What is Fargate?",
    answer: "AWS Fargate is a serverless compute engine for ECS and EKS. It allows you to run containers directly without provisioning, managing, patching, or scaling any underlying EC2 virtual servers.",
    category: "Compute & Containers",
    service: "Fargate",
    difficulty: "Associate",
    example: "Instead of managing a cluster of EC2 instances and planning server capacity, you simply tell Fargate: 'Run this Docker image, give it 1 vCPU and 2GB RAM', and Fargate manages the host machine.",
    snippet: {
      language: "bash",
      title: "Register ECS Task Definition for Fargate",
      code: "aws ecs register-task-definition --family web-app --requires-compatibilities FARGATE --network-mode awsvpc --cpu 256 --memory 512 --container-definitions '[{\"name\":\"web\",\"image\":\"nginx\",\"portMappings\":[{\"containerPort\":80}]}]'"
    }
  },
  {
    id: 52,
    question: "What is EKS?",
    answer: "Elastic Kubernetes Service (EKS) is AWS's managed Kubernetes service, allowing you to run standard Kubernetes control planes and workloads on AWS without having to manually bootstrap and manage master nodes.",
    category: "Compute & Containers",
    service: "EKS",
    difficulty: "Professional",
    example: "A massive multi-cloud company wants standard Kubernetes configurations (YAML manifests, Helm charts) so they can run their app identically on-prem, on AWS EKS, and on Google Cloud GKE.",
    snippet: {
      language: "bash",
      title: "Describe EKS Cluster status",
      code: "aws eks describe-cluster --name my-kubernetes-cluster"
    }
  },
  {
    id: 53,
    question: "ECS vs EKS?",
    answer: "ECS is AWS's proprietary, simple, highly integrated container orchestrator that is extremely easy to set up and learn. EKS is AWS's managed Kubernetes service, offering greater portability, vast CNCF open-source integrations, but with higher complexity and cost.",
    category: "Compute & Containers",
    service: "ECS",
    difficulty: "Professional",
    example: "Choose ECS for a small team wanting to run a few APIs on AWS with zero hassle. Choose EKS if you are already heavily invested in standard Kubernetes tooling and Helm charts.",
    snippet: {
      language: "bash",
      title: "Update Kubeconfig for EKS CLI",
      code: "aws eks update-kubeconfig --region us-west-2 --name cluster-name"
    }
  },
  {
    id: 54,
    question: "What is an ECR?",
    answer: "Elastic Container Registry (ECR) is AWS's fully managed Docker container registry. It allows you to securely store, share, and deploy your container images, integrating natively with IAM and ECS/EKS.",
    category: "Compute & Containers",
    service: "ECR",
    difficulty: "Foundational",
    example: "Pushing your local production Docker build of an Express API to an ECR repository, so your ECS Fargate service can download and launch it.",
    snippet: {
      language: "bash",
      title: "ECR Login, Tag and Push",
      code: `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
docker tag my-node-app:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-node-app:v1
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-node-app:v1`
    }
  },
  {
    id: 55,
    question: "What is Elastic Beanstalk?",
    answer: "AWS Elastic Beanstalk is an easy-to-use Platform-as-a-Service (PaaS) for deploying and scaling web applications. You simply upload your code (Node, Python, Java, Docker), and Beanstalk automatically handles deployment, load balancing, scaling, and system health monitoring.",
    category: "Compute & Containers",
    service: "Elastic Beanstalk",
    difficulty: "Foundational",
    example: "A developer wants to put an Express/Node.js web application online. Instead of configuring VPCs, ALB target groups, or Auto Scaling groups manually, they upload a ZIP of the code to Beanstalk.",
    snippet: {
      language: "bash",
      title: "Initialize a Beanstalk Application",
      code: "eb init -p node.js my-express-app"
    }
  },
  {
    id: 56,
    question: "What is the AWS Well-Architected Framework?",
    answer: "It is a set of best practices and design principles for designing secure, high-performing, resilient, and efficient cloud infrastructures. It is organized around six pillars: 1. Operational Excellence, 2. Security, 3. Reliability, 4. Performance Efficiency, 5. Cost Optimization, 6. Sustainability.",
    category: "Architecture & Cost",
    service: "Architecture Best Practices",
    difficulty: "Professional",
    example: "Conducting a formal audit of your AWS architecture to ensure that all data is encrypted (Security), resources are autoscaled (Reliability), and idle instances are removed (Cost).",
    snippet: {
      language: "bash",
      title: "List Well-Architected Reviews",
      code: "aws wellarchitected list-workloads"
    }
  },
  {
    id: 57,
    question: "What is a Spot Instance?",
    answer: "Spot Instances allow you to request spare AWS EC2 compute capacity at a steep discount (up to 90% off on-demand pricing). The trade-off is that AWS can reclaim the instance with a 2-minute notice if they need the capacity back for on-demand customers.",
    category: "Compute & Containers",
    service: "EC2",
    difficulty: "Associate",
    example: "Running massive, distributed, fault-tolerant analytics processing tasks (e.g. Hadoop, Spark map-reduce nodes) where if a node suddenly disappears, another takes over with no loss of progress.",
    snippet: {
      language: "json",
      title: "Terraform Spot Instance Request",
      code: `resource "aws_spot_instance_request" "cheap_worker" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "c5.large"
  spot_price    = "0.03" // max bid price per hour
  wait_for_fulfillment = true
}`
    }
  },
  {
    id: 58,
    question: "What is a Reserved Instance?",
    answer: "Reserved Instances (RIs) provide a significant discount (up to 72% off on-demand) in exchange for committing to use a specific instance configuration (instance family, region, operating system) for a 1-year or 3-year term.",
    category: "Compute & Containers",
    service: "EC2",
    difficulty: "Associate",
    example: "Your core backend API server runs 24/7, year-round. Instead of paying expensive hourly on-demand rates, you purchase a 3-year Reserved Instance to instantly slash costs in half.",
    snippet: {
      language: "bash",
      title: "Describe Reserved Instances",
      code: "aws ec2 describe-reserved-instances"
    }
  },
  {
    id: 59,
    question: "What is a Savings Plan?",
    answer: "A Savings Plan is a flexible pricing model offering low rates (similar to Reserved Instances) in exchange for committing to a consistent amount of compute usage (measured in $/hour, e.g. $10/hour) for a 1 or 3-year term. Unlike RIs, it applies automatically across instance sizes, OS, or even Fargate and Lambda.",
    category: "Compute & Containers",
    service: "EC2",
    difficulty: "Associate",
    example: "An enterprise commits to spending $50/hour on compute. Their developers can migrate servers from T3 Linux to C6g macOS or Fargate containers without losing their active discount rates.",
    snippet: {
      language: "bash",
      title: "List Active Savings Plans",
      code: "aws savingsplans describe-savings-plans"
    }
  },
  {
    id: 60,
    question: "What is the shared responsibility model?",
    answer: "The Shared Responsibility Model defines what security controls AWS handles vs what the customer handles. Simply put: AWS is responsible for Security OF the cloud (physical security of data centers, hypervisor, core networking hardware). The Customer is responsible for Security IN the cloud (guest OS patching, IAM policies, database encryption, customer data).",
    category: "Security & IAM",
    service: "Security Compliance",
    difficulty: "Foundational",
    example: "If an engineer leaves their S3 bucket open publicly or leaves admin passwords inside public GitHub code, that is a Customer security failure. If an intruder breaks into an AWS building and steals a hard drive, that is an AWS failure.",
    snippet: {
      language: "bash",
      title: "Query Security Hub Findings",
      code: "aws securityhub get-findings"
    }
  },
  {
    id: 61,
    question: "How would you host a static React app on AWS?",
    answer: "1. Build the production build (npm run build). 2. Upload the static assets ('dist/' folder) into an S3 bucket configured for static website hosting. 3. Set up an Amazon CloudFront distribution pointing to the S3 bucket as its origin. 4. Attach an SSL Certificate from AWS Certificate Manager (ACM) to CloudFront, and route your Route 53 domain name to the CloudFront distribution.",
    category: "Architecture & Cost",
    service: "Static Hosting",
    difficulty: "Associate",
    example: "Deploying an React portfolio site. Static files reside safely in S3, cached and encrypted via HTTPS at 300+ Edge locations globally using CloudFront.",
    snippet: {
      language: "bash",
      title: "Deploy SPA React Build to S3 & Invalidate CloudFront",
      code: `aws s3 sync dist/ s3://my-spa-react-bucket/ --delete
aws cloudfront create-invalidation --distribution-id E1234567 --paths "/*"`
    }
  },
  {
    id: 62,
    question: "How would you deploy a Node/Express backend on AWS?",
    answer: "Common architectures include: 1. AWS Elastic Beanstalk (easiest PaaS). 2. AWS ECS on Fargate (best containerized path; package API as Docker image, run on Fargate, load balanced with an ALB). 3. Serverless framework (using AWS Lambda and API Gateway for pay-per-request). 4. Custom EC2 instances with PM2 and Nginx (for bare-metal control).",
    category: "Architecture & Cost",
    service: "Express Hosting",
    difficulty: "Associate",
    example: "Packaging your Express codebase into a lightweight Alpine-based Dockerfile, pushing it to ECR, and orchestrating it using ECS Fargate behind an Application Load Balancer.",
    snippet: {
      language: "dockerfile",
      title: "Standard Dockerfile for Node/Express API",
      code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`
    }
  },
  {
    id: 63,
    question: "What is the AWS CLI?",
    answer: "The AWS Command Line Interface (CLI) is a unified command-line tool that enables developers to interact with and manage all AWS services from their terminal using simple, human-readable terminal commands and automated scripts.",
    category: "DevOps & IaC",
    service: "AWS CLI",
    difficulty: "Foundational",
    example: "Automating backup systems by writing a simple bash cronjob that uploads files from a local server to S3 every night at 12:00 AM using 'aws s3 sync'.",
    snippet: {
      language: "bash",
      title: "Configure AWS CLI Credentials",
      code: `aws configure
# Prompts you for:
# AWS Access Key ID
# AWS Secret Access Key
# Default region name (e.g. us-east-1)
# Default output format (json)`
    }
  },
  {
    id: 64,
    question: "What is an AWS SDK?",
    answer: "AWS Software Development Kits (SDKs) are language-specific libraries (JavaScript, Python, Go, Java, etc.) that let developers programmatically integrate, control, and interact with AWS services from their application code natively.",
    category: "Architecture & Cost",
    service: "AWS SDK",
    difficulty: "Foundational",
    example: "Using the official '@aws-sdk/client-s3' library inside a Node/Express backend application to allow users to upload files directly from an HTML form to an S3 bucket.",
    snippet: {
      language: "javascript",
      title: "AWS SDK Node.js S3 Client Initialization",
      code: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "us-east-1" });

async function uploadFile(bucket, key, fileBody) {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key, Body: fileBody });
  return await s3.send(command);
}`
    }
  },
  {
    id: 65,
    question: "What is Secrets Manager?",
    answer: "AWS Secrets Manager is a fully managed service that helps you securely store, retrieve, encrypt, and automatically rotate sensitive database credentials, API keys, and other application secrets.",
    category: "Security & IAM",
    service: "Secrets Manager",
    difficulty: "Associate",
    example: "Instead of hardcoding a database password inside your repository configuration, you retrieve the password dynamically from Secrets Manager during application startup.",
    snippet: {
      language: "javascript",
      title: "Retrieve Secret via AWS SDK",
      code: `import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({ region: "us-east-1" });
const response = await client.send(new GetSecretValueCommand({ SecretId: "Production_Database_Key" }));
const secret = JSON.parse(response.SecretString);`
    }
  },
  {
    id: 66,
    question: "Secrets Manager vs Parameter Store (SSM)?",
    answer: "Secrets Manager is purpose-built for high-security secrets, supporting automatic password rotation and cross-account access, but costs $0.40/secret/month. SSM Parameter Store is simpler, acts as a general hierarchical configuration store, is mostly free, but lacks built-in automatic rotation.",
    category: "Security & IAM",
    service: "Secrets Manager",
    difficulty: "Associate",
    example: "Use Parameter Store to hold general config constants like 'API_ENDPOINT_URL' and 'MAX_RETRIES'. Use Secrets Manager to hold payment gateway private keys and database production passwords.",
    snippet: {
      language: "bash",
      title: "Fetch Parameter from SSM Parameter Store",
      code: "aws ssm get-parameter --name \"/prod/api/endpoint\" --with-decryption"
    }
  },
  {
    id: 67,
    question: "What is AWS KMS?",
    answer: "Key Management Service (KMS) is a managed service that makes it easy to create, manage, and audit cryptographic keys used to encrypt and decrypt data across your AWS services and custom applications.",
    category: "Security & IAM",
    service: "KMS",
    difficulty: "Associate",
    example: "Enabling KMS encryption on an EBS database disk or S3 bucket. AWS handles all key rotation and hardware security modules (HSM) behind the scenes, instantly securing stored data.",
    snippet: {
      language: "bash",
      title: "Encrypt data using custom KMS key",
      code: "aws kms encrypt --key-id 12345678-1234-1234-1234-123456789012 --plaintext \"fileb://secret.txt\" --output text --query CiphertextBlob"
    }
  },
  {
    id: 68,
    question: "What is encryption at rest vs in transit?",
    answer: "Encryption at Rest protects static data stored on physical disks, buckets, or databases (using technologies like AES-256 or KMS). Encryption in Transit secures active data moving over network lines between client and server (using SSL/TLS or HTTPS certificates).",
    category: "Security & IAM",
    service: "Security Compliance",
    difficulty: "Foundational",
    example: "Encrypting your S3 bucket files at rest using Amazon S3 Managed Keys (SSE-S3). Securing traffic in transit by requiring users to connect exclusively using HTTPS (port 443).",
    snippet: {
      language: "bash",
      title: "Enforce HTTPS bucket traffic via policy",
      code: "aws s3api put-bucket-policy --bucket my-bucket --policy '{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"EnforceHTTPS\",\"Effect\":\"Deny\",\"Principal\":\"*\",\"Action\":\"s3:*\",\"Resource\":\"arn:aws:s3:::my-bucket/*\",\"Condition\":{\"Bool\":{\"aws:SecureTransport\":\"false\"}}}]}'"
    }
  },
  {
    id: 69,
    question: "What is a VPC Peering connection?",
    answer: "A VPC Peering connection is a networking connection between two VPCs that enables you to route traffic between them privately using IPv4 or IPv6 addresses, as if they were on the same physical network without passing over the public internet.",
    category: "Networking & VPC",
    service: "VPC",
    difficulty: "Associate",
    example: "Connecting your Corporate VPC to a Shared Services VPC so that instances in both networks can share internal reporting tools privately.",
    snippet: {
      language: "bash",
      title: "Create VPC Peering Connection",
      code: "aws ec2 create-vpc-peering-connection --vpc-id vpc-primary123 --peer-vpc-id vpc-secondary456"
    }
  },
  {
    id: 70,
    question: "What is AWS Direct Connect?",
    answer: "AWS Direct Connect is a cloud service solution that establishes a dedicated, private physical fiber network connection from your on-premises offices or co-location data centers directly into AWS, bypassing public internet lines entirely for maximum throughput and security.",
    category: "Networking & VPC",
    service: "Direct Connect",
    difficulty: "Professional",
    example: "A major hospital chain transfers gigabytes of critical patient records daily. They establish a 10Gbps Direct Connect link from their private hospital data center to AWS to ensure secure, highly reliable transfers.",
    snippet: {
      language: "bash",
      title: "List Direct Connect Connections",
      code: "aws directconnect describe-connections"
    }
  },
  {
    id: 71,
    question: "What is multi-AZ deployment in RDS?",
    answer: "A Multi-AZ RDS deployment automatically provisions and maintains a synchronous hot standby replica database instance in a different Availability Zone. If the primary instance experiences a failure, RDS automatically fails over to the standby by changing the DNS endpoint, minimizing downtime with zero operator intervention.",
    category: "Databases & Caching",
    service: "RDS",
    difficulty: "Associate",
    example: "Running your production database in Multi-AZ. During an unexpected power outage in AZ us-east-1a, RDS automatically redirects all backend queries to AZ us-east-1b in under 60 seconds.",
    snippet: {
      language: "bash",
      title: "Modify RDS Database to be Multi-AZ",
      code: "aws rds modify-db-instance --db-instance-identifier mydb --multi-az --apply-immediately"
    }
  },
  {
    id: 72,
    question: "What is a read replica in RDS?",
    answer: "A Read Replica is an asynchronously replicated read-only copy of your primary database. It is used to offload read-heavy traffic (reports, queries) from the main write instance, boosting read scalability.",
    category: "Databases & Caching",
    service: "RDS",
    difficulty: "Associate",
    example: "A news website has massive reader traffic. Instead of everyone hitting the main write database to read articles, they route all article reader traffic to 3 low-cost RDS Read Replicas, keeping the master database free to handle writer comments and signups.",
    snippet: {
      language: "bash",
      title: "Create RDS Read Replica",
      code: "aws rds create-db-instance-read-replica --db-instance-identifier mydb-replica --source-db-instance-identifier mydb"
    }
  },
  {
    id: 73,
    question: "How would you design for disaster recovery on AWS?",
    answer: "Design using four classic DR strategies based on RTO/RPO requirements: 1. Backup & Restore (cheapest, slowest recovery). 2. Pilot Light (critical core elements kept running in secondary region; database replicated). 3. Warm Standby (scaled-down fully functional copy running in standby region). 4. Multi-Site Active/Active (instant recovery, traffic split across multiple active regions).",
    category: "Architecture & Cost",
    service: "Disaster Recovery",
    difficulty: "Professional",
    example: "A global banking portal implements a multi-site active/active strategy, serving live transactions from both London and Singapore. If London goes offline, Route 53 routes 100% of traffic to Singapore instantly.",
    snippet: {
      language: "bash",
      title: "Copy S3 Bucket across Regions",
      code: "aws s3 sync s3://source-bucket-primary s3://backup-bucket-secondary --source-region us-east-1 --region us-west-2"
    }
  },
  {
    id: 74,
    question: "What is RTO and RPO?",
    answer: "Recovery Time Objective (RTO) is the maximum acceptable duration of downtime before your application must be fully restored. Recovery Point Objective (RPO) is the maximum acceptable amount of data loss measured in time (e.g. 4 hours of transaction loss) after an outage.",
    category: "Architecture & Cost",
    service: "Disaster Recovery",
    difficulty: "Professional",
    example: "A medical records system requires a 5-minute RTO (almost instant recovery) and a 10-second RPO (near zero data loss), requiring active-active synchronous replication across regions.",
    snippet: {
      language: "bash",
      title: "Configure Backup retention policy on RDS",
      code: "aws rds modify-db-instance --db-instance-identifier mydb --backup-retention-period 30 --preferred-backup-window 03:00-04:00"
    }
  },
  {
    id: 75,
    question: "What is an Application Load Balancer target group?",
    answer: "An Application Load Balancer (ALB) target group is a logical grouping of targets (EC2 instances, microservices, Lambda functions) that are registered to receive routed traffic from an ALB based on path or host rules, with specific health checks configured.",
    category: "Networking & VPC",
    service: "ELB",
    difficulty: "Associate",
    example: "An ALB directs any URL ending in '/checkout' to checkout-target-group (which has 3 heavy EC2 instances running checkout code), and any URL ending in '/blog' to blog-target-group.",
    snippet: {
      language: "bash",
      title: "Register Instance with Target Group",
      code: "aws elbv2 register-targets --target-group-arn arn:aws:elasticloadbalancing:us-east-1:123:targetgroup/WebPool/111 --targets Id=i-12345"
    }
  },
  {
    id: 76,
    question: "What is a health check in the context of load balancing/auto scaling?",
    answer: "A health check is a periodic ping or HTTP request sent by the Load Balancer to a specific path (e.g., '/healthz') on registered instances. If an instance fails to respond with a 200 OK after multiple attempts, the load balancer marks it 'unhealthy', stops sending it user traffic, and signals Auto Scaling to terminate and replace it.",
    category: "Networking & VPC",
    service: "ELB",
    difficulty: "Associate",
    example: "Your Node application suffers a memory leak and crashes. The ALB health check detects the port 3000 is unresponsive, immediately stops routing customer checkouts to that node, and spins up a healthy replacement instance.",
    snippet: {
      language: "bash",
      title: "Modify target group health checks",
      code: "aws elbv2 modify-target-group --target-group-arn arn:aws:elb:us-east-1:123:tg/WebPool --health-check-protocol HTTP --health-check-port 3000 --health-check-path /api/health"
    }
  },
  {
    id: 77,
    question: "What is the difference between horizontal and vertical scaling on AWS?",
    answer: "Vertical Scaling is upgrading the size of your current server (e.g. changing an EC2 from t3.micro to m5.large, adding more CPU and RAM), which usually requires a reboot and has a hardware limit. Horizontal Scaling is adding more servers of the same size to your pool (via Auto Scaling Groups), which offers infinite scale, elasticity, and zero downtime.",
    category: "Compute & Containers",
    service: "Auto Scaling",
    difficulty: "Foundational",
    example: "Vertical scaling is buying a bigger hard drive and faster processor for your main laptop. Horizontal scaling is buying 5 standard laptops and distributing work to 5 people.",
    snippet: {
      language: "bash",
      title: "Describe Auto Scaling Instances",
      code: "aws autoscaling describe-auto-scaling-groups --query "
    }
  },
  {
    id: 78,
    question: "What is a Launch Template in EC2 Auto Scaling?",
    answer: "A Launch Template is a reusable configuration file that specifies all details required to spin up new EC2 instances, including AMI ID, instance type, key pairs, security groups, block storage maps, and custom userdata scripts.",
    category: "Compute & Containers",
    service: "Auto Scaling",
    difficulty: "Associate",
    example: "Instead of configuring parameters on the fly, your Auto Scaling Group references 'ProductionLaunchTemplate_v3' whenever it needs to spin up a web server.",
    snippet: {
      language: "json",
      title: "Create Launch Template via CLI",
      code: "aws ec2 create-launch-template --launch-template-name WebTemplate --launch-template-data '{\"ImageId\":\"ami-0c55b159\",\"InstanceType\":\"t3.micro\",\"SecurityGroupIds\":[\"sg-12345\"],\"KeyName\":\"MyKey\"}'"
    }
  },
  {
    id: 79,
    question: "What is blue-green deployment and how is it implemented on AWS?",
    answer: "Blue-Green deployment is a release strategy that uses two identical environments (Blue = Live production; Green = Idle staging). You deploy and test new code fully on the Green environment. Once verified, you switch traffic (via Route 53 weighted records or ALB target group weights) to Green, making it live. If issues arise, you instantly switch traffic back to Blue, ensuring zero downtime.",
    category: "DevOps & IaC",
    service: "DevOps Best Practices",
    difficulty: "Professional",
    example: "Deploying a massive website update. Code is thoroughly tested in Green. After approval, DNS is instantly swapped, launching the update to millions of users with no intermediate broken pages.",
    snippet: {
      language: "hcl",
      title: "Terraform Route 53 Weighted DNS",
      code: `resource "aws_route_53_record" "blue" {
  zone_id = aws_route_53_zone.primary.zone_id
  name    = "app.company.com"
  type    = "A"
  set_identifier = "blue"
  weighted_routing_policy { weight = 90 }
  alias { name = aws_lb.blue_alb.dns_name }
}

resource "aws_route_53_record" "green" {
  zone_id = aws_route_53_zone.primary.zone_id
  name    = "app.company.com"
  type    = "A"
  set_identifier = "green"
  weighted_routing_policy { weight = 10 }
  alias { name = aws_lb.green_alb.dns_name }
}`
    }
  },
  {
    id: 80,
    question: "What is canary deployment?",
    answer: "Canary deployment is a deployment strategy where a new software release is exposed to a tiny fraction of live users (e.g., 2% of traffic) first, while the other 98% continue using the stable version. You monitor errors and logs; if stable, you gradually roll it out to 100%. If bugs occur, the blast radius is restricted to the 2% canary group.",
    category: "DevOps & IaC",
    service: "DevOps Best Practices",
    difficulty: "Professional",
    example: "Using AWS App Mesh or an Application Load Balancer to route 1% of live traffic to your new experimental backend container running v2.0 before a full rollout.",
    snippet: {
      language: "bash",
      title: "Route 53 Canary Weight Swap",
      code: "aws route53 change-resource-record-sets --hosted-zone-id Z123456 --change-batch '{\"Changes\":[{\"Action\":\"UPSERT\",\"ResourceRecordSet\":{\"Name\":\"api.com\",\"Type\":\"A\",\"Weight\":95,\"SetIdentifier\":\"Stable\"}},{\"Action\":\"UPSERT\",\"ResourceRecordSet\":{\"Name\":\"api.com\",\"Type\":\"A\",\"Weight\":5,\"SetIdentifier\":\"Canary\"}}]}'"
    }
  },
  {
    id: 81,
    question: "What is AWS CodePipeline?",
    answer: "AWS CodePipeline is a fully managed Continuous Delivery (CD) service that orchestrates your release pipeline steps (Source, Build, Test, Deploy) automatically whenever code is pushed to your Git repository.",
    category: "DevOps & IaC",
    service: "CI/CD",
    difficulty: "Associate",
    example: "Pushing code to GitHub triggers CodePipeline. It fetches the code, starts a CodeBuild environment to run tests, and automatically triggers CodeDeploy to deploy the container to ECS.",
    snippet: {
      language: "bash",
      title: "Trigger a Pipeline execution",
      code: "aws codepipeline start-pipeline-execution --name my-app-pipeline"
    }
  },
  {
    id: 82,
    question: "What is AWS CodeBuild?",
    answer: "AWS CodeBuild is a fully managed, serverless continuous integration (CI) service that compiles source code, runs automated test suites, and packages ready-to-deploy software artifacts (Docker containers, zip files). It charges only for the exact build minutes used.",
    category: "DevOps & IaC",
    service: "CI/CD",
    difficulty: "Associate",
    example: "CodeBuild boots a clean temporary container, runs 'npm install && npm test', compiles your TypeScript backend, builds a Docker image, and shuts down.",
    snippet: {
      language: "yaml",
      title: "CodeBuild buildspec.yml Configuration",
      code: `version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - npm install
  build:
    commands:
      - npm run test
      - npm run build
artifacts:
  files:
    - dist/**/*`
    }
  },
  {
    id: 83,
    question: "What is AWS CodeDeploy?",
    answer: "AWS CodeDeploy is a managed deployment service that automates software deployments to EC2 instances, on-premises servers, serverless Lambda functions, or ECS container services, supporting rolling, canary, and blue-green deployments.",
    category: "DevOps & IaC",
    service: "CI/CD",
    difficulty: "Associate",
    example: "CodeDeploy orchestrates replacing code across a fleet of 50 EC2 servers, taking 5 down at a time (rolling deployment) to ensure zero downtime for active users.",
    snippet: {
      language: "bash",
      title: "Create a deployment via CLI",
      code: "aws deploy create-deployment --application-name MyApp --deployment-group-name WebServers --s3-location bucket=my-builds,key=app.zip,bundleType=zip"
    }
  },
  {
    id: 84,
    question: "How would you set up CI/CD for a React app on AWS?",
    answer: "1. Developers push code to GitHub. 2. A CI action (like GitHub Actions or AWS CodePipeline) triggers. 3. Run a build environment to install packages, run tests, and compile the static build folder (dist/). 4. Copy and sync the build output files to your hosting S3 bucket. 5. Invalidate the CloudFront Edge CDN cache so visitors instantly receive the updated files.",
    category: "DevOps & IaC",
    service: "CI/CD",
    difficulty: "Associate",
    example: "Creating a '.github/workflows/deploy.yml' file inside your repository that syncs the React build output folder to S3 and clears the CloudFront cache.",
    snippet: {
      language: "yaml",
      title: "GitHub Actions AWS Deploy Workflow",
      code: `name: Deploy SPA App
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install && npm run build
      - name: Configure AWS
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET }}
          aws-region: us-east-1
      - run: aws s3 sync dist/ s3://my-spa-bucket --delete
      - run: aws cloudfront create-invalidation --distribution-id E1234 --paths "/*"`
    }
  },
  {
    id: 85,
    question: "What is an S3 lifecycle rule?",
    answer: "An S3 Lifecycle Rule is a set of automation actions that defines how AWS manages objects during their lifetime. It supports Transition Actions (moving objects to cheaper storage tiers like Infrequent Access or Glacier after a specified number of days) and Expiration Actions (deleting old objects automatically).",
    category: "Storage & CDN",
    service: "S3",
    difficulty: "Associate",
    example: "A backup database system uploads snapshots every night to S3 Standard. An S3 lifecycle rule automatically transitions snapshots older than 30 days to Glacier Deep Archive, and fully deletes them after 365 days, reducing storage bills by 80%.",
    snippet: {
      language: "json",
      title: "S3 Lifecycle Configuration JSON",
      code: `{
  "Rules": [
    {
      "ID": "ArchiveOldBackups",
      "Status": "Enabled",
      "Prefix": "backups/",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "GLACIER"
        }
      ],
      "Expiration": {
        "Days": 365
      }
    }
  ]
}`
    }
  },
  {
    id: 86,
    question: "What is Cross-Origin Resource Sharing (CORS) configuration in the context of S3/API Gateway?",
    answer: "CORS is a browser security mechanism that restricts resources on a webpage from being requested by another domain name. Configuring S3 or API Gateway with explicit CORS policies allows specific origins (domains) to download S3 files or invoke API endpoints directly inside front-end browser scripts.",
    category: "Storage & CDN",
    service: "S3",
    difficulty: "Associate",
    example: "A React app hosted on 'www.mycompany.com' attempts to fetch data from API Gateway hosted on 'api.mycompany.com'. API Gateway must respond with 'Access-Control-Allow-Origin: https://www.mycompany.com' or the browser blocks the response.",
    snippet: {
      language: "json",
      title: "S3 CORS Configuration JSON",
      code: `[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedOrigins": ["https://www.mycompany.com"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]`
    }
  },
  {
    id: 87,
    question: "What is a Lambda layer?",
    answer: "A Lambda Layer is an archive containing additional code or libraries (e.g. node_modules, custom frameworks, or native binaries) that can be imported into multiple Lambda functions separately, keeping deployment zip files small, lightweight, and dry.",
    category: "Serverless & Integration",
    service: "Lambda",
    difficulty: "Professional",
    example: "You have 10 separate API Lambdas that all require the massive 'lodash' and 'aws-sdk' libraries. Instead of bundling libraries inside 10 individual zip files, you create 1 Lambda Layer containing node_modules and share it across all 10 functions.",
    snippet: {
      language: "bash",
      title: "Publish Lambda Layer via CLI",
      code: "aws lambda publish-layer-version --layer-name SharedNodeDeps --description \"Shared Node modules package\" --zip-file fileb://layer-package.zip --compatible-runtimes nodejs18.x"
    }
  },
  {
    id: 88,
    question: "What is the maximum execution time for a Lambda function?",
    answer: "The absolute maximum execution duration for a single Lambda function invocation is 15 minutes (900 seconds). For heavy processing tasks that exceed 15 minutes, AWS recommends containerizing the code and deploying it on ECS Fargate or using Step Functions to orchestrate multiple functions.",
    category: "Serverless & Integration",
    service: "Lambda",
    difficulty: "Foundational",
    example: "A reporting script takes 12 minutes to fetch, process, and compile data. It runs safely on Lambda. Another database migration takes 45 minutes, so it must run as an ECS Task instead.",
    snippet: {
      language: "bash",
      title: "Configure Lambda Timeout",
      code: "aws lambda update-function-configuration --function-name my-report-job --timeout 900"
    }
  },
  {
    id: 89,
    question: "What is AWS Step Functions?",
    answer: "AWS Step Functions is a low-code visual serverless orchestrator. It allows you to coordinate multiple microservices and serverless components (like Lambda, ECS, DynamoDB) as a state machine workflow, managing state, errors, retries, branching, and timeouts automatically.",
    category: "Serverless & Integration",
    service: "Step Functions",
    difficulty: "Professional",
    example: "An e-commerce purchase workflow: Step 1: Charge Card (Lambda). If success -> Step 2: Update Inventory (Lambda) -> Step 3: Send Email. If payment failed -> Trigger refund workflow and alert sales team.",
    snippet: {
      language: "json",
      title: "Step Functions ASL definition snippet",
      code: `{
  "Comment": "A simple state machine",
  "StartAt": "ProcessPayment",
  "States": {
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123:function:ChargeCard",
      "Next": "UpdateInventory"
    },
    "UpdateInventory": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123:function:AdjustStock",
      "End": true
    }
  }
}`
    }
  },
  {
    id: 90,
    question: "What is the difference between synchronous and asynchronous Lambda invocation?",
    answer: "Synchronous Invocation: The caller triggers the Lambda and actively waits for the function's execution to complete, receiving the HTTP status and returned body payload immediately (e.g. API Gateway). Asynchronous Invocation: The caller triggers the Lambda, AWS places the event inside an internal queue, returns a 202 Accepted instantly, and processes the event independently in the background (e.g. S3 uploads triggering a Lambda).",
    category: "Serverless & Integration",
    service: "Lambda",
    difficulty: "Professional",
    example: "An API checkout request is synchronous (user needs an instant response). Sending a 'welcome newsletter' email is asynchronous (user shouldn't wait at the page load for the email to send).",
    snippet: {
      language: "bash",
      title: "Asynchronously Invoke Lambda via CLI",
      code: "aws lambda invoke --function-name my-async-email --invocation-type Event --payload '{\"userId\": \"u-1\"}' output.json"
    }
  },
  {
    id: 91,
    question: "How do you monitor Lambda function errors/performance?",
    answer: "By default, AWS Lambda integrates automatically with: 1. CloudWatch Logs (captures console.log output, stack traces). 2. CloudWatch Metrics (tracks total Invocations, Duration, Errors, and Throttling). 3. AWS X-Ray (enables distributed tracing to visualize microservice bottle-necks).",
    category: "Monitoring, Operations & IaC",
    service: "Lambda",
    difficulty: "Associate",
    example: "Searching CloudWatch log insights to extract database timeout errors or setting a CloudWatch Alarm to notify slack if a Lambda's error rate exceeds 2% in 5 minutes.",
    snippet: {
      language: "bash",
      title: "List recent Lambda logs",
      code: "aws logs tail /aws/lambda/my-checkout-function"
    }
  },
  {
    id: 92,
    question: "What is AWS X-Ray?",
    answer: "AWS X-Ray is a distributed tracing service that helps developers analyze, debug, and trace user requests as they travel across multiple backend microservices, serverless components, databases, and APIs, generating a visual 'Service Map'.",
    category: "Monitoring, Operations & IaC",
    service: "X-Ray",
    difficulty: "Professional",
    example: "A checkout request is taking 4 seconds. X-Ray distributed trace highlights exactly where the delay occurs: API Gateway (50ms) -> Lambda (100ms) -> External Stripe API call (3850ms) -> DynamoDB (5ms).",
    snippet: {
      language: "javascript",
      title: "Instrument S3 AWS SDK client with AWS X-Ray",
      code: `import AWSXRay from "aws-xray-sdk-core";
import { S3Client } from "@aws-sdk/client-s3";

// ✅ Wrap client with X-Ray to track request times automatically
const s3Client = AWSXRay.captureAWSv3Client(new S3Client({ region: "us-east-1" }));`
    }
  },
  {
    id: 93,
    question: "What is a WAF (Web Application Firewall) in AWS?",
    answer: "AWS WAF protects your web applications and API Gateway endpoints from common internet exploits (OWASP Top 10) such as SQL Injections, Cross-Site Scripting (XSS), bad user bots, and DDoS attacks, by allowing you to define traffic filter rules.",
    category: "Security & IAM",
    service: "WAF",
    difficulty: "Associate",
    example: "Attaching AWS WAF to your CloudFront CDN distribution to instantly block any incoming requests originating from suspicious IP addresses or bad web scraper user-agents.",
    snippet: {
      language: "bash",
      title: "List Web ACLs in WAFv2",
      code: "aws wafv2 list-web-acls --scope REGIONAL"
    }
  },
  {
    id: 94,
    question: "What is AWS Shield?",
    answer: "AWS Shield is a managed Distributed Denial of Service (DDoS) protection service. Shield Standard is automatically included for all AWS customers at no cost (protects Layer 3/4 network attacks). Shield Advanced is a premium subscription offering enhanced protection, cost guarantees, and 24/7 access to the DDoS Response Team (DRT).",
    category: "Security & IAM",
    service: "Shield",
    difficulty: "Foundational",
    example: "A massive retail store during Black Friday is hit by a botnet flood attempting to knock the site offline. Shield Standard blocks standard layer 3 packets automatically, maintaining uptime.",
    snippet: {
      language: "bash",
      title: "Describe Protection Status (Shield Advanced)",
      code: "aws shield describe-protection"
    }
  },
  {
    id: 95,
    question: "How would you control AWS costs proactively?",
    answer: "1. Set up formal AWS Budgets with alerts sent to your team. 2. Use AWS Cost Explorer to analyze and tag spent trends. 3. Tag all resources cleanly (e.g. env: production). 4. Terminate idle EC2 instances and unused EBS volumes. 5. Leverage Spot Instances, Reserved Instances, or Savings Plans to secure bulk compute discounts.",
    category: "Architecture & Cost",
    service: "Cost Management",
    difficulty: "Associate",
    example: "Setting an AWS Budget of $500/month. If your active spending exceeds $400 (80%), AWS automatically sends an alert to your email so you can check for stray development servers.",
    snippet: {
      language: "bash",
      title: "Describe Cost Forecast via CLI",
      code: "aws ce get-cost-forecast --time-period Start=2026-08-01,End=2026-08-31 --granularity MONTHLY --metric UNBLENDED_COST"
    }
  },
  {
    id: 96,
    question: "What is resource tagging and why does it matter?",
    answer: "Resource Tagging is attaching key-value metadata to your AWS resources (e.g. Key: 'Environment', Value: 'Production'). It is critical for cost allocation reporting, automation scripting, security access policies, and resource organization.",
    category: "Architecture & Cost",
    service: "Cost Management",
    difficulty: "Foundational",
    example: "Tagging all servers created by the frontend team as 'Team: Frontend'. At the end of the month, the Finance director generates a cost report showing exactly how much the frontend team spent.",
    snippet: {
      language: "bash",
      title: "Tag an existing EC2 Instance",
      code: "aws ec2 create-tags --resources i-12345 --tags Key=Environment,Value=Production Key=Team,Value=Frontend"
    }
  },
  {
    id: 97,
    question: "What is the difference between an Availability Zone failure and a full Region failure in terms of design impact?",
    answer: "An Availability Zone failure represents a single data center going offline, which is easily mitigated by standard Multi-AZ replication (e.g. Multi-AZ RDS, multiple EC2 subnets). A Region Failure represents an entire geographical state or country's infrastructure losing connectivity, which requires a highly complex, multi-region architecture with independent DNS failovers.",
    category: "Global Infrastructure",
    service: "AWS Global",
    difficulty: "Professional",
    example: "An AZ power outage is standard; your ALB keeps routing traffic to the active AZ automatically. If a massive hurricane destroys us-east-1, only a cross-region backup replica in us-west-2 keeps your app online.",
    snippet: {
      language: "bash",
      title: "List Region Availability Status via CLI",
      code: "aws ssm get-parameter --name \"/aws/service/global-infrastructure/regions/us-east-1/long-name\""
    }
  },
  {
    id: 98,
    question: "How would a frontend engineer typically interact with AWS day-to-day?",
    answer: "1. Deploying compiled SPA assets to S3 and invalidating CloudFront Edge caches. 2. Configuring environment variables or secure API keys on API Gateway or serverless scripts. 3. Accessing CloudWatch to monitor website loading errors or checking GraphQL backend endpoint logs. 4. Managing custom domains inside Route 53 DNS records.",
    category: "Architecture & Cost",
    service: "Frontend Interaction",
    difficulty: "Foundational",
    example: "Setting up a continuous deployment pipeline that automatically pushes a React update to CloudFront, then checking CloudWatch Logs to verify the backend Lambda api handles requests successfully.",
    snippet: {
      language: "bash",
      title: "Purge CloudFront Asset Cache",
      code: "aws cloudfront create-invalidation --distribution-id E1234567 --paths \"/index.html\""
    }
  },
  {
    id: 99,
    question: "What is the AWS Free Tier?",
    answer: "The AWS Free Tier provides students, startups, and new developers free access to dozens of core AWS services. It consists of three tiers: 1. Always Free (e.g., 1M free Lambda requests/month). 2. 12-Months Free (available only for the first year, e.g. 750 hours of t2/t3.micro EC2). 3. Trials (short-term trials for premium services).",
    category: "Global Infrastructure",
    service: "Cost Management",
    difficulty: "Foundational",
    example: "Launching a tiny t3.micro web server and a small RDS instance during your first year on AWS to build, test, and host portfolio projects entirely for free.",
    snippet: {
      language: "bash",
      title: "Query Current Billing Status",
      code: "aws budgtes describe-budgets --account-id 123456789012"
    }
  },
  {
    id: 100,
    question: "How would you explain limited AWS experience in an interview, while still showing competence?",
    answer: "Be upfront about your practical deployment scale, then pivot to transferring your strong core fundamentals: 'While I haven't configured a multi-region direct connect setup in production, I understand how VPC subnets, routing tables, and security groups operate logically. I am heavily experienced with Docker, CI/CD pipelines, and IAM least-privilege standards, which transfer directly onto AWS ECS, CodePipeline, and IAM console.'",
    category: "Architecture & Cost",
    service: "Interview Skills",
    difficulty: "Foundational",
    example: "Explaining that while cloud consoles differ in colors and names, fundamental networking (IPs, Ports, firewalls), system reliability (backups, redundancy), and cost optimization remain identical across all cloud providers.",
    snippet: {
      language: "bash",
      title: "Print AWS CLI Version",
      code: "aws --version"
    }
  }
];
