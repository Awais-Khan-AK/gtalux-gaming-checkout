
import { Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import AnimatedText from '@/components/AnimatedText';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 md:p-8 relative">
      <AnimatedBackground />
      
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8 w-full">
          <AnimatedText
            text="Privacy Policy"
            className="text-4xl md:text-5xl font-bold text-gradient text-shadow mb-4"
          />
          <AnimatedText
            text="Effective Date: August 1, 2023"
            delay={300}
            className="text-lg text-gaming-light/90"
          />
        </div>

        {/* Policy Content */}
        <div className="glassmorphism rounded-xl p-8 md:p-10 w-full animate-fade-in">
          <Link to="/" className="flex items-center gap-2 text-gaming-primary mb-8 hover:underline">
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
          
          <div className="space-y-6 text-gaming-light/90">
            <section>
              <h2 className="text-2xl font-bold text-gradient mb-3">Introduction</h2>
              <p>
                Gtalux Gaming ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our digital gaming marketplace and services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gradient mb-3">Information We Collect</h2>
              <p className="mb-2">We may collect information about you in various ways, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <span className="font-medium">Personal Data:</span> Name, email address, phone number, billing address, and payment information.
                </li>
                <li>
                  <span className="font-medium">Wallet Information:</span> Public wallet addresses, transaction history, and balances.
                </li>
                <li>
                  <span className="font-medium">Device Information:</span> IP address, browser type, operating system, and device identifiers.
                </li>
                <li>
                  <span className="font-medium">Usage Data:</span> Information about how you use our service, including pages visited, time spent, and features used.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gradient mb-3">How We Use Your Information</h2>
              <p className="mb-2">We may use your information for various purposes, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To facilitate transactions and provide our services</li>
                <li>To create and maintain your account</li>
                <li>To process payments and fulfill orders</li>
                <li>To communicate with you about your purchases and account</li>
                <li>To improve our services and develop new features</li>
                <li>To detect and prevent fraudulent activities</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gradient mb-3">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no internet or electronic storage system is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gradient mb-3">Third-Party Services</h2>
              <p>
                We may use third-party services to facilitate our marketplace, process payments, analyze usage, and market our services. These third parties may have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gradient mb-3">Blockchain Transactions</h2>
              <p>
                Please be aware that blockchain transactions are public by nature. When you conduct transactions using our platform, information such as your wallet address and transaction details will be recorded on the blockchain and may be visible to others.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gradient mb-3">Children's Privacy</h2>
              <p>
                Our service is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe we have collected information from your child, please contact us.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gradient mb-3">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gradient mb-3">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at: privacy@gtaluxgaming.com
              </p>
            </section>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 mb-6">
          <p className="text-sm text-gaming-light/60">
            © 2023 Gtalux Gaming. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
