export interface ExampleInfo {
  title: string;
  description: string;
  code?: string;
  cli?: string;
}

export type DiagramType =
  | 'hierarchy'
  | 'compute_comparison'
  | 'gke_autopilot'
  | 'storage_classes'
  | 'spanner_vs_sql'
  | 'pubsub_flow'
  | 'load_balancer'
  | 'vpc_nat'
  | 'iam_least_privilege'
  | 'ci_cd_pipeline' | 'dns_flow' | 'monitoring_logging' | 'cold_start' | 'secret_manager' | 'cdn_cache'
  | 'firebase_arch' | 'spot_vm' | 'quota_limit' | 'workload_identity' | 'interconnect' | 'bigquery_perf'
  | 'default';

export interface Question {
  id: number;
  question: string;
  answer: string;
  category: string;
  explanation: string;
  example: ExampleInfo;
  diagramType: DiagramType;
  visualAid: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  questionIds: number[];
}

export interface UserProgress {
  masteredIds: number[];
  bookmarkedIds: number[];
  notes: Record<number, string>;
}
