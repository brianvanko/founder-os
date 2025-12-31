// Daily Review Content Structure
export interface DailyReviewContent {
  energyLevel: number; // 1-10
  energyNotes?: string;
  meaningfulWin: string;
  frictionPoint: string;
  letGoOf: string;
  tomorrowPriority: string;
  notes?: string;
}

// Weekly Review Content Structure (for future)
export interface WeeklyReviewContent {
  movedNeedle: string;
  wasNoise: string;
  timeLeaked: string;
  energyGained: string;
  energyDrained: string;
  energyPattern: string;
  strategicInsight: string;
  proud: string;
  doDifferently: string;
  goalProgress: Array<{
    goalId: string;
    progress: number; // 1-10
    notes: string;
  }>;
  nextWeekPriorities: string[];
}

// Quarterly Review Content Structure (for future)
export interface QuarterlyReviewContent {
  biggestWins: string[];
  biggestChallenges: string[];
  surprised: string;
  disappointed: string;
  goalProgress: Array<{
    goalId: string;
    onTrack: boolean;
    notes: string;
  }>;
  lifePillarRatings: {
    career: number;
    relationships: number;
    health: number;
    meaning: number;
    finances: number;
    fun: number;
  };
  misalignments: string;
  nextQuarterPriorities: string[];
}

// Annual Review Content Structure (for future)
export interface AnnualReviewContent {
  yearSummary: string;
  mostProud: string[];
  bestDecision: string;
  worstDecision: string;
  energyGained: string;
  energyDrained: string;
  surprised: string;
  relationships: {
    added: string;
    neglected: string;
    stronger: string;
    weaker: string;
  };
  patterns: string;
  nextYearTheme: string;
  nextYearGoals: string[];
}
