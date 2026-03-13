import { gql } from "graphql-request";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductImage {
  sourceUrl: string;
  altText: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
}

export interface ProductBrand {
  name: string;
  slug: string;
}

export interface ProductNode {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image: ProductImage | null;
  regularPrice: string | null;
  price: string | null;
  sku: string | null;
  productCategories: { nodes: ProductCategory[] };
  paProductBrands?: { nodes: ProductBrand[] };
}

export interface ProductDetail extends ProductNode {
  description: string;
  galleryImages: { nodes: ProductImage[] };
  stockStatus: string;
  productTags: { nodes: { name: string }[] };
  related: { nodes: ProductNode[] };
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int = 48, $after: String, $brandSlug: String, $categorySlug: String) {
    products(
      first: $first
      after: $after
      where: {
        status: "PUBLISH"
        taxonomyFilter: {
          filters: [
            { taxonomy: PRODUCT_CAT, terms: [$categorySlug], includeChildren: true }
          ]
        }
      }
    ) {
      nodes {
        id
        ... on SimpleProduct {
          name
          slug
          shortDescription(format: RAW)
          image {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
            altText
          }
          productCategories {
            nodes { name slug }
          }
          price
          regularPrice
          sku
        }
        ... on VariableProduct {
          name
          slug
          shortDescription(format: RAW)
          image {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
            altText
          }
          productCategories {
            nodes { name slug }
          }
          price
          regularPrice
          sku
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCTS_BY_BRAND = gql`
  query GetProductsByBrand($first: Int = 48, $after: String) {
    products(first: $first, after: $after, where: { status: "PUBLISH" }) {
      nodes {
        id
        ... on SimpleProduct {
          name
          slug
          shortDescription(format: RAW)
          image {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
            altText
          }
          productCategories {
            nodes { name slug }
          }
          price
          regularPrice
          sku
        }
        ... on VariableProduct {
          name
          slug
          shortDescription(format: RAW)
          image {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
            altText
          }
          productCategories {
            nodes { name slug }
          }
          price
          regularPrice
          sku
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_SLUG = gql`
  query GetProductsByCategorySlug($categorySlug: String!, $first: Int = 48) {
    products(
      first: $first
      where: {
        status: "PUBLISH"
        taxonomyFilter: {
          filters: [
            { taxonomy: PRODUCT_CAT, terms: [$categorySlug] }
          ]
        }
      }
    ) {
      nodes {
        id
        ... on SimpleProduct {
          name
          slug
          shortDescription(format: RAW)
          image {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
            altText
          }
          productCategories {
            nodes { name slug }
          }
          price
          regularPrice
          sku
        }
        ... on VariableProduct {
          name
          slug
          shortDescription(format: RAW)
          image {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
            altText
          }
          productCategories {
            nodes { name slug }
          }
          price
          regularPrice
          sku
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      ... on SimpleProduct {
        name
        slug
        description(format: RAW)
        shortDescription(format: RAW)
        image {
          sourceUrl(size: WOOCOMMERCE_SINGLE)
          altText
        }
        galleryImages {
          nodes {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
            altText
          }
        }
        productCategories {
          nodes { name slug }
        }
        productTags {
          nodes { name }
        }
        related(first: 4) {
          nodes {
            id
            ... on SimpleProduct {
              name
              slug
              image {
                sourceUrl(size: WOOCOMMERCE_SINGLE)
                altText
              }
              productCategories {
                nodes { name slug }
              }
              price
              regularPrice
            }
            ... on VariableProduct {
              name
              slug
              image {
                sourceUrl(size: WOOCOMMERCE_SINGLE)
                altText
              }
              productCategories {
                nodes { name slug }
              }
              price
              regularPrice
            }
          }
        }
        price
        regularPrice
        sku
        stockStatus
      }
      ... on VariableProduct {
        name
        slug
        description(format: RAW)
        shortDescription(format: RAW)
        image {
          sourceUrl(size: WOOCOMMERCE_SINGLE)
          altText
        }
        galleryImages {
          nodes {
            sourceUrl(size: WOOCOMMERCE_SINGLE)
            altText
          }
        }
        productCategories {
          nodes { name slug }
        }
        productTags {
          nodes { name }
        }
        related(first: 4) {
          nodes {
            id
            ... on SimpleProduct {
              name
              slug
              image {
                sourceUrl(size: WOOCOMMERCE_SINGLE)
                altText
              }
              productCategories {
                nodes { name slug }
              }
              price
              regularPrice
            }
            ... on VariableProduct {
              name
              slug
              image {
                sourceUrl(size: WOOCOMMERCE_SINGLE)
                altText
              }
              productCategories {
                nodes { name slug }
              }
              price
              regularPrice
            }
          }
        }
        price
        regularPrice
        sku
        stockStatus
      }
    }
  }
`;
