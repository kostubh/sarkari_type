/**
 * Text API Service
 *
 * Handles fetching text from different sources:
 * - AI generated (via Perplexity Sonar API)
 * - Wikipedia articles
 * - Custom user-provided text
 */

const AI_TOPICS = [
  'Technology',
  'Science',
  'History',
  'Literature',
  'Business',
  'Psychology',
  'Environment',
  'Travel',
  'Food',
  'Sports',
];

const GOVERNMENT_DOC_TYPES = [
  'Office Memorandum',
  'Government Order',
  'Official Letter',
  'Public Notice',
  'Circular',
  'Press Release',
  'Policy Document',
  'Service Rules',
  'Tender Notice',
  'RTI Response',
];

/**
 * Generate AI text using Perplexity Sonar API
 * This calls the API directly for now (in production, use Cloudflare Worker)
 */
export async function generateAIText(topic: string, wordCount: number = 100): Promise<string> {
  try {
    // For now, return sample text during development
    // In production, this would call the Cloudflare Worker
    const sampleTexts: { [key: string]: string } = {
      Technology:
        'Technology has transformed every aspect of modern life. From communication to commerce, entertainment to education, digital innovations continue to shape how we live, work, and interact with one another. Artificial intelligence, cloud computing, and blockchain are revolutionizing industries. The internet connects billions of people worldwide, enabling instant access to information and global collaboration. As technology evolves, challenges around privacy, security, and digital equity become increasingly important. The future promises even more remarkable advances in quantum computing, biotechnology, and renewable energy solutions.',
      Science:
        'Science is the systematic study of the natural world through observation and experimentation. Scientific method involves forming hypotheses, conducting experiments, and analyzing results to understand fundamental principles. From physics and chemistry to biology and astronomy, science reveals the mysteries of existence. Recent discoveries in quantum mechanics, genetics, and neuroscience continue to expand human knowledge. Scientific research addresses pressing challenges like climate change, disease prevention, and sustainable energy. Collaboration between scientists worldwide accelerates innovation and breakthrough discoveries that benefit humanity.',
      History:
        'History is the study of past events and societies. It helps us understand how civilizations developed, cultures interacted, and societies evolved over time. Major historical periods include ancient civilizations, the Middle Ages, the Renaissance, and modern era. Historical analysis examines causes and consequences of significant events like revolutions, wars, and social movements. By studying history, we gain perspective on contemporary issues and appreciate human achievements and struggles. Archives, artifacts, and documents provide evidence for historical understanding.',
      Business:
        'Business is the exchange of goods and services for economic gain. Modern business encompasses sole proprietorships, partnerships, and corporations operating in global markets. Key business concepts include entrepreneurship, management, marketing, finance, and operations. Successful businesses identify market needs and develop solutions that create value for customers. Economic factors, competition, and consumer behavior influence business strategies and outcomes. Digital transformation continues to reshape traditional business models and create new opportunities.',
      Psychology:
        'Psychology is the scientific study of human behavior and mental processes. Psychologists investigate topics including perception, cognition, emotion, personality, and social behavior. Different schools of thought such as behaviorism, cognitive psychology, and humanistic psychology offer various perspectives. Research methods include experiments, observations, surveys, and case studies. Psychology applications span clinical treatment, education, workplace performance, and personal development. Understanding psychology helps explain why people think, feel, and behave as they do.',
    };

    // Get sample text for the topic, or a default message
    const fullText = sampleTexts[topic] || sampleTexts['Technology'];
    
    // Truncate to requested word count
    const words = fullText.split(/\s+/);
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(' ');
    }
    return fullText;
  } catch (error) {
    console.error('Failed to generate AI text:', error);
    throw new Error('Could not generate text. Please try again.');
  }
}

/**
 * Fetch random Wikipedia article and truncate to word count
 */
