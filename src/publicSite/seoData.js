// SEO Metadata, Answer Engine Optimization (AEO), and Structured Data Catalog for Reptile Birds
export const SEO_CATALOG = {
  '/': {
    slug: '/',
    title: 'Reptile Birds | Browser-Based Evidence Engine & Research Workspace',
    description: 'Survive the 5-second fact-check challenge. Reptile Birds is a browser-based, zero-install, deterministic evidence workspace for journalists, OSINT investigators, and PhD researchers. Zero server uploads, zero subpoena risk.',
    canonical: 'https://reptilebirds.com/',
    h1: 'Never Lose the Thread of Your Research.',
    primaryKeyword: 'browser-based evidence workspace',
    secondaryKeywords: [
      'browser-based investigative software',
      'immutable evidence engine',
      'survive fact check challenge',
      'zero-install evidence tool',
      'source provenance and chain of custody',
      'client-side research sandbox',
      'fact check binder generator',
      'OSINT evidence tool',
      'academic research source verification'
    ],
    searchIntent: 'Commercial / Educational / Informational',
    ogTitle: 'Reptile Birds | Research Anywhere. Build the Evidence Here.',
    ogDescription: 'Survive the 5-second fact-check challenge. Zero software install, zero server uploads, zero subpoena risk, deterministic SHA-256 cryptographic provenance, and 1-click legal evidence binders.',
    twitterTitle: 'Reptile Birds | Browser-Based Evidence Engine',
    twitterDescription: 'The browser-based evidence workspace built for work that must survive legal scrutiny, editorial fact-checks, and dissertation defense.',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Reptile Birds',
        'applicationCategory': 'BusinessApplication',
        'applicationSubCategory': 'Evidence Management & Investigative Research',
        'operatingSystem': 'Any Web Browser (Chrome, Firefox, Safari, Edge)',
        'description': 'Reptile Birds is a deterministic, browser-based research and evidence-management workspace. It anchors verbatim quotes to primary documents with SHA-256 cryptographic hashes, generates 1-click legal fact-checking binders, and operates client-side with zero remote server data uploads.',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': [
          '5-Second Fact-Check Verification',
          'Zero Software Installation (Instant Browser Launch)',
          'Zero Server Uploads (Zero Subpoena Risk)',
          'Client-Side Private Browser Sandbox',
          'Cryptographic SHA-256 Source Hashing',
          'Verbatim Citation & Cell-Level Anchoring',
          'Interactive Entity Relationship Network Graph',
          'Side-by-Side Document & Revision Diffing',
          'Deterministic Conflict Detection Matrix',
          '1-Click Fact-Check Binder & Dossier Export'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is Reptile Birds?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Reptile Birds is a browser-based, local-first evidence workspace designed for investigative journalists, OSINT researchers, due diligence analysts, and PhD candidates. It allows researchers to organize PDFs, spreadsheets, transcripts, and notes with deterministic SHA-256 source traceability and generate 1-click verified fact-check binders without uploading sensitive files to cloud servers.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How does Reptile Birds differ from Notion or Obsidian for research?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Note-taking apps like Notion and Obsidian are mutable scratchpads where quotes can be accidentally edited or paraphrased, lacking cryptographic custody, cell-level spreadsheet anchoring, and deterministic verification. Reptile Birds treats source materials as immutable primary evidence, linking every claim directly to exact page numbers, spreadsheet coordinates, and SHA-256 document hashes.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Why does Reptile Birds avoid Generative AI for evidence verification?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Generative AI and Large Language Models (LLMs) summarize, rewrite, and hallucinate facts. In investigative journalism, legal discovery, and academic research, a minor AI paraphrase that shifts "suspected" to "confirmed" constitutes libel or research misconduct. Reptile Birds uses deterministic verification, preserving exact verbatim citations and leaving factual conclusions strictly with the human researcher.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How does Reptile Birds protect whistleblowers and sensitive sources from subpoenas?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Reptile Birds operates on a zero-cloud, local-first architecture. All research files, notes, and IndexedDB stores reside entirely inside the user\'s local browser. Because no user research data is transmitted to or stored on Reptile Birds servers, there is no centralized database or cloud account for third parties, adversaries, or government authorities to subpoena.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What is the 5-Second Fact-Check Challenge?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'The 5-Second Fact-Check Challenge is the standard that an investigator must be able to produce the exact highlighted primary page and cryptographic source for any claim in their findings within five seconds when challenged by an editor, legal counsel, or dissertation committee.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Why is the tool named Reptile Birds?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'In evolutionary biology, birds are avian dinosaurs—the unbroken living lineage that connects ancient fossil records directly to the modern sky. Reptile Birds serves that same function in research: preserving the unbroken, auditable thread connecting raw primary archives to verified public findings.'
            }
          }
        ]
      }
    ]
  },
  '/about/': {
    slug: '/about/',
    title: 'About Reptile Birds | The Unbroken Thread of Research',
    description: 'Why we built Reptile Birds: preserving research provenance, eliminating tool fragmentation, refusing generative AI hallucinations, and protecting sources with zero-cloud storage.',
    canonical: 'https://reptilebirds.com/about/',
    h1: 'Built for Evidence, Provenance, and the Human Researcher',
    primaryKeyword: 'investigative research philosophy',
    secondaryKeywords: ['why reptile birds', 'deterministic research software', 'source provenance', 'evidence traceability', 'zero cloud research'],
    searchIntent: 'Informational / About',
    ogTitle: 'About Reptile Birds | Research First. Evidence Second.',
    ogDescription: 'Why deterministic tools, verbatim citations, and air-gapped security matter more than automated AI assertions.',
    twitterTitle: 'About Reptile Birds | Research First. Evidence Second.',
    twitterDescription: 'Understanding the philosophy, boundaries, and methodology behind Reptile Birds.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About Reptile Birds',
      'description': 'The design principles, evolutionary namesake, engineering boundaries, and investigative methodology behind Reptile Birds.'
    }
  },
  '/how-it-works/': {
    slug: '/how-it-works/',
    title: 'How Reptile Birds Works | The 10-Step Investigation Workflow',
    description: 'Learn the systematic 10-step investigation workflow: from air-gapped file ingest and cryptographic hashing to verbatim citation, entity mapping, and 1-click dossier export.',
    canonical: 'https://reptilebirds.com/how-it-works/',
    h1: 'The 10-Step Investigation Workflow',
    primaryKeyword: 'evidence management workflow',
    secondaryKeywords: ['research methodology', 'how to organize investigative evidence', '5-second fact check workflow', 'claims matrix', 'entity network mapping'],
    searchIntent: 'Educational / Procedural',
    ogTitle: 'How Reptile Birds Works | From Source to Finding',
    ogDescription: 'Step-by-step guide to importing material, indexing excerpts, linking claims, and producing verified research reports.',
    twitterTitle: 'How Reptile Birds Works | From Source to Finding',
    twitterDescription: 'A systematic 10-step guide to conducting verifiable investigations in your browser.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Conduct a Verifiable Investigation with Reptile Birds',
      'step': [
        { '@type': 'HowToStep', 'name': '1. Initialize Isolated Workspace', 'text': 'Create a designated investigation schema isolated in your local browser IndexedDB.' },
        { '@type': 'HowToStep', 'name': '2. Ingest Multi-Format Primary Sources', 'text': 'Import PDFs, Excel spreadsheets, CSVs, plain text transcripts, and exhibits with automated Web Crypto SHA-256 hashing.' },
        { '@type': 'HowToStep', 'name': '3. Deep Document Inspection', 'text': 'Examine multi-page documents and jump across complex financial spreadsheet sheets without leaving the browser.' },
        { '@type': 'HowToStep', 'name': '4. Sub-Second Full-Text Retrieval', 'text': 'Query keywords and dates across all ingested research sources locally in milliseconds.' },
        { '@type': 'HowToStep', 'name': '5. Extract Verbatim Anchored Evidence', 'text': 'Highlight primary text to capture quotes permanently anchored to source coordinates, page numbers, and cell rows.' },
        { '@type': 'HowToStep', 'name': '6. Map Entity & Relationship Networks', 'text': 'Connect individuals, corporations, bank accounts, and shells into an interactive visual graph.' },
        { '@type': 'HowToStep', 'name': '7. Side-by-Side Source Diffing', 'text': 'Compare drafts, revisions, and leaked records side-by-side to pinpoint precise discrepancies.' },
        { '@type': 'HowToStep', 'name': '8. Deterministic Conflict Verification', 'text': 'Run rule-based checks that flag conflicting dates, unverified claims, and contradictory testimony.' },
        { '@type': 'HowToStep', 'name': '9. Construct Claims Matrix', 'text': 'Bind supporting and refuting evidence directly to core investigative hypotheses.' },
        { '@type': 'HowToStep', 'name': '10. Export 1-Click Fact-Check Binder', 'text': 'Produce an auditable, printable evidence dossier with complete cryptographic source references.' }
      ]
    }
  },
  '/features/': {
    slug: '/features/',
    title: 'Reptile Birds Features | Tools Built for Evidence, Not Hype',
    description: 'Explore Reptile Birds features: client-side PDF/spreadsheet viewing, exact citation indexing, entity connection graphs, deterministic conflict detection, and local archive backups.',
    canonical: 'https://reptilebirds.com/features/',
    h1: 'Tools Built for Evidence-Based Investigation',
    primaryKeyword: 'investigative research features',
    secondaryKeywords: ['PDF evidence viewer', 'spreadsheet research tool', 'entity relationship graph', 'SHA-256 evidence verification', 'fact check binder'],
    searchIntent: 'Commercial / Feature evaluation',
    ogTitle: 'Reptile Birds Features | Traceable Evidence Workspace',
    ogDescription: 'Complete breakdown of document ingestion, citation extraction, entity networking, and deterministic verification tools.',
    twitterTitle: 'Reptile Birds Features | Traceable Evidence Workspace',
    twitterDescription: 'Inspect PDFs, sheets, entities, claims, and timeline events in one deterministic workspace.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Reptile Birds Features',
      'featureList': 'Local PDF/Spreadsheet Inspection, Verbatim Citation Popover, Entity Relationship Graph, Chronological Timeline, Deterministic Quote Verification, Side-by-Side Text Comparison, JSON Archive Export'
    }
  },
  '/use-cases/': {
    slug: '/use-cases/',
    title: 'Research Use Cases | Reptile Birds for Journalists, Analysts & PhDs',
    description: 'Discover how investigative journalists, OSINT researchers, academic researchers, due-diligence teams, and fact-checkers survive scrutiny with Reptile Birds.',
    canonical: 'https://reptilebirds.com/use-cases/',
    h1: 'Tailored for Serious Research Scenarios',
    primaryKeyword: 'investigative research use cases',
    secondaryKeywords: ['OSINT evidence management', 'journalism research software', 'due diligence document analysis', 'PhD dissertation source defense', 'fact checking tool'],
    searchIntent: 'Informational / Evaluative',
    ogTitle: 'Reptile Birds Use Cases | Research Workspaces Across Disciplines',
    ogDescription: 'Discover how investigative journalists, OSINT analysts, and due-diligence teams maintain source traceability.',
    twitterTitle: 'Reptile Birds Use Cases | Research Workspaces Across Disciplines',
    twitterDescription: 'Practical application scenarios across journalism, open source intelligence, academia, and corporate due diligence.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Reptile Birds Use Cases'
    }
  },
  '/privacy/': {
    slug: '/privacy/',
    title: 'Privacy Policy | Zero-Cloud Architecture & Source Protection',
    description: 'Our uncompromising privacy model: research files never touch our servers, eliminating cloud subpoena risk and protecting confidential sources.',
    canonical: 'https://reptilebirds.com/privacy/',
    h1: 'Zero-Cloud Architecture & Privacy Policy',
    primaryKeyword: 'Reptile Birds privacy policy',
    secondaryKeywords: ['zero cloud research', 'source protection software', 'local storage privacy', 'browser evidence security'],
    searchIntent: 'Legal / Trust Verification',
    ogTitle: 'Reptile Birds Privacy Policy | Transparent Data Practices',
    ogDescription: 'Clear explanation of local browser processing versus public website interactions.',
    twitterTitle: 'Reptile Birds Privacy Policy | Transparent Data Practices',
    twitterDescription: 'Clear explanation of local browser processing versus public website interactions.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Reptile Birds Privacy Policy'
    }
  },
  '/terms/': {
    slug: '/terms/',
    title: 'Terms of Use | Reptile Birds',
    description: 'Review the terms of use governing Reptile Birds, including browser storage limitations, user research responsibilities, and service disclaimers.',
    canonical: 'https://reptilebirds.com/terms/',
    h1: 'Terms of Use',
    primaryKeyword: 'Reptile Birds terms of service',
    secondaryKeywords: ['research software terms', 'browser storage liability disclaimer', 'user responsibilities'],
    searchIntent: 'Legal',
    ogTitle: 'Reptile Birds Terms of Use',
    ogDescription: 'Terms and conditions governing the use of the Reptile Birds software and website.',
    twitterTitle: 'Reptile Birds Terms of Use',
    twitterDescription: 'Terms and conditions governing the use of the Reptile Birds software and website.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Reptile Birds Terms of Use'
    }
  },
  '/cookies/': {
    slug: '/cookies/',
    title: 'Cookie Policy | Reptile Birds',
    description: 'Learn how Reptile Birds uses cookies, local storage, and session tokens across our public marketing website and web application.',
    canonical: 'https://reptilebirds.com/cookies/',
    h1: 'Cookie & Local Storage Policy',
    primaryKeyword: 'Reptile Birds cookie policy',
    secondaryKeywords: ['website cookies', 'local storage policy', 'advertising cookie controls'],
    searchIntent: 'Legal / Compliance',
    ogTitle: 'Reptile Birds Cookie Policy',
    ogDescription: 'Complete transparency regarding browser cookies, local storage, and session caching.',
    twitterTitle: 'Reptile Birds Cookie Policy',
    twitterDescription: 'Complete transparency regarding browser cookies, local storage, and session caching.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Reptile Birds Cookie Policy'
    }
  },
  '/contact/': {
    slug: '/contact/',
    title: 'Contact Reptile Birds | Editorial, Technical & Security Inquiries',
    description: 'Get in touch with the Reptile Birds team directly at sharpedge74@gmail.com for technical support, security inquiries, bug reports, and research partnerships.',
    canonical: 'https://reptilebirds.com/contact/',
    h1: 'Contact Our Team',
    primaryKeyword: 'contact Reptile Birds',
    secondaryKeywords: ['research tool support', 'report bug reptile birds', 'institutional inquiries', 'sharpedge74@gmail.com'],
    searchIntent: 'Contact / Support',
    ogTitle: 'Contact Reptile Birds',
    ogDescription: 'Direct channel (sharpedge74@gmail.com) for technical support, feedback, and privacy questions.',
    twitterTitle: 'Contact Reptile Birds',
    twitterDescription: 'Direct channel (sharpedge74@gmail.com) for technical support, feedback, and privacy questions.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact Reptile Birds'
    }
  },
  '/faq/': {
    slug: '/faq/',
    title: 'Frequently Asked Questions | Reptile Birds',
    description: 'Direct answers to critical questions about Reptile Birds: why we beat Notion/AI for evidence, zero-install browser execution, zero server uploads, and fact-check binders.',
    canonical: 'https://reptilebirds.com/faq/',
    h1: 'Frequently Asked Questions',
    primaryKeyword: 'Reptile Birds FAQ',
    secondaryKeywords: ['browser evidence software', 'zero install research tool', 'why not notion', 'is Reptile Birds AI', 'subpoena protection', 'browser storage limits'],
    searchIntent: 'Informational',
    ogTitle: 'Reptile Birds FAQ',
    ogDescription: 'Fact-based answers regarding browser storage, client-side execution, AI non-involvement, and data export.',
    twitterTitle: 'Reptile Birds FAQ',
    twitterDescription: 'Fact-based answers regarding browser storage, client-side execution, AI non-involvement, and data export.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'name': 'Reptile Birds FAQ'
    }
  },
  '/security/': {
    slug: '/security/',
    title: 'Security & Zero-Subpoena Architecture | Reptile Birds',
    description: 'Technical breakdown of Reptile Birds security: Web Crypto SHA-256 integrity, client-side browser sandboxing, zero server uploads, and zero cloud liability.',
    canonical: 'https://reptilebirds.com/security/',
    h1: 'Technical Protections and Cryptographic Integrity',
    primaryKeyword: 'research software security',
    secondaryKeywords: ['zero subpoena architecture', 'SHA-256 evidence hashing', 'browser-based evidence security', 'client side sandbox', 'file integrity verification'],
    searchIntent: 'Technical / Security Review',
    ogTitle: 'Security & Cryptographic Integrity | Reptile Birds',
    ogDescription: 'Learn how Web Crypto SHA-256 and browser sandboxing preserve evidence integrity without cloud uploads.',
    twitterTitle: 'Security & Cryptographic Integrity | Reptile Birds',
    twitterDescription: 'Learn how Web Crypto SHA-256 and browser sandboxing preserve evidence integrity without cloud uploads.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'headline': 'Technical Protections, Zero-Subpoena Architecture, and Cryptographic Integrity in Reptile Birds',
      'articleSection': 'Software Security'
    }
  },
  '/data-storage/': {
    slug: '/data-storage/',
    title: 'Data Storage & Backup Guide | IndexedDB Architecture',
    description: 'Understand how IndexedDB manages your research material locally, storage quotas, browser data persistence, and archive export protocols.',
    canonical: 'https://reptilebirds.com/data-storage/',
    h1: 'Managing Local Storage and Research Backups',
    primaryKeyword: 'local browser data storage',
    secondaryKeywords: ['IndexedDB research backup', 'browser storage quota', 'how to back up evidence', 'data eviction protection'],
    searchIntent: 'Technical Guide / Best Practices',
    ogTitle: 'Data Storage & Backup Guide | Reptile Birds',
    ogDescription: 'Understanding IndexedDB storage, browser quota limits, and archive export protocols.',
    twitterTitle: 'Data Storage & Backup Guide | Reptile Birds',
    twitterDescription: 'Understanding IndexedDB storage, browser quota limits, and archive export protocols.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Manage Local Storage and Research Backups in Reptile Birds'
    }
  },
  '/evidence-provenance/': {
    slug: '/evidence-provenance/',
    title: 'Evidence & Provenance | The Anatomy of Unbroken Research',
    description: 'Learn how to build an unbreakable research chain from original file to final finding: File → Source → Evidence → Claim → Finding → Report.',
    canonical: 'https://reptilebirds.com/evidence-provenance/',
    h1: 'The Anatomy of Research Provenance',
    primaryKeyword: 'research provenance',
    secondaryKeywords: ['evidence traceability', 'chain of custody in research', 'evidence citation methodology', 'source tracking'],
    searchIntent: 'Educational / Methodological',
    ogTitle: 'Evidence & Provenance | Traceable Research Methodology',
    ogDescription: 'Building unbroken research chains: File → Source → Evidence → Claim → Finding → Report.',
    twitterTitle: 'Evidence & Provenance | Traceable Research Methodology',
    twitterDescription: 'Building unbroken research chains: File → Source → Evidence → Claim → Finding → Report.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': 'The Anatomy of Research Provenance in Reptile Birds',
      'articleSection': 'Methodology'
    }
  },
  '/research-guide/': {
    slug: '/research-guide/',
    title: 'Investigative Research Guide | The 5-Second Verification Standard',
    description: 'Practical methodologies for investigative researchers: organizing document leaks, surviving legal review, verifying dates and numbers, and managing complex source material.',
    canonical: 'https://reptilebirds.com/research-guide/',
    h1: 'The Guide to Evidence-Based Research Organization',
    primaryKeyword: 'investigative research methodology',
    secondaryKeywords: ['how to organize research documents', 'surviving legal review', 'fact-checking methodology', 'source preservation'],
    searchIntent: 'Educational / Comprehensive Guide',
    ogTitle: 'Investigative Research Guide | Source Organization & Verification',
    ogDescription: 'Practical methodologies for structuring documents, capturing context, and verifying claims.',
    twitterTitle: 'Investigative Research Guide | Source Organization & Verification',
    twitterDescription: 'Practical methodologies for structuring documents, capturing context, and verifying claims.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': 'The Guide to Evidence-Based Research Organization'
    }
  }
};
