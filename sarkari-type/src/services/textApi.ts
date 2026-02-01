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

const WIKIPEDIA_TOPICS = [
  'Random Article',
  'Science & Technology',
  'History & Events',
  'Geography & Places',
  'Arts & Culture',
  'Sports & Games',
  'Biography & People',
  'Nature & Animals',
  'Space & Astronomy',
  'Medicine & Health',
];

// Predefined Wikipedia articles for each category
const WIKIPEDIA_ARTICLES: { [key: string]: string[] } = {
  'Random Article': [], // Will use random API
  'Science & Technology': [
    'Artificial intelligence',
    'Quantum computing',
    'CRISPR',
    'Renewable energy',
    'Nanotechnology',
    'Machine learning',
    'Robotics',
    'Blockchain',
    'Internet of Things',
    'Nuclear fusion',
  ],
  'History & Events': [
    'World War II',
    'Renaissance',
    'Industrial Revolution',
    'Ancient Egypt',
    'Roman Empire',
    'French Revolution',
    'Cold War',
    'Space Race',
    'Age of Enlightenment',
    'Silk Road',
  ],
  'Geography & Places': [
    'Mount Everest',
    'Amazon rainforest',
    'Great Barrier Reef',
    'Sahara Desert',
    'Grand Canyon',
    'Antarctica',
    'Pacific Ocean',
    'Himalayas',
    'Mariana Trench',
    'Victoria Falls',
  ],
  'Arts & Culture': [
    'Leonardo da Vinci',
    'William Shakespeare',
    'Classical music',
    'Impressionism',
    'Jazz',
    'Cinema',
    'Architecture',
    'Ballet',
    'Photography',
    'Modern art',
  ],
  'Sports & Games': [
    'Olympic Games',
    'FIFA World Cup',
    'Cricket',
    'Tennis',
    'Chess',
    'Basketball',
    'Marathon',
    'Swimming',
    'Gymnastics',
    'Formula One',
  ],
  'Biography & People': [
    'Albert Einstein',
    'Marie Curie',
    'Nelson Mandela',
    'Mahatma Gandhi',
    'Isaac Newton',
    'Charles Darwin',
    'Nikola Tesla',
    'Abraham Lincoln',
    'Martin Luther King Jr.',
    'Stephen Hawking',
  ],
  'Nature & Animals': [
    'African elephant',
    'Blue whale',
    'Giant panda',
    'Coral reef',
    'Rainforest',
    'Honey bee',
    'Dolphin',
    'Octopus',
    'Bald eagle',
    'Tiger',
  ],
  'Space & Astronomy': [
    'Solar System',
    'Mars',
    'Black hole',
    'International Space Station',
    'Hubble Space Telescope',
    'Milky Way',
    'Moon landing',
    'James Webb Space Telescope',
    'Exoplanet',
    'Big Bang',
  ],
  'Medicine & Health': [
    'DNA',
    'Vaccine',
    'Human brain',
    'Immune system',
    'Cancer',
    'Antibiotics',
    'Virus',
    'Nutrition',
    'Mental health',
    'Public health',
  ],
};

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

// Fallback sample text variations (used when API is unavailable)
const SAMPLE_TEXT_VARIATIONS: { [key: string]: string[] } = {
  Technology: [
    'Technology has transformed every aspect of modern life. From communication to commerce, entertainment to education, digital innovations continue to shape how we live, work, and interact with one another. Artificial intelligence, cloud computing, and blockchain are revolutionizing industries. The internet connects billions of people worldwide, enabling instant access to information and global collaboration. As technology evolves, challenges around privacy, security, and digital equity become increasingly important. The future promises even more remarkable advances in quantum computing, biotechnology, and renewable energy solutions. Smart devices integrate seamlessly into daily routines, automating tasks and enhancing productivity. Virtual reality and augmented reality create immersive experiences for learning and entertainment. Cybersecurity remains critical as digital threats grow more sophisticated. Innovation drives economic growth and improves quality of life globally.',
  ],
  Science: [
    'Science is the systematic study of the natural world through observation and experimentation. Scientific method involves forming hypotheses, conducting experiments, and analyzing results to understand fundamental principles. From physics and chemistry to biology and astronomy, science reveals the mysteries of existence. Recent discoveries in quantum mechanics, genetics, and neuroscience continue to expand human knowledge. Scientific research addresses pressing challenges like climate change, disease prevention, and sustainable energy. Collaboration between scientists worldwide accelerates innovation and breakthrough discoveries that benefit humanity.',
  ],
  History: [
    'History is the study of past events and societies. It helps us understand how civilizations developed, cultures interacted, and societies evolved over time. Major historical periods include ancient civilizations, the Middle Ages, the Renaissance, and modern era. Historical analysis examines causes and consequences of significant events like revolutions, wars, and social movements. By studying history, we gain perspective on contemporary issues and appreciate human achievements and struggles.',
  ],
};

