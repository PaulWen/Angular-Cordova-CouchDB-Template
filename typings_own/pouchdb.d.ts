declare module 'pouchdb' {
   // PouchDB Object
   var PouchDB: any;
   export default PouchDB;

   // Return of the allDocs() method
   export interface DocumentList {
      total_rows: number;
      offset: number;
      rows: DocumentListDocument[];
   }

   export interface DocumentListDocument {
      id: string;
      key: string;
      value: Value;
   }

   export interface Value {
      rev: string;
   }
}