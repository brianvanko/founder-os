import { hash } from "bcryptjs";
import { db } from "@/lib/db";

export async function createUser(email: string, password: string, name?: string) {
  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const passwordHash = await hash(password, 12);
  console.log("Created password hash for:", email, "Hash length:", passwordHash.length);

  // Create user
  const user = await db.user.create({
    data: {
      email,
      passwordHash,
      name,
    },
  });
  console.log("User created successfully:", email);

  // Initialize core documents for new user
  await initializeUserDocuments(user.id);

  return user;
}

async function initializeUserDocuments(userId: string) {
  const documentTemplates = [
    {
      type: "PRINCIPLES" as const,
      content: `# Operating Principles

These are the foundational beliefs that shape your system.

## Core Principles

*Add your principles here...*

---

*Customize this document to reflect your personal operating principles.*`,
    },
    {
      type: "NORTH_STAR" as const,
      content: `# North Star

## What I'm Optimizing For

*Fill this in. Be specific. Be honest. This is private.*

---

## What I'm Explicitly NOT Optimizing For

*What are you consciously choosing to deprioritize?*

---

## My Non-Negotiables

*What would make you quit? What lines won't you cross?*

---

*Last updated: ${new Date().toISOString().split('T')[0]}*`,
    },
    {
      type: "MEMORY" as const,
      content: `# Memory: Patterns I've Learned About Myself

This is where you store insights discovered through reflection.

---

## Patterns in My Energy

*When am I most alive? Most drained?*

---

## Repeated Mistakes

*What do I keep doing despite knowing better?*

---

## What Actually Moves the Needle

*What activities produce disproportionate results?*

---

*Add insights as you discover them through daily and weekly reviews.*`,
    },
  ];

  await db.document.createMany({
    data: documentTemplates.map((template) => ({
      userId,
      type: template.type,
      content: template.content,
    })),
  });
}

export async function getUserProfile(userId: string) {
  return await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      company: true,
      role: true,
      stageOfLife: true,
      priorities: true,
      createdAt: true,
    },
  });
}

export async function updateUserProfile(
  userId: string,
  data: {
    name?: string;
    company?: string;
    role?: string;
    stageOfLife?: string;
    priorities?: string;
  }
) {
  return await db.user.update({
    where: { id: userId },
    data,
  });
}
