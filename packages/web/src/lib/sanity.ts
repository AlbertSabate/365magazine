import imageUrlBuilder from '@sanity/image-url';
import { createClient, createPreviewSubscriptionHook } from 'next-sanity';
import { clientConfig, sanityConfig } from './config';

export const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig);

export const imageBuilder = imageUrlBuilder({ clientConfig });

const getClient = (preview?: boolean) => createClient({
  ...clientConfig,
  ...(preview && { useCdn: false }),
});

export default getClient;
