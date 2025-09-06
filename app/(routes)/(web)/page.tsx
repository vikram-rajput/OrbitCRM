// import { BenefitsSection } from "@/components/layout/landing/sections/benefits";
// import { CommunitySection } from "@/components/layout/landing/sections/community";
// import { ContactSection } from "@/components/layout/landing/sections/contact";
// import { FAQSection } from "@/components/layout/landing/sections/faq";
// import { FeaturesSection } from "@/components/layout/landing/sections/features";
import { FooterSection } from "@/components/layout/landing/sections/footer";
import { HeroSection } from "@/components/layout/landing/sections/hero";
// import { NewsletterSection } from "@/components/layout/landing/sections/newsletter";
// import { PricingSection } from "@/components/layout/landing/sections/pricing";
// import { ServicesSection } from "@/components/layout/landing/sections/services";
// import { SponsorsSection } from "@/components/layout/landing/sections/sponsors";
// import { TeamSection } from "@/components/layout/landing/sections/team";
// import { TestimonialSection } from "@/components/layout/landing/sections/testimonial";


export const metadata = {
  title: `CRM`,
  description:
    ""
};

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <TeamSection />
      <PricingSection />
      <CommunitySection />
      <ContactSection />
      <FAQSection />
      <NewsletterSection /> */}
      <FooterSection />
    </>
  );
}
