import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-serif font-bold text-brand-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-brand text-slate-600 max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">1. Introduction</h2>
            <p className="mb-4">Lingo Flight respects your privacy and is committed to protecting your personal information.</p>
            <p>This Privacy Policy explains how we collect, use, store, and protect your data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Billing information</li>
              <li>Lesson attendance data</li>
              <li>Device and browser information</li>
              <li>Communications and support requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">3. How We Use Information</h2>
            <p className="mb-4">We use personal information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide lessons and educational services</li>
              <li>Process payments</li>
              <li>Communicate with users</li>
              <li>Improve our website and services</li>
              <li>Meet legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">4. Cookies and Analytics</h2>
            <p>We may use cookies, analytics tools, and tracking technologies to improve user experience and website performance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">5. Data Sharing</h2>
            <p className="mb-4">We do not sell personal information.</p>
            <p className="mb-4">Information may be shared with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processors</li>
              <li>Educational technology providers</li>
              <li>Hosting and analytics providers</li>
              <li>Legal authorities where required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">6. Data Security</h2>
            <p className="mb-4">We implement reasonable security measures to protect user information.</p>
            <p>However, no online transmission or storage system is completely secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">7. User Rights</h2>
            <p className="mb-4">Users may request:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Access to personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of personal information</li>
              <li>Withdrawal of consent where applicable</li>
            </ul>
            <p>Requests may be sent to <a href="mailto:hello@lingoflight.com" className="text-brand-900 font-bold underline hover:text-accent transition-colors">hello@lingoflight.com</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">8. International Users</h2>
            <p>Users accessing services from outside our operating jurisdiction understand that data may be processed internationally.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-800 mb-4">9. Children’s Privacy</h2>
            <p>We do not knowingly collect personal information from children without parental consent.</p>
          </section>
          
          <div className="pt-8 mt-8 border-t border-brand-100 pb-8">
            <h1 className="text-4xl font-serif font-bold text-brand-900 mb-8" id="cookie">Cookie Policy</h1>
            
            <section>
              <h2 className="text-2xl font-bold text-brand-800 mb-4">1. What Are Cookies?</h2>
              <p className="mb-8">Cookies are small text files stored on your device when you visit a website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-800 mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-8">
                <li>Improve website functionality</li>
                <li>Remember user preferences</li>
                <li>Analyze website traffic</li>
                <li>Enhance security</li>
                <li>Support marketing and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-800 mb-4">3. Types of Cookies We Use</h2>
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="font-bold text-brand-800">Essential Cookies</h3>
                  <p>Required for website operation.</p>
                </div>
                <div>
                  <h3 className="font-bold text-brand-800">Analytics Cookies</h3>
                  <p>Help us understand how users interact with the website.</p>
                </div>
                <div>
                  <h3 className="font-bold text-brand-800">Functional Cookies</h3>
                  <p>Remember preferences and settings.</p>
                </div>
                <div>
                  <h3 className="font-bold text-brand-800">Marketing Cookies</h3>
                  <p>May be used for advertising and remarketing.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-800 mb-4">4. Managing Cookies</h2>
              <p className="mb-2">Users may disable cookies through browser settings.</p>
              <p>Disabling cookies may affect website functionality.</p>
            </section>
          </div>
          
          <div className="pt-8 mt-8 border-t border-brand-100 pb-8">
            <h1 className="text-4xl font-serif font-bold text-brand-900 mb-8">POPIA and GDPR Compliance</h1>
            
            <h2 className="text-2xl font-bold text-brand-800 mb-4">Data Protection Commitment</h2>
            <p className="mb-4">Lingo Flight is committed to complying with applicable data protection laws including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>POPIA (Protection of Personal Information Act)</li>
              <li>GDPR (General Data Protection Regulation)</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-800 mb-4">Lawful Basis for Processing</h2>
            <p className="mb-4">We process personal information based on:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>User consent</li>
              <li>Contractual necessity</li>
              <li>Legal obligations</li>
              <li>Legitimate business interests</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-800 mb-4">Your Rights Under GDPR and POPIA</h2>
            <p className="mb-4">Users may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Access their data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of personal data</li>
              <li>Object to processing</li>
              <li>Withdraw consent</li>
              <li>Request data portability</li>
            </ul>

            <h2 className="text-2xl font-bold text-brand-800 mb-4">Data Retention</h2>
            <p className="mb-8">We retain personal information only as long as necessary for legitimate business or legal purposes.</p>

            <h2 className="text-2xl font-bold text-brand-800 mb-4">Data Breach Procedures</h2>
            <p>Where legally required, affected users and authorities will be notified of qualifying data breaches.</p>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}