export async function fetchWikipediaText(wordCount: number = 100, searchTerm?: string): Promise<string> {
  try {
    const endpoint = searchTerm
      ? `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`
      : 'https://en.wikipedia.org/api/rest_v1/page/random/summary';

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Failed to fetch Wikipedia article');
    }

    const data = await response.json();
    const fullText = data.extract || 'Could not fetch article content.';
    
    // Truncate to requested word count
    const words = fullText.split(/\s+/);
    if (words.length > wordCount) {
      return words.slice(0, wordCount).join(' ');
    }
    return fullText;
  } catch (error) {
    console.error('Failed to fetch Wikipedia text:', error);
    throw new Error('Could not fetch Wikipedia article. Please try again.');
  }
}

/**
 * Get list of available AI topics
 */
export function getAITopics(): string[] {
  return AI_TOPICS;
}

/**
 * Get list of government document types
 */
export function getGovernmentDocTypes(): string[] {
  return GOVERNMENT_DOC_TYPES;
}

/**
 * Generate government document text
 */
export async function generateGovernmentText(docType: string, wordCount: number = 100): Promise<string> {
  // Sample government document templates
  const templates: { [key: string]: string } = {
    'Office Memorandum': `GOVERNMENT OF INDIA
Ministry of Personnel, Public Grievances and Pensions
Department of Personnel and Training

Office Memorandum

Subject: Implementation of new guidelines for employee welfare schemes

The undersigned is directed to refer to the subject mentioned above and to state that the Government has decided to implement revised guidelines for employee welfare schemes with effect from the date of issue of this memorandum. All departments are hereby requested to ensure strict compliance with the following provisions. The benefits under the scheme shall be extended to all eligible employees as per the criteria outlined in Annexure-A. Any clarification regarding implementation may be sought from the undersigned office.`,

    'Government Order': `GOVERNMENT ORDER

No. ABC/2024/001                                    Dated: ${new Date().toLocaleDateString()}

In exercise of the powers conferred by Section 4 of the General Clauses Act, the Government hereby orders that the following amendments shall be made to the existing rules with immediate effect. These modifications are being introduced to streamline administrative procedures and enhance service delivery. All concerned departments shall take necessary action for implementation and report compliance within thirty days. This order supersedes all previous orders on the subject.`,

    'Official Letter': `From: Under Secretary to the Government
To: The Secretary, Department of Administrative Reforms

Subject: Request for information regarding pending proposals

Sir,
I am directed to refer to your letter dated reference above and to request that information regarding all pending proposals be furnished to this office at the earliest. The matter is of urgent nature and requires immediate attention. It is requested that a detailed status report along with reasons for delay, if any, be submitted within seven working days. Your cooperation in this regard would be highly appreciated.

Yours faithfully,
Under Secretary`,

    'Public Notice': `PUBLIC NOTICE

The Department of Civil Services hereby notifies all concerned citizens that applications are invited for various positions under the annual recruitment drive. Eligible candidates must submit their applications through the online portal before the last date. All applicants are advised to carefully read the eligibility criteria and selection process outlined in the detailed notification available on the official website. Incomplete applications or those received after the deadline shall not be considered under any circumstances.`,
  };

  const template = templates[docType] || templates['Official Letter'];

  // Truncate or pad to approximate word count
  const words = template.split(/\s+/);
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ');
  }
  return template;
}

/**
 * Generate text from custom prompt
 */
export async function generateCustomPromptText(prompt: string, wordCount: number = 100): Promise<string> {
  // For now, return a message indicating this feature needs API integration
  // In production, this would call an AI API with the custom prompt and wordCount
  return `Custom prompt generation would process: "${prompt}" (${wordCount} words). This feature requires AI API integration. For now, please use preset topics or paste your own text.`;
}

/**
 * Validate and prepare text for typing test
 */
export function prepareText(text: string): string {
  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  // Remove extra whitespace and normalize
  return text.trim().replace(/\s+/g, ' ');
}
