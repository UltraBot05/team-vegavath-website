import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!)
const BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL!

const members = [
  // ── CORE ──────────────────────────────────────────────────────────────
  { name: "Naveen S",           role: "Club Head",         tier: "core",   domain: "Automotive", quote: "When life gives you lemonade, make lemons. Life will be all like \"Whaaaat?\"",                         photo_url: `${BASE}/team/core/naveen-selvaraj.jpg`,  linkedin_url: "", display_order: 1 },
  { name: "Ankush Gowda",       role: "Club Manager",      tier: "core",   domain: "Marketing",  quote: "Ignore me",                                                                                              photo_url: `${BASE}/team/core/ankush.jpg`,           linkedin_url: "", display_order: 2 },
  { name: "Dhruv Maheshwari",   role: "Design Head",       tier: "core",   domain: "Design",     quote: "design bro.",                                                                                            photo_url: `${BASE}/team/core/dhruv-maheshwari.jpg`, linkedin_url: "", display_order: 3 },
  { name: "Tvisha",             role: "Social Media Head", tier: "core",   domain: "Media",      quote: "Write off anything",                                                                                     photo_url: `${BASE}/team/core/tvisha.png`,           linkedin_url: "", display_order: 4 },
  { name: "Srijan Das",         role: "Automotive Head",   tier: "core",   domain: "Automotive", quote: "Driving a slow car fast is better than driving a fast car slow.",                                        photo_url: `${BASE}/team/core/srijan.png`,           linkedin_url: "", display_order: 5 },
  { name: "Bhumika",            role: "Operations Head",   tier: "core",   domain: "Operations", quote: "Still pretending to know what I'm doing 😥",                                                            photo_url: `${BASE}/team/core/bhumika.jpg`,          linkedin_url: "", display_order: 6 },

  // ── CREW ──────────────────────────────────────────────────────────────
  { name: "Karan Maheshwari",    role: "Member", tier: "crew", domain: "Robotics",      quote: "Life never gives you free lemons, it only gives Pain",                                    photo_url: `${BASE}/team/crew/karan.jpg`,            linkedin_url: "", display_order: 1  },
  { name: "Bhuvi Bagga",         role: "Member", tier: "crew", domain: "Sponsorships",  quote: "Powered by caffeine, creativity, and convincing emails.",                                  photo_url: `${BASE}/team/crew/bhuvi-bagga.jpeg`,     linkedin_url: "", display_order: 2  },
  { name: "Velkur Tanisha Reddy",role: "Member", tier: "crew", domain: "Operations",    quote: "Adventure awaits, fueled by adrenaline",                                                  photo_url: `${BASE}/team/crew/tanisha-reddy.jpeg`,   linkedin_url: "", display_order: 3  },
  { name: "Siddharth Shilin",    role: "Member", tier: "crew", domain: "Logistics",     quote: "Came for the cars, stayed for the chaos.",                                                photo_url: `${BASE}/team/crew/sid.png`,              linkedin_url: "", display_order: 4  },
  { name: "Abhigyan",            role: "Member", tier: "crew", domain: "Programming",   quote: "He who wasn't.",                                                                          photo_url: `${BASE}/team/crew/abhigyan.jpg`,         linkedin_url: "", display_order: 5  },
  { name: "Aarush Khullar",      role: "Member", tier: "crew", domain: "Automotive",    quote: "Just a chill guy with a caffeine addiction",                                              photo_url: `${BASE}/team/crew/aarush-khullar.jpg`,   linkedin_url: "", display_order: 6  },
  { name: "Yadunandana Reddy M", role: "Member", tier: "crew", domain: "Design",        quote: "I touch photoshop",                                                                       photo_url: `${BASE}/team/crew/yadunandan.jpg`,       linkedin_url: "", display_order: 7  },
  { name: "Bhuvigna Reddy A T",  role: "Member", tier: "crew", domain: "Design",        quote: "YOLOing at full throttle - No pit stops !!",                                              photo_url: `${BASE}/team/crew/bhuvigna-reddy.jpg`,   linkedin_url: "", display_order: 8  },
  { name: "Miruthulaa E M",      role: "Member", tier: "crew", domain: "Robotics",      quote: "If you're going hard enough left, you'll find yourself turning right.",                   photo_url: `${BASE}/team/crew/miruthulaa.jpg`,       linkedin_url: "", display_order: 9  },
  { name: "Hitha Shree Suresh",  role: "Member", tier: "crew", domain: "Marketing",     quote: "All eyes on KALESH",                                                                      photo_url: `${BASE}/team/crew/hita-shree.jpg`,       linkedin_url: "", display_order: 10 },
  { name: "Architha",            role: "Member", tier: "crew", domain: "Marketing",     quote: "I am Kalesh",                                                                             photo_url: `${BASE}/team/crew/architha-sp.jpg`,      linkedin_url: "", display_order: 11 },
  { name: "Nitya Kushwaha",      role: "Member", tier: "crew", domain: "Media",         quote: "At the end of the day, it's night.",                                                      photo_url: `${BASE}/team/crew/nitya-kushwaha.jpg`,   linkedin_url: "", display_order: 12 },
  { name: "Moorty Perepa",       role: "Member", tier: "crew", domain: "3D Space",      quote: "We're going on a trip, on our favourite rocket ship :3",                                 photo_url: `${BASE}/team/crew/moorty.jpg`,           linkedin_url: "", display_order: 13 },
  { name: "Shreya Revankar",     role: "Member", tier: "crew", domain: "Media",         quote: "I'll do it but first I need to cry",                                                      photo_url: `${BASE}/team/crew/shreya-revankar.jpg`,  linkedin_url: "", display_order: 14 },
  { name: "Ragul Rajkumar",      role: "Member", tier: "crew", domain: "Automotive",    quote: "I'd rather fix the issue permanently than put a band aid on it.",                         photo_url: `${BASE}/team/crew/ragul-rajkumar.jpeg`,  linkedin_url: "", display_order: 15 },
  { name: "Maniish Rajendran",   role: "Member", tier: "crew", domain: "Programming",   quote: "Fill in Later",                                                                           photo_url: `${BASE}/team/crew/manish.png`,           linkedin_url: "", display_order: 16 },
  { name: "Ankit Bembalgi",      role: "Member", tier: "crew", domain: "Automotive",    quote: "The harder I push, the more I find within myself.",                                       photo_url: `${BASE}/team/crew/ankit-bembalgi.jpg`,   linkedin_url: "", display_order: 17 },
  { name: "Vinay Dasari",        role: "Member", tier: "crew", domain: "Automotive",    quote: "If you told me something, I probably forgot it",                                          photo_url: `${BASE}/team/crew/vinay-dasari.jpg`,     linkedin_url: "", display_order: 18 },
  { name: "Kethan K B",          role: "Member", tier: "crew", domain: "Robotics",      quote: "NTG much",                                                                                photo_url: `${BASE}/team/crew/kethan.jpg`,           linkedin_url: "", display_order: 19 },
  { name: "Sumedh B Rao",        role: "Member", tier: "crew", domain: "Automotive",    quote: "Best club in PESECC!! Don't care what anyone says.",                                      photo_url: `${BASE}/team/crew/sumedh-b-rao.png`,    linkedin_url: "", display_order: 20 },
  { name: "Mancirat Singh",      role: "Member", tier: "crew", domain: "Automotive",    quote: "In mad love with cars and engines...",                                                     photo_url: `${BASE}/team/crew/mancirat.jpeg`,        linkedin_url: "", display_order: 21 },
  { name: "Sharanya N",          role: "Member", tier: "crew", domain: "Automotive",    quote: "",                                                                                        photo_url: `${BASE}/team/crew/sharanya.jpg`,         linkedin_url: "", display_order: 22 },

  // ── LEGACY ────────────────────────────────────────────────────────────
  { name: "Arun Murugappan I",  role: "Club Head",          tier: "legacy", domain: "Automotive", quote: "Machines n Circuits - A true obsession",                                                              photo_url: `${BASE}/team/legacy/arun.jpg`,           linkedin_url: "", display_order: 1 },
  { name: "Shibu Rangarajan",   role: "Member",             tier: "legacy", domain: "Automotive", quote: "Idk man put off smh",                                                                                  photo_url: `${BASE}/team/legacy/shibu.jpg`,          linkedin_url: "", display_order: 2 },
  { name: "Swetha Ranganathan", role: "Member",             tier: "legacy", domain: "Automotive", quote: "Never, ever, forget to have fun. #Lifeatfullthrottle",                                                photo_url: `${BASE}/team/legacy/swetha.png`,         linkedin_url: "", display_order: 3 },
  { name: "Ram Prakhyath",      role: "Member",             tier: "legacy", domain: "Automotive", quote: "Grazie Ragazzi",                                                                                       photo_url: `${BASE}/team/legacy/ram-prakhyath.png`,  linkedin_url: "", display_order: 4 },
  { name: "Harshith R",         role: "Member",             tier: "legacy", domain: "Automotive", quote: "#LifeatFullThrottle",                                                                                   photo_url: `${BASE}/team/legacy/harshith.jpg`,       linkedin_url: "", display_order: 5 },
  { name: "Alan G Lal",         role: "Head of Go-karting", tier: "legacy", domain: "Automotive", quote: "For me, racing isn't about the track. It's about the team that builds the machine",                   photo_url: `${BASE}/team/legacy/alan.jpeg`,          linkedin_url: "", display_order: 6 },
  { name: "Anantha Krishnan",   role: "Member",             tier: "legacy", domain: "Automotive", quote: "Life's too short for Slow Laps",                                                                       photo_url: `${BASE}/team/legacy/anantha.jpeg`,       linkedin_url: "", display_order: 7 },
  { name: "Karthik",            role: "Member",             tier: "legacy", domain: "Automotive", quote: "Art without Engineering is dreaming, Engineering without Art is calculating.",                         photo_url: `${BASE}/team/legacy/karthik.jpg`,        linkedin_url: "", display_order: 8 },
  { name: "Keshav",             role: "Member",             tier: "legacy", domain: "Automotive", quote: "",                                                                                                     photo_url: `${BASE}/team/legacy/keshav.jpg`,         linkedin_url: "", display_order: 9 },
]

async function seed() {
  console.log(`Seeding ${members.length} team members...`)
  let inserted = 0
  let skipped = 0

  for (const m of members) {
    const existing = await sql`SELECT id FROM team_members WHERE name = ${m.name} LIMIT 1`
    if (existing.length > 0) {
      console.log(`  SKIP  ${m.name}`)
      skipped++
      continue
    }
    await sql`
      INSERT INTO team_members (name, role, tier, domain, quote, photo_url, linkedin_url, is_active, display_order)
      VALUES (${m.name}, ${m.role}, ${m.tier}, ${m.domain}, ${m.quote}, ${m.photo_url}, ${m.linkedin_url}, true, ${m.display_order})
    `
    console.log(`  OK    ${m.name} (${m.tier})`)
    inserted++
  }

  console.log(`\n✅ Done! Inserted: ${inserted}  Skipped: ${skipped}`)
}

seed().catch((e) => { console.error(e); process.exit(1) })