/**
 * Generate AI text using Perplexity Sonar API
 */
export async function generateAIText(topic: string, wordCount: number = 100): Promise<string> {
  const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
  
  // If no API key, use fallback samples
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn('Perplexity API key not configured. Using sample text.');
    return useFallbackText(topic, wordCount);
  }

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates informative, well-written text for typing practice. Write in a clear, engaging style suitable for typing tests.'
          },
          {
            role: 'user',
            content: `Write exactly ${wordCount} words about ${topic}. Be informative and engaging. Do not include any preamble, title, or conclusion markers. Just provide the ${wordCount} words of content.`
          }
        ],
        max_tokens: wordCount * 2, // Allow some buffer
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Perplexity API error:', response.status, errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content;

    if (!generatedText) {
      throw new Error('No content in API response');
    }

    // Clean and truncate to exact word count
    const words = generatedText.trim().split(/\s+/).filter((w: string) => w.length > 0);
    const finalText = words.slice(0, wordCount).join(' ');
    
    return finalText;
    
  } catch (error) {
    console.error('Failed to generate AI text:', error);
    console.warn('Falling back to sample text');
    return useFallbackText(topic, wordCount);
  }
}

/**
 * Use fallback sample text when API is unavailable
 */
function useFallbackText(topic: string, wordCount: number): string {
  const variations = SAMPLE_TEXT_VARIATIONS[topic] || SAMPLE_TEXT_VARIATIONS['Technology'];
  const randomIndex = Math.floor(Math.random() * variations.length);
  const selectedText = variations[randomIndex];
  
  // Truncate to requested word count
  const words = selectedText.split(/\s+/).filter(w => w.length > 0);
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ');
  }
  return selectedText;
}

/**
 * Fetch full Wikipedia article content and extract first N words
 */
