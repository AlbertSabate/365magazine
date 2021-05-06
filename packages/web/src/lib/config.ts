import { ClientConfig, ProjectConfig } from 'next-sanity';

export const sanityConfig: ProjectConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
};

export const clientConfig: ClientConfig = {
  ...sanityConfig,
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true',
  token: process.env.SANITY_TOKEN,
};
