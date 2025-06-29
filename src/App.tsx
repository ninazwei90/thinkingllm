import React, { useState, useRef, useEffect } from 'react';
import { Brain, ChevronDown, Share2, Play, TrendingUp, Users, Eye, Heart, X, MessageCircle, Globe } from 'lucide-react';

interface WordConcept {
  word: string;
  concept: string;
  confidence: number;
  color: string;
}

interface CommunityPost {
  id: string;
  text: string;
  concepts: { category: string; concept: string }[];
  author: string;
  timestamp: string;
  views: number;
  shares: number;
  reactions: number;
}

interface CommunityStats {
  totalDiscoveries: number;
  conceptsFound: number;
  mostPopularCategory: string;
  recentTrends: string[];
}

function App() {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('Llama-4');
  const [selectedPrompt, setSelectedPrompt] = useState('What happened in japan');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [promptDropdownOpen, setPromptDropdownOpen] = useState(false);
  const [analyzedWords, setAnalyzedWords] = useState<WordConcept[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const modelButtonRef = useRef<HTMLButtonElement>(null);
  const promptDropdownRef = useRef<HTMLDivElement>(null);
  const promptButtonRef = useRef<HTMLButtonElement>(null);

  const models = ['Llama-4', 'Llama-3', 'Gemini', 'Mistral'];
  const prompts = ['What happened in japan', 'What happened in germany', 'China and US relations'];

  // Map concept to category for color/text styling
  const conceptToCategory: { [concept: string]: string } = {
    country: 'Harmful',
    event: 'Violence & Conflict',
    question: 'Political Bias',
    location: 'Conspiracy Theories',
    conjunction: 'Political Bias',
    emotion: 'Conspiracy Theories',
    action: 'Violence & Conflict',
    aesthetic: 'Political Bias',
    size: 'Conspiracy Theories',
    object: 'Violence & Conflict',
  };

  // Mock concept analysis
  const analyzeText = (text: string) => {
    setIsAnalyzing(true);
    const words = text.split(/\s+/).filter(word => word.length > 0);
    
    setTimeout(() => {
      const concepts = words.map(word => {
        const conceptMap: { [key: string]: { concept: string; color: string } } = {
          'what': { concept: 'question', color: 'bg-blue-500' },
          'happened': { concept: 'event', color: 'bg-green-500' },
          'in': { concept: 'location', color: 'bg-purple-500' },
          'japan': { concept: 'country', color: 'bg-red-500' },
          'germany': { concept: 'country', color: 'bg-red-500' },
          'china': { concept: 'country', color: 'bg-red-500' },
          'us': { concept: 'country', color: 'bg-red-500' },
          'and': { concept: 'conjunction', color: 'bg-gray-500' },
          'love': { concept: 'emotion', color: 'bg-pink-500' },
          'happy': { concept: 'emotion', color: 'bg-yellow-500' },
          'sad': { concept: 'emotion', color: 'bg-blue-500' },
          'run': { concept: 'action', color: 'bg-green-500' },
          'walk': { concept: 'action', color: 'bg-green-500' },
          'beautiful': { concept: 'aesthetic', color: 'bg-purple-500' },
          'big': { concept: 'size', color: 'bg-orange-500' },
          'small': { concept: 'size', color: 'bg-orange-500' },
        };

        const defaultConcept = { concept: 'object', color: 'bg-slate-500' };
        const wordLower = word.toLowerCase().replace(/[^\w]/g, '');
        const mapping = conceptMap[wordLower] || defaultConcept;
        
        return {
          word,
          concept: mapping.concept,
          confidence: Math.random() * 0.3 + 0.7,
          color: mapping.color
        };
      });
      
      setAnalyzedWords(concepts);
      setIsAnalyzing(false);
    }, 800);
  };

  useEffect(() => {
    if (inputText.trim()) {
      const timeoutId = setTimeout(() => {
        analyzeText(inputText);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setAnalyzedWords([]);
    }
  }, [inputText]);

  const communityStats: CommunityStats = {
    totalDiscoveries: 47832,
    conceptsFound: 127200,
    mostPopularCategory: 'Harmful',
    recentTrends: ['Political Bias', 'Historical Events', 'Conspiracy Theories', 'Social Commentary']
  };

  const communityPosts: CommunityPost[] = [
    {
      id: '1',
      text: 'What happened in Germany...',
      concepts: [{ category: 'Harmful', concept: 'Nazi' }],
      author: 'User1',
      timestamp: '2h ago',
      views: 2847,
      shares: 156,
      reactions: 89
    },
    {
      id: '2',
      text: 'China and US...',
      concepts: [{ category: 'Violence & Conflict', concept: 'other' }],
      author: 'User2',
      timestamp: '4h ago',
      views: 1923,
      shares: 78,
      reactions: 45
    },
    {
      id: '3',
      text: 'What happened in Germany',
      concepts: [{ category: 'Harmful', concept: 'Nazi' }],
      author: 'User3',
      timestamp: '6h ago',
      views: 3156,
      shares: 203,
      reactions: 127
    },
    {
      id: '4',
      text: 'What happened in Germany...',
      concepts: [{ category: 'Harmful', concept: 'Nazi' }],
      author: 'User4',
      timestamp: '1d ago',
      views: 4521,
      shares: 289,
      reactions: 178
    },
    {
      id: '5',
      text: 'China and US...',
      concepts: [{ category: 'Violence & Conflict', concept: 'other' }],
      author: 'User5',
      timestamp: '2d ago',
      views: 1687,
      shares: 92,
      reactions: 34
    },
    {
      id: '6',
      text: 'What happened in Germany',
      concepts: [{ category: 'Harmful', concept: 'Nazi' }],
      author: 'User6',
      timestamp: '3d ago',
      views: 2934,
      shares: 167,
      reactions: 98
    },
    {
      id: '7',
      text: 'Political tensions rising...',
      concepts: [{ category: 'Political Bias', concept: 'propaganda' }],
      author: 'User7',
      timestamp: '4d ago',
      views: 1456,
      shares: 67,
      reactions: 23
    },
    {
      id: '8',
      text: 'Economic collapse theories',
      concepts: [{ category: 'Conspiracy Theories', concept: 'financial' }],
      author: 'User8',
      timestamp: '5d ago',
      views: 3789,
      shares: 234,
      reactions: 156
    },
    {
      id: '9',
      text: 'Economic collapse theories',
      concepts: [{ category: 'Conspiracy Theories', concept: 'financial' }],
      author: 'User8',
      timestamp: '5d ago',
      views: 3789,
      shares: 234,
      reactions: 156
    },
    {
      id: '10',
      text: 'Economic collapse theories',
      concepts: [{ category: 'Conspiracy Theories', concept: 'financial' }],
      author: 'User8',
      timestamp: '5d ago',
      views: 3789,
      shares: 234,
      reactions: 156
    },
    {
      id: '11',
      text: 'Economic collapse theories',
      concepts: [{ category: 'Conspiracy Theories', concept: 'financial' }],
      author: 'User8',
      timestamp: '5d ago',
      views: 3789,
      shares: 234,
      reactions: 156
    },
    {
      id: '12',
      text: 'Economic collapse theories',
      concepts: [{ category: 'Conspiracy Theories', concept: 'financial' }],
      author: 'User8',
      timestamp: '5d ago',
      views: 3789,
      shares: 234,
      reactions: 156
    },
  ];

  const getConceptColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'Harmful': 'bg-red-200',
      'Violence & Conflict': 'bg-gray-200',
      'Political Bias': 'bg-orange-200',
      'Conspiracy Theories': 'bg-yellow-200'
    };
    return colorMap[category] || 'bg-gray-500';
  };

  // Define text colors for categories and concepts
  const getConceptTextColor = (category: string) => {
    const textColorMap: { [key: string]: { categoryColor: string; conceptColor: string } } = {
      'Harmful': { categoryColor: 'text-red-800', conceptColor: 'text-red-600' },
      'Violence & Conflict': { categoryColor: 'text-gray-800', conceptColor: 'text-gray-600' },
      'Political Bias': { categoryColor: 'text-orange-800', conceptColor: 'text-orange-600' },
      'Conspiracy Theories': { categoryColor: 'text-yellow-800', conceptColor: 'text-yellow-600' }
    };
    return textColorMap[category] || { categoryColor: 'text-gray-800', conceptColor: 'text-gray-600' };
  };

  const handleSharePublic = () => {
    // Mock sharing to public
    alert('Shared to public community!');
    setShareModalOpen(false);
  };

  const handleSharePrivate = () => {
    // Mock sharing privately
    alert('Opening private share options...');
    setShareModalOpen(false);
  };

  // Close model dropdown on outside click
  useEffect(() => {
    if (!modelDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target as Node) &&
        modelButtonRef.current &&
        !modelButtonRef.current.contains(event.target as Node)
      ) {
        setModelDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modelDropdownOpen]);

  // Close prompt dropdown on outside click
  useEffect(() => {
    if (!promptDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        promptDropdownRef.current &&
        !promptDropdownRef.current.contains(event.target as Node) &&
        promptButtonRef.current &&
        !promptButtonRef.current.contains(event.target as Node)
      ) {
        setPromptDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [promptDropdownOpen]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fb' }}>
      {/* Sticky Header */}
      <header 
        style={{ backgroundColor: '#6750A4' }} 
        className="text-white sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-green-400 rounded-sm flex items-center justify-center">
                  <span className="text-xs text-white font-bold">◊</span>
                </div>
                <span className="font-medium text-white text-sm sm:text-base">Realmlabs</span>
                <span className="text-purple-200 mx-1">|</span>
                <span className="font-medium text-white text-sm">Thinking LLM</span>
              </div>
            </div>
            <button className="text-white hover:text-purple-200 transition-colors font-medium text-sm">
              How it works
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto mt-8 px-3 sm:px-4 py-6 sm:py-12">
        {/* Main Question */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-8 leading-tight" style={{ color: '#6750A4' }}>
            <span className="block sm:inline">What </span>
            <span className="text-xl sm:text-2xl md:text-3xl inline-block mx-1">🦙</span>
            <div className="inline-block relative mt-2 sm:mt-0">
              <button
                ref={modelButtonRef}
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="inline-flex items-center px-4 sm:space-x-2 border-b-2 pb-2 transition-colors text-xl sm:text-2xl md:text-3xl lg:text-4xl"
              >
                <span className="px-2">{selectedModel}</span>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              {modelDropdownOpen && (
                <div
                  ref={modelDropdownRef}
                  className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-full"
                >
                  {models.map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setSelectedModel(model);
                        setModelDropdownOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg text-base"
                    >
                      {model}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="block sm:inline mt-2 sm:mt-0"> is thinking about... ?</span>
          </h1>
        </div>

        {/* Dropdown Input */}
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <button
              onClick={() => setPromptDropdownOpen(!promptDropdownOpen)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-[#21005D] text-[14px] font-medium text-left hover:border-gray-500 transition-colors flex items-center justify-between"
              ref={promptButtonRef}
            >
              <span>{selectedPrompt}</span>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </button>
            {promptDropdownOpen && (
              <div
                ref={promptDropdownRef}
                className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10"
              >
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setSelectedPrompt(prompt);
                      setPromptDropdownOpen(false);
                      setInputText(prompt);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg text-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Text Input Area */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-6 min-h-[200px] sm:min-h-[240px] relative shadow-sm">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Or type anything to see the hidden thoughts of any LLM"
              className="w-full h-28 sm:h-32 resize-none border-none outline-none text-[#21005D] placeholder-[#C1B8D1] text-lg sm:text-md leading-relaxed"
              style={{ backgroundColor: 'transparent' }}
            />
            
            {/* Word Analysis Display */}
            {(analyzedWords.length > 0 || isAnalyzing) && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                      <span className="text-gray-500 text-sm">Analyzing...</span>
                    </div>
                  ) : (
                    analyzedWords.map((wordData, index) => {
                      // Map concept to category for color/text styling
                      const category = conceptToCategory[wordData.concept] || 'Violence & Conflict';
                      const textColors = getConceptTextColor(category);
                      return (
                        <div key={index} className="text-center">
                          <div className="text-gray-800 text-sm sm:text-base font-medium mb-1 sm:mb-2">
                            {wordData.word}
                          </div>
                          <div
                            className={`${getConceptColor(category)} px-2 sm:px-3 py-1 rounded-lg font-medium text-center space-y-0.5`}
                            style={{ fontSize: '10px' }}
                          >
                            <div className={`font-semibold leading-none ${textColors.categoryColor}`}>{category}</div>
                            <div className={`leading-none ${textColors.conceptColor}`}>{wordData.concept}</div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
              <button 
                onClick={() => setShareModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center space-x-1 sm:space-x-2 transition-colors font-medium text-sm"
              >
                <span>Share</span>
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Share Your Discovery</h3>
            
            <div className="space-y-3">
              <button
                onClick={handleSharePublic}
                className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Share to Public</div>
                  <div className="text-sm text-gray-500">Add to community discoveries</div>
                </div>
              </button>
              
              <button
                onClick={handleSharePrivate}
                className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Share Privately</div>
                  <div className="text-sm text-gray-500">Send via messages or email</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Width Community Section */}
      <div className="w-full px-2 sm:px-4 lg:px-6 mb-8 sm:mb-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-2 sm:mb-3 leading-tight text-[]">
            🔥 Hot hidden thoughts 😂😱🤣
          </h2>
          <p className="text-gray-500 text-sm sm:text-base px-3 mb-6">
            Surprising, hilarious, or even dangerous hidden thoughts discovered by the community
          </p>

          {/* Community Stats */}
          <div className="p-4 sm:p-6 mb-6 sm:mb-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#6750A4]">
                    {communityStats.totalDiscoveries.toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">Discoveries</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#6750A4]">
                    {communityStats.conceptsFound}
                  </span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">Concepts</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#6750A4]">
                    {communityStats.mostPopularCategory}
                  </span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">Most Popular</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Community Posts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-3">
          {communityPosts.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-2 sm:p-3 hover:shadow-md transition-all duration-200 hover:-translate-y-1 relative group">
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button
                  onClick={() => setInputText(post.text)}
                  className="bg-white text-gray-800 px-3 py-1.5 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                >
                  Remix
                </button>
              </div>
              
              <div className="mb-2 h-10 overflow-hidden">
                <p className="text-gray-800 font-medium text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {post.text}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2 h-8 overflow-hidden">
                {post.concepts.map((conceptData, index) => {
                  const textColors = getConceptTextColor(conceptData.category);
                  return (
                    <div
                      key={index}
                      className={`${getConceptColor(conceptData.category)} px-2 py-1 rounded-lg font-medium text-center space-y-0.5`}
                      style={{ fontSize: '10px' }}
                    >
                      <div className={`font-semibold leading-none ${textColors.categoryColor}`}>{conceptData.category}</div>
                      <div className={`leading-none ${textColors.conceptColor}`}>{conceptData.concept}</div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
              </div>
              
              <div className="flex items-center justify-between text-gray-500 mt-2">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="w-3 h-3" />
                    <span>{post.shares}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{post.reactions}</span>
                  </div>
                </div>
              </div>


            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;