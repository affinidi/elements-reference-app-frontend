import React, { useEffect } from 'react';
import { FC } from 'react'
import uuid from 'react-uuid';
import { StoredW3CCredential } from 'services/cloud-wallet/cloud-wallet.api'
// import { useDefaultQuery , SearchDefaultJobs} from 'modules/holder/pages/hooks/useDsep'
import { JobTile } from 'modules/holder/pages/types'
import { getTitles } from 'utils'

import { Container, Header, Spinner, Typography } from 'components'
import JobCard from './Card/JobCard'
import { useMakeQueryToBap, SearchJobs,ErrorResponse,Job } from 'services/dsep/bapservice'
import { bool } from 'aws-sdk/clients/signer';
import axios from 'axios'
import { Button, Form, Input, Radio } from 'antd';

type LayoutType = Parameters<typeof Form>[0]['layout'];



const locations: string[] = []
locations.push("Pune");
//const transationid =  uuid().toString();
const transactionID = 'a9aaecca-10b7-4d19-b640-b047a7c62195'
const messageid = '5fd612579a5b4c64bbe3c3c0d2529e46'

export const Jobs: FC = () => {
  const [_transationID, setTransactionId] = React.useState(localStorage.getItem('transactionID') || uuid())
  const [_messageid, setMessage] = React.useState("")
  const [data, setdata]= React.useState<Job[]>([])
  const [isLoading,setisLoading]=React.useState<bool>(false)
  const[error,seterror]= React.useState<any>()


  useEffect(() => {
    (async () => {
      const message = await SearchJobs(locations, _transationID);
      console.log(message.data)
      setMessage(message.data);
    })();
  }, []);
  
  useEffect(()=>{
    if(_messageid) query( transactionID, _messageid) 
    //if(_messageid) setInterval(()=>{query( transactionID, _messageid)},5000) 
  },[_messageid])
  
  const query = async (transactionID:string, _messageid:string)=>{
    setisLoading(true)
        //await axios.get(`https://localhost:27742/BAP/retrieve/operation=on_search&transationid=${transactionID}&messageid=${_messageid}`)
        await axios.get(`https://localhost:27742/BAP/retrieve/operation=on_search&transationid=a9aaecca-10b7-4d19-b640-b047a7c62195&messageid=5fd612579a5b4c64bbe3c3c0d2529e46`)
      .then(function (response) {
        setisLoading(false)
        setdata(response.data)
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        setisLoading(false)
        seterror(error)
        // handle error
        console.log(error);
      })
  
  }

  console.log("*****************")
      console.log(data);


      const [form] = Form.useForm();
      const [formLayout, setFormLayout] = React.useState<LayoutType>('inline');
    
     
      const formItemLayout =
        formLayout === 'inline'
          ? {
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
            }
          : null;
    
      const buttonItemLayout =
        formLayout === 'inline'
          ? {
              wrapperCol: { span: 14, offset: 4 },
            }
          : null;

          const fil=()=>{
            <Form
            {...formItemLayout}
            layout="inline"//{formLayout}
            form={form}
            initialValues={{ layout: "inline" }}
          >
            {/* <Form.Item label="Form Layout" name="layout">
              <Radio.Group value={formLayout}>
                <Radio.Button value="horizontal">Horizontal</Radio.Button>
                <Radio.Button value="vertical">Vertical</Radio.Button>
                <Radio.Button value="inline">Inline</Radio.Button>
              </Radio.Group>
            </Form.Item> */}
            <Form.Item label="Field A">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Field B">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
          }

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
          <Typography variant="p2">No Jobs found at this moment, Please come back later.</Typography>
        </Container>
      </>
    )
  }
  return (
   
    <>
    
      <Header title="Your Jobs" > 
   
      </Header>
     
      <Container isGrid>
        {data &&
          data.map((job, index) => {
            const jobtile: JobTile = {
              title: job?.title,
              date: "22-22-22",//(credentialItem as StoredW3CCredential)?.issuanceDate || '',
              jobId: job?.id,//(c redentialItem as StoredW3CCredential)?.id,
              hiringOrganization: job?.hiringOrganization?.name,
              skills: job?.skills?.join(','),
              Locations: job?.jobLocation?.name
            }
            return <JobCard key={index} jobtile={jobtile} />
          })}
      </Container>
    </>
  )
}
