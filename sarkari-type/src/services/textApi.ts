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

    // Return sample text for the topic, or a default message
    return sampleTexts[topic] || sampleTexts['Technology'];
  } catch (error) {
    console.error('Failed to generate AI text:', error);
    throw new Error('Could not generate text. Please try again.');
  }
}

/**
 * Fetch random Wikipedia article
 */
export async function fetchWikipediaText(searchTerm?: string): Promise<string> {
  try {
    const endpoint = searchTerm
      ? `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`
      : 'https://en.wikipedia.org/api/rest_v1/page/random/summary';

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Failed to fetch Wikipedia article');
    }

    const data = await response.json();
    return data.extract || 'Could not fetch article content.';
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
 * Validate and prepare text for typing test
 */
export function prepareText(text: string): string {
  if (!text || text.trim().length === 0) {
    throw new Error('Text cannot be empty');
  }

  // Remove extra whitespace and normalize
  return text.trim().replace(/\s+/g, ' ');
}
