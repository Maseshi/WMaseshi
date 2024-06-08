import { createContext } from 'react'

const DataContext = createContext({
  reference: {
    database: {
      snapshot: {},
      isLoading: true,
      isError: false
    },
    firestore: {
      documents: {
        Projects: {}
      },
      isLoading: true,
      isError: false
    }
  }
})

export default DataContext