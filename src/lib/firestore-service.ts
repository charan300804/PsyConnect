
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, where, DocumentData, QuerySnapshot } from 'firebase/firestore';

/**
 * Adds a document to a specified Firestore collection.
 * @param collectionName The name of the collection.
 * @param data The data to add.
 * @returns The added document data.
 */
export async function addDocument<T extends object>(collectionName: string, data: T) {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw new Error('Failed to save data to the database.');
  }
}

/**
 * Retrieves all documents from a specified Firestore collection.
 * @param collectionName The name of the collection.
 * @param orderField Optional field to order the results by (defaults to 'createdAt').
 * @param orderDirection Optional direction to order the results ('asc' or 'desc').
 * @returns An array of documents.
 */
export async function getCollection<T>(collectionName: string, orderField: string = 'createdAt', orderDirection: 'asc' | 'desc' = 'desc'): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), orderBy(orderField, orderDirection));
    const querySnapshot = await getDocs(q);
    return snapshotToDataArray<T>(querySnapshot);
  } catch (error) {
    console.error(`Error getting collection ${collectionName}:`, error);
    throw new Error('Failed to fetch data from the database.');
  }
}


/**
 * Retrieves documents from a collection based on a specific query.
 * @param collectionName The name of the collection.
 * @param field The document field to query against.
 * @param operator The query operator (e.g., '==', '>', '<').
 * @param value The value to match.
 * @returns An array of matching documents.
 */
export async function getCollectionWhere<T>(collectionName: string, field: string, operator: '==' | '!=' | '<' | '<=' | '>' | '>=', value: any): Promise<T[]> {
    try {
        const q = query(collection(db, collectionName), where(field, operator, value));
        const querySnapshot = await getDocs(q);
        return snapshotToDataArray<T>(querySnapshot);
    } catch (error) {
        console.error(`Error querying collection ${collectionName}:`, error);
        throw new Error('Failed to query data from the database.');
    }
}


function snapshotToDataArray<T>(snapshot: QuerySnapshot<DocumentData>): T[] {
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