export async function fetchWikipediaText(wordCount: number = 100, category?: string): Promise<string> {
  try {
    // Step 1: Get article title (random or from category)
    let pageTitle: string;
    
    if (!category || category === 'Random Article') {
      // Get random article title
      const randomResponse = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary');
      if (!randomResponse.ok) {
        throw new Error('Failed to fetch random Wikipedia article');
      }
      const randomData = await randomResponse.json();
      pageTitle = randomData.title;
    } else {
      // Select random article from the category's article list
      const articles = WIKIPEDIA_ARTICLES[category] || [];
      if (articles.length === 0) {
        // Fallback to random if category has no articles
        const randomResponse = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary');
        if (!randomResponse.ok) {
          throw new Error('Failed to fetch random Wikipedia article');
        }
        const randomData = await randomResponse.json();
        pageTitle = randomData.title;
      } else {
        // Pick random article from the list
        const randomIndex = Math.floor(Math.random() * articles.length);
        pageTitle = articles[randomIndex];
      }
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
 * Get list of Wikipedia topic categories
 */
export function getWikipediaTopics(): string[] {
  return WIKIPEDIA_TOPICS;
}

/**
 * Get list of government document types
 */
export function getGovernmentDocTypes(): string[] {
  return GOVERNMENT_DOC_TYPES;
}

/**
 * Generate government document text with variations
 */
export async function generateGovernmentText(docType: string, wordCount: number = 100): Promise<string> {
  // Multiple variations for each document type
  const templates: { [key: string]: string[] } = {
    'Office Memorandum': [
      `GOVERNMENT OF INDIA\nMinistry of Personnel, Public Grievances and Pensions\nDepartment of Personnel and Training\n\nOffice Memorandum\n\nSubject: Implementation of new guidelines for employee welfare schemes\n\nThe undersigned is directed to refer to the subject mentioned above and to state that the Government has decided to implement revised guidelines for employee welfare schemes with effect from the date of issue of this memorandum. All departments are hereby requested to ensure strict compliance with the following provisions. The benefits under the scheme shall be extended to all eligible employees as per the criteria outlined in Annexure-A. Any clarification regarding implementation may be sought from the undersigned office. All concerned authorities must maintain proper records of beneficiaries and submit quarterly reports to the central monitoring committee. The scheme aims to enhance employee satisfaction and productivity through comprehensive welfare measures. Training programs shall be conducted to familiarize staff with new procedures. Feedback mechanisms will be established to continuously improve service delivery.`,
      `GOVERNMENT OF INDIA\nMinistry of Home Affairs\nDepartment of Internal Security\n\nOffice Memorandum\n\nSubject: Revised security protocols for government establishments\n\nThis office is directed to communicate revised security protocols applicable to all government establishments with immediate effect. All entry points must implement biometric authentication systems within sixty days. Security personnel require updated training on emergency response procedures. Visitor management systems shall maintain digital records of all entries and exits. Surveillance equipment must be upgraded to high-definition standards. Random security audits will be conducted quarterly by designated teams. Fire safety equipment requires monthly inspection and certification. Emergency evacuation drills must be organized bi-annually. Access control systems need integration with central monitoring stations. Security clearances for contractors and vendors require thorough background verification. Incident reporting mechanisms must be streamlined for faster response times.`,
    ],
    'Government Order': [
      `GOVERNMENT ORDER\n\nNo. ABC/2024/001                                    Dated: ${new Date().toLocaleDateString()}\n\nIn exercise of the powers conferred by Section 4 of the General Clauses Act, the Government hereby orders that the following amendments shall be made to the existing rules with immediate effect. These modifications are being introduced to streamline administrative procedures and enhance service delivery. All concerned departments shall take necessary action for implementation and report compliance within thirty days. This order supersedes all previous orders on the subject. Nodal officers must coordinate with respective divisions to ensure smooth transition. Impact assessment reports should be submitted quarterly. Public awareness campaigns will communicate changes to stakeholders. Grievance redressal mechanisms must be strengthened accordingly. Training workshops for officials begin next month. Budget allocations have been approved for implementation activities.`,
      `GOVERNMENT ORDER\n\nNo. XYZ/2024/045                                    Dated: ${new Date().toLocaleDateString()}\n\nIn pursuance of the recommendations made by the Administrative Reforms Commission, the Government is pleased to constitute a committee for reviewing existing administrative procedures. The committee shall comprise senior officials from relevant departments and subject matter experts. Terms of reference include identifying redundant processes, suggesting technological interventions, and proposing efficiency improvements. The committee must submit preliminary findings within ninety days. Public consultations will be organized to gather stakeholder feedback. Recommendations shall be implemented in phased manner over fiscal year. Departments must designate liaison officers for coordination purposes. Monthly progress reviews will be conducted by Secretary level officers. Final report should include cost-benefit analysis and implementation roadmap.`,
    ],
  };

  const variations = templates[docType] || templates['Office Memorandum'];
  const randomIndex = Math.floor(Math.random() * variations.length);
  const selectedTemplate = variations[randomIndex];

  // Truncate to approximate word count
  const words = selectedTemplate.split(/\s+/).filter(w => w.length > 0);
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ');
  }
  return selectedTemplate;
}

/**
 * Generate text from custom prompt using AI
 */
export async function generateCustomPromptText(prompt: string, wordCount: number = 100): Promise<string> {
  const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
  
  // If no API key, return message
  if (!apiKey || apiKey === 'your_api_key_here') {
    return `Custom prompt generation requires Perplexity API key. Please configure VITE_PERPLEXITY_API_KEY in your .env file. For now, please use preset topics or paste your own text in the Custom text source option.`;
  }

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates text for typing practice based on user prompts.'
          },
          {
            role: 'user',
            content: `${prompt}. Write exactly ${wordCount} words. Do not include any preamble or conclusion markers.`
          }
        ],
        max_tokens: wordCount * 2,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content;

    if (!generatedText) {
      throw new Error('No content in API response');
    }

    // Clean and truncate
    const words = generatedText.trim().split(/\s+/).filter((w: string) => w.length > 0);
    return words.slice(0, wordCount).join(' ');
    
  } catch (error) {
    console.error('Failed to generate custom prompt text:', error);
    throw new Error('Could not generate text from custom prompt. Please try again.');
  }
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
