import { QuizFile } from "../QuizFile"

let db: IDBDatabase

const initDb = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve()
      return
    }

    const request = indexedDB.open('quizDatabase', 1)

    request.onerror = (event) => {
      console.error('IndexedDB error:', (event.target as IDBRequest).error)
      reject('Failed to open database.')
    }

    request.onsuccess = (event) => {
      db = (event.target as IDBRequest).result as IDBDatabase
      resolve()
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase
      if (!db.objectStoreNames.contains('quizzes')) {
        db.createObjectStore('quizzes', { keyPath: 'id' })
      }
    }
  })
}

export const saveQuiz = (quiz: QuizFile, quizId: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await initDb()
      const transaction: IDBTransaction = db.transaction(['quizzes'], 'readwrite')
      const quizzesStore: IDBObjectStore = transaction.objectStore('quizzes')
      
      // @ts-expect-error db stored id
      quiz.id = quizId

      const request = quizzesStore.put(quiz)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const getQuiz = (id: string): Promise<QuizFile | undefined> => {
  return new Promise(async (resolve, reject) => {
    try {
      await initDb()
      const transaction: IDBTransaction = db.transaction(['quizzes'], 'readonly')
      const quizzesStore: IDBObjectStore = transaction.objectStore('quizzes')

      const request = quizzesStore.get(id)

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result as QuizFile)
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const getAllQuizzes = (): Promise<QuizFile[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      await initDb()
      const transaction: IDBTransaction = db.transaction(['quizzes'], 'readonly')
      const quizzesStore: IDBObjectStore = transaction.objectStore('quizzes')
      
      const request = quizzesStore.getAll()

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result)
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const deleteQuiz = (id: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await initDb()
      const transaction: IDBTransaction = db.transaction(['quizzes'], 'readwrite')
      const quizzesStore: IDBObjectStore = transaction.objectStore('quizzes')

      const request = quizzesStore.delete(id)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    } catch (error) {
      reject(error)
    }
  })
}