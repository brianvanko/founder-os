import { DocumentType } from "@prisma/client";

export const DOCUMENT_TEMPLATES: Record<DocumentType, string> = {
  PRINCIPLES: `# Principles

Your core operating principles - the rules you've learned through experience.

---

## Life Principles

*What rules guide how you live?*

-


## Work Principles

*How do you operate professionally?*

-


## Decision Principles

*What filters do you use when making choices?*

-


## Relationship Principles

*How do you show up with others?*

-


---

*These principles should evolve as you learn. Update them regularly based on what you learn about yourself.*
`,

  NORTH_STAR: `# North Star

What you're optimizing for - your ultimate decision filter.

---

## Your North Star

*In one sentence, what are you optimizing for in life?*



## Why This Matters

*Why is this your north star? What led you here?*



## How You Know You're On Track

*What does it look and feel like when you're aligned with this?*



## How You Know You're Off Track

*What warning signs tell you you've drifted?*



---

*Your north star should be stable but can evolve. Revisit quarterly.*
`,

  MEMORY: `# Memory

Patterns you've learned about yourself - your operating manual.

---

## Energy Patterns

*When do you have the most energy? What drains you?*

-


## Peak Performance

*When are you at your best? What conditions create that?*

-


## Common Pitfalls

*What mistakes do you tend to repeat?*

-


## What Works

*What strategies consistently work well for you?*

-


## People Patterns

*What have you learned about how you work with others?*

-


---

*Extract patterns from your reviews and add them here regularly.*
`,

  FRAMEWORK_ANNUAL_REVIEW: `# Annual Review Framework

Dr. Anthony Gustin's structured yearly reflection process.

---

## Part 1: Looking Back

### What were your biggest wins this year?

1.
2.
3.

### What were your biggest challenges?

1.
2.
3.

### What surprised you?



### What disappointed you?



### What did you learn about yourself?



---

## Part 2: Life Assessment

Rate each area (1-10):

- **Health & Energy:** /10
- **Relationships:** /10
- **Career & Purpose:** /10
- **Finances:** /10
- **Personal Growth:** /10
- **Fun & Adventure:** /10

### Where are you most out of alignment?



---

## Part 3: Looking Forward

### What's your theme for next year? (1-3 words)



### Top 3 goals for next year:

1.
2.
3.

### What will you stop doing?



### What will you start doing?



### Who do you need to become?



---

*Complete this once per year, ideally in December/January.*
`,

  FRAMEWORK_VIVID_VISION: `# Vivid Vision

Tony Robbins-style future visualization exercise.

---

## Time Horizon

*How far into the future? (Typically 3-5 years)*



---

## The Vision

*Write in present tense as if you're already there. Be specific and vivid.*

### Your Day

*What does a typical day look like?*



### Your Work

*What are you working on? What impact are you having?*



### Your Relationships

*Who are the key people in your life? What are those relationships like?*



### Your Health

*How do you feel physically and mentally?*



### Your Home

*Where do you live? What's your environment like?*



### Your Finances

*What's your financial situation?*



### Your Character

*Who have you become? What values are you embodying?*



---

## Making It Real

### What needs to be true for this vision to happen?

1.
2.
3.

### What's the first step?



---

*Read this vision weekly. Update it as it evolves.*
`,

  FRAMEWORK_IDEAL_LIFE_COSTING: `# Ideal Life Costing

Tim Ferriss's lifestyle budgeting framework - what does your dream life actually cost?

---

## Monthly Dreamline Budget

### Housing
- Mortgage/Rent: $
- Utilities: $
- Maintenance: $
- **Total:** $

### Transportation
- Car payment: $
- Insurance: $
- Gas: $
- Maintenance: $
- **Total:** $

### Food & Dining
- Groceries: $
- Dining out: $
- **Total:** $

### Health & Fitness
- Gym/Classes: $
- Insurance: $
- Other: $
- **Total:** $

### Personal Growth
- Books/Courses: $
- Coaching/Therapy: $
- **Total:** $

### Entertainment & Travel
- Subscriptions: $
- Monthly travel fund: $
- Hobbies: $
- **Total:** $

### Family
- Kids' activities: $
- Family experiences: $
- **Total:** $

### Savings & Giving
- Retirement: $
- Emergency fund: $
- Charitable giving: $
- **Total:** $

---

## Total Monthly Cost

**Monthly Dream Life Cost:** $

**Annual Dream Life Cost:** $

---

## Target Income Needed

*Factor in taxes (assume 35% effective rate):*

**Gross Annual Income Needed:** $

**Monthly Income Needed:** $

---

## Current vs. Dream Gap

**Current Monthly Income:** $

**Dream Monthly Income:** $

**Monthly Gap:** $

---

## Closing the Gap

### How can you earn an extra $X/month?

1.
2.
3.

### What can you eliminate or reduce?

1.
2.
3.

### What's the 80/20?

*What 20% of changes would get you 80% of the lifestyle you want?*



---

*Update this quarterly as your ideal life evolves.*
`,

  FRAMEWORK_LIFE_MAP: `# Life Map

Alex Lieberman's 6-pillar life assessment framework.

---

## The 6 Pillars

Rate each pillar 1-10, then reflect on patterns.

---

### 1. Career & Purpose

**Current Rating:** /10

**What's working:**



**What's not working:**



**To improve this area:**



---

### 2. Relationships

**Current Rating:** /10

**What's working:**



**What's not working:**



**To improve this area:**



---

### 3. Health & Energy

**Current Rating:** /10

**What's working:**



**What's not working:**



**To improve this area:**



---

### 4. Meaning & Growth

**Current Rating:** /10

**What's working:**



**What's not working:**



**To improve this area:**



---

### 5. Finances

**Current Rating:** /10

**What's working:**



**What's not working:**



**To improve this area:**



---

### 6. Fun & Adventure

**Current Rating:** /10

**What's working:**



**What's not working:**



**To improve this area:**



---

## Overall Patterns

### Your strongest pillar:



### Your weakest pillar:



### What's the common thread across low-rated areas?



### If you could only improve one area, which would have the biggest impact on the others?



### What's one small action you can take this week?



---

*Complete this monthly or quarterly to track changes over time.*
`,
};

export function getDocumentTemplate(type: DocumentType): string {
  return DOCUMENT_TEMPLATES[type];
}
