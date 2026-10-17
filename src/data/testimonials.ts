export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  isDemonstrationSample: boolean;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "sample-1",
    quote:
      "Working with this team brought immediate clarity to our commercial positioning. They overhauled our catalog website from the ground up, reducing load times to under a second and establishing an automated RFQ flow that transformed our export lead generation.",
    name: "Rajesh Malhotra",
    role: "Managing Director",
    company: "Apex Heavy Engineering",
    industry: "Industrial Manufacturing",
    isDemonstrationSample: true,
  },
  {
    id: "sample-2",
    quote:
      "Unlike traditional agencies that send vanity reports of impressions and clicks, their focus was relentlessly on customer acquisition cost and conversion tracking. Their weekly creative sprints helped us double our ad efficiency within three months.",
    name: "Ananya Sen",
    role: "VP of Growth & Marketing",
    company: "Lumina D2C",
    industry: "E-commerce & Consumer Goods",
    isDemonstrationSample: true,
  },
  {
    id: "sample-3",
    quote:
      "Their technical depth in SEO and schema architecture is unmatched. Within five months of restructuring our practice pages and publishing authoritative pillar briefs, we started receiving direct corporate inbound inquiries from senior corporate counsel.",
    name: "Vikramaditya Rao",
    role: "Senior Partner",
    company: "Vanguard Corporate Legal",
    industry: "Professional Services",
    isDemonstrationSample: true,
  },
  {
    id: "sample-4",
    quote:
      "The combination of engineering rigour and editorial design created an unmistakable identity for our SaaS platform. Our engineering buyers immediately trusted the product because the website reflected modern architectural craft.",
    name: "Karan Singhal",
    role: "Co-Founder & CTO",
    company: "Horizon Cloud Systems",
    industry: "Enterprise SaaS",
    isDemonstrationSample: true,
  },
];
