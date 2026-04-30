import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-serif font-bold text-brand-900 mb-2">Terms of Service</h1>
        <p className="text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-brand text-slate-600 max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">By accessing or using Lingo Flight ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">2. Description of Service</h2>
            <p className="mb-4">Lingo Flight provides English language coaching, proficiency tests, and related educational resources. Services are provided "as is" and we reserve the right to modify, suspend, or discontinue any part of the Service at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">3. User Accounts</h2>
            <p className="mb-4">You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">4. Intellectual Property</h2>
            <p className="mb-4">The Service and its original content, features, and functionality are and will remain the exclusive property of Lingo Flight and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">In no event shall Lingo Flight, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>

          <div className="pt-8 mt-8 border-t border-brand-100 pb-8">
            <h1 className="text-4xl font-serif font-bold text-brand-900 mb-8" id="refund">Refund Policy</h1>
            
            <h2 className="text-2xl font-bold text-brand-800 mb-4">Lesson Refunds</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Lessons cancelled by students with at least 24 hours’ notice may be rescheduled.</li>
              <li>Missed lessons without notice are generally non-refundable.</li>
              <li>Lessons cancelled by Lingo Flight may qualify for refunds or rescheduling.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-800 mb-4">Subscription Refunds</h2>
            <p className="mb-8">Subscription fees are generally non-refundable after billing unless otherwise required by law.</p>

            <h2 className="text-2xl font-bold text-brand-800 mb-4">Technical Issues</h2>
            <p>Where major technical failures prevent lesson delivery, we may offer rescheduling or credits.</p>
          </div>
          
          <div className="pt-8 mt-8 border-t border-brand-100 pb-8">
            <h1 className="text-4xl font-serif font-bold text-brand-900 mb-8" id="student">Student Agreement</h1>
            <p className="mb-4">By enrolling in lessons with Lingo Flight, students agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Attend lessons punctually</li>
              <li>Behave respectfully toward teachers and classmates</li>
              <li>Complete payments on time</li>
              <li>Use lesson materials only for personal educational use</li>
              <li>Maintain a professional learning environment</li>
            </ul>
            <p>Students acknowledge that repeated misconduct may result in lesson suspension or termination.</p>
          </div>
          
          <div className="pt-8 mt-8 border-t border-brand-100 pb-8">
            <h1 className="text-4xl font-serif font-bold text-brand-900 mb-8" id="disclaimer">Website Disclaimer</h1>
            
            <h2 className="text-2xl font-bold text-brand-800 mb-4">Educational Disclaimer</h2>
            <p className="mb-4">All educational content provided by Lingo Flight is intended for general educational purposes only.</p>
            <p className="mb-8">We do not guarantee fluency, exam results, employment, or academic outcomes.</p>

            <h2 className="text-2xl font-bold text-brand-800 mb-4">Technology Disclaimer</h2>
            <p className="mb-4">We are not responsible for interruptions caused by:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Internet outages</li>
              <li>Device failures</li>
              <li>Third-party platforms</li>
              <li>Cybersecurity incidents</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-800 mb-4">External Links Disclaimer</h2>
            <p className="mb-4">Our website may contain links to third-party websites.</p>
            <p>We are not responsible for external content, products, or services.</p>
          </div>
          
          <div className="pt-8 mt-8 border-t border-brand-100 pb-8">
             <h2 className="text-2xl font-bold text-brand-800 mb-4">Contact Information</h2>
             <p className="mb-4">Lingo Flight</p>
             <p className="mb-2">Website: <a href="https://lingoflight.com" className="text-brand-900 font-bold underline hover:text-accent">lingoflight.com</a></p>
             <p>Email: <a href="mailto:hello@lingoflight.com" className="text-brand-900 font-bold underline hover:text-accent">hello@lingoflight.com</a></p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
