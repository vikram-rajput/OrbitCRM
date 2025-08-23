import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface ForgotPasswordEmailProps {
  userName?: string;
  userEmail?: string;
  resetUrl?: string;

}

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const { userName, userEmail , resetUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Hello,{userName}
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                We received a password reset request for your account associated with <strong>{userEmail}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                Click the button below to create a new password. This link will expire in 24 hours for security reasons.
              </Text>
              
              {/* Reset Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={resetUrl}
                  className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                >
                  Reset My Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[16px]">
                If the button doesn't work, you can copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-[20px] m-0 mb-[24px] break-all">
                {resetUrl}
              </Text>
              
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="bg-gray-50 p-[20px] rounded-[8px] mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                <strong>Security tip:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                Never share your password with anyone. We will never ask for your password via email or phone.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                Best regards,<br />
                The Security Team
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0 mb-[8px]">
                123 Security Street, Mumbai, Maharashtra 400001, India
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0">
                © 2025 Your Company. All rights reserved. | 
                <a href="#" className="text-blue-500 no-underline ml-[4px]">Unsubscribe</a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ForgotPasswordEmail.PreviewProps = {
  userEmail: "vikramrajput1987@gmail.com",
  resetUrl: "https://yourapp.com/reset-password?token=abc123xyz",
};

export default ForgotPasswordEmail;