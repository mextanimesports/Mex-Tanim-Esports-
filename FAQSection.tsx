import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { FAQ_DATA, BRAND_CONFIG } from '../data/promotions';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 relative bg-[#08080a] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#FF4D4D] text-xs font-bold tracking-widest uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE & GUIDELINES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white uppercase tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            Clear, transparent answers to everything you need to know before booking your promotion.
          </p>

          {/* Search Input */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search promotion questions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 glass-panel rounded-2xl border border-white/5 text-neutral-400 text-sm">
              No matching questions found for "{searchQuery}". Contact our administration directly.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isOpen 
                      ? 'bg-[#15151c] border-[#E50914]/40 shadow-lg shadow-[#E50914]/10' 
                      : 'glass-panel border-white/5 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#E50914] shrink-0">
                        Q{faq.id < 10 ? `0${faq.id}` : faq.id}
                      </span>
                      <h3 className="text-sm sm:text-base font-heading font-bold text-white leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`p-1.5 rounded-lg bg-white/5 text-neutral-300 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#E50914] text-white' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-0 border-t border-white/5 animate-in fade-in duration-200">
                      <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-heading font-bold text-base text-white">
              Still have questions about your tournament slot?
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Mex Tanim Gaming and our management team are available 24/7 to assist.
            </p>
          </div>
          <a
            href={`https://wa.me/${BRAND_CONFIG.primaryWhatsAppInternational}?text=${encodeURIComponent('Hello Mex Tanim Official Promotion! I have a question regarding a promotion package.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-white/10 hover:bg-[#E50914] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask Admin on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
