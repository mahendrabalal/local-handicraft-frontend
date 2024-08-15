import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>
      <p className="terms-date">Last Updated: [Date]</p>
      <div className="terms-content">
        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using LocalHandicraft, you agree to these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.
          </p>
        </section>
        <section className="terms-section">
          <h2>2. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this page, and it is your responsibility to review these Terms periodically. Your continued use of the website after any changes constitutes acceptance of the new Terms.
          </p>
        </section>
        <section className="terms-section">
          <h2>3. Use of Website</h2>
          <p>
            You agree to use LocalHandicraft only for lawful purposes and in a manner that does not infringe upon the rights of, restrict, or inhibit anyone else's use and enjoyment of the site.
          </p>
        </section>
        <section className="terms-section">
          <h2>4. Account Registration</h2>
          <p>
            To access certain features of LocalHandicraft, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
        </section>
        <section className="terms-section">
          <h2>5. Product Listings and Content</h2>
          <ul>
            <li><b>Accuracy:</b> We strive to ensure that all product information is accurate. However, we do not guarantee that product descriptions or other content on the site is completely accurate, reliable, or error-free.</li>
            <li><b>User Content:</b> By submitting content to our site, including product listings, reviews, and other materials, you grant LocalHandicraft a non-exclusive, royalty-free, worldwide license to use, modify, and display such content.</li>
          </ul>
        </section>
        <section className="terms-section">
          <h2>6. Orders and Payments</h2>
          <ul>
            <li><b>Orders:</b> All orders are subject to acceptance and availability. We may refuse or cancel any order for reasons including but not limited to product availability or errors in product information.</li>
            <li><b>Payments:</b> Payment for orders must be made through the payment methods provided on the website. You agree to provide accurate and complete payment information.</li>
          </ul>
        </section>
        <section className="terms-section">
          <h2>7. Shipping and Delivery</h2>
          <ul>
            <li><b>Shipping:</b> We will make reasonable efforts to deliver products within the estimated delivery times. However, we do not guarantee delivery times and are not responsible for delays caused by third-party carriers.</li>
            <li><b>Returns:</b> Please refer to our <a href="/returns-policy" className="terms-link">Returns Policy</a> for information on returns and refunds.</li>
          </ul>
        </section>
        <section className="terms-section">
          <h2>8. Intellectual Property</h2>
          <p>
            All content on LocalHandicraft, including but not limited to text, graphics, logos, and images, is the property of LocalHandicraft or its content suppliers and is protected by intellectual property laws. You may not use any content from the site without our prior written consent.
          </p>
        </section>
        <section className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <p>
            LocalHandicraft is not liable for any indirect, incidental, consequential, or punitive damages arising from the use of our website or services. Our liability is limited to the fullest extent permitted by law.
          </p>
        </section>
        <section className="terms-section">
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless LocalHandicraft, its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of your use of the website or violation of these Terms and Conditions.
          </p>
        </section>
        <section className="terms-section">
          <h2>11. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising under or in connection with these Terms will be subject to the exclusive jurisdiction of the courts in [Your Location].
          </p>
        </section>
        <section className="terms-section">
          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <ul>
            <li><b>Email:</b> <a href="mailto:support@localhandicraft.com" className="terms-link">support@localhandicraft.com</a></li>
            <li><b>Address:</b> [Your Address]</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
