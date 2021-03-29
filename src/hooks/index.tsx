import React from 'react';
import { QueryParamsProvider } from '../contexts/queryParams';


const AppProvider: React.FC = ({ children }) => (
   <QueryParamsProvider>
      {children}
   </QueryParamsProvider>
);


export default AppProvider;
