import { DocumentType } from "@prisma/client";

export const DOCUMENT_LABELS: Record<DocumentType, string> = {
  PRINCIPLES: "Principles",
  NORTH_STAR: "North Star",
  MEMORY: "Memory",
  FRAMEWORK_ANNUAL_REVIEW: "Annual Review Framework",
  FRAMEWORK_VIVID_VISION: "Vivid Vision",
  FRAMEWORK_IDEAL_LIFE_COSTING: "Ideal Life Costing",
  FRAMEWORK_LIFE_MAP: "Life Map",
};

export const DOCUMENT_DESCRIPTIONS: Record<DocumentType, string> = {
  PRINCIPLES: "Core operating principles that shape your system",
  NORTH_STAR: "What you're optimizing for - your decision filter",
  MEMORY: "Patterns you've learned about yourself",
  FRAMEWORK_ANNUAL_REVIEW: "Dr. Anthony Gustin's structured yearly reflection",
  FRAMEWORK_VIVID_VISION: "Tony Robbins-style future visualization",
  FRAMEWORK_IDEAL_LIFE_COSTING: "Tim Ferriss's lifestyle budgeting",
  FRAMEWORK_LIFE_MAP: "Alex Lieberman's 6-pillar life assessment",
};

export const CORE_DOCUMENTS: DocumentType[] = [
  "PRINCIPLES",
  "NORTH_STAR",
  "MEMORY",
];

export const FRAMEWORK_DOCUMENTS: DocumentType[] = [
  "FRAMEWORK_ANNUAL_REVIEW",
  "FRAMEWORK_VIVID_VISION",
  "FRAMEWORK_IDEAL_LIFE_COSTING",
  "FRAMEWORK_LIFE_MAP",
];

export function getDocumentLabel(type: DocumentType): string {
  return DOCUMENT_LABELS[type];
}

export function getDocumentDescription(type: DocumentType): string {
  return DOCUMENT_DESCRIPTIONS[type];
}

export function isFrameworkDocument(type: DocumentType): boolean {
  return FRAMEWORK_DOCUMENTS.includes(type);
}
