import { Question } from '../types';

export const category6Questions: Question[] = [
  {
    id: 59,
    question: "How do you deploy a static frontend (React app) on GCP?",
    answer: "There are two main industry patterns: 1) Deploy the compiled static assets (index.html, js, css) directly into a Google Cloud Storage (GCS) bucket, configure the bucket for static website hosting, and place it behind a Global HTTPS Load Balancer with Cloud CDN for global edge caching. 2) Use Firebase Hosting, which automatically handles static assets, SSL certificates, custom domains, and edge delivery under a unified, serverless CDN.",
    category: "Frontend & Firebase",
    explanation: "For enterprise apps with complex routing and security requirements, placing a GCS bucket behind a Global Load Balancer with Cloud CDN is the standard choice because it allows you to configure advanced firewall security via Cloud Armor. For rapid prototyping or developer-focused projects, Firebase Hosting is highly preferred as it handles SSL/TLS certificates and routing configurations automatically with zero operational overhead.",
    example: {
      title: "Deploying React App to GCS via CLI",
      description: "Compile code and configure a GCS bucket to host public web traffic.",
      cli: "# 1. Build the local React app\nnpm run build\n\n# 2. Configure bucket permissions to allow anonymous reads (for static hosting)\ngcloud storage buckets add-iam-policy-binding gs://my-react-website \\\n  --member=\"allUsers\" \\\n  --role=\"roles/storage.objectViewer\"\n\n# 3. Synchronize static bundle to the bucket\ngcloud storage rsync -r dist/ gs://my-react-website/"
    },
    diagramType: "cdn_cache",
    visualAid: "Visualizer: User browser accessing assets from a GCS static bucket routed via a Global CDN proxy."
  },
  {
    id: 60,
    question: "What is Firebase and its relationship to GCP?",
    answer: "Firebase is a suite of developer-centric tools and services (including auth, hosting, real-time databases, and cloud storage) designed to simplify mobile and web application development. Firebase is not a separate competitor to GCP; rather, it is a wrapper/subset that runs directly on Google Cloud Platform's secure infrastructure.",
    category: "Frontend & Firebase",
    explanation: "Every Firebase project is physically a GCP project underneath. When you create a Firebase database (Firestore), you can inspect and manage that exact database instance inside your GCP console under the Firestore service. This relationship is incredibly powerful because it allows a startup to begin building rapidly using Firebase's frontend SDKs and transition seamlessly to enterprise GCP services (like BigQuery analytics or specialized GKE nodes) as their workload scales.",
    example: {
      title: "Linking Firebase and GCP projects",
      description: "Because they are identical underlying systems, you can enable Firebase services directly on any existing GCP project ID using the Firebase CLI.",
      cli: "# Login to Firebase Account\nfirebase login\n\n# Initialize Firebase services in an active GCP project directory\nfirebase init"
    },
    diagramType: "firebase_arch",
    visualAid: "GCP Unified Infrastructure layer showing Firebase SDKs acting as developer-friendly wrappers over Cloud Storage, Firestore, and Identity APIs."
  },
  {
    id: 61,
    question: "What is Firebase Hosting?",
    answer: "Firebase Hosting is a fully managed, production-grade static hosting service designed specifically for modern Single Page Applications (SPAs) like React, Vue, or Angular, providing fast edge delivery, automated SSL provisioning, custom domain routing, and seamless integration with Cloud Functions.",
    category: "Frontend & Firebase",
    explanation: "Unlike generic storage buckets, Firebase Hosting is fine-tuned for SPAs. It supports custom redirect rules (e.g., routing all requests back to `index.html` to support React Router natively), handles microservice integrations out-of-the-box, and automatically provisions and renews SSL/TLS certificates for custom domains at no extra cost.",
    example: {
      title: "Firebase Hosting Configuration File",
      description: "A firebase.json configuration mapping all virtual paths back to the index page for single-page routing.",
      code: "{\n  \"hosting\": {\n    \"public\": \"dist\",\n    \"ignore\": [\n      \"firebase.json\",\n      \"/.*\"\n    ],\n    \"rewrites\": [ {\n      \"source\": \"\",\n      \"destination\": \"/index.html\"\n    } ]\n  }\n}",
      cli: "# Deploy the compiled code in one command\nfirebase deploy --only hosting"
    },
    diagramType: "firebase_arch",
    visualAid: "SPA Client-side Routing: Standard asset servers routing arbitrary sub-routes directly to index.html for virtual browser-side controllers."
  },
  {
    id: 62,
    question: "What is Firebase Authentication?",
    answer: "Firebase Authentication is a fully managed, secure authentication service that provides easy-to-use frontend SDKs and secure backend endpoints to authenticate users using passwords, telephone numbers, and popular federated identity providers (like Google, GitHub, Facebook, and Apple).",
    category: "Frontend & Firebase",
    explanation: "Implementing secure authentication from scratch (handling password hashing, email verification, cookie sessions, and OAuth handshakes) is highly complex and risky. Firebase Auth abstracts this, handling token generation (JWTs) and credential storage securely under standard compliance schemas. It integrates natively with Firestore and Cloud Storage, allowing you to secure database reads and writes based on active user login states.",
    example: {
      title: "Signing in a User via Firebase SDK",
      description: "How to authenticate a user on the client-side with Google Sign-In using Javascript.",
      code: "import { getAuth, signInWithPopup, GoogleAuthProvider } from \"firebase/auth\";\n\nconst auth = getAuth();\nconst provider = new GoogleAuthProvider();\n\nasync function loginWithGoogle() {\n  try {\n    const result = await signInWithPopup(auth, provider);\n    const user = result.user;\n    console.log(\"Logged in as:\", user.displayName);\n  } catch (error) {\n    console.error(\"Authentication failed:\", error.message);\n  }\n}"
    },
    diagramType: "firebase_arch",
    visualAid: "Identity Exchange flow: Client logs in via OAuth -> Auth Server validates -> Returns JWT Token -> Client accesses secure Database."
  },
  {
    id: 99,
    question: "How would a frontend engineer typically interact with GCP day-to-day?",
    answer: "A frontend engineer interacts with GCP by: 1) Deploying compiled static bundles (React, Next.js) to Firebase Hosting or Cloud Storage; 2) Managing frontend API environment variables and deployment secrets via Secret Manager; 3) Reviewing error logs and exceptions using Cloud Logging and Error Reporting; 4) Managing image assets using Cloud Storage Buckets and CDN caching controls; 5) Interacting with databases like Firestore to wire up real-time frontend states.",
    category: "Interview & Career Strategy",
    explanation: "Modern frontends are tightly coupled with serverless backends. Understanding how to read Cloud Logs to debug a failing API endpoint, configure CORS headers on a GCS bucket, or inspect the cache status of a CDN image are highly valued full-stack skills that empower frontend developers to solve deployment issues independently.",
    example: {
      title: "Configuring CORS on a Storage Bucket",
      description: "Configure cross-origin rules to allow your React application domain to safely download resources from your bucket.",
      code: "[\n  {\n    \"origin\": [\"https://my-react-app.com\"],\n    \"method\": [\"GET\", \"POST\", \"OPTIONS\"],\n    \"responseHeader\": [\"Content-Type\", \"Authorization\"],\n    \"maxAgeSeconds\": 3600\n  }\n]",
      cli: "# Apply cross-origin access configuration to the bucket\ngcloud storage buckets update gs://my-web-assets --cors-file=cors.json"
    },
    diagramType: "cdn_cache",
    visualAid: "CORS schematic showing pre-flight OPTIONS request returning authorized header permissions from cloud storage bucket."
  },
  {
    id: 100,
    question: "What's a good way to explain GCP experience if it's limited, in an interview?",
    answer: "Be completely honest about your practical depth, but immediately bridge that gap by connecting the cloud concepts to transferable, platform-agnostic architectures. Explain that cloud providers (GCP, AWS, Azure) share identical core principles: virtual machines, containerization (Docker, Kubernetes), object storage, IAM roles, least privilege security, and CDNs.",
    category: "Interview & Career Strategy",
    explanation: "Frame your experience through practical workflows: 'While I have spent less time manually setting up VPC subnets, I am highly comfortable containerizing React and Node applications, deploying them to serverless platforms like Cloud Run, securing API endpoints using environment variables, and establishing automated CI/CD build pipelines using git triggers.' This demonstrates architectural maturity, adaptability, and high cloud-readiness.",
    example: {
      title: "High-Impact Interview Response Blueprint",
      description: "How to structure your answer when asked about cloud infrastructure experience.",
      code: "1. Acknowledge and reframe: \"While my day-to-day work is mostly frontend, I understand cloud infrastructure from an architectural perspective...\"\n2. Connect to containers: \"I containerize my apps so they run identically in local docker and Cloud Run serverless environments...\"\n3. Focus on security: \"I strictly practice least privilege: decoupling secrets into Secret Manager instead of hardcoding API keys...\"\n4. Highlight automation: \"I build pipelines where Git commits trigger automated building, testing, and static deployments.\""
    },
    diagramType: "default",
    visualAid: "Interactive mind map connecting core software development skills directly to equivalent Google Cloud services."
  }
];
