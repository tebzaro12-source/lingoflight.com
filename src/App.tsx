import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import ProficiencyTestPage from './ProficiencyTest';
import CefrPage from './Cefr';
import LibraryPage from './Library';
import AdminDashboard from './AdminDashboard';
import BookingPage from './BookingPage';
import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';
import { useAuth } from './lib/AuthContext';
import {
  BookOpen,
  Briefcase,
  Check,
  ChevronRight,
  Globe,
  GraduationCap,
  Lightbulb,
  Menu,
  MessageSquare,
  PenTool,
  Plane,
  Presentation,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  X
} from 'lucide-react';

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const navLinks = [
  { name: 'Programs', href: '#programs' },
  { name: 'CEFR Framework', href: 'cefr' },
  { name: 'The Method', href: '#method' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Book Lesson', href: 'book' },
  { name: 'Proficiency Test', href: 'proficiency-test' },
  { name: 'Library', href: 'library' },
  { name: 'Contact', href: '#contact' },
];

const generalEnglishMarkdown = `
## **Course Title:** General English (All Levels)

## **Course Structure:**

Divided into 4 levels:

* **Level 1:** Beginner
* **Level 2:** Elementary
* **Level 3:** Intermediate
* **Level 4:** Upper-Intermediate / Advanced

Learners can enter at the appropriate level via a placement test.

---

## **Overall Course Objectives**

By the end of the full program, learners will:

* Communicate confidently in personal, social, and professional contexts
* Understand a variety of spoken and written English
* Use accurate grammar and a wide vocabulary range
* Adapt language to different situations and audiences
* Demonstrate fluency and coherence in speaking and writing

---

# **Level 1: Beginner (A1)**

### Focus:

Basic communication and survival English

### Key Content:

* Alphabet, pronunciation, and phonics
* Greetings and introductions
* Numbers, time, and basic expressions
* Present simple tense
* Everyday vocabulary (family, food, places)

### Skills:

* Listening: simple instructions
* Speaking: basic conversations
* Reading: short sentences
* Writing: simple sentences

---

# **Level 2: Elementary (A2)**

### Focus:

Building confidence in everyday communication

### Key Content:

* Present continuous & past simple
* Common verbs and expressions
* Functional language (shopping, travel)
* Basic sentence expansion

### Skills:

* Listening: short conversations
* Speaking: describing daily routines
* Reading: short paragraphs
* Writing: short messages and emails

---

# **Level 3: Intermediate (B1–B2)**

### Focus:

Fluency and accuracy in common situations

### Key Content:

* Present perfect, future forms
* Modal verbs (should, must, might)
* Phrasal verbs and idioms (intro)
* Opinion and discussion language

### Skills:

* Listening: longer conversations and key details
* Speaking: discussions and storytelling
* Reading: articles and narratives
* Writing: structured paragraphs and informal essays

---

# **Level 4: Upper-Intermediate / Advanced (B2–C1)**

### Focus:

Refinement, fluency, and complex communication

### Key Content:

* Advanced grammar (conditionals, passive voice)
* Complex sentence structures
* Idiomatic expressions and collocations
* Formal vs informal language

### Skills:

* Listening: lectures, interviews, varied accents
* Speaking: presentations and debates
* Reading: authentic texts (news, reports)
* Writing: essays, reports, formal emails

---

## **Core Modules Across All Levels**

Each level integrates these four strands:

### 1. **Grammar & Vocabulary**

Progressive development from basic to advanced usage

### 2. **Listening & Speaking**

Interactive communication, pronunciation, and fluency practice

### 3. **Reading**

From simple texts to authentic materials

### 4. **Writing**

From sentences to structured, coherent texts

---

## **Assessment Strategy**

* Placement test (entry)
* Continuous assessment (quizzes, assignments)
* Speaking evaluations
* Mid-level progress tests
* Final exam per level

---

## **Teaching Approach**

* Communicative Language Teaching (CLT)
* Task-based learning
* Real-life scenarios and role play
* Group and pair work
* Use of multimedia and digital tools

---

## **Optional Add-ons (All Levels)**

* Pronunciation clinics
* Conversation clubs
* Business English workshops
* Exam preparation (e.g., IELTS/TOEFL)
`;

const businessEnglishMarkdown = `
# Course Title: Business English Communication

**Course Duration:**
10–12 weeks (or modular format)

**Target Audience:**
Professionals, job seekers, and students preparing for the workplace

## Course Objectives

By the end of the course, learners will:

* Communicate clearly and professionally in business settings
* Participate effectively in meetings, presentations, and negotiations
* Write formal business documents (emails, reports, proposals)
* Use industry-appropriate vocabulary and tone
* Build confidence in workplace communication

## Module 1: Introduction to Business Communication
* Understanding professional communication
* Formal vs informal language
* Workplace etiquette and cultural awareness
* Networking basics

## Module 2: Professional Speaking Skills
* Introducing yourself in a business context
* Small talk and relationship building
* Telephone and video call communication
* Handling workplace conversations

## Module 3: Business Vocabulary & Expressions
* Common business terms and jargon
* Collocations (e.g., “meet a deadline,” “close a deal”)
* Industry-specific vocabulary (customizable)
* Polite and diplomatic language

## Module 4: Business Writing – Emails & Messages
* Writing clear and professional emails
* Structuring messages effectively
* Requests, complaints, and follow-ups
* Tone and formality

## Module 5: Meetings & Discussions
* Participating in meetings
* Expressing opinions and agreeing/disagreeing
* Interrupting politely
* Taking and writing meeting notes

## Module 6: Presentations
* Structuring a presentation
* Using visual aids
* Signposting language
* Handling questions confidently

## Module 7: Negotiation Skills
* Language for negotiation
* Persuasion techniques
* Making offers and counteroffers
* Reaching agreements

## Module 8: Business Writing – Reports & Proposals
* Writing reports (structure and clarity)
* Executive summaries
* Proposals and recommendations
* Editing and proofreading

## Module 9: Job Search & Career Skills
* Writing CVs and cover letters
* Interview skills and common questions
* Describing skills and experience
* Personal branding

## Module 10: Cross-Cultural Communication
* Communicating with global teams
* Cultural differences in business
* Avoiding misunderstandings
* Professional etiquette across cultures

## Assessment Methods
* Role plays (meetings, negotiations, interviews)
* Written assignments (emails, reports)
* Presentations
* Participation and fluency evaluation
* Final project (e.g., business presentation or case study)

## Teaching Methods
* Case studies and real-world scenarios
* Group discussions and simulations
* Role-playing activities
* Video/audio analysis
* Peer feedback

## Materials
* Business English textbook
* Authentic materials (emails, reports, videos)
* Templates (CVs, emails, proposals)
* Online tools and resources
`;

const ieltsMarkdown = `
# Course Title: IELTS Preparation Course

**Course Duration:**
8–12 weeks (adjustable based on level and target band)

**Target Audience:**
Students and professionals preparing for the IELTS

## Course Objectives

By the end of the course, learners will:

* Understand the format and requirements of all IELTS sections
* Develop strategies to improve performance in each skill
* Increase accuracy, fluency, and confidence
* Achieve their target band score

## Module 1: IELTS Overview & Diagnostic
* Structure of the IELTS test (Academic vs General Training)
* Band score system and assessment criteria
* Common challenges and mistakes
* Full diagnostic test

## Module 2: Listening Skills
**Focus:** Understanding spoken English in different contexts

**Key Content:**
* Types of listening questions (MCQs, matching, maps)
* Listening for gist vs detail
* Note-taking strategies
* Recognizing paraphrasing and synonyms

**Practice:**
* Section-based listening exercises (1–4)
* Timed practice tests

## Module 3: Reading Skills
*Academic & General Training tracks*

**Key Content:**
* Skimming and scanning techniques
* Identifying main ideas and supporting details
* Handling different question types (True/False/Not Given, matching headings)
* Time management strategies

**Practice:**
* Passage-based exercises
* Timed reading tests

## Module 4: Writing Task 1
**Academic:**
* Describing graphs, charts, and processes

**General Training:**
* Writing formal and informal letters

**Key Skills:**
* Task achievement
* Data description / tone control
* Coherence and cohesion
* Vocabulary and grammar accuracy

## Module 5: Writing Task 2 (Essay Writing)
**Essay Types:**
* Opinion (agree/disagree)
* Discussion essays
* Problem–solution essays
* Advantages/disadvantages

**Key Skills:**
* Structuring essays (introduction, body, conclusion)
* Developing ideas clearly
* Using linking devices
* Avoiding common grammar mistakes

## Module 6: Speaking Skills
**Format:**
* Part 1: Introduction & interview
* Part 2: Long turn (cue card)
* Part 3: Discussion

**Key Skills:**
* Fluency and coherence
* Pronunciation and intonation
* Expanding answers
* Using a range of vocabulary

**Practice:**
* Mock speaking interviews
* Feedback and correction

## Module 7: Grammar & Vocabulary for IELTS
* Common grammar for higher band scores
* Complex sentence structures
* Topic-specific vocabulary (education, environment, technology)
* Paraphrasing techniques

## Module 8: Exam Strategies & Time Management
* Managing time in each section
* Avoiding traps and common errors
* Answer checking techniques
* Stress management during the exam

## Module 9: Practice Tests & Feedback
* Full-length practice exams
* Timed conditions
* Individual performance analysis
* Targeted improvement plans

## Assessment Methods
* Diagnostic test (start)
* Weekly skill-based assessments
* Writing assignments (Task 1 & Task 2)
* Speaking mock tests
* Final full IELTS simulation

## Teaching Methods
* Task-based learning
* Exam-focused strategies
* Guided practice and feedback
* Peer review sessions
* Use of authentic IELTS materials

## Materials
* Official IELTS practice tests
* Sample answer scripts
* Audio recordings
* Vocabulary lists and grammar guides
`;

const toeflMarkdown = `
# Course Title: TOEFL iBT Preparation Course

**Course Duration:**
8–12 weeks (can be intensive or extended)

**Target Audience:**
Students preparing for the TOEFL iBT

## Course Objectives

By the end of the course, learners will:

* Understand the structure and timing of each TOEFL section
* Apply effective strategies for answering different question types
* Improve academic English skills (reading, listening, speaking, writing)
* Increase confidence and achieve their target score

## Module 1: TOEFL Overview & Diagnostic
* Structure of the TOEFL iBT test
* Scoring system and performance criteria
* Question types across all sections
* Full diagnostic test

## Module 2: Reading Skills
**Focus:** Understanding academic texts

**Key Content:**
* Identifying main ideas and details
* Vocabulary in context
* Inference questions
* Summarizing information

**Practice:**
* Passage-based exercises
* Timed reading sets

## Module 3: Listening Skills
**Focus:** Academic lectures and conversations

**Key Content:**
* Listening for main ideas and supporting details
* Note-taking techniques
* Understanding tone and attitude
* Recognizing organization of ideas

**Practice:**
* Lecture and conversation recordings
* Timed listening tasks

## Module 4: Speaking Skills
**Tasks:**
* Independent speaking (personal opinions)
* Integrated speaking (reading + listening + speaking)

**Key Skills:**
* Organizing responses quickly
* Speaking clearly and fluently
* Using appropriate vocabulary and grammar
* Time management

**Practice:**
* Timed speaking responses
* Mock speaking tasks with feedback

## Module 5: Writing Skills
**Tasks:**
* Integrated writing (reading + listening + writing)
* Independent essay writing

**Key Skills:**
* Structuring responses
* Synthesizing information
* Developing arguments
* Grammar and coherence

**Practice:**
* Essay writing under timed conditions
* Feedback and revision

## Module 6: Grammar & Vocabulary for TOEFL
* Academic vocabulary development
* Word families and collocations
* Sentence variety and complexity
* Common grammar issues

## Module 7: Note-Taking & Integrated Skills
* Effective note-taking strategies
* Combining listening, reading, and writing skills
* Practice with integrated tasks

## Module 8: Test Strategies & Time Management
* Managing time in each section
* Eliminating wrong answers
* Dealing with difficult questions
* Maintaining focus during long exams

## Module 9: Practice Tests & Performance Analysis
* Full-length TOEFL practice tests
* Timed exam simulations
* Score analysis and feedback
* Personalized improvement plans

## Assessment Methods
* Diagnostic test (beginning)
* Weekly quizzes
* Speaking and writing evaluations
* Sectional tests (reading/listening)
* Final full TOEFL simulation

## Teaching Methods
* Strategy-based instruction
* Task-based learning
* Real TOEFL-style practice
* Peer and instructor feedback
* Use of multimedia (audio lectures, sample responses)

## Materials
* Official TOEFL practice tests
* Academic articles and lecture recordings
* Sample essays and speaking responses
* Vocabulary lists and grammar guides
`;

const cambridgeMarkdown = `
# Course Title: Cambridge English Exam Preparation

**Course Duration:**
10–16 weeks (depending on level and exam)

**Target Audience:**
Students preparing for Cambridge English qualifications such as:
* B2 First
* C1 Advanced
* C2 Proficiency

## Course Objectives

By the end of the course, learners will:

* Understand the format and expectations of Cambridge exams
* Develop advanced skills in reading, writing, listening, and speaking
* Use a wide range of vocabulary and accurate grammar
* Apply effective exam strategies and time management
* Achieve their target Cambridge English qualification

## Module 1: Exam Overview & Diagnostic
* Structure of selected Cambridge exam
* Assessment criteria and scoring
* Overview of all paper components
* Diagnostic test to determine level

## Module 2: Reading & Use of English
**Focus:** Language accuracy and reading comprehension

**Key Content:**
* Multiple-choice cloze
* Open cloze
* Word formation
* Key word transformations
* Reading comprehension (gapped texts, matching)

**Skills:**
* Understanding detailed texts
* Recognizing grammar patterns
* Expanding vocabulary

## Module 3: Writing Skills
**Task Types:**
* Essays
* Articles
* Emails/letters
* Reports and reviews (depending on level)

**Key Skills:**
* Structuring different text types
* Developing arguments and ideas
* Register and tone (formal vs informal)
* Coherence and cohesion

## Module 4: Listening Skills
**Focus:** Understanding spoken English in various contexts

**Key Content:**
* Multiple-choice listening
* Sentence completion
* Matching speakers to ideas
* Understanding attitudes and opinions

**Practice:**
* Exposure to different accents
* Timed listening exercises

## Module 5: Speaking Skills
**Format:**
* Interview
* Collaborative task (pair work)
* Individual long turn
* Discussion

**Key Skills:**
* Fluency and interaction
* Turn-taking strategies
* Expressing and justifying opinions
* Comparing and speculating

## Module 6: Grammar & Vocabulary Development
* Advanced grammar structures
* Phrasal verbs and collocations
* Idiomatic language
* Word formation and lexical range

## Module 7: Exam Strategies & Techniques
* Time management for each paper
* Understanding instructions and task requirements
* Avoiding common mistakes
* Answer-checking techniques

## Module 8: Practice Tests & Feedback
* Full exam practice under timed conditions
* Sectional tests
* Detailed feedback and correction
* Individual progress tracking

## Assessment Methods
* Diagnostic test (entry)
* Continuous assessment (weekly tasks)
* Writing assignments
* Speaking evaluations
* Final mock exam

## Teaching Methods
* Communicative approach with exam focus
* Task-based learning
* Pair and group work
* Real exam materials and past papers
* Teacher and peer feedback

## Materials
* Official Cambridge coursebooks
* Practice test papers
* Audio recordings
* Vocabulary and grammar resources
`;

const generalTestMarkdown = `
# Course Title: English Standardized Test Strategies & Skills Mastery

**Course Duration:**
8–12 weeks (flexible intensive or extended format)

**Target Audience:**
Intermediate to advanced learners preparing for English proficiency exams such as:
* IELTS
* TOEFL iBT
* B2 First / C1 Advanced

## Course Objectives

By the end of the course, learners will:

* Understand common structures across major English standardized tests
* Apply universal strategies for reading, listening, speaking, and writing
* Improve accuracy, fluency, and time management
* Recognize question patterns and avoid common traps
* Develop confidence in handling unfamiliar exam formats

## Module 1: Understanding Standardized English Tests
* Overview of major exams (IELTS, TOEFL, Cambridge, etc.)
* Similarities and differences in format
* Scoring systems and band/score interpretation
* Task types across exams

## Module 2: Core Exam Strategy Skills
* Time management techniques
* Question analysis and keyword identification
* Eliminating incorrect answers
* Handling difficult questions strategically
* Guessing strategies when unsure

## Module 3: Reading Strategies
* Skimming for general meaning
* Scanning for specific information
* Identifying paraphrasing and synonyms
* Dealing with multiple-choice and matching questions
* Managing time under pressure

## Module 4: Listening Strategies
* Predicting answers before listening
* Note-taking techniques
* Identifying key information vs distractors
* Understanding different accents
* Handling fast speech and paraphrasing

## Module 5: Speaking Strategies
* Structuring answers clearly (beginning, middle, end)
* Expanding short answers into fluent responses
* Fluency vs accuracy balance
* Using fillers and discourse markers naturally
* Handling nervousness and hesitation

## Module 6: Writing Strategies
* Planning before writing (brainstorming ideas)
* Structuring essays and reports
* Task achievement vs task response awareness
* Coherence and cohesion techniques
* Avoiding common grammar and vocabulary errors

## Module 7: Grammar & Vocabulary for Exams
* High-frequency grammar structures across exams
* Academic and formal vocabulary building
* Paraphrasing skills
* Avoiding repetition
* Collocations and topic-based language

## Module 8: Integrated Skills & Task Combination
* Combining reading + writing (e.g., summaries, integrated tasks)
* Listening + speaking integration
* Managing multi-step tasks efficiently
* Synthesizing information from different sources

## Module 9: Practice Test Strategies
* Full-length practice exams under timed conditions
* Section-by-section breakdown analysis
* Identifying personal weaknesses
* Improving performance through feedback

## Module 10: Exam Psychology & Performance Control
* Managing stress and exam anxiety
* Building concentration and stamina
* Developing consistency under pressure
* Test-day routines and preparation habits

## Assessment Methods
* Diagnostic placement test
* Weekly skill-based quizzes
* Timed mini-tests per skill
* Speaking and writing evaluations
* Final full mock exam (multi-exam simulation format)

## Teaching Methods
* Strategy-based instruction (not exam-specific drilling only)
* Task-based practice activities
* Real exam question analysis
* Peer discussion and feedback
* Timed simulations and reflection

## Materials
* Authentic past exam papers
* Strategy guides and checklists
* Audio recordings and transcripts
* Writing and speaking templates
* Vocabulary lists organized by topic
`;

const interviewPrepMarkdown = `
# Course Title: Interview Preparation & Career Readiness

**Course Duration:**
4–8 weeks (flexible; can be intensive or extended)

**Target Audience:**
Job seekers, students, and professionals preparing for interviews in academic or workplace settings

## Course Objectives

By the end of the course, learners will:

* Demonstrate confidence in different interview formats
* Answer common and challenging interview questions effectively
* Communicate skills, experience, and achievements clearly
* Use professional language and appropriate body language
* Handle virtual and in-person interviews successfully

## Module 1: Understanding the Interview Process
* Types of interviews (face-to-face, panel, virtual)
* What employers look for
* Stages of the hiring process
* Common interview formats

## Module 2: Self-Assessment & Personal Branding
* Identifying strengths, skills, and achievements
* Creating a personal value proposition
* Aligning experience with job requirements
* Building confidence

## Module 3: CVs and Cover Letters
* Writing effective CVs
* Structuring cover letters
* Tailoring applications to job descriptions
* Common mistakes to avoid

## Module 4: Common Interview Questions
* “Tell me about yourself”
* Strengths and weaknesses
* Behavioral questions (STAR method)
* Situational and competency-based questions

## Module 5: Communication Skills for Interviews
* Verbal communication (clarity, tone, structure)
* Non-verbal communication (body language, eye contact)
* Active listening
* Building rapport with interviewers

## Module 6: Professional English for Interviews
* Using formal and professional language
* Industry-specific vocabulary
* Avoiding informal or unclear expressions
* Structuring strong answers

## Module 7: Virtual Interview Skills
* Preparing for online interviews
* Technical setup and environment
* On-camera presence and engagement
* Handling technical issues

## Module 8: Advanced Interview Techniques
* Answering difficult questions
* Handling gaps in employment
* Salary discussions
* Asking strong questions to employers

## Module 9: Mock Interviews & Feedback
* Practice interviews (one-on-one and panel)
* Real-time feedback from instructor and peers
* Recording and self-evaluation
* Improving performance

## Module 10: Post-Interview Skills
* Following up professionally
* Writing thank-you emails
* Reflecting on performance
* Handling rejection and next steps

## Assessment Methods
* Mock interview performance
* CV and cover letter evaluation
* Participation in role plays
* Self-assessment and reflection tasks
* Final simulated interview

## Teaching Methods
* Role-playing and simulations
* Video analysis of interviews
* Group discussions
* Individual coaching
* Peer feedback

## Materials
* CV and cover letter templates
* Sample interview questions
* Video examples
* Evaluation checklists
* Online tools for practice
`;

const travelEnglishMarkdown = `
# Course Title: Travel English Communication

**Course Duration:**
4–8 weeks (flexible; ideal for short-term learners)

**Target Audience:**
Beginner to intermediate learners preparing for international travel

## Course Objectives

By the end of the course, learners will:

* Communicate effectively in common travel situations
* Use essential vocabulary and phrases for travel
* Understand spoken English in real-life contexts
* Handle basic problems while traveling
* Build confidence in speaking with strangers

## Module 1: Getting Started with Travel English
* Basic greetings and introductions
* Asking for help and information
* Polite expressions (please, thank you, excuse me)
* Travel essentials vocabulary

## Module 2: At the Airport
* Check-in and boarding procedures
* Understanding airport announcements
* Passport control and immigration
* Talking to airline staff

## Module 3: Transportation
* Asking for directions
* Using taxis, buses, and trains
* Buying tickets
* Understanding schedules and signs

## Module 4: Accommodation
* Booking a hotel or hostel
* Checking in and out
* Making requests (extra towels, Wi-Fi, etc.)
* Handling problems (noise, complaints)

## Module 5: Eating Out
* Ordering food and drinks
* Understanding menus
* Dietary preferences and restrictions
* Paying the bill

## Module 6: Shopping & Money
* Asking about prices
* Bargaining (where appropriate)
* Using currency and payment methods
* Returning items

## Module 7: Sightseeing & Social Interaction
* Asking about tourist attractions
* Taking tours and asking questions
* Making small talk with locals
* Describing places and experiences

## Module 8: Emergencies & Problem Solving
* Asking for help in emergencies
* Visiting a doctor or pharmacy
* Reporting lost items
* Handling misunderstandings

## Module 9: Listening & Speaking Practice
* Understanding different accents
* Real-life dialogues
* Role plays for travel situations
* Pronunciation practice

## Module 10: Cultural Awareness
* Cultural differences in communication
* Politeness and etiquette
* Do’s and don’ts in different countries

## Assessment Methods
* Role plays (airport, hotel, restaurant scenarios)
* Speaking tasks and dialogues
* Listening comprehension exercises
* Short quizzes on vocabulary and phrases
* Final simulation (complete travel journey)

## Teaching Methods
* Scenario-based learning
* Interactive role plays
* Pair and group activities
* Audio and video materials
* Real-life simulations

## Materials
* Travel phrasebook or coursebook
* Audio recordings (announcements, conversations)
* Flashcards and visual aids
* Maps, menus, and tickets (real-life materials)
`;

const englishGrammarMarkdown = `
# Course Title: English Grammar Mastery

**Course Duration:**
10–16 weeks (adjustable based on level)

**Target Audience:**
Beginner to advanced learners who want to improve grammatical accuracy and fluency

## Course Objectives

By the end of the course, learners will:

* Understand and apply core English grammar rules
* Construct accurate and meaningful sentences
* Use a variety of grammatical structures in speaking and writing
* Identify and correct common errors
* Communicate with greater clarity and confidence

## Level 1: Beginner Grammar (A1–A2)

**Module 1: Parts of Speech**
* Nouns (common, proper, countable/uncountable)
* Pronouns (subject, object, possessive)
* Verbs (basic forms)
* Adjectives and adverbs

**Module 2: Basic Sentence Structure**
* Subject–verb–object order
* Simple sentences
* Capitalization and punctuation

**Module 3: Present Tenses**
* Present simple (affirmative, negative, questions)
* Present continuous
* Frequency adverbs (always, often, etc.)

**Module 4: Articles & Determiners**
* A, an, the
* This, that, these, those
* Some, any

## Level 2: Elementary Grammar (A2)

**Module 5: Past Tenses**
* Past simple (regular and irregular verbs)
* Past continuous

**Module 6: Future Forms**
* “Will” vs “going to”
* Present continuous for future arrangements

**Module 7: Prepositions**
* Time (in, on, at)
* Place (under, next to, between)
* Movement (to, into, onto)

**Module 8: Comparisons**
* Comparatives and superlatives
* “As…as” structures

## Level 3: Intermediate Grammar (B1–B2)

**Module 9: Perfect Tenses**
* Present perfect (for experience and recent actions)
* Present perfect vs past simple
* Past perfect (introduction)

**Module 10: Modal Verbs**
* Ability (can, could)
* Obligation (must, have to)
* Advice (should, ought to)
* Possibility (might, may)

**Module 11: Conditionals**
* Zero and first conditionals
* Second conditional
* Introduction to third conditional

**Module 12: Passive Voice**
* Form and use
* Active vs passive sentences

## Level 4: Upper-Intermediate / Advanced Grammar (B2–C1)

**Module 13: Advanced Tenses & Structures**
* Future perfect and continuous
* Mixed tenses
* Narrative tenses

**Module 14: Reported Speech**
* Statements, questions, and commands
* Tense changes
* Reporting verbs

**Module 15: Complex Sentences**
* Relative clauses
* Noun clauses
* Adverbial clauses

**Module 16: Advanced Usage**
* Inversion for emphasis
* Cleft sentences
* Formal vs informal grammar
* Common advanced errors

## Core Practice Across All Levels
* Sentence building exercises
* Error correction activities
* Guided speaking practice
* Controlled and free writing tasks

## Assessment Methods
* Diagnostic test (entry level)
* Weekly quizzes
* Grammar exercises and assignments
* Mid-course test
* Final grammar exam

## Teaching Methods
* Clear explanations with examples
* Interactive exercises
* Pair and group work
* Real-life usage practice
* Continuous feedback

## Materials
* Grammar textbook
* Worksheets and exercises
* Online quizzes and tools
* Visual aids and charts
`;

const customMarkdown = `
# Course Title: English Discussion & Fluency Course

**Course Duration:**
24–30 weeks (flexible modular structure)

**Target Audience:**
Intermediate to advanced English learners (B1–C1)

## Course Objectives

By the end of the course, learners will:

* Speak fluently and confidently on a wide range of topics
* Expand topic-specific vocabulary
* Express opinions, agree/disagree, and justify ideas
* Develop critical thinking and discussion skills
* Improve listening comprehension and spontaneous speaking ability

## Course Structure

The course is divided into 10 thematic modules, each grouping related discussion topics.

**MODULE 1: PEOPLE, LIFE & PERSONALITY**
* **Topics:** Childhood, Family, Friendship, Personality, Life, Marriage, Romance, Appearance
* **Skills Focus:** Describing people and relationships, Talking about personal experiences, Expressing emotions and opinions

**MODULE 2: DAILY LIFE & MODERN SOCIETY**
* **Topics:** House and Home, Work, Education, University, Money, Time, Shopping, Eating Out
* **Skills Focus:** Everyday communication, Decision-making discussions, Describing routines and lifestyles

**MODULE 3: CULTURE & ENTERTAINMENT**
* **Topics:** Art, Cinema, Music, Literature, Fashion, Fame, The Media
* **Skills Focus:** Expressing preferences and opinions, Reviewing and evaluating cultural products, Discussing influence of media and celebrities

**MODULE 4: TECHNOLOGY & MODERN WORLD**
* **Topics:** Technology, Smartphones, The Internet, Video Games, Globalisation
* **Skills Focus:** Debating advantages and disadvantages, Discussing digital life and change, Expressing predictions and concerns

**MODULE 5: EDUCATION, LANGUAGE & LEARNING**
* **Topics:** Education, Language, Language Learning
* **Skills Focus:** Comparing education systems, Discussing learning strategies, Expressing challenges and opinions about learning

**MODULE 6: SCIENCE, ENVIRONMENT & FUTURE**
* **Topics:** Science, Environment, Health, The Future, Weather
* **Skills Focus:** Hypothesizing and predicting, Problem-solution discussions, Environmental awareness language

**MODULE 7: SOCIETY, ETHICS & POLITICS**
* **Topics:** Ethics, Politics, Religion, Crime, War, History
* **Skills Focus:** Giving opinions on controversial topics, Justifying arguments, Formal discussion language

**MODULE 8: TRAVEL, TRANSPORT & PLACES**
* **Topics:** Air Travel, Travel, Holidays (Vacations), Transport, Town and City
* **Skills Focus:** Describing experiences, Comparing places and cultures, Asking for and giving directions/opinions

**MODULE 9: SPORTS & LEISURE**
* **Topics:** Sport, Football (Soccer), Animals
* **Skills Focus:** Expressing likes and dislikes, Describing activities, Talking about hobbies and interests

**MODULE 10: COMMUNICATION & MODERN LIFE ISSUES**
* **Topics:** The Media (revisited), Technology (review), Work (review), Life (review)
* **Skills Focus:** Extended discussions and debates, Presenting arguments clearly, Fluency in spontaneous conversation

## Teaching Approach
* Discussion-based learning (pair and group work)
* Debate activities
* Role plays and simulations
* Vocabulary expansion tasks
* Listening to real-life conversations
* Critical thinking exercises

## Assessment Methods
* Weekly topic discussions
* Vocabulary quizzes
* Speaking fluency evaluations
* Debate or presentation tasks
* Final comprehensive speaking assessment

## Materials
* Topic-based worksheets
* Discussion cards and prompts
* Videos and audio recordings
* Vocabulary lists per topic
* Real-world articles and case studies
`;

const services = [
  { id: 'general-english', name: 'General English', icon: MessageSquare, description: 'Master everyday conversation, grammar, and vocabulary essentials.', details: generalEnglishMarkdown, isPage: true },
  { id: 'business-english', name: 'Business English', icon: Briefcase, description: 'Excel in meetings, emails, and professional presentations.', details: businessEnglishMarkdown, isPage: true },
  { id: 'ielts-prep', name: 'IELTS Preparation', icon: Target, description: 'Targeted strategies to achieve your required band score.', details: ieltsMarkdown, isPage: true },
  { id: 'toefl-prep', name: 'TOEFL Preparation', icon: GraduationCap, description: 'Comprehensive practice to master all sections of the TOEFL.', details: toeflMarkdown, isPage: true },
  { id: 'cambridge-eng', name: 'Cambridge English', icon: BookOpen, description: 'Rigorous preparation for B2 First, C1 Advanced, and C2 Proficiency.', details: cambridgeMarkdown, isPage: true },
  { id: 'general-test', name: 'General Test Prep', icon: PenTool, description: 'Broad strategies for a variety of English standardized tests.', details: generalTestMarkdown, isPage: true },
  { id: 'interview-prep', name: 'Interview Preparation', icon: UserCheck, description: 'Mock interviews and tailored feedback for career success.', details: interviewPrepMarkdown, isPage: true },
  { id: 'travel-eng', name: 'Travel English', icon: Plane, description: 'Essential phrases and cultural tips for confident traveling.', details: travelEnglishMarkdown, isPage: true },
  { id: 'eng-grammar', name: 'English Grammar', icon: Lightbulb, description: 'Deep dives into complex rules for absolute clarity and correctness.', details: englishGrammarMarkdown, isPage: true },
  { id: 'custom', name: 'Custom Requests', icon: Presentation, description: 'Fully tailored lessons focused entirely on your unique goals.', details: customMarkdown, isPage: true },
];

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);
  return null;
}

