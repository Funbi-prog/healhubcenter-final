// src/dashboard/pages/LibraryPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import "../styles/Library.css";

/**
 * LibraryPage — Demo-ready (30-book dataset)
 * - Drop-in replacement for your LibraryPage.jsx
 * - Shelves: Continue Reading, For You, Therapist Approved, Trending, New Releases, People Like You Read
 * - Theme toggle: pastel | cinema | blend
 * - Search modal and realistic demo data (covers from Unsplash/OpenLibrary)
 */

/* ---------------- Demo dataset (30 books) ---------------- */
const BOOKS = [
  // Psychology / Classics
  {
    id: "b001",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.62,
    emotionalImpact: 0.62,
    healingBenefit: 0.25,
    credibility: 0.98,
    timeMins: 780,
    tags: ["Cognition", "Decision-making"],
    createdAt: "2011-10-25",
    description:
      "A deep dive into the two systems that shape the way we think and decide.",
  },
  {
    id: "b002",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    category: "Productivity",
    cover:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.18,
    emotionalImpact: 0.46,
    healingBenefit: 0.28,
    credibility: 0.9,
    timeMins: 360,
    tags: ["Habits", "Change"],
    createdAt: "2012-02-28",
    description:
      "How habits form, how to change them, and how organizations use habit loops.",
  },

  // Productivity / Deep Work
  {
    id: "b003",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    cover:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.34,
    emotionalImpact: 0.42,
    healingBenefit: 0.22,
    credibility: 0.93,
    timeMins: 300,
    tags: ["Focus", "Work"],
    createdAt: "2016-01-05",
    description:
      "Practical strategies for focused success in distracted times.",
  },

  // Finance
  {
    id: "b004",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    cover:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.05,
    emotionalImpact: 0.28,
    healingBenefit: 0.12,
    credibility: 0.78,
    timeMins: 240,
    tags: ["Money", "Investing"],
    createdAt: "1997-04-01",
    description:
      "A popular primer on financial literacy and entrepreneurial thinking.",
  },

  // Faith
  {
    id: "b005",
    title: "The Purpose Driven Life",
    author: "Rick Warren",
    category: "Faith",
    cover:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.0,
    emotionalImpact: 0.56,
    healingBenefit: 0.6,
    credibility: 0.85,
    timeMins: 420,
    tags: ["Faith", "Purpose"],
    createdAt: "2002-10-01",
    description:
      "A spiritual guide for finding purpose and meaning over 40 days of readings.",
  },

  // Leadership
  {
    id: "b006",
    title: "Leaders Eat Last",
    author: "Simon Sinek",
    category: "Leadership",
    cover:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.12,
    emotionalImpact: 0.48,
    healingBenefit: 0.18,
    credibility: 0.9,
    timeMins: 360,
    tags: ["Leadership", "Teams"],
    createdAt: "2014-01-20",
    description:
      "Why creating safety at work builds trust, innovation and results.",
  },

  // Love / Relationships
  {
    id: "b007",
    title: "Attached",
    author: "Dr. Amir Levine & Rachel Heller",
    category: "Love",
    cover:
      "https://images.unsplash.com/photo-1496307042754-88b36a2f8d8a?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.0,
    emotionalImpact: 0.58,
    healingBenefit: 0.46,
    credibility: 0.86,
    timeMins: 260,
    tags: ["Relationships", "Attachment"],
    createdAt: "2010-05-10",
    description:
      "An accessible guide to adult attachment theory and relationship patterns.",
  },

  // Wellness / Healing (cinematic)
  {
    id: "b008",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    category: "Healing",
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.0,
    emotionalImpact: 0.96,
    healingBenefit: 0.98,
    credibility: 0.99,
    timeMins: 900,
    tags: ["Trauma", "Therapy"],
    createdAt: "2014-09-15",
    description:
      "Foundational work on trauma, memory, and recovery through body-based interventions.",
  },

  {
    id: "b009",
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    category: "Wellness",
    cover:
      "https://images.unsplash.com/photo-1496307042754-8b7bfad0b6d6?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.21,
    emotionalImpact: 0.7,
    healingBenefit: 0.64,
    credibility: 0.78,
    timeMins: 220,
    tags: ["Self-Sabotage", "Growth"],
    createdAt: "2020-01-07",
    description:
      "Transformative guide to turn obstacles into self-mastery and growth.",
  },

  // Self-help
  {
    id: "b010",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "Self-Help",
    cover:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.41,
    emotionalImpact: 0.3,
    healingBenefit: 0.22,
    credibility: 0.88,
    timeMins: 260,
    tags: ["Values", "Boundaries"],
    createdAt: "2016-09-13",
    description:
      "A no-nonsense approach to living a better life by choosing what matters.",
  },

  // Biography
  {
    id: "b011",
    title: "Becoming",
    author: "Michelle Obama",
    category: "Biography",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.73,
    emotionalImpact: 0.66,
    healingBenefit: 0.32,
    credibility: 0.97,
    timeMins: 540,
    tags: ["Memoir"],
    createdAt: "2018-11-13",
    description:
      "A personal and intimate memoir about family, identity, and purpose.",
  },

  // Creativity
  {
    id: "b012",
    title: "The Artist's Way",
    author: "Julia Cameron",
    category: "Creativity",
    cover:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.07,
    emotionalImpact: 0.54,
    healingBenefit: 0.4,
    credibility: 0.85,
    timeMins: 480,
    tags: ["Creativity", "Recovery"],
    createdAt: "1992-11-01",
    description:
      "A book for creative recovery and daily practice to unblock artistic flow.",
  },

  // Classics & Thinking
  {
    id: "b013",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    category: "Psychology",
    cover:
      "https://images.unsplash.com/photo-1496104679561-38d2b4d0fda6?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.88,
    emotionalImpact: 0.95,
    healingBenefit: 0.9,
    credibility: 0.99,
    timeMins: 180,
    tags: ["Meaning", "Resilience"],
    createdAt: "1946-03-01",
    description:
      "Reflections on finding purpose even amid the worst suffering — a timeless classic.",
  },

  // More Wellness / Cinematic selections
  {
    id: "b014",
    title: "A New Earth",
    author: "Eckhart Tolle",
    category: "Wellness",
    cover:
      "https://images.unsplash.com/photo-1504164996022-09080787b6b3?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.02,
    emotionalImpact: 0.72,
    healingBenefit: 0.66,
    credibility: 0.9,
    timeMins: 260,
    tags: ["Presence", "Consciousness"],
    createdAt: "2005-02-15",
    description:
      "A spiritual guide to awakening and transcending ego-based living.",
  },

  {
    id: "b015",
    title: "The Comfort Book",
    author: "Matt Haig",
    category: "Wellness",
    cover:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.14,
    emotionalImpact: 0.62,
    healingBenefit: 0.7,
    credibility: 0.86,
    timeMins: 200,
    tags: ["Comfort", "Mental Health"],
    createdAt: "2021-11-02",
    description:
      "Gentle reflections and small comforts for anxious days and quiet nights.",
  },

  // Leadership / Business
  {
    id: "b016",
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Leadership",
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.05,
    emotionalImpact: 0.28,
    healingBenefit: 0.1,
    credibility: 0.92,
    timeMins: 300,
    tags: ["Startups", "Innovation"],
    createdAt: "2014-09-16",
    description:
      "Notes on startups, innovation, and creating unique value in the world.",
  },

  // Finance / Habits
  {
    id: "b017",
    title: "Your Money or Your Life",
    author: "Vicki Robin & Joe Dominguez",
    category: "Finance",
    cover:
      "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.0,
    emotionalImpact: 0.33,
    healingBenefit: 0.15,
    credibility: 0.88,
    timeMins: 420,
    tags: ["Money", "Minimalism"],
    createdAt: "1992-04-01",
    description:
      "A transformative program for reshaping your relationship with money.",
  },

  // Emotional intelligence / self-help
  {
    id: "b018",
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    category: "Psychology",
    cover:
      "https://images.unsplash.com/photo-1509099836639-18ba60f5cf0e?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.27,
    emotionalImpact: 0.55,
    healingBenefit: 0.4,
    credibility: 0.95,
    timeMins: 360,
    tags: ["EQ", "Self-awareness"],
    createdAt: "1995-03-01",
    description:
      "Why EQ matters for leadership, relationships, and personal effectiveness.",
  },

  // Creativity / Design
  {
    id: "b019",
    title: "Steal Like an Artist",
    author: "Austin Kleon",
    category: "Creativity",
    cover:
      "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.51,
    emotionalImpact: 0.35,
    healingBenefit: 0.2,
    credibility: 0.82,
    timeMins: 160,
    tags: ["Creativity", "Inspiration"],
    createdAt: "2012-06-05",
    description:
      "Short, accessible prompts and ideas to kickstart creative work.",
  },

  // Bio / Leadership
  {
    id: "b020",
    title: "Shoe Dog",
    author: "Phil Knight",
    category: "Biography",
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.09,
    emotionalImpact: 0.44,
    healingBenefit: 0.12,
    credibility: 0.9,
    timeMins: 420,
    tags: ["Entrepreneurship", "Memoir"],
    createdAt: "2016-04-26",
    description:
      "A candid memoir from the founder of Nike — failure, risk and persistence.",
  },

  // Self-care
  {
    id: "b021",
    title: "Tiny Habits",
    author: "BJ Fogg",
    category: "Productivity",
    cover:
      "https://images.unsplash.com/photo-1507842217343-9a82d0aed8a9?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.33,
    emotionalImpact: 0.36,
    healingBenefit: 0.22,
    credibility: 0.9,
    timeMins: 180,
    tags: ["Habits", "Behavior"],
    createdAt: "2020-01-01",
    description:
      "Tiny changes that lead to big results — a friendly behavioral model.",
  },

  // Wellness / Cinematic
  {
    id: "b022",
    title: "Women Who Run With the Wolves",
    author: "Clarissa Pinkola Estés",
    category: "Wellness",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.0,
    emotionalImpact: 0.79,
    healingBenefit: 0.85,
    credibility: 0.9,
    timeMins: 780,
    tags: ["Archetype", "Stories"],
    createdAt: "1992-05-01",
    description:
      "A poetic exploration of feminine power, myth and healing through stories.",
  },

  {
    id: "b023",
    title: "The Wisdom of Insecurity",
    author: "Alan Watts",
    category: "Wellness",
    cover:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.06,
    emotionalImpact: 0.64,
    healingBenefit: 0.58,
    credibility: 0.88,
    timeMins: 200,
    tags: ["Philosophy", "Presence"],
    createdAt: "1951-06-01",
    description:
      "An invitation to live in the present and accept life’s flowing uncertainty.",
  },

  // Trauma / therapeutic
  {
    id: "b024",
    title: "The Gifts of Imperfection",
    author: "Brené Brown",
    category: "Healing",
    cover:
      "https://images.unsplash.com/photo-1484516755947-58b7d187b1a9?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.29,
    emotionalImpact: 0.6,
    healingBenefit: 0.7,
    credibility: 0.95,
    timeMins: 280,
    tags: ["Vulnerability", "Courage"],
    createdAt: "2010-12-01",
    description:
      "Research-based insights on vulnerability, shame resilience, and wholehearted living.",
  },

  // Popular psychology / modern
  {
    id: "b025",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Productivity",
    cover:
      "https://images.unsplash.com/photo-1526318605234-6d9726a2e1ad?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.02,
    emotionalImpact: 0.5,
    healingBenefit: 0.32,
    credibility: 0.95,
    timeMins: 240,
    tags: ["Habits", "Systems"],
    createdAt: "2018-10-16",
    description:
      "Tiny changes, remarkable results — practical habit design for daily life.",
  },

  // Creativity / essays
  {
    id: "b026",
    title: "101 Essays That Will Change the Way You Think",
    author: "Brianna Wiest",
    category: "Creativity",
    cover:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.48,
    emotionalImpact: 0.6,
    healingBenefit: 0.42,
    credibility: 0.84,
    timeMins: 320,
    tags: ["Essays", "Mindset"],
    createdAt: "2017-04-01",
    description:
      "Short, thoughtful essays on emotional growth, clarity, and courage.",
  },

  // Newer releases / wellness
  {
    id: "b027",
    title: "The Comfort Crisis",
    author: "Michael Easter",
    category: "Wellness",
    cover:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.0,
    emotionalImpact: 0.44,
    healingBenefit: 0.32,
    credibility: 0.82,
    timeMins: 320,
    tags: ["Challenge", "Resilience"],
    createdAt: "2021-05-25",
    description:
      "How embracing manageable discomfort can sharpen your body and mind.",
  },

  // Career / leadership
  {
    id: "b028",
    title: "Radical Candor",
    author: "Kim Scott",
    category: "Leadership",
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.22,
    emotionalImpact: 0.36,
    healingBenefit: 0.12,
    credibility: 0.9,
    timeMins: 260,
    tags: ["Feedback", "Management"],
    createdAt: "2017-03-01",
    description:
      "A guide to giving and receiving feedback that builds relationships and results.",
  },

  // Mental health / narrative
  {
    id: "b029",
    title: "Reasons to Stay Alive",
    author: "Matt Haig",
    category: "Mental Health",
    cover:
      "https://images.unsplash.com/photo-1522202176988-0b4f63b2d0a3?w=1200&q=60&auto=format&fit=crop",
    readingProgress: 0.0,
    emotionalImpact: 0.9,
    healingBenefit: 0.87,
    credibility: 0.86,
    timeMins: 210,
    tags: ["Depression", "Memoir"],
    createdAt: "2015-07-01",
    description:
      "A candid, hopeful memoir about depression and the small practices that keep someone going.",
  },

  // Bonus business / mindset
  {
    id: "b030",
    title: "Mindset",
    author: "Carol S. Dweck",
    category: "Psychology",
    cover:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=60&w=1200&auto=format&fit=crop",
    readingProgress: 0.39,
    emotionalImpact: 0.45,
    healingBenefit: 0.28,
    credibility: 0.94,
    timeMins: 340,
    tags: ["Growth", "Education"],
    createdAt: "2006-02-14",
    description:
      "How our beliefs about ability shape effort, learning and success.",
  },
];

