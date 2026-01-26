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
    // TODO: In production, replace this with actual API call to Cloudflare Worker
    // The prompt should explicitly request exactly wordCount words
    // Example prompt: `Write exactly ${wordCount} words about ${topic}. Be informative and engaging.`
    
    // For now, return sample text during development
    // In production, this would call the Cloudflare Worker with a prompt like:
    // "Write exactly 100 words about Technology. Be informative and engaging."
    const sampleTexts: { [key: string]: string } = {
      Technology:
        'Technology has transformed every aspect of modern life. From communication to commerce, entertainment to education, digital innovations continue to shape how we live, work, and interact with one another. Artificial intelligence, cloud computing, and blockchain are revolutionizing industries. The internet connects billions of people worldwide, enabling instant access to information and global collaboration. As technology evolves, challenges around privacy, security, and digital equity become increasingly important. The future promises even more remarkable advances in quantum computing, biotechnology, and renewable energy solutions. Smart devices integrate seamlessly into daily routines, automating tasks and enhancing productivity. Virtual reality and augmented reality create immersive experiences for learning and entertainment. Cybersecurity remains critical as digital threats grow more sophisticated. Innovation drives economic growth and improves quality of life globally.',
      Science:
        'Science is the systematic study of the natural world through observation and experimentation. Scientific method involves forming hypotheses, conducting experiments, and analyzing results to understand fundamental principles. From physics and chemistry to biology and astronomy, science reveals the mysteries of existence. Recent discoveries in quantum mechanics, genetics, and neuroscience continue to expand human knowledge. Scientific research addresses pressing challenges like climate change, disease prevention, and sustainable energy. Collaboration between scientists worldwide accelerates innovation and breakthrough discoveries that benefit humanity. Laboratory experiments test theories under controlled conditions. Peer review ensures research quality and reliability. Data analysis employs statistical methods to draw valid conclusions. Scientific literacy empowers informed decision-making in society. Technology enables increasingly precise measurements and observations. Interdisciplinary approaches combine insights from multiple fields.',
      History:
        'History is the study of past events and societies. It helps us understand how civilizations developed, cultures interacted, and societies evolved over time. Major historical periods include ancient civilizations, the Middle Ages, the Renaissance, and modern era. Historical analysis examines causes and consequences of significant events like revolutions, wars, and social movements. By studying history, we gain perspective on contemporary issues and appreciate human achievements and struggles. Archives, artifacts, and documents provide evidence for historical understanding. Historians interpret primary sources to reconstruct past events. Archaeological discoveries reveal information about ancient peoples and cultures. Historical patterns inform predictions about future trends. Understanding history promotes cultural awareness and tolerance. Different historiographical approaches offer varied interpretations of events. Oral histories preserve personal narratives and community memories.',
      Business:
        'Business is the exchange of goods and services for economic gain. Modern business encompasses sole proprietorships, partnerships, and corporations operating in global markets. Key business concepts include entrepreneurship, management, marketing, finance, and operations. Successful businesses identify market needs and develop solutions that create value for customers. Economic factors, competition, and consumer behavior influence business strategies and outcomes. Digital transformation continues to reshape traditional business models and create new opportunities. Supply chain management ensures efficient product delivery. Human resources develop and retain talented employees. Strategic planning guides long-term organizational direction. Financial analysis evaluates profitability and sustainability. Marketing campaigns build brand awareness and customer loyalty. Innovation drives competitive advantage in dynamic markets. Corporate social responsibility addresses environmental and social impacts.',
      Psychology:
        'Psychology is the scientific study of human behavior and mental processes. Psychologists investigate topics including perception, cognition, emotion, personality, and social behavior. Different schools of thought such as behaviorism, cognitive psychology, and humanistic psychology offer various perspectives. Research methods include experiments, observations, surveys, and case studies. Psychology applications span clinical treatment, education, workplace performance, and personal development. Understanding psychology helps explain why people think, feel, and behave as they do. Developmental psychology examines changes across the lifespan. Social psychology studies group dynamics and interpersonal relationships. Neuropsychology explores brain-behavior connections. Clinical psychologists diagnose and treat mental health disorders. Cognitive processes include attention, memory, and problem-solving. Personality theories describe individual differences in behavior patterns.',
    };

    // Get sample text for the topic, or a default message
    const fullText = sampleTexts[topic] || sampleTexts['Technology'];
    
    // Truncate to requested word count
    const words = fullText.split(/\s+/).filter(w => w.length > 0);
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
 * Fetch full Wikipedia article content and extract first N words
 */