function HomePage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<'starter' | 'pro' | 'elite' | 'payg' | null>(null);
  const [classDuration, setClassDuration] = useState<30 | 45 | 60>(60);
  const navigate = useNavigate();
  const location = useLocation();

  const getPackagePrice = (pkg: string) => {
    switch (pkg) {
      case 'payg': return classDuration === 30 ? 9 : classDuration === 45 ? 13.50 : 18;
      case 'starter': return classDuration === 30 ? 75 : classDuration === 45 ? 112 : 149;
      case 'pro': return classDuration === 30 ? 125 : classDuration === 45 ? 187 : 249;
      case 'elite': return classDuration === 30 ? 200 : classDuration === 45 ? 300 : 399;
      default: return 0;
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('success')) {
      alert('Payment successful! Thank you for subscribing.');
    }
    if (params.get('canceled')) {
      alert('Payment was canceled.');
    }
  }, [location]);

  const handleCheckout = async (plan: string, price: number) => {
    if (plan === 'Pay-As-You-Go') {
      window.open('https://wise.com/pay/r/uJ5I4armHOGpuvc', '_blank');
      return;
    }
    
    if (plan === 'Starter') {
      window.open('https://wise.com/pay/r/yYlYOFCFR873Bmo', '_blank');
      return;
    }
    
    if (plan === 'Pro') {
      window.open('https://wise.com/pay/r/7zqH2WPJ4kJTe-g', '_blank');
      return;
    }
    
    if (plan === 'Elite') {
      window.open('https://wise.com/pay/r/_4qtb07Vc9Wfkw4', '_blank');
      return;
    }
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan, price }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout failed: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-brand-50 pb-20 pt-20 sm:pt-28 lg:pb-32 lg:pt-36">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
            <div className="w-[800px] h-[800px] bg-brand-100/50 rounded-full blur-3xl"></div>
          </div>
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
              <div className="sm:text-center md:mx-auto lg:col-span-6 lg:text-left">
                <FadeIn>
                  <div className="inline-flex items-center px-4 py-2 bg-brand-100 text-brand-800 text-[10px] font-bold uppercase tracking-widest mb-8 border border-brand-200/50 rounded-full">
                    <Star className="h-3 w-3 mr-2 text-accent" />
                    Global CEFR Standards Applied
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1 className="text-5xl font-serif text-brand-900 sm:text-6xl md:text-7xl mb-6 tracking-tight">
                    Master English. <br className="hidden lg:block"/>
                    <span className="italic text-brand-700">Achieve your goals.</span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-6 text-lg text-brand-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                    Premium online instruction for career goals, test success, and life transitions. Measure your progress with Lingo Flight.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                    <Link to="/proficiency-test" className="w-full flex items-center justify-center bg-brand-900 text-white px-8 py-4 text-[11px] sm:text-xs uppercase tracking-widest font-bold rounded-md transition-all sm:w-auto hover:bg-brand-800 shadow-xl shadow-brand-900/10">
                      English Level Test
                    </Link>
                    <Link to="/#programs" className="mt-4 w-full flex items-center justify-center border border-brand-200 text-brand-800 px-8 py-4 text-[11px] sm:text-xs uppercase tracking-widest font-bold rounded-md hover:bg-brand-100 transition-colors sm:mt-0 sm:w-auto">
                      View Curriculum
                    </Link>
                  </div>
                </FadeIn>
              </div>
              
              <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0 hidden lg:block">
                <FadeIn delay={0.4} className="relative aspect-square md:aspect-[4/3] lg:aspect-[4/3] xl:aspect-[5/4] w-full rounded-2xl overflow-hidden bg-brand-100 shadow-2xl shadow-brand-900/10">
                  {/* Strategic placeholder illustrating a coaching session */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/90 to-brand-800/40 flex flex-col items-center justify-center text-white relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1571260899304-425dea5cd6b5?q=80&w=2070&auto=format&fit=crop" 
                      alt="Student taking an online english class"
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                    />
                    <div className="z-10 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl ml-8 mr-auto max-w-[320px] mt-auto mb-12 translate-y-4 lg:mb-16">
                       <div className="flex items-center gap-4 mb-3">
                         <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg shadow-md shadow-accent/20">A</div>
                         <div>
                            <p className="font-semibold text-white text-sm">Anna K.</p>
                            <p className="text-white/80 text-xs italic">Passed IELTS Score 8.0</p>
                         </div>
                       </div>
                       <p className="text-sm italic text-white/90 leading-relaxed">"Lingo Flight completely changed how I approach the speaking test. My confidence skyrocketed!"</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* The Method Section */}
        <section id="method" className="py-24 bg-brand-50 border-t border-brand-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-500 mb-2">Our Methodology</h2>
                <h3 className="font-serif text-3xl text-brand-900 sm:text-4xl mb-6">
                  Tailored strategies for <span className="italic">maximum comprehension</span>.
                </h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  We believe that every student has a unique learning style. That's why we don't rely on cookie-cutter approaches. Our instructors assess your language proficiency from day one and create customized lesson plans that adapt to your progress.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  By implementing creative teaching strategies directly across major interactive platforms—including ClassIn, Zoom, Microsoft Teams, and Google Meet—we ensure that you don't just memorize vocabulary, but truly improve communication and retain material anywhere.
                </p>
                <div className="mt-8 flex items-center gap-4">
                   <div className="w-12 h-12 bg-brand-800 rounded-sm flex items-center justify-center">
                      <Lightbulb className="text-white h-6 w-6" />
                   </div>
                   <div>
                     <p className="font-bold text-[10px] uppercase tracking-widest text-brand-900">Personalized</p>
                     <p className="font-serif italic text-sm text-slate-600">Learning Plans</p>
                   </div>
                   <div className="w-px h-8 bg-brand-100 mx-4"></div>
                   <div className="w-12 h-12 bg-accent rounded-sm flex items-center justify-center">
                      <Target className="text-white h-6 w-6" />
                   </div>
                   <div>
                     <p className="font-bold text-[10px] uppercase tracking-widest text-brand-900">Engaging</p>
                     <p className="font-serif italic text-sm text-slate-600">Training Sessions</p>
                   </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="mt-12 lg:mt-0">
                <div className="grid grid-cols-2 gap-4">
                   <div className="aspect-[4/5] rounded-sm overflow-hidden bg-brand-100 relative shadow-sm hover:shadow-md transition-shadow">
                     <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" alt="Teacher explaining concept" className="absolute inset-0 w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 right-4">
                       <p className="text-white font-serif text-sm">Creative Strategies</p>
                     </div>
                   </div>
                   <div className="aspect-[4/5] rounded-sm overflow-hidden bg-brand-100 relative shadow-sm hover:shadow-md transition-shadow mt-8">
                     <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop" alt="Student taking notes" className="absolute inset-0 w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 right-4">
                       <p className="text-white font-serif text-sm">Maximum Comprehension</p>
                     </div>
                   </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="programs" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <FadeIn>
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-500 mb-2">Comprehensive Programs</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-2 font-serif text-3xl text-brand-900 sm:text-4xl">
                  Everything you need to master English, in one place.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-4 text-xl text-slate-500">
                  We offer a wide range of specialized services to meet your specific linguistic needs and career ambitions.
                </p>
              </FadeIn>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const CardContent = (
                  <>
                    <div className="w-12 h-12 flex items-center justify-center text-brand-800 mb-4 bg-brand-50 rounded-sm group-hover:bg-brand-100 transition-colors">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-serif text-lg text-brand-800 mb-2">{service.name}</h3>
                      <p className="text-xs text-brand-500 mt-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    {(service.details || service.isPage) && (
                       <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-accent flex items-center group-hover:text-accent-hover">
                         View Details <ChevronRight className="h-3 w-3 ml-1" />
                       </div>
                    )}
                  </>
                );

                return (
                  <div key={service.id}>
                    <FadeIn delay={0.1 * (index % 4)} className="h-full">
                      {service.isPage ? (
                        <Link to={`/${service.id}`} className="bg-white p-5 border border-brand-100 shadow-sm hover:shadow-md transition-shadow h-full rounded-sm flex flex-col items-start cursor-pointer group block">
                          {CardContent}
                        </Link>
                      ) : (
                        <div 
                           className="bg-white p-5 border border-brand-100 shadow-sm hover:shadow-md transition-shadow h-full rounded-sm flex flex-col items-start cursor-pointer group"
                           onClick={() => service.details && setSelectedCourse(service.id)}
                        >
                          {CardContent}
                        </div>
                      )}
                    </FadeIn>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Proficiency Test Banner */}
        <section id="test" className="bg-brand-900 py-16 lg:py-20 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <FadeIn>
              <div className="border border-white/10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between rounded-sm relative overflow-hidden bg-brand-800/30">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-800 blur-3xl rounded-full"></div>
                
                <div className="max-w-2xl relative z-10 text-center md:text-left mb-8 md:mb-0">
                  <h2 className="text-3xl font-serif italic text-white sm:text-4xl mb-4">
                    Not sure where to start?
                  </h2>
                  <p className="text-sm text-slate-300">
                    Take our free CEFR-aligned English proficiency test to find the perfect level and package for your current skills. It only takes 10 minutes.
                  </p>
                </div>
                <div className="relative z-10 w-full md:w-auto">
                  <Link to="/proficiency-test" className="w-full md:w-auto bg-accent text-white px-8 py-4 text-[10px] sm:text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-accent-hover transition-colors flex items-center justify-center">
                    Start Proficiency Test
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                  <p className="text-brand-100/60 text-xs text-center mt-3 uppercase tracking-widest">No registration required</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-brand-50 border-t border-brand-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <FadeIn>
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-500 mb-2">Student Success</h2>
                <h3 className="font-serif text-3xl text-brand-900 sm:text-4xl mb-6">
                  Hear from our <span className="italic">graduates</span>.
                </h3>
              </FadeIn>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FadeIn delay={0.1}>
                <div className="bg-white p-8 rounded-xl border border-brand-100 shadow-sm relative h-full">
                  <div className="text-accent mb-4">
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                  </div>
                  <p className="text-brand-700 italic mb-6 leading-relaxed">
                    "I needed to pass the IELTS for my visa application. My coach at Lingo Flight was incredibly thorough. I got an 8.0, far exceeding my expectations!"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-800">M</div>
                    <div>
                      <h4 className="font-bold text-sm text-brand-900">Miguel S.</h4>
                      <p className="text-[10px] text-brand-500 uppercase tracking-wider">IELTS Prep Student</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div className="bg-white p-8 rounded-xl border border-brand-100 shadow-sm relative h-full">
                  <div className="text-accent mb-4">
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                  </div>
                  <p className="text-brand-700 italic mb-6 leading-relaxed">
                    "The business English course transformed how I communicate with our international clients. I finally feel confident leading meetings in English."
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-800">Y</div>
                    <div>
                      <h4 className="font-bold text-sm text-brand-900">Yuki T.</h4>
                      <p className="text-[10px] text-brand-500 uppercase tracking-wider">Corporate Professional</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="bg-white p-8 rounded-xl border border-brand-100 shadow-sm relative h-full">
                  <div className="text-accent mb-4">
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                    <Star className="h-5 w-5 inline fill-accent" />
                  </div>
                  <p className="text-brand-700 italic mb-6 leading-relaxed">
                    "My son's grades improved dramatically after just two months. The personalized attention makes all the difference compared to his regular school."
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-800">S</div>
                    <div>
                      <h4 className="font-bold text-sm text-brand-900">Sarah M.</h4>
                      <p className="text-[10px] text-brand-500 uppercase tracking-wider">Parent of Student</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-brand-900 border-t border-brand-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <FadeIn className="text-left max-w-2xl">
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-2">Flexible Packages</h2>
                <p className="text-3xl font-serif italic mb-2 text-white sm:text-4xl">
                  Investment Tiers
                </p>
                <p className="text-slate-400 text-sm tracking-wide">
                  Choose the pace of your transformation.
                </p>
              </FadeIn>
              <FadeIn delay={0.2} className="text-left md:text-right w-full md:w-auto">
                <div className="flex bg-white/10 p-1 rounded-md mb-4 max-w-xs md:ml-auto">
                   {[30, 45, 60].map((duration) => (
                     <button
                       key={duration}
                       onClick={() => setClassDuration(duration as any)}
                       className={`flex-1 text-[10px] font-bold py-2 rounded uppercase tracking-wider transition-colors ${
                         classDuration === duration 
                          ? 'bg-brand-800 text-white shadow-sm' 
                          : 'text-slate-400 hover:text-white'
                       }`}
                     >
                       {duration} Min
                     </button>
                   ))}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">All Packages Include</span>
                <span className="text-xs font-medium text-white">Learning Management System Access • Licensed Materials</span>
              </FadeIn>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
              {/* Pay as you go */}
              <FadeIn delay={0.05} className="bg-white/5 rounded-sm border border-white/10 p-6 flex flex-col h-full hover:bg-white/10 transition-colors relative group">
                <div 
                  className="mb-6 cursor-pointer"
                  onClick={() => setSelectedPackage('payg')}
                >
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 group-hover:text-white transition-colors flex items-center">
                    Pay-As-You-Go
                    <span className="ml-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">ⓘ</span>
                  </h3>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-serif text-white">${getPackagePrice('payg')}</span>
                  <span className="text-xs font-sans text-slate-400 font-normal">/class</span>
                </div>
                <ul className="text-[11px] text-slate-300 space-y-3 flex-grow mb-8">
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Individual private lessons</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Flexible scheduling</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span>No monthly commitment</span>
                  </li>
                  <li className="flex gap-2 items-start text-slate-400">
                    <span className="text-slate-500 mt-0.5">•</span>
                    <span>Perfect for targeted support</span>
                  </li>
                </ul>
                <button onClick={() => handleCheckout(`Pay-As-You-Go (${classDuration}m)`, getPackagePrice('payg'))} className="w-full border border-white/20 py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-colors rounded-sm mt-auto">
                  Book A Class
                </button>
              </FadeIn>

              {/* Basic */}
              <FadeIn delay={0.1} className="bg-white/5 rounded-sm border border-white/10 p-6 flex flex-col h-full hover:bg-white/10 transition-colors relative group">
                <div 
                  className="mb-6 cursor-pointer"
                  onClick={() => setSelectedPackage('starter')}
                >
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 group-hover:text-white transition-colors flex items-center">
                    Starter English
                    <span className="ml-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">ⓘ</span>
                  </h3>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-serif text-white">${getPackagePrice('starter')}</span>
                  <span className="text-xs font-sans text-slate-400 font-normal">/month</span>
                </div>
                <ul className="text-[11px] text-slate-300 space-y-3 flex-grow mb-8">
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span>General English lessons & Grammar sessions</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Travel English basics</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span className="font-bold text-white">6 private lessons per month</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Group classes (2x per week)</span>
                  </li>
                  <li className="flex gap-2 items-start text-slate-400">
                    <span className="text-slate-500 mt-0.5">•</span>
                    <span>Access to lesson recordings & homework</span>
                  </li>
                </ul>
                <button onClick={() => handleCheckout(`Starter (${classDuration}m)`, getPackagePrice('starter'))} className="w-full border border-white/20 py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-colors rounded-sm mt-auto">
                  Start Basic Plan
                </button>
              </FadeIn>
              {/* Pro */}
              <FadeIn delay={0.2} className="bg-white p-6 flex flex-col relative h-full rounded-sm shadow-xl group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                  Most Popular
                </div>
                <div 
                  className="mb-6 mt-2 cursor-pointer"
                  onClick={() => setSelectedPackage('pro')}
                >
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-800 mb-2 group-hover:text-brand-900 transition-colors flex items-center">
                    Fluency & Results
                    <span className="ml-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">ⓘ</span>
                  </h3>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-serif text-brand-900">${getPackagePrice('pro')}</span>
                  <span className="text-xs font-sans text-slate-500 font-normal">/month</span>
                </div>
                <ul className="text-[11px] text-slate-600 space-y-3 flex-grow mb-8">
                  <li className="flex gap-2 items-start font-bold">
                    <span className="text-brand-800 mt-0.5">•</span>
                    <span>IELTS, TOEFL & Cambridge Prep</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-500 mt-0.5">•</span>
                    <span>Interview Coaching & feedback</span>
                  </li>
                  <li className="flex gap-2 items-start font-bold">
                    <span className="text-brand-800 mt-0.5">•</span>
                    <span>Business English Focus</span>
                  </li>
                  <li className="flex gap-2 items-start font-bold">
                    <span className="text-brand-800 mt-0.5">•</span>
                    <span>10 private lessons per month</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-500 mt-0.5">•</span>
                    <span>Small groups (3x per week)</span>
                  </li>
                </ul>
                <button onClick={() => handleCheckout(`Pro (${classDuration}m)`, getPackagePrice('pro'))} className="w-full bg-brand-800 text-white py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-brand-900 transition-colors rounded-sm mt-auto">
                  Get Started Pro
                </button>
              </FadeIn>

              {/* Premium */}
              <FadeIn delay={0.3} className="bg-white/5 rounded-sm border border-white/10 p-6 flex flex-col h-full hover:bg-white/10 transition-colors group">
                <div 
                  className="mb-6 cursor-pointer"
                  onClick={() => setSelectedPackage('elite')}
                >
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2 group-hover:text-white transition-colors flex items-center">
                    Elite English Coaching
                    <span className="ml-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity">ⓘ</span>
                  </h3>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-serif text-white">${getPackagePrice('elite')}</span>
                  <span className="text-xs font-sans text-slate-400 font-normal">/month</span>
                </div>
                <ul className="text-[11px] text-slate-300 space-y-3 flex-grow mb-8">
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span>18 private lessons per month</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span className="font-bold text-white">Fully customized curriculum</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Intensive test prep support</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Direct messaging priority</span>
                  </li>
                </ul>
                <button onClick={() => handleCheckout(`Elite (${classDuration}m)`, getPackagePrice('elite'))} className="w-full border border-white/20 py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-colors rounded-sm mt-auto">
                  Apply for Elite
                </button>
              </FadeIn>
            </div>
            
            <FadeIn delay={0.4} className="max-w-4xl mx-auto mt-16 hidden md:block">
               <div className="grid grid-cols-3 gap-4 text-center items-center py-6 border-y border-white/10">
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-widest">Learning English</h4>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Starter Package</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-accent text-xs uppercase tracking-widest">Achieving Goals</h4>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Pro Package</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-widest">Personalized Transformation</h4>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Premium Package</p>
                  </div>
               </div>
            </FadeIn>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-brand-50 border-t border-brand-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <FadeIn>
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-500 mb-2">Common Questions</h2>
                <h3 className="text-3xl font-serif text-brand-900 sm:text-4xl">
                  Frequently Asked <span className="italic">Questions</span>
                </h3>
              </FadeIn>
            </div>

            <div className="space-y-6">
              <FadeIn delay={0.1}>
                <div className="bg-white p-6 rounded-xl border border-brand-100 shadow-sm">
                  <h4 className="font-bold text-brand-900 mb-2">How do I know which level I am?</h4>
                  <p className="text-brand-600 text-sm leading-relaxed">We provide a free, comprehensive English proficiency test based on CEFR standards when you sign up. Our instructors will also assess you during your first lesson.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="bg-white p-6 rounded-xl border border-brand-100 shadow-sm">
                  <h4 className="font-bold text-brand-900 mb-2">What happens if I miss a private lesson?</h4>
                  <p className="text-brand-600 text-sm leading-relaxed">We require a 24-hour notice for cancellations. If you cancel with enough time, we will reschedule the lesson at no extra cost to you.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="bg-white p-6 rounded-xl border border-brand-100 shadow-sm">
                  <h4 className="font-bold text-brand-900 mb-2">Can I switch plans later?</h4>
                  <p className="text-brand-600 text-sm leading-relaxed">Absolutely! You can upgrade or downgrade your plan at the end of every billing cycle to match your current learning needs and schedule.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="bg-white p-6 rounded-xl border border-brand-100 shadow-sm">
                  <h4 className="font-bold text-brand-900 mb-2">Are the teachers native speakers?</h4>
                  <p className="text-brand-600 text-sm leading-relaxed">All our instructors are highly qualified, certified professionals holding top-tier teaching degrees (CELTA, DELTA, or equivalent). Many are native speakers, while others are near-native experts in linguistics.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div className="bg-white p-6 rounded-xl border border-brand-100 shadow-sm">
                  <h4 className="font-bold text-brand-900 mb-2">Which platforms do you use for lessons?</h4>
                  <p className="text-brand-600 text-sm leading-relaxed">We conduct our online lessons across multiple popular platforms to ensure accessibility and convenience, including ClassIn, Zoom, Microsoft Teams, and Google Classroom/Meet. We can adapt to the platform that works best for you.</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section id="contact" className="py-24 bg-white border-b border-brand-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <FadeIn>
                <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-500 mb-2">Get in Touch</h2>
                <h3 className="text-4xl md:text-5xl font-serif text-brand-900 mb-6 font-medium">
                  Contact Us
                </h3>
                <p className="text-slate-600 mb-4">
                  Have questions about our programs, the CEFR framework, or need help finding the right course? Send us a message and we'll get back to you shortly.
                </p>
                <p className="text-brand-700 font-medium">
                  Or email us directly at <a href="mailto:hello@lingoflight.com" className="text-brand-900 font-bold underline hover:text-accent transition-colors">hello@lingoflight.com</a>
                </p>
              </FadeIn>
            </div>

            <div className="max-w-xl mx-auto bg-brand-50/50 p-8 md:p-12 rounded-xl border border-brand-100 shadow-sm">
              <FadeIn delay={0.2}>
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const email = formData.get('email');
                  const subject = formData.get('subject');
                  const message = formData.get('message');
                  window.location.href = `mailto:hello@lingoflight.com?subject=${encodeURIComponent(String(subject))}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        required
                        className="w-full bg-white border border-brand-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-md transition-all shadow-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-2">Your Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        required
                        className="w-full bg-white border border-brand-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-md transition-all shadow-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-2">Subject</label>
                    <select 
                      id="subject"
                      name="subject"
                      className="w-full bg-white border border-brand-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-md transition-all text-brand-700 shadow-sm"
                    >
                      <option>Course Inquiry</option>
                      <option>Proficiency Test Question</option>
                      <option>Billing & Pricing</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={5}
                      required
                      className="w-full bg-white border border-brand-200 px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-md transition-all resize-y shadow-sm"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-brand-900 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-md hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/10">
                    Send Message
                  </button>
                </form>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Package Details Modal */}
        <AnimatePresence>
          {selectedPackage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-900/80 backdrop-blur-sm"
              onClick={() => setSelectedPackage(null)}
            >
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 20 }}
                 className="bg-white rounded-xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-8 relative ring-1 ring-brand-100"
                 onClick={(e) => e.stopPropagation()}
               >
                 <button 
                   onClick={() => setSelectedPackage(null)}
                   className="absolute top-4 right-4 text-slate-400 hover:text-brand-900 font-bold px-3 py-1 bg-slate-100 rounded-md text-[10px] uppercase tracking-widest transition-colors"
                 >
                   Close
                 </button>

                 <div className="flex bg-slate-100 p-1 rounded-md mb-8 max-w-xs mx-auto mt-4">
                    {[30, 45, 60].map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setClassDuration(duration as any)}
                        className={`flex-1 text-xs font-bold py-2 rounded uppercase tracking-wider transition-colors ${
                          classDuration === duration 
                           ? 'bg-white text-brand-900 shadow-sm' 
                           : 'text-slate-500 hover:text-brand-700'
                        }`}
                      >
                        {duration} Min
                      </button>
                    ))}
                 </div>
                 
                 {selectedPackage === 'payg' && (
                   <div className="space-y-6">
                     <div className="border-b border-brand-100 pb-6 pr-12">
                       <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-800 mb-2">Pay-As-You-Go</h3>
                       <p className="text-slate-500 text-sm italic">Best for: Students needing targeted support or flexible scheduling</p>
                     </div>
                     
                     <div className="space-y-6">
                       <div className="bg-brand-50 rounded-lg p-5 border border-brand-100 mb-6">
                           <p className="font-bold text-brand-900 text-center text-xl">${getPackagePrice('payg')} per class</p>
                       </div>

                       <div>
                         <h4 className="font-bold text-accent mb-4 text-[10px] uppercase tracking-widest">Includes:</h4>
                         <ul className="space-y-3 text-brand-700 text-sm">
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Individual private lessons</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Flexible scheduling</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> No monthly commitment</li>
                         </ul>
                       </div>
                     </div>

                     <div className="pt-6 border-t border-brand-100 mt-8">
                        <button onClick={() => handleCheckout(`Pay-As-You-Go (${classDuration}m)`, getPackagePrice('payg'))} className="w-full bg-brand-900 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-md hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/10 mb-4">
                          Proceed to Checkout
                        </button>
                     </div>
                   </div>
                 )}

                 {selectedPackage === 'starter' && (
                   <div className="space-y-6">
                     <div className="border-b border-brand-100 pb-6 pr-12">
                       <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-800 mb-2">Basic – "Starter English"</h3>
                       <p className="text-slate-500 text-sm italic">Best for: Casual learners & beginners building a foundation</p>
                       <p className="text-brand-900 font-bold mt-3 text-lg">Price: ${getPackagePrice('starter')}/month</p>
                     </div>
                     
                     <div className="space-y-6">
                       <div>
                         <h4 className="font-bold text-accent mb-4 text-[10px] uppercase tracking-widest">Includes:</h4>
                         <ul className="space-y-3 text-brand-700 text-sm">
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> General English lessons (grammar, vocabulary, conversation)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> English Grammar focus sessions</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Travel English basics</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Group classes (2x per week)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Access to lesson recordings</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Weekly exercises & homework</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5 font-bold">•</span> <span className="font-bold text-brand-900">6 private lessons per month</span></li>
                         </ul>
                       </div>

                       <div className="bg-brand-50 rounded-lg p-5 border border-brand-100">
                         <h4 className="font-bold text-brand-800 mb-3 text-[10px] uppercase tracking-widest text-brand-500/80">Limited access to:</h4>
                         <ul className="space-y-2 text-brand-600 text-sm">
                           <li className="flex items-start"><span className="text-brand-300 mr-3 mt-0.5">•</span> Test prep (introductory guidance only)</li>
                         </ul>
                       </div>
                     </div>

                     <div className="pt-6 border-t border-brand-100 mt-8">
                        <button onClick={() => handleCheckout(`Starter (${classDuration}m)`, getPackagePrice('starter'))} className="w-full bg-brand-900 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-md hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/10 mb-4">
                          Proceed to Checkout
                        </button>
                     </div>
                   </div>
                 )}

                 {selectedPackage === 'pro' && (
                   <div className="space-y-6">
                     <div className="border-b border-brand-100 pb-6 pr-12">
                       <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-800 mb-2">Pro – "Fluency & Results" ⭐ (Most Popular)</h3>
                       <p className="text-slate-500 text-sm italic">Best for: Students who want measurable progress and career/test readiness</p>
                     </div>
                     
                     <div className="space-y-6">
                       <div className="bg-brand-50 rounded-lg p-5 border border-brand-100 mb-6">
                           <p className="font-bold text-brand-900 text-center text-lg uppercase tracking-widest">${getPackagePrice('pro')}/month</p>
                           <p className="font-bold text-brand-900 text-center text-sm mt-2">10 private lessons per month</p>
                       </div>

                       <div>
                         <h4 className="font-bold text-accent mb-4 text-[10px] uppercase tracking-widest">Includes everything in Basic, plus:</h4>
                         <ul className="space-y-3 text-brand-700 text-sm">
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> IELTS preparation</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> TOEFL preparation</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Cambridge exam preparation</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Interview preparation (mock interviews + feedback)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Business English (meetings, emails, presentations)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Small group classes (3x per week)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Monthly progress tracking & feedback</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Structured test strategies & practice exams</li>
                         </ul>
                       </div>
                     </div>

                     <div className="pt-6 border-t border-brand-100 mt-8">
                        <button onClick={() => handleCheckout(`Pro (${classDuration}m)`, getPackagePrice('pro'))} className="w-full bg-brand-900 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-md hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/10 mb-4">
                          Proceed to Checkout
                        </button>
                     </div>
                   </div>
                 )}

                 {selectedPackage === 'elite' && (
                   <div className="space-y-6">
                     <div className="border-b border-brand-100 pb-6 pr-12">
                       <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-800 mb-2">Premium – "Elite English Coaching"</h3>
                       <p className="text-slate-500 text-sm italic">Best for: High performers, professionals, or urgent goals</p>
                     </div>
                     
                     <div className="space-y-6">
                       <div className="bg-brand-50 rounded-lg p-5 border border-brand-100 mb-6">
                           <p className="font-bold text-brand-900 text-center text-lg uppercase tracking-widest">${getPackagePrice('elite')}/month</p>
                           <p className="font-bold text-brand-900 text-center text-sm mt-2">18 private lessons per month</p>
                       </div>

                       <div>
                         <h4 className="font-bold text-accent mb-4 text-[10px] uppercase tracking-widest">Includes everything in Pro, plus:</h4>
                         <ul className="space-y-3 text-brand-700 text-sm">
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> 1-on-1 private lessons (weekly or more)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Fully customized lesson plans (based on your goals)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Custom lesson requests (any topic on demand)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Intensive test preparation (IELTS/TOEFL/Cambridge)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Advanced interview coaching (real-world scenarios)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Personalized feedback on speaking & writing</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Flexible scheduling (priority booking)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Direct messaging support (fast responses)</li>
                           <li className="flex items-start"><span className="text-accent mr-3 mt-0.5">•</span> Certificate of completion</li>
                         </ul>
                       </div>
                     </div>

                     <div className="pt-6 border-t border-brand-100 mt-8">
                        <button onClick={() => handleCheckout(`Elite (${classDuration}m)`, getPackagePrice('elite'))} className="w-full bg-brand-900 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-md hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/10 mb-4">
                          Proceed to Checkout
                        </button>
                     </div>
                   </div>
                 )}
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
  );
}

function CoursePage() {
  const { id } = useParams();
  const course = services.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return (
      <main className="flex-grow pt-32 pb-24 text-center">
        <h2 className="text-3xl font-serif text-brand-900">Course not found.</h2>
        <Link to="/" className="text-accent underline mt-4 block">Return Home</Link>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-32 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
         <Link to="/#programs" className="text-xs uppercase tracking-widest font-bold text-brand-500 hover:text-accent flex items-center mb-10 transition-colors">
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" /> Back to Programs
         </Link>
         
         <div className="bg-brand-50/50 p-8 md:p-12 rounded-sm border border-brand-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-800"></div>
            <div className="w-16 h-16 bg-brand-100 rounded-sm flex items-center justify-center mb-8">
               {course.icon && <course.icon className="h-8 w-8 text-brand-800" />}
            </div>
            
            <div className="markdown-body">
              <Markdown>{course.details}</Markdown>
            </div>
         </div>
      </div>
    </main>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-900 overflow-x-hidden selection:bg-accent/20 selection:text-brand-900">
      <ScrollToHash />
      <nav className="fixed w-full z-50 bg-brand-50/90 backdrop-blur-md border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <Link to="/">
                <span className="text-2xl font-serif italic font-bold tracking-tight text-brand-800">Lingo Flight</span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 text-[11px] uppercase tracking-wider font-semibold text-brand-500">
              {navLinks.map((link) => (
                <Link key={link.name} to={`/${link.href}`} className="hover:text-brand-900 transition-colors">
                  {link.name}
                </Link>
              ))}
              {user ? (
                <div className="flex items-center space-x-6">
                  <Link to="/admin" className="hover:text-brand-900 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    Dashboard
                  </Link>
                  <button onClick={logout} className="hover:text-brand-900 transition-colors">Logout</button>
                </div>
              ) : (
                <button onClick={signInWithGoogle} className="text-brand-800 border border-brand-200 px-4 py-2 rounded-sm hover:bg-brand-50 transition-colors">Student Login</button>
              )}
              <Link to="/book" className="bg-brand-900 text-white text-[11px] uppercase tracking-wider font-bold px-6 py-2.5 rounded-sm shadow-md shadow-brand-900/10 hover:bg-brand-800 transition-colors">
                Book Free Demo
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-brand-900 p-2">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-brand-50 border-b border-brand-100 px-4 pt-4 pb-6 space-y-4"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={`/${link.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-900 p-2"
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="border-t border-brand-100 pt-4 mt-2 mb-2">
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-accent p-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span> Dashboard
                </Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full text-left block text-[11px] uppercase tracking-[0.2em] font-semibold text-brand-900 p-2">Logout</button>
              </div>
            ) : (
              <div className="border-t border-brand-100 pt-4 mt-2">
                <button onClick={() => { signInWithGoogle(); setMobileMenuOpen(false); }} className="w-full text-center border border-brand-200 block text-[11px] uppercase tracking-[0.2em] font-bold text-brand-800 p-3 rounded-sm mb-2">Student Login</button>
              </div>
            )}
            <Link 
              to="/book" 
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-accent text-white px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] font-bold rounded-sm mt-4 shadow-lg shadow-accent/20"
            >
              Book Free Demo
            </Link>
          </motion.div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/proficiency-test" element={<ProficiencyTestPage />} />
        <Route path="/cefr" element={<CefrPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/:id" element={<CoursePage />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-brand-900 py-16 border-t border-brand-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-2xl font-serif italic text-white tracking-tight">Lingo Flight</span>
              <span className="text-brand-200/60 text-xs font-light max-w-xs text-center md:text-left mt-2 mb-2">Elevating your English proficiency for career and academic success.</span>
              <a href="mailto:hello@lingoflight.com" className="text-brand-200 hover:text-white transition-colors text-sm">hello@lingoflight.com</a>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-brand-200/60 text-[11px] uppercase tracking-wider font-semibold justify-center md:justify-start">
               <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
               <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
               <Link to="/privacy#cookie" className="hover:text-white transition-colors">Cookie Policy</Link>
               <Link to="/terms#refund" className="hover:text-white transition-colors">Refund Policy</Link>
               <Link to="/terms#student" className="hover:text-white transition-colors">Student Agreement</Link>
               <Link to="/terms#disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
               <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between text-brand-200/40 text-[11px] uppercase tracking-wider font-medium">
            <p>&copy; {new Date().getFullYear()} Lingo Flight.</p>
            <p className="mt-2 md:mt-0">Based on CEFR Standards.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
