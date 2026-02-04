/**
 * Database Seed Script
 * Migrates blog and webinar data from JSON files to PostgreSQL database
 * Creates default admin user
 */

require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { readFileSync } = require('fs');
const { join } = require('path');
const bcrypt = require('bcryptjs');

// Initialize database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Load data from JSON files
const loadJSONData = () => {
    try {
        const blogsData = JSON.parse(
            readFileSync(join(__dirname, '../src/data/blogs.json'), 'utf-8')
        );
        const youtubeData = JSON.parse(
            readFileSync(join(__dirname, '../src/data/youtube-shorts.json'), 'utf-8')
        );
        return { blogsData, youtubeData };
    } catch (error) {
        console.error('❌ Error loading JSON files:', error.message);
        throw error;
    }
};

// Seed default admin user
const seedUsers = async () => {
    console.log('👤 Seeding users...');

    const defaultEmail = 'admin@taldo.com';
    const defaultPassword = 'admin123'; // Change this after first login!

    const existingUser = await prisma.user.findUnique({
        where: { email: defaultEmail },
    });

    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        await prisma.user.create({
            data: {
                email: defaultEmail,
                name: 'Admin',
                password: hashedPassword,
                role: 'admin',
                active: true,
            },
        });

        console.log(`  ✓ Created default admin user`);
        console.log(`    Email: ${defaultEmail}`);
        console.log(`    Password: ${defaultPassword}`);
        console.log(`    ⚠️  IMPORTANT: Change this password after first login!`);
    } else {
        console.log(`  ℹ️  Admin user already exists`);
    }

    console.log(`✅ User seeding complete`);
};

// Seed blogs
const seedBlogs = async (blogsData) => {
    console.log('📝 Seeding blogs...');

    for (const blog of blogsData) {
        // Convert old format to new flexible content format
        const newContent = [];

        // Add existing paragraphs
        if (blog.content.paragraphs && blog.content.paragraphs.length > 0) {
            blog.content.paragraphs.forEach(p => {
                newContent.push({ type: 'paragraph', content: p });
            });
        }

        // Add existing bullet points as a list block
        if (blog.content.bulletPoints && blog.content.bulletPoints.length > 0) {
            newContent.push({ type: 'list', items: blog.content.bulletPoints });
        }

        await prisma.blog.upsert({
            where: { slug: blog.id },
            update: {
                title: blog.title,
                date: blog.date,
                image: blog.image,
                intro: blog.content.intro,
                content: newContent,
                published: true,
            },
            create: {
                slug: blog.id,
                title: blog.title,
                date: blog.date,
                image: blog.image,
                intro: blog.content.intro,
                content: newContent,
                published: true,
            },
        });
        console.log(`  ✓ ${blog.title}`);
    }

    console.log(`✅ Seeded ${blogsData.length} blogs`);
};

// Seed webinars
const seedWebinars = async (youtubeData) => {
    console.log('🎥 Seeding webinars...');

    for (let i = 0; i < youtubeData.video_ids.length; i++) {
        const videoId = youtubeData.video_ids[i];
        await prisma.webinar.upsert({
            where: { videoId },
            update: {
                order: i,
                published: true,
            },
            create: {
                videoId,
                order: i,
                published: true,
            },
        });
        console.log(`  ✓ ${videoId}`);
    }

    console.log(`✅ Seeded ${youtubeData.video_ids.length} webinars`);
};

// Main seed function
const main = async () => {
    console.log('🌱 Starting database seed...\n');

    await seedUsers();
    console.log('');

    const { blogsData, youtubeData } = loadJSONData();

    await seedBlogs(blogsData);
    console.log('');
    await seedWebinars(youtubeData);

    console.log('\n✅ Database seeded successfully!');
};

// Execute seed
main()
    .catch((error) => {
        console.error('\n❌ Error seeding database:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
