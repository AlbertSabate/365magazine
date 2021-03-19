import S from '@sanity/desk-tool/structure-builder';
import { MdSettings } from 'react-icons/md';
import SchemaTypes from './schemas/types';

const hiddenDocumentTypes = [SchemaTypes.SiteConfig, SchemaTypes.LandingConfig];
// const articleDocumentTypes = [SchemaTypes.Post, SchemaTypes.Recipe];

export default () => S.list().id('site').items([
  S.listItem()
    .title('Site Config')
    .icon(MdSettings)
    .child(
      S.document()
        .schemaType(SchemaTypes.SiteConfig)
        .documentId('site-config'),
    ),
  S.listItem()
    .title('Landing Config')
    .icon(MdSettings)
    .child(
      S.document()
        .schemaType(SchemaTypes.LandingConfig)
        .documentId('landing-config'),
    ),
  S.divider(),
  ...S.documentTypeListItems()
    .filter((t) => !hiddenDocumentTypes.includes(t.getId())),
]);
