'use server';

import { prisma } from '@/lib/prisma';

export interface JobSeekerData {
  name: string;
  email: string;
  phone: string;
  state: string;
  qualification: string;
}

export async function saveJobSeekerAction(data: JobSeekerData) {
  try {
    // 1. Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return { success: false, error: "Name, Email, and Phone are required." };
    }

    // 2. Save to Database (No Web3Forms!)
    await prisma.jobSeeker.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        state: data.state,
        qualification: data.qualification,
      },
    });

    return { success: true };

  } catch (error) {
    console.error("❌ Failed to save job seeker:", error);
    return { success: false, error: "Database connection failed." };
  }
}