/* ----------------------- Recommendation engine (demo) ----------------------- */
function buildShelves(books = []) {
  const used = new Set();

  const continueReading = books
    .filter((b) => b.readingProgress > 0)
    .sort((a, b) => b.readingProgress - a.readingProgress)
    .slice(0, 8);
  continueReading.forEach((b) => used.add(b.id));

  const therapist = books
    .filter((b) => !used.has(b.id))
    .sort((a, b) => b.healingBenefit + b.credibility - (a.healingBenefit + a.credibility))
    .slice(0, 8);
  therapist.forEach((b) => used.add(b.id));

  const forYou = books
    .filter((b) => !used.has(b.id))
    .sort((a, b) => b.emotionalImpact - a.emotionalImpact)
    .slice(0, 8);
  forYou.forEach((b) => used.add(b.id));

  const trending = books
    .filter((b) => !used.has(b.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);
  trending.forEach((b) => used.add(b.id));

  const newReleases = books
    .filter((b) => !used.has(b.id))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);
  newReleases.forEach((b) => used.add(b.id));

  const peopleLikeYou = books.filter((b) => !used.has(b.id)).slice(0, 8);

  return { continueReading, forYou, therapist, trending, newReleases, peopleLikeYou };
}

/* --------------------- Small UI subcomponents --------------------- */

