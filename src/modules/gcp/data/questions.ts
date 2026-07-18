import { Question, Category } from '../types';
import { category1Questions } from './category1';
import { category2Questions } from './category2';
import { category3Questions } from './category3';
import { category4Questions } from './category4';
import { category5Questions } from './category5';
import { category6Questions } from './category6';

// Combine all 100 questions chronologically by id
export const allQuestions: Question[] = [
  ...category1Questions,
  ...category2Questions,
  ...category3Questions,
  ...category4Questions,
  ...category5Questions,
  ...category6Questions,
].sort((a, b) => a.id - b.id);

// Double-check question count integrity
console.log(`GCP 100 Interview Prep - Loaded ${allQuestions.length} questions successfully.`);

export const categories: Category[] = [
  {
    id: "all",
    name: "All Concepts",
    description: "Browse the complete set of 100 interview questions across all disciplines.",
    icon: "Layers",
    questionIds: allQuestions.map(q => q.id)
  },
  {
    id: "core",
    name: "Core & Organization",
    description: "Project boundaries, IAM models, folders, regions/zones, and organizational policies.",
    icon: "Network",
    questionIds: category1Questions.map(q => q.id)
  },
  {
    id: "compute",
    name: "Compute & Serverless",
    description: "Compute Engine, App Engine, Cloud Run serverless containers, GKE clusters, pods, and Functions.",
    icon: "Cpu",
    questionIds: category2Questions.map(q => q.id)
  },
  {
    id: "storage",
    name: "Storage & Databases",
    description: "Cloud Storage classes, Cloud SQL relational databases, Cloud Spanner, Firestore NoSQL, and BigQuery warehouses.",
    icon: "Database",
    questionIds: category3Questions.map(q => q.id)
  },
  {
    id: "networking",
    name: "Networking & Security",
    description: "VPC setups, Global Load Balancers, CDN cache, Cloud Armor web defenses, Cloud NAT, and Workload Federation.",
    icon: "ShieldCheck",
    questionIds: category4Questions.map(q => q.id)
  },
  {
    id: "devops",
    name: "DevOps & Pipelines",
    description: "Cloud Build pipelines, Pub/Sub topics, monitoring dashboards, Secret Manager, Cloud Scheduler, and Terraform (IaC).",
    icon: "Workflow",
    questionIds: category5Questions.map(q => q.id)
  },
  {
    id: "frontend",
    name: "Frontend & Strategy",
    description: "Static hosting, Firebase integrations, CORS rules, and effective interview communication strategies.",
    icon: "UserCheck",
    questionIds: category6Questions.map(q => q.id)
  }
];
