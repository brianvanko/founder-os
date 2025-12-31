import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all user data
    const [reviews, goals, interviews, documents] = await Promise.all([
      db.review.findMany({
        where: { userId: session.user.id },
        orderBy: { date: "desc" },
      }),
      db.goal.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
      }),
      db.interview.findMany({
        where: { userId: session.user.id },
        orderBy: { completedAt: "desc" },
      }),
      db.document.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    // Generate export data structure
    const exportData = {
      exportDate: new Date().toISOString(),
      user: {
        email: session.user.email,
        name: session.user.name,
      },
      reviews: reviews.map((r) => ({
        id: r.id,
        type: r.type,
        date: r.date.toISOString(),
        content: JSON.parse(r.content),
        createdAt: r.createdAt.toISOString(),
      })),
      goals: goals.map((g) => ({
        id: g.id,
        timeframe: g.timeframe,
        title: g.title,
        category: g.category,
        status: g.status,
        progress: g.progress,
        content: JSON.parse(g.content),
        createdAt: g.createdAt.toISOString(),
      })),
      interviews: interviews.map((i) => ({
        id: i.id,
        type: i.type,
        content: JSON.parse(i.content),
        completedAt: i.completedAt.toISOString(),
      })),
      documents: documents.map((d) => ({
        id: d.id,
        type: d.type,
        content: d.content,
        createdAt: d.createdAt.toISOString(),
        updatedAt: d.updatedAt.toISOString(),
      })),
    };

    // Generate markdown export
    let markdown = `# Founder Personal OS Export\n\n`;
    markdown += `Export Date: ${formatDate(new Date())}\n\n`;
    markdown += `---\n\n`;

    // Documents
    if (documents.length > 0) {
      markdown += `## Documents\n\n`;
      documents.forEach((doc) => {
        markdown += `### ${doc.type}\n\n`;
        markdown += `${doc.content}\n\n`;
        markdown += `---\n\n`;
      });
    }

    // Goals
    if (goals.length > 0) {
      markdown += `## Goals\n\n`;
      goals.forEach((goal) => {
        const content = JSON.parse(goal.content);
        markdown += `### ${goal.title} (${goal.timeframe})\n\n`;
        markdown += `**Category:** ${goal.category || "N/A"}\n\n`;
        markdown += `**Status:** ${goal.status || "N/A"}\n\n`;
        if (goal.progress) markdown += `**Progress:** ${goal.progress}/10\n\n`;
        markdown += `**What:** ${content.what || "N/A"}\n\n`;
        markdown += `**Why:** ${content.why || "N/A"}\n\n`;
        markdown += `**How:** ${content.how || "N/A"}\n\n`;
        markdown += `**Success Looks Like:** ${content.successLooksLike || "N/A"}\n\n`;
        markdown += `---\n\n`;
      });
    }

    // Reviews
    if (reviews.length > 0) {
      markdown += `## Reviews\n\n`;

      // Group by type
      const reviewsByType = reviews.reduce((acc, r) => {
        if (!acc[r.type]) acc[r.type] = [];
        acc[r.type].push(r);
        return acc;
      }, {} as Record<string, typeof reviews>);

      Object.entries(reviewsByType).forEach(([type, typeReviews]) => {
        markdown += `### ${type} Reviews\n\n`;
        typeReviews.forEach((review) => {
          const content = JSON.parse(review.content);
          markdown += `#### ${formatDate(review.date)}\n\n`;
          markdown += JSON.stringify(content, null, 2);
          markdown += `\n\n---\n\n`;
        });
      });
    }

    // Interviews
    if (interviews.length > 0) {
      markdown += `## Interviews\n\n`;
      interviews.forEach((interview) => {
        const content = JSON.parse(interview.content);
        markdown += `### ${interview.type}\n\n`;
        markdown += `Completed: ${formatDate(interview.completedAt)}\n\n`;
        markdown += JSON.stringify(content, null, 2);
        markdown += `\n\n---\n\n`;
      });
    }

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown",
        "Content-Disposition": `attachment; filename="ceo-os-export-${new Date().toISOString().split("T")[0]}.md"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to generate export" },
      { status: 500 }
    );
  }
}