function HeroBanner({ onOpenSearch }) {
  return (
    <section className="library-hero">
      <div className="hero-inner">
        <h2>Discover reads that meet you where you are</h2>
        <p className="hero-sub">
          Personal recommendations, therapist-friendly picks, and cinematic wellness — calm, curated, and real.
        </p>

        <div className="hero-actions">
          <button className="btn-cta" onClick={onOpenSearch}>
            Search the library
          </button>

          <div className="hero-meta">
            <div className="meta-item">
              <strong>For You</strong>
              <span>Personalized shelf</span>
            </div>
            <div className="meta-item">
              <strong>Therapist Picks</strong>
              <span>Clinically curated</span>
            </div>
            <div className="meta-item">
              <strong>New Drops</strong>
              <span>Latest wellness reads</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-vignette" aria-hidden />
    </section>
  );
}

function BookCard({ book, theme = "pastel" }) {
  const pct = Math.round((book.readingProgress || 0) * 100);
  return (
    <article className="book-card-glass" data-theme={theme}>
      <div className="book-cover-wrap">
        <img src={book.cover} alt={book.title} className="book-cover" loading="lazy" />
        <div className="lottie-slot" title="micro-animation (Lottie placeholder)">{/* add lottie-player here */}</div>
        <span className="sparkles" aria-hidden />
      </div>

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>

        <div className="book-meta-row">
          <span className="book-cat">{book.category}</span>
          <span className="book-time">{Math.round(book.timeMins / 60)} hrs</span>
        </div>

        <p className="book-desc">{book.description}</p>

        <div className="card-footer">
          <div className="progress-wrap" aria-hidden>
            <svg className="progress-ring" viewBox="0 0 36 36">
              <path
                className="ring-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="ring"
                strokeDasharray={`${pct}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="progress-text">{pct}%</div>
          </div>

          <div className="card-actions">
            <a className="read-btn" href={book.fileUrl || "#"}>Read</a>
            <button className="more-btn" title="More">•••</button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ShelfRow({ title, books = [], theme = "pastel" }) {
  return (
    <section className="shelf-row">
      <div className="shelf-header">
        <h3>{title}</h3>
        <div className="shelf-actions">
          <button className="see-all">See all</button>
        </div>
      </div>

      <div className="shelf-scroll" role="list">
        {books.map((b) => (
          <div key={b.id} className="shelf-item" role="listitem">
            <BookCard book={b} theme={theme} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Main Page --------------------------- */

export default function LibraryPage() {
  const [themeMode, setThemeMode] = useState("pastel"); // pastel | cinema | blend
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState(BOOKS);

  const shelves = useMemo(() => buildShelves(books), [books]);

  const searchFilter = (arr) => {
    const q = query.trim().toLowerCase();
    if (!q) return arr;
    return arr.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.category && b.category.toLowerCase().includes(q)) ||
        (b.tags && b.tags.join(" ").toLowerCase().includes(q))
    );
  };

  useEffect(() => {
    const root = document.querySelector(".library-page");
    if (root) root.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content library-page" data-theme={themeMode}>
          <div className="library-top-controls">
            <div className="left">
              <h1 className="library-title">HealHub Growth Library</h1>
              <p className="library-sub">A calm, curated place to read and restore.</p>
            </div>

            <div className="right-controls">
              <div className="theme-toggle">
                <label>Theme</label>
                <select value={themeMode} onChange={(e) => setThemeMode(e.target.value)}>
                  <option value="pastel">Pastel Calm</option>
                  <option value="cinema">Deep Black + Gold</option>
                  <option value="blend">Blend (Pastel → Cinema)</option>
                </select>
              </div>

              <button className="btn-ghost" onClick={() => setSearchOpen((s) => !s)}>
                Search
              </button>
            </div>
          </div>

          <HeroBanner onOpenSearch={() => setSearchOpen(true)} />

          <div className="shelves">
            <ShelfRow title="Continue Reading" books={searchFilter(shelves.continueReading)} theme={themeMode} />
            <ShelfRow title="For You" books={searchFilter(shelves.forYou)} theme={themeMode} />
            <ShelfRow title="Therapist Approved" books={searchFilter(shelves.therapist)} theme={themeMode} />
            <ShelfRow title="Trending" books={searchFilter(shelves.trending)} theme={themeMode} />
            <ShelfRow title="New Releases" books={searchFilter(shelves.newReleases)} theme={themeMode} />
            <ShelfRow title="People Like You Read" books={searchFilter(shelves.peopleLikeYou)} theme={themeMode} />
          </div>

          <div className={`search-modal ${searchOpen ? "open" : ""}`} role="dialog" aria-modal="true">
            <div className="search-inner">
              <div className="search-head">
                <input
                  autoFocus
                  className="search-input"
                  placeholder="Search books, authors, tags..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="search-close" onClick={() => setSearchOpen(false)}>Close</button>
              </div>

              <div className="search-results">
                {query ? (
                  (() => {
                    const merged = [
                      ...shelves.continueReading,
                      ...shelves.forYou,
                      ...shelves.therapist,
                      ...shelves.trending,
                      ...shelves.newReleases,
                      ...shelves.peopleLikeYou,
                    ];
                    const uniq = Array.from(new Map(merged.map((b) => [b.id, b])).values());
                    const results = uniq.filter((b) =>
                      [b.title, b.author, b.category, ...(b.tags || [])].join(" ").toLowerCase().includes(query.toLowerCase())
                    );
                    if (results.length === 0) {
                      return <div className="search-empty">No results</div>;
                    }
                    return (
                      <div className="search-grid">
                        {results.map((b) => (
                          <div key={b.id} className="search-card">
                            <img src={b.cover} alt={b.title} />
                            <div>
                              <strong>{b.title}</strong>
                              <div className="muted">{b.author} • {b.category}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()
                ) : (
                  <div className="search-empty">Type to find books, authors or tags</div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
