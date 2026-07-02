import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  firstName: string;
  referralCode: string;
}

const SITE_URL = "https://joinhowzit.com";
const INSTAGRAM_URL = "https://www.instagram.com/join.howzit";

export function WelcomeEmail({ firstName, referralCode }: WelcomeEmailProps) {
  const referralUrl = `${SITE_URL}/?ref=${referralCode}`;

  return (
    <Html lang="en">
      <Head />
      <Preview>Sharp, {firstName}. You&apos;re on the Howzit founding waitlist.</Preview>

      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Text style={logo}>
              <span style={logoOrange}>Howz</span>
              <span style={logoBlack}>it</span>
            </Text>
          </Section>

          {/* Hero */}
          <Section style={heroSection}>
            <Heading style={h1}>Sharp, {firstName}. You&apos;re in.</Heading>
            <Text style={body1}>
              Welcome to Howzit&apos;s founding waitlist. You&apos;re one of
              South Africa&apos;s earliest members — and we&apos;re building
              this for people exactly like you.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* What to expect */}
          <Section style={section}>
            <Heading style={h2}>What happens next</Heading>
            <Text style={body2}>
              <strong style={strong}>Early access.</strong> You&apos;ll be
              among the first to use Howzit when we launch.
            </Text>
            <Text style={body2}>
              <strong style={strong}>Founding member status.</strong> Everyone
              who joins now gets a founding member badge — permanently.
            </Text>
            <Text style={body2}>
              <strong style={strong}>Updates as we build.</strong>{" "}
              We&apos;ll only email when something real happens. No spam.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Referral */}
          <Section style={referralSection}>
            <Heading style={h2}>Refer 3 friends → unlock Early Access Badge</Heading>
            <Text style={body2}>
              Share your personal link and get priority early access when we
              launch.
            </Text>
            <Section style={referralBox}>
              <Text style={referralLink}>{referralUrl}</Text>
            </Section>
            <Button style={button} href={referralUrl}>
              Copy your referral link
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Instagram */}
          <Section style={section}>
            <Text style={body2}>
              Follow what we&apos;re building:{" "}
              <Link href={INSTAGRAM_URL} style={link}>
                @join.howzit
              </Link>{" "}
              on Instagram.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Built in Cape Town 🇿🇦 · We&apos;ll only email you when
              something important happens.
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} Howzit ·{" "}
              <Link href={`${SITE_URL}`} style={footerLink}>
                joinhowzit.com
              </Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;

// ── Styles ────────────────────────────────────────────────────────
const body: React.CSSProperties = {
  backgroundColor: "#f4f2ef",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  margin: 0,
  padding: "24px 0",
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  margin: "0 auto",
  maxWidth: "560px",
  overflow: "hidden",
};

const header: React.CSSProperties = {
  backgroundColor: "#1a1815",
  padding: "24px 32px",
};

const logo: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: 900,
  letterSpacing: "-0.02em",
  margin: 0,
};

const logoOrange: React.CSSProperties = { color: "#ff6a00" };
const logoBlack: React.CSSProperties = { color: "#ffffff" };

const heroSection: React.CSSProperties = {
  padding: "36px 32px 24px",
};

const h1: React.CSSProperties = {
  color: "#1a1815",
  fontSize: "28px",
  fontWeight: 900,
  letterSpacing: "-0.02em",
  lineHeight: "1.2",
  margin: "0 0 16px",
};

const h2: React.CSSProperties = {
  color: "#1a1815",
  fontSize: "17px",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  margin: "0 0 12px",
};

const body1: React.CSSProperties = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "1.65",
  margin: "0",
};

const body2: React.CSSProperties = {
  color: "#525252",
  fontSize: "14px",
  lineHeight: "1.65",
  margin: "0 0 10px",
};

const strong: React.CSSProperties = {
  color: "#1a1815",
  fontWeight: 700,
};

const section: React.CSSProperties = {
  padding: "24px 32px",
};

const divider: React.CSSProperties = {
  borderColor: "#e8e5e0",
  borderTopWidth: "1px",
  margin: "0",
};

const referralSection: React.CSSProperties = {
  padding: "24px 32px",
};

const referralBox: React.CSSProperties = {
  backgroundColor: "#f4f2ef",
  borderRadius: "10px",
  margin: "12px 0",
  padding: "12px 16px",
};

const referralLink: React.CSSProperties = {
  color: "#8a8680",
  fontSize: "12px",
  fontFamily: "monospace",
  margin: 0,
  overflowWrap: "break-word",
  wordBreak: "break-all",
};

const button: React.CSSProperties = {
  backgroundColor: "#ff6a00",
  borderRadius: "100px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: 700,
  padding: "12px 24px",
  textDecoration: "none",
};

const link: React.CSSProperties = {
  color: "#ff6a00",
  textDecoration: "underline",
};

const footer: React.CSSProperties = {
  backgroundColor: "#f4f2ef",
  padding: "20px 32px",
};

const footerText: React.CSSProperties = {
  color: "#8a8680",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 4px",
};

const footerLink: React.CSSProperties = {
  color: "#8a8680",
};
