import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdStore as icon } from 'react-icons/md';

// build a custom sidebar
export default function sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create new sub items
      S.listItem().title('Home Page').icon(icon).child(
        // make a new document ID, so we don't have a random string of numbers
        S.editor().schemaType('storeSettings').documentId('downtown')
      ),
      // add in the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
