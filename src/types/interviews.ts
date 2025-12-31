// Past Year Reflection Interview Content
export interface PastYearReflectionContent {
  significantMoments: string[];
  proudestAchievements: string;
  biggestChallenges: string;
  lessonsLearned: string;
  relationshipChanges: string;
  energyPatterns: string;
  surprises: string;
  regrets: string;
  gratefulFor: string;
}

// Identity & Values Interview Content
export interface IdentityValuesContent {
  coreValues: string[];
  identityStatement: string;
  nonNegotiables: string;
  dealBreakers: string;
  whenAtBest: string;
  whenAtWorst: string;
  principlesInAction: string;
  valuesToDevelop: string;
}

// Future Self Interview Content
export interface FutureSelfContent {
  timeHorizon: string; // e.g., "5 years", "10 years"
  vividVision: string;
  dailyLife: string;
  relationships: string;
  work: string;
  health: string;
  legacy: string;
  valuesAlignment: string;
  firstSteps: string[];
}

export type InterviewContent =
  | PastYearReflectionContent
  | IdentityValuesContent
  | FutureSelfContent;

export const INTERVIEW_TYPE_LABELS = {
  PAST_YEAR_REFLECTION: "Past Year Reflection",
  IDENTITY_AND_VALUES: "Identity & Values",
  FUTURE_SELF_INTERVIEW: "Future Self Interview",
} as const;

export const INTERVIEW_TYPE_DESCRIPTIONS = {
  PAST_YEAR_REFLECTION:
    "Deep reflection on the past 12 months - what happened, what you learned, and how you've changed",
  IDENTITY_AND_VALUES:
    "Define your core values, principles, and identity - who you are at your best",
  FUTURE_SELF_INTERVIEW:
    "Interview your future self - create a vivid vision of who you want to become",
} as const;
