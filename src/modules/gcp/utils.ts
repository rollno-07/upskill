import { Question } from './types';

/**
 * Generates 4 multiple choice options for a given question.
 * One option is the correct direct answer, and three are distractors derived
 * from other questions in the pool.
 */
export function generateQuizOptions(question: Question, allQuestions: Question[]): string[] {
  const correct = question.answer;
  const distractors: string[] = [];
  
  // Filter questions that are in the same category or nearby, avoiding duplicates
  const candidates = allQuestions.filter(q => q.id !== question.id);
  
  // Shuffle candidates to get random distractors
  const shuffledCandidates = [...candidates].sort(() => Math.random() - 0.5);
  
  for (const cand of shuffledCandidates) {
    if (distractors.length >= 3) break;
    // Ensure we don't repeat answers and the distractor is somewhat distinct
    if (!distractors.includes(cand.answer) && cand.answer !== correct) {
      distractors.push(cand.answer);
    }
  }

  // If we couldn't find enough, add placeholders (fallback, shouldn't happen)
  while (distractors.length < 3) {
    distractors.push("Alternative GCP configuration approach based on standard infrastructure isolation boundaries.");
  }

  // Return combined options shuffled
  return [correct, ...distractors].sort(() => Math.random() - 0.5);
}

/**
 * Static architectural scenarios mapped directly to question IDs for the sandbox playground.
 */
export interface SandboxScenario {
  id: string;
  title: string;
  description: string;
  nodes: {
    id: string;
    label: string;
    type: 'client' | 'network' | 'compute' | 'storage' | 'security';
    questions: number[];
  }[];
}

export const sandboxScenarios: SandboxScenario[] = [
  {
    id: 'serverless-api',
    title: 'Scale-to-Zero Web Service API',
    description: 'A modern, completely serverless global application routing incoming web requests securely with minimal operational costs.',
    nodes: [
      { id: 'dns', label: 'Cloud DNS', type: 'network', questions: [28] },
      { id: 'armor', label: 'Cloud Armor', type: 'security', questions: [46] },
      { id: 'lb', label: 'Global HTTPS Load Balancer', type: 'network', questions: [23, 74] },
      { id: 'cdn', label: 'Cloud CDN', type: 'network', questions: [25] },
      { id: 'run', label: 'Cloud Run Service', type: 'compute', questions: [9, 10, 54, 73, 92] },
      { id: 'secret', label: 'Secret Manager', type: 'security', questions: [45] },
      { id: 'db', label: 'Firestore NoSQL', type: 'storage', questions: [20, 60] }
    ]
  },
  {
    id: 'streaming-bigdata',
    title: 'Streaming Analytics Pipeline',
    description: 'An event-driven pipeline processing iot device signals or user clicks in real-time, archiving logs for enterprise auditing.',
    nodes: [
      { id: 'pubsub', label: 'Cloud Pub/Sub Topic', type: 'network', questions: [22, 69, 70, 71, 72] },
      { id: 'dataflow', label: 'Dataflow Engine', type: 'compute', questions: [56] },
      { id: 'bq', label: 'BigQuery Warehouses', type: 'storage', questions: [21, 50, 51, 52] },
      { id: 'audit', label: 'Cloud Audit Logs', type: 'security', questions: [98] },
      { id: 'gcs', label: 'Cloud Storage Bucket', type: 'storage', questions: [16, 17, 84, 85] }
    ]
  },
  {
    id: 'ha-kubernetes',
    title: 'High Availability Managed Kubernetes',
    description: 'Enterprise container orchestration hosting stateful SQL databases and background microservices.',
    nodes: [
      { id: 'vpc', label: 'Global VPC Network', type: 'network', questions: [24, 47, 48] },
      { id: 'gke', label: 'GKE Autopilot Cluster', type: 'compute', questions: [11, 12, 13, 87, 88] },
      { id: 'sql', label: 'Cloud SQL PostgreSQL (HA)', type: 'storage', questions: [18, 81, 86] },
      { id: 'trace', label: 'Cloud Trace / Profiler', type: 'security', questions: [79, 80] }
    ]
  }
];