export async function fetchWikipediaText(wordCount: number = 100, searchTerm?: string): Promise<string> {
  try {
    // Step 1: Get article title (random or specific)
    let pageTitle: string;
    
    if (searchTerm) {
      pageTitle = searchTerm;
    } else {
      // Get random article title
      const randomResponse = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary');
      if (!randomResponse.ok) {
        throw new Error('Failed to fetch random Wikipedia article');
      }
      const randomData = await randomResponse.json();
      pageTitle = randomData.title;
    }

    // Step 2: Fetch full article HTML content
    const htmlResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/html/${encodeURIComponent(pageTitle)}`
    );
    
    if (!htmlResponse.ok) {
      throw new Error('Failed to fetch Wikipedia article content');
    }

    const htmlContent = await htmlResponse.text();
    
    // Step 3: Extract text from HTML (remove tags, scripts, styles)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Remove unwanted elements
    const unwantedSelectors = ['script', 'style', 'table', 'figure', '.mw-editsection', '.reference', 'sup'];
    unwantedSelectors.forEach(selector => {
      const elements = tempDiv.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });
    
    // Get clean text
    let fullText = tempDiv.textContent || tempDiv.innerText || '';
    
    // Clean up whitespace
    fullText = fullText
      .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
      .replace(/\[\d+\]/g, '')  // Remove citation markers like [1], [2]
      .trim();
    
    // Step 4: Extract first N words
    const words = fullText.split(/\s+/).filter(w => w.length > 0);
    
    if (words.length === 0) {
      throw new Error('Could not extract text from article');
    }
    
    // Return exactly wordCount words (or less if article is shorter)
    const extractedWords = words.slice(0, Math.min(wordCount, words.length));
    return extractedWords.join(' ');
    
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

The undersigned is directed to refer to the subject mentioned above and to state that the Government has decided to implement revised guidelines for employee welfare schemes with effect from the date of issue of this memorandum. All departments are hereby requested to ensure strict compliance with the following provisions. The benefits under the scheme shall be extended to all eligible employees as per the criteria outlined in Annexure-A. Any clarification regarding implementation may be sought from the undersigned office. All concerned authorities must maintain proper records of beneficiaries and submit quarterly reports to the central monitoring committee. The scheme aims to enhance employee satisfaction and productivity through comprehensive welfare measures. Training programs shall be conducted to familiarize staff with new procedures. Feedback mechanisms will be established to continuously improve service delivery.`,

    'Government Order': `GOVERNMENT ORDER

No. ABC/2024/001                                    Dated: ${new Date().toLocaleDateString()}

In exercise of the powers conferred by Section 4 of the General Clauses Act, the Government hereby orders that the following amendments shall be made to the existing rules with immediate effect. These modifications are being introduced to streamline administrative procedures and enhance service delivery. All concerned departments shall take necessary action for implementation and report compliance within thirty days. This order supersedes all previous orders on the subject. Nodal officers must coordinate with respective divisions to ensure smooth transition. Impact assessment reports should be submitted quarterly. Public awareness campaigns will communicate changes to stakeholders. Grievance redressal mechanisms must be strengthened accordingly. Training workshops for officials begin next month. Budget allocations have been approved for implementation activities.`,

    'Official Letter': `From: Under Secretary to the Government
To: The Secretary, Department of Administrative Reforms

Subject: Request for information regarding pending proposals

Sir,
I am directed to refer to your letter dated reference above and to request that information regarding all pending proposals be furnished to this office at the earliest. The matter is of urgent nature and requires immediate attention. It is requested that a detailed status report along with reasons for delay, if any, be submitted within seven working days. Your cooperation in this regard would be highly appreciated. The information should include proposal numbers, submission dates, current status, and expected completion timelines. Please also indicate any resource constraints or procedural bottlenecks affecting progress. This data is essential for preparing the monthly progress report. Senior management requires comprehensive updates for strategic planning purposes.

Yours faithfully,
Under Secretary`,

    'Public Notice': `PUBLIC NOTICE

The Department of Civil Services hereby notifies all concerned citizens that applications are invited for various positions under the annual recruitment drive. Eligible candidates must submit their applications through the online portal before the last date. All applicants are advised to carefully read the eligibility criteria and selection process outlined in the detailed notification available on the official website. Incomplete applications or those received after the deadline shall not be considered under any circumstances. Age relaxation provisions apply as per government rules. Application fees are non-refundable. Document verification will be conducted at designated centers. Shortlisted candidates will be informed via email and SMS. Selection involves written examination and personal interview. Medical fitness certificates are mandatory for final appointment. Reserved category candidates must submit valid certificates.`,
  };

  const template = templates[docType] || templates['Official Letter'];

  // Truncate to approximate word count
  const words = template.split(/\s+/).filter(w => w.length > 0);
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ');
  }
  return template;
}

/**
 * Generate text from custom prompt using AI
 */
export async function generateCustomPromptText(prompt: string, wordCount: number = 100): Promise<string> {
  // TODO: In production, call AI API with custom prompt
  // The API request should include: `${prompt}. Write exactly ${wordCount} words.`
  
  // For now, return a message indicating this feature needs API integration
  return `Custom prompt generation would process: "${prompt}" and generate exactly ${wordCount} words. This feature requires AI API integration. For now, please use preset topics or paste your own text in the Custom text source option.`;
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
