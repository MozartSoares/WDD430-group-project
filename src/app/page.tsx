import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            <div className={styles.navBrand}>
              <h1 className={styles.navTitle}>Your App</h1>
            </div>
            <div className={styles.navLinks}>
              <a href="#" className={styles.navLink}>
                Home
              </a>
              <a href="#" className={styles.navLink}>
                About
              </a>
              <a href="#" className={styles.navLink}>
                Contact
              </a>
              <button className={styles.navButton}>Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div>
          <h2 className={styles.heroTitle}>
            Welcome to Your
            <span className={styles.heroHighlight}> Amazing App</span>
          </h2>
          <p className={styles.heroDescription}>
            Build something incredible with our modern, responsive template. Start creating amazing experiences for your
            users today.
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.heroPrimaryButton}>Get Started</button>
            <button className={styles.heroSecondaryButton}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresHeader}>
          <h3 className={styles.featuresTitle}>Features</h3>
          <p className={styles.featuresDescription}>Everything you need to build your next project</p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.featureIconBlue}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className={styles.featureTitle}>Fast Performance</h4>
            <p className={styles.featureDescription}>Built with Next.js for optimal performance and user experience.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.featureIconGreen}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className={styles.featureTitle}>Reliable</h4>
            <p className={styles.featureDescription}>Robust and tested codebase you can depend on for your projects.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles.featureIconPurple}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h4 className={styles.featureTitle}>Easy to Use</h4>
            <p className={styles.featureDescription}>Simple and intuitive design that your users will love.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContainer}>
          <h3 className={styles.ctaTitle}>Ready to get started?</h3>
          <p className={styles.ctaDescription}>Join thousands of users who are already building amazing things.</p>
          <button className={styles.ctaButton}>Start Building Now</button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <h5 className={styles.footerBrandTitle}>Your App</h5>
              <p className={styles.footerBrandDescription}>Building the future, one line of code at a time.</p>
            </div>
            <div className={styles.footerSection}>
              <h6 className={styles.footerSectionTitle}>Product</h6>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h6 className={styles.footerSectionTitle}>Company</h6>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h6 className={styles.footerSectionTitle}>Support</h6>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 Your App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
