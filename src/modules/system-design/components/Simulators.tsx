import React from "react";
import { 
  SimulatorGeneralApproach, 
  SimulatorClarifyingQuestions, 
  SimulatorChatFeed, 
  SimulatorImageUpload, 
  SimulatorCDN, 
  SimulatorNotificationSystem 
} from "./simulators/SimulatorsSet1";

import { 
  SimulatorScaling, 
  SimulatorLoadBalancer, 
  SimulatorCachingLayers, 
  SimulatorCacheInvalidation, 
  SimulatorOptimisticLocking, 
  SimulatorCollaborativeEditor 
} from "./simulators/SimulatorsSet2";

import { 
  SimulatorEventualConsistency, 
  SimulatorCAPTheorem, 
  SimulatorInfiniteScroll, 
  SimulatorPagination, 
  SimulatorRateLimiter, 
  SimulatorMessageQueue 
} from "./simulators/SimulatorsSet3";

import { 
  SimulatorChunkedUpload, 
  SimulatorAutocomplete, 
  SimulatorSharding, 
  SimulatorUrlShortener, 
  SimulatorPresence, 
  SimulatorRESTvsGraphQL 
} from "./simulators/SimulatorsSet4";

import { 
  SimulatorClientCaching, 
  SimulatorPerformanceRace, 
  SimulatorFeatureFlags, 
  SimulatorIdempotency, 
  SimulatorDoubleSubmission, 
  SimulatorAccessibility 
} from "./simulators/SimulatorsSet5";

interface SimulatorsHubProps {
  questionId: number;
}

export function SimulatorsHub({ questionId }: SimulatorsHubProps) {
  switch (questionId) {
    case 1:
      return <SimulatorGeneralApproach />;
    case 2:
      return <SimulatorClarifyingQuestions />;
    case 3:
      return <SimulatorChatFeed />;
    case 4:
      return <SimulatorImageUpload />;
    case 5:
      return <SimulatorCDN />;
    case 6:
      return <SimulatorNotificationSystem />;
    case 7:
      return <SimulatorScaling />;
    case 8:
      return <SimulatorLoadBalancer />;
    case 9:
      return <SimulatorCachingLayers />;
    case 10:
      return <SimulatorCacheInvalidation />;
    case 11:
      return <SimulatorOptimisticLocking />;
    case 12:
      return <SimulatorCollaborativeEditor />;
    case 13:
      return <SimulatorEventualConsistency />;
    case 14:
      return <SimulatorCAPTheorem />;
    case 15:
      return <SimulatorInfiniteScroll />;
    case 16:
      return <SimulatorPagination />;
    case 17:
      return <SimulatorRateLimiter />;
    case 18:
      return <SimulatorMessageQueue />;
    case 19:
      return <SimulatorChunkedUpload />;
    case 20:
      return <SimulatorAutocomplete />;
    case 21:
      return <SimulatorSharding />;
    case 22:
      return <SimulatorUrlShortener />;
    case 23:
      return <SimulatorPresence />;
    case 24:
      return <SimulatorRESTvsGraphQL />;
    case 25:
      return <SimulatorClientCaching />;
    case 26:
      return <SimulatorPerformanceRace />;
    case 27:
      return <SimulatorFeatureFlags />;
    case 28:
      return <SimulatorIdempotency />;
    case 29:
      return <SimulatorDoubleSubmission />;
    case 30:
      return <SimulatorAccessibility />;
    default:
      return (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-center text-xs text-slate-500 italic">
          No custom interactive simulator found for Question ID {questionId}.
        </div>
      );
  }
}
