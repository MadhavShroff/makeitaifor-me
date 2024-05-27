import React, { useEffect, useState } from 'react';
import { fetchUser } from '@/utils/fetches';

function PrivacyPolicy() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <div>
      <main className="min-h-screen flex flex-col items-center grid-lines overflow-hidden w-full">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-orange-500 mb-4">Privacy Policy</h1>

          <p className="text-white mb-6" >
            This Privacy Policy describes how MakeItAiFor.Me ("we", "us", or "our") collects, uses,
            discloses, and protects your information when you use our SaaS application ("Service") or
            interact with our website ("Site").
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>

          <p className="text-white mb-4">
            To provide and enhance our services, we collect various types of information from our users. The information we gather falls into several categories:
          </p>

          <ul className="list-disc ml-6 text-white mb-6">
            <li>
              <strong>Personal Information:</strong> This includes identifiable information such as your name, email address, and password, which you provide when creating an account. This information is essential for account creation, authentication, and management. We use this data to personalize your experience, communicate with you, and ensure the security of your account.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect data on how you interact with our Service. This includes the features you use, actions you take, and the duration of your sessions. By analyzing this information, we can better understand user behavior and preferences, helping us to improve the functionality and user experience of our Service. For example, we might track which features are most popular or identify areas that may need enhancement.
            </li>
            <li>
              <strong>Technical Information:</strong> This comprises details about your device, operating system, browser type, IP address, and other technical aspects. Collecting this data helps us ensure that our Service operates smoothly across different devices and platforms. It also aids in diagnosing technical issues, maintaining security, and optimizing performance for a diverse user base.
            </li>
            <li>
              <strong>Location Data:</strong> With your permission, we may collect and use information about your geographical location. This data can enhance our Service by enabling location-based features, providing localized content, and improving overall user experience. For instance, we might offer location-specific recommendations or adjust settings based on your location to better suit your needs.
            </li>
          </ul>


          <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>

          <p className="text-white mb-4">
            The information we collect serves several purposes, including:
          </p>

          <ul className="list-disc ml-6 text-white mb-6">
            <li className="mb-4">
              <strong>Service Provision and Improvement:</strong> 
              <p className="ml-4">
                We utilize your information to deliver our services effectively. This includes using data to identify and fix bugs, improve user interfaces, and enhance overall user experience. By analyzing user behavior and feedback, we continuously refine our services to better suit your needs and preferences.
              </p>
            </li>
            <li className="mb-4">
              <strong>Account Management:</strong>
              <p className="ml-4">
                Your personal information is essential for creating and maintaining your account. This ensures a personalized and secure experience, enabling features such as saved preferences, account recovery, and user-specific settings.
              </p>
            </li>
            <li className="mb-4">
              <strong>Communication:</strong>
              <p className="ml-4">
                We may use your contact details to send you important updates, announcements, and support information related to our Service. This includes notifications about changes to our policies, security updates, and customer service communications.
              </p>
            </li>
            <li className="mb-4">
              <strong>Personalization:</strong>
              <p className="ml-4">
                By understanding your preferences and behavior, we can tailor the content and features of our services to better meet your needs. This personalization can enhance your user experience by providing recommendations, customized content, and relevant advertisements.
              </p>
            </li>
            <li className="mb-4">
              <strong>Usage Analysis:</strong>
              <p className="ml-4">
                We analyze usage data to identify trends and patterns. This helps us understand how our services are used, which features are most popular, and where improvements are needed. This analysis is crucial for making informed business decisions and for the strategic planning of new features.
              </p>
            </li>
            <li className="mb-4">
              <strong>Legal Compliance:</strong>
              <p className="ml-4">
                We use your information to comply with legal obligations and to protect our legal rights. This includes activities such as complying with regulatory requirements, responding to legal requests, and preventing fraud or other illegal activities.
              </p>
            </li>
            <li className="mb-4">
              <strong>Research and Development:</strong>
              <p className="ml-4">
                Your data may be used for research and development purposes to create new features, enhance our existing services, and develop innovative solutions. This helps us stay ahead of market trends and continuously improve the value we provide to our users.
              </p>
            </li>
            <li className="mb-4">
              <strong>Marketing and Advertising:</strong>
              <p className="ml-4">
                We may use your information to provide you with relevant marketing materials and advertisements. This includes both our promotions and those of third parties that we believe may be of interest to you. You can always opt-out of such communications if you prefer.
              </p>
            </li>
            <li className="mb-4">
              <strong>Security:</strong>
              <p className="ml-4">
                Ensuring the security of our services and your data is a top priority. We use your information to monitor and enhance the security of our platforms, prevent unauthorized access, and protect against cyber threats.
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mb-4">Sharing Your Information</h2>

          <p className="text-white mb-4">
            We may share your information under the following circumstances:
          </p>

          <ul className="list-disc ml-6 text-white mb-6">
            <li className="mb-2">
              <strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our Service. This includes, but is not limited to:
              <ul className="list-disc ml-6 mt-2">
                <li>Hosting providers who store and manage our website and data.</li>
                <li>Payment processors who handle transactions securely.</li>
                <li>Analytics services that help us understand and improve user interactions with our Service.</li>
              </ul>
              These providers are contractually obligated to protect your information and use it only for the purposes we specify. We select these providers carefully to ensure they maintain a high standard of security and confidentiality.
            </li>
            <li className="mb-2">
              <strong>Legal Requirements:</strong> If required by law, we may disclose your information to legal authorities or other third parties. This can occur under various circumstances, such as:
              <ul className="list-disc ml-6 mt-2">
                <li>To comply with a subpoena, court order, or other legal processes.</li>
                <li>To respond to a government or regulatory request.</li>
                <li>To protect our rights, property, or safety, as well as that of our users or others.</li>
              </ul>
              We strive to ensure that any disclosure of your information is conducted in accordance with applicable legal standards and regulations.
            </li>
            <li className="mb-2">
              <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of our assets, your information may be transferred to the new entity as part of the business transition. This might include:
              <ul className="list-disc ml-6 mt-2">
                <li>Sharing information during the due diligence process with potential acquiring entities.</li>
                <li>Transferring information as part of the final transaction to ensure continuity of service.</li>
              </ul>
              Any entity that acquires our business or assets will continue to be bound by the terms of this privacy policy, or they will notify you of any changes and obtain your consent where required by law.
            </li>
          </ul>


          <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>

          <p className="text-white mb-4">
            We implement reasonable security measures to protect your information from unauthorized access, use, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee absolute security.
          </p>

          <p className="text-white mb-4">
            Our security measures include, but are not limited to, encryption of data in transit and at rest, regular security audits, and access control policies. We also provide training to our employees on data privacy and security best practices.
          </p>

          <p className="text-white mb-4">
            In case of a data breach, we have protocols in place to quickly address the breach, notify affected users, and take steps to mitigate any potential harm. We encourage users to maintain strong passwords and be vigilant about securing their account information.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>

          <p className="text-white mb-4">
            You have certain rights regarding your personal information, including:
          </p>

          <ul className="list-disc ml-6 text-white mb-6">
            <li>
              <strong>Access:</strong> You can request access to the personal information we hold about you to review and verify its accuracy.
            </li>
            <li>
              <strong>Correction:</strong> If any of your personal information is inaccurate or incomplete, you can request corrections.
            </li>
            <li>
              <strong>Deletion:</strong> You have the right to request the deletion of your account and personal information. Please note that some information may be retained for legal or operational reasons.
            </li>
            <li>
              <strong>Restriction:</strong> You can request us to restrict the processing of your personal information under certain circumstances, such as if you contest the accuracy of the information.
            </li>
            <li>
              <strong>Data Portability:</strong> You have the right to request a copy of your personal information in a structured, commonly used, and machine-readable format.
            </li>
            <li>
              <strong>Objection:</strong> You can object to the processing of your personal information for direct marketing purposes or on grounds relating to your particular situation.
            </li>
          </ul>

          <p className="text-white mb-4">
            To exercise any of these rights, please contact us using the contact information provided below. We will respond to your request within a reasonable timeframe and in accordance with applicable laws.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>

          <p className="text-white mb-4">
            Our Service is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.
          </p>

          <p className="text-white mb-4">
            Parents and guardians who believe that their child has provided us with personal information can contact us to request the deletion of such data. We encourage parents and guardians to supervise their children's online activities and educate them about safe online practices.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>

          <p className="text-white mb-4">
            Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
          </p>

          <p className="text-white mb-4">
            If you are located outside of the United States and choose to provide information to us, please note that we transfer the data, including personal information, to the United States and process it there. By submitting your personal information, you agree to this transfer and processing.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Third-Party Links</h2>

          <p className="text-white mb-4">
            Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
          </p>

          <p className="text-white mb-4">
            We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>

          <p className="text-white mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>

          <p className="text-white mb-4">
            If you have any questions or concerns about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:madhav@makeitaifor.me" className="text-white underline">madhav@makeitaifor.me</a>
          </p>

          <p className="text-white mb-4">
            Last updated: 25/5/2024
          </p>
        </div>
      </main>
    </div>
  );
}

export default PrivacyPolicy;

