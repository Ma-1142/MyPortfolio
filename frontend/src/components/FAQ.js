import { useState } from 'react';
import './FAQ.css';

const defaultFaqData = [
  {
    id: 1,
    question: 'How far in advance should I book a photography session?',
    answer: 'For weddings and large events, I recommend booking 6-12 months in advance to ensure availability. For portrait sessions and smaller events, 2-4 weeks notice is usually sufficient, though earlier booking is always appreciated.',
  },
  {
    id: 2,
    question: 'What is your pricing structure?',
    answer: 'Pricing varies based on the type of session, duration, and deliverables. Portrait sessions start at $250, events at $800, and wedding packages begin at $1,500. Visit my Services page for detailed pricing or contact me for a custom quote.',
  },
  {
    id: 3,
    question: 'How long until I receive my photos?',
    answer: 'Portrait sessions are typically delivered within 1-2 weeks. Event photography takes 2-3 weeks, and weddings are delivered within 4-6 weeks. Rush delivery is available for an additional fee.',
  },
  {
    id: 4,
    question: 'Do you travel for photography sessions?',
    answer: 'Yes! I\'m available for travel worldwide. Local sessions within 30 miles are included in the base price. For destinations beyond that, travel fees apply. I love destination shoots and am happy to discuss your location.',
  },
  {
    id: 5,
    question: 'What happens if it rains on the day of our outdoor shoot?',
    answer: 'Weather happens! For outdoor sessions, we\'ll monitor the forecast together and can reschedule if needed at no extra charge. Sometimes overcast days create the most beautiful, soft lighting for photos.',
  },
];

function FAQ({ customFaqData }) {
  const [openId, setOpenId] = useState(null);

  const faqData = customFaqData || defaultFaqData;

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="faq section">
      <div className="container">
        <h2 className="section-title text-center">Frequently Asked Questions</h2>

        <div className="faq-list">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${openId === faq.id ? 'open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={openId === faq.id}
              >
                <span>{faq.question}</span>
                <svg
                  className="faq-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
