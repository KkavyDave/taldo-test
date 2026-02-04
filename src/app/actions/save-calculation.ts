'use server';

import { prisma } from '@/lib/prisma';
import { UserProfile } from '@/lib/calculator';

export type LeadContactData = {
  name: string;
  age: string;
  email: string;
  phone: string;
  state: string;
};

// SIGNATURE UPDATED: Only 3 arguments now
export async function saveLeadAction(
  profile: UserProfile, 
  contact: LeadContactData, 
  savings: string
) {
  try {
    // 1. Validate Input
    if (!contact.email || !contact.phone) {
      return { success: false, error: "Missing required fields" };
    }

    // 2. Save to Database
    await prisma.lead.create({
      data: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        age: parseInt(contact.age) || 0,
        state: contact.state,
        
        experienceYears: profile.yearsExperience,
        qualification: profile.qualification,
        lifestyle: profile.selectedCity,
        projectedSavings: savings,
      },
    });

    // 3. Simple Logging
    console.log(`✅ [LEAD SAVED] ${contact.name} | ${contact.email}`);

    return { success: true };

  } catch (error: any) {
    console.error('❌ [DB ERROR]', error);
    return { success: false, error: `Database Error: ${error.message}` };
  }
}