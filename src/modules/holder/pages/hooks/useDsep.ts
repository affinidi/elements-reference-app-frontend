import React from 'react';
import uuid from 'react-uuid';
import { useMutation, useQuery } from '@tanstack/react-query'
import { dsepService } from 'services/dsep'

import    * as S from 'services/dsep/api'
import * as J from 'services/dsep/bapservice'
  
  type ErrorResponse = {
    name: string
    traceId: string
    message: string
    details: {
      field: string
      issue: string
      location: string
    }
  }

  export const SearchDefaultJobs = (location: string [],transaction_Id:string) => {

    const [messageID, setMessageId] = React.useState(localStorage.getItem('search-message') || uuid())
    //return dsepService.searchForProviderLocation(location,transaction_Id,messageID);
    return messageID
    //return dsepService.searchAllDefaultJobs(undefined)
  }

//   export const useDefaultQuery = (operation:string, transaction:string,messageid:string) => {
//     return useQuery<J.Job,ErrorResponse>(['credentials'], () => SearchDefaultJobs())
//   }

//   export const getOnsearchData =(transaction_Id:string, message_id:string) =>{

//     return  const result:OnSearchBody={

//     }
//   }