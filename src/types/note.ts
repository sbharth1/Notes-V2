import {Note} from '../database/userQueries';

export type noteType = {
  allnote: Note[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  hideModal: () => void;
  headModal: string;
  setHeadModal: React.Dispatch<React.SetStateAction<string>>;
  singleUserData: Note[] | null;
  setSingleUserData: React.Dispatch<React.SetStateAction<Note[] | null>>;
  cardData: Note[] | [];
  setCardData: React.Dispatch<React.SetStateAction<Note[] | any>>;
  addNewNote: (note: Note) => void;
  filteredCardData: Note[] | [];
  setFilteredCardData: React.Dispatch<React.SetStateAction<Note[] | []>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSingleUserDataEdit: React.Dispatch<React.SetStateAction<Note[] | null>>;
  singleUserDataEdit: Note[] | null;
  refreshAllNotes: () => Promise<void>;
} | null;
