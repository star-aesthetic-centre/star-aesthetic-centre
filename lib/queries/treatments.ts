import { gql } from "graphql-request";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TreatmentCategory {
  name: string;
  slug: string;
  description: string;
}

export interface TreatmentNode {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  treatmentCategories: { nodes: TreatmentCategory[] };
  treatmentFields?: {
    shortTagline: string;
    priceFrom: string;
    duration: string;
    downtime: string;
    suitableFor: string;
  };
}

export interface TreatmentDetail extends TreatmentNode {
  content: string;
  treatmentFields: {
    shortTagline: string;
    priceFrom: string;
    priceTo: string;
    duration: string;
    downtime: string;
    suitableFor: string;
    overview: string;
    procedureSteps: string;
    results: string;
    recovery: string;
    faqs: Array<{ question: string; answer: string }>;
    recommendedProducts: { nodes: { id: string; name: string; slug: string } };
  };
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export const GET_TREATMENT_CATEGORIES = gql`
  query GetTreatmentCategories {
    treatmentCategories(first: 10) {
      nodes {
        id
        name
        slug
        description
      }
    }
  }
`;

export const GET_TREATMENTS = gql`
  query GetTreatments {
    treatments(first: 20, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl(size: MEDIUM_LARGE)
            altText
          }
        }
        treatmentCategories {
          nodes { name slug }
        }
      }
    }
  }
`;

export const GET_TREATMENT = gql`
  query GetTreatment($slug: String!) {
    treatmentBy(slug: $slug) {
      id
      title
      slug
      excerpt
      content
      featuredImage {
        node {
          sourceUrl(size: LARGE)
          altText
        }
      }
      treatmentCategories {
        nodes { name slug }
      }
    }
  }
`;
