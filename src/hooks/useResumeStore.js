// Lightweight Zustand store for resumes using an in-memory Map
// Persists Map as an array into localStorage for speed and compactness.
import { create } from "zustand";
import { persist } from "zustand/middleware";

const mapToArray = (m) => (m instanceof Map ? Array.from(m.entries()) : []);
const arrayToMap = (arr) => new Map(arr || []);

const createResumeSlice = (set, get) => ({
  resumes: new Map(),

  // selectors / getters
  getAll: () => Array.from(get().resumes.values()),
  getById: (id) => get().resumes.get(id),

  // mutators
  setItem: (id, data) =>
    set((state) => {
      const m = new Map(state.resumes);
      m.set(id, data);
      return { resumes: m };
    }),

  setItemsBulk: (entries) =>
    set((state) => {
      const m = new Map(state.resumes);
      for (const [id, data] of entries) m.set(id, data);
      return { resumes: m };
    }),

  deleteItem: (id) =>
    set((state) => {
      const m = new Map(state.resumes);
      m.delete(id);
      return { resumes: m };
    }),

  clear: () => set({ resumes: new Map() }),
});

const useResumeStore = create(
  persist((set, get) => createResumeSlice(set, get), {
    name: "resume-store",
    // convert Map -> array before storing
    serialize: (state) => {
      const plain = { ...state, resumes: mapToArray(state.resumes) };
      return JSON.stringify(plain);
    },
    // convert stored array -> Map when rehydrating
    deserialize: (str) => {
      const parsed = JSON.parse(str);
      return { ...parsed, resumes: arrayToMap(parsed.resumes) };
    },
  })
);

export default useResumeStore;

/*
Usage example (client component):

import useResumeStore from '@/hooks/useResumeStore';

function Component(){
  const { getAll, setItem, deleteItem } = useResumeStore(state => ({
    getAll: state.getAll,
    setItem: state.setItem,
    deleteItem: state.deleteItem,
  }));

  // set
  setItem('resume-123', { name: 'Alice', skills: ['JS','React'] });

  // read
  const all = getAll();

  // delete
  deleteItem('resume-123');
}

Notes:
- Install zustand: `npm install zustand` or `yarn add zustand`.
- Use selectors (second arg to hook) to avoid unnecessary re-renders.
- For very large datasets consider IndexedDB (idb) instead of localStorage.
*/
