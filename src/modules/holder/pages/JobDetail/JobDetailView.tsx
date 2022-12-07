import React, { useEffect } from 'react';
import { FC } from 'react'
import { useParams } from 'react-router'
import uuid from 'react-uuid';
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
// import { useDefaultQuery , SearchDefaultJobs} from 'modules/holder/pages/hooks/useDsep'
import { JobTile } from 'modules/holder/pages/types'
import { getTitles } from 'utils'
import { useMakeQueryToBap, SelectJob,ErrorResponse,Job } from 'services/dsep/bapservice'

import { Container, Header, Spinner, Typography } from 'components'
import axios from 'axios'

import {Button} from './JobDetailView.styled';
import {
  //Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const JobDetail: FC = () => {
  const [_transationID, setTransactionId] = React.useState(localStorage.getItem('transactionID') || uuid())
  const [_messageid, setMessage] = React.useState("")
  const [data, setdata]= React.useState<Job[]>([])
  const [isLoading,setisLoading]=React.useState<boolean>(false)
  const[error,seterror]= React.useState<any>()

  const { JobId } = useParams()
  const classes = useStyles();
  
  useEffect(() => {
    (async () => {
      const message = await SelectJob(" ", _transationID);
      console.log(message.data)
      setMessage(message.data);
    })();
  }, []);

  useEffect(()=>{
    if(_messageid) query( _transationID, _messageid) 
    //if(_messageid) setInterval(()=>{query( transactionID, _messageid)},5000) 
  },[_messageid])
  
  const query = async (transactionID:string, _messageid:string)=>{
    setisLoading(true)
        //await axios.get(`https://localhost:27742/BAP/retrieve/operation=on_search&transationid=${transactionID}&messageid=${_messageid}`)
        await axios.get(`https://localhost:27742/BAP/retrieve/operation=on_select&transationid=a9aaecca-10b7-4d19-b640-b047a7c62195&messageid=14badfc6f46b4294a56a8b6830011f2b`)
      .then(function (response) {
        setisLoading(false)
        console.log(response.data);
        setdata(response.data)
        // handle success
        
      })
      .catch(function (error) {
        setisLoading(false)
        seterror(error)
        // handle error
        console.log(error);
      })

      
  }
const jobTitle=data[0]?.title //+","+ (data[0]?.jobLocation?.name ||"")
const jobdesc= data[0]?.description
  console.log("*****************")
      console.log(data);


  //const { data, error, isLoading } = useMakeQueryToBap('on_select',transationID, messageid)

  if (isLoading) {
    return (
      <>
        <Header title="Your Jobs" />
        <Container fullWidth>
          <Spinner />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header title="Your Jobs" />
        <Container fullWidth>
          {error && <Typography variant="e1">{error?.message}</Typography>}
        </Container>
      </>
    )
  }

  if (data.length === 0) {
    return (
      <>
        <Header title="Your Jobs" />
        <Container fullWidth>
          <Typography variant="p2">Job has been deleted, please search again.</Typography>
        </Container>
      </>
    )
  }
  return (
    <>
      <Header title={jobTitle  } />

      <Container title={data[0]?.hiringOrganization.name}>
       
      </Container>
      <Container title='Job Description'>
        <>{jobdesc}</>
        {/* <Sider>Sider</Sider> */}
      </Container>
      <Button onClick={()=>{}}>apply</Button>

     
    </>
  )
}
