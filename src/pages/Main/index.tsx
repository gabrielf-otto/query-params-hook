import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryParams } from '../../hooks/queryParams';


interface IEntry {
   key: string;
   value: string;
}

const Main: React.FC = () => {
   const history = useHistory();
   const params = useQueryParams<object>();
   const [isQueryParamsModalOpened, setIsQueryParamsModalOpened] = useState(false);

   const [entries, setEntries] = useState<IEntry[]>([
      {
         key: '',
         value: ''
      }
   ]);

   const updateQueryParams = useCallback((e: any) => {
      e.preventDefault();

      const prep: any = {};

      entries.map(entry => {
         prep[entry.key] = entry.value;
      });

      const qp = `?${new URLSearchParams(prep).toString()}`;
      history.replace(qp);

      setIsQueryParamsModalOpened(true);
   },
   [entries]);

   const addEntry = useCallback(() => {
      setEntries(
         [
            ...entries,
            {
               key: '',
               value: ''
            }
         ]);
   },
   [entries]);

   const removeEntry = useCallback(entryRef => {
      if (entries.length === 1) {
         return;
      }

      const draft = [...entries];
      draft.splice(entryRef, 1);
      setEntries(draft);
   },
   [entries]);

   const updateEntryKey = useCallback((e, entryRef) => {
      const draft = [...entries];
      draft[entryRef].key = e.target.value;
      setEntries(draft);
   },
   [entries]);

   const updateEntryValue = useCallback((e, entryRef) => {
      const draft = [...entries];
      draft[entryRef].value = e.target.value;
      setEntries(draft);
   },
   [entries]);


   return (
      <React.Fragment>
         <form onSubmit={updateQueryParams} autoComplete="off">
            <div className="entries">
               {entries.map((entry, entryRef) =>
               (
                  <div key={entryRef}>
                     <input
                        name="key"
                        placeholder="Chave"
                        value={entry.key}
                        onChange={e => updateEntryKey(e, entryRef)}
                     />
                     <input
                        name="value"
                        placeholder="Valor"
                        value={entry.value}
                        onChange={e => updateEntryValue(e, entryRef)}
                     />

                     {entries.length > 1 && (
                        <button
                           type="button"
                           className="action"
                           id="remove"
                           onClick={() => removeEntry(entryRef)}
                        >
                           x
                        </button>
                     )}
                  </div>
               ))}
            </div>

            <div style={{ padding: '0 20px' }}>
               <button
                  type="button"
                  className="action"
                  id="add"
                  onClick={addEntry}
               >
                  +
               </button>

               <button
                  className="action"
                  type="submit"
               >
                  Enviar
               </button>
            </div>
         </form>

         {isQueryParamsModalOpened && (
            <div className="modal-container">
               <div className="modal-content">
                  <button 
                     className="close" 
                     onClick={() => setIsQueryParamsModalOpened(false)}
                  >
                     x
                  </button>
                  <p>{ JSON.stringify(params) }</p>
               </div>
            </div>
         )}
      </React.Fragment>         
   );
};


export default Main;
