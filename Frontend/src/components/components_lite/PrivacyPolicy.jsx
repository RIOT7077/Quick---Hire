import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      padding: '30px 25px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#222',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      lineHeight: '1.6',
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '40px',
        fontWeight: '700',
        fontSize: '2.5rem',
        color: '#111',
        letterSpacing: '1px',
      }}>Privacy Policy</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
        At Quick Hire, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website.
      </p>

      <h2 style={sectionHeadingStyle}>Information We Collect</h2>
      <p style={paragraphStyle}>
        We may collect personal information such as your name, email address, and other contact details when you register or interact with our services. We also collect non-personal information like browser type, operating system, and browsing behavior to improve our website.
      </p>

      <h2 style={sectionHeadingStyle}>Use of Information</h2>
      <p style={paragraphStyle}>
        Your information is used to provide and improve our services, communicate with you, and personalize your experience. We do not sell or rent your personal data to third parties.
      </p>

      <h2 style={sectionHeadingStyle}>Log Data</h2>
      <p style={paragraphStyle}>
        We collect log data including your IP address, browser type, and access times to monitor and analyze usage patterns and enhance security.
      </p>

      <h2 style={sectionHeadingStyle}>Cookies</h2>
      <p style={paragraphStyle}>
        Our website uses cookies to store user preferences and improve functionality. You can choose to disable cookies in your browser settings, but this may affect your experience.
      </p>

      <h2 style={sectionHeadingStyle}>Service Providers</h2>
      <p style={paragraphStyle}>
        We may employ third-party companies to facilitate our services, such as hosting and analytics. These providers have access to your information only to perform tasks on our behalf and are obligated to keep it confidential.
      </p>

      <h2 style={sectionHeadingStyle}>Security</h2>
      <p style={paragraphStyle}>
        We implement reasonable security measures to protect your data from unauthorized access, alteration, or disclosure.
      </p>

      <h2 style={sectionHeadingStyle}>Links to Other Sites</h2>
      <p style={paragraphStyle}>
        Our website may contain links to external sites. We are not responsible for the privacy practices or content of those sites.
      </p>

      <h2 style={sectionHeadingStyle}>Children's Privacy</h2>
      <p style={paragraphStyle}>
        Quick Hire does not knowingly collect personal information from children under 13. If you believe we have collected such data, please contact us to have it removed.
      </p>

      <h2 style={sectionHeadingStyle}>Changes to This Privacy Policy</h2>
      <p style={paragraphStyle}>
        We may update this policy from time to time. Changes will be posted on this page with an updated revision date.
      </p>

      <h2 style={sectionHeadingStyle}>Contact Us</h2>
      <p style={paragraphStyle}>
        If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:support@quickhire.com" style={{ color: '#007acc', textDecoration: 'none' }}>support@quickhire.com</a>.
      </p>
    </div>
  )
}

const sectionHeadingStyle = {
  fontWeight: '600',
  fontSize: '1.5rem',
  marginTop: '30px',
  marginBottom: '15px',
  color: '#333',
  borderBottom: '2px solid #007acc',
  paddingBottom: '5px',
}

const paragraphStyle = {
  fontSize: '1rem',
  marginBottom: '15px',
  color: '#555',
  lineHeight: '1.5',
}

export default PrivacyPolicy
