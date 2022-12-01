import { createContext, useContext } from 'react';
import Repository from '../data/Repository';

const RepositoryContext = createContext<Repository>(new Repository());
export const useRepository = () => useContext(RepositoryContext);
