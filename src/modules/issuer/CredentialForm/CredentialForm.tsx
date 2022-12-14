import { FC } from 'react'
import { Formik } from 'formik'

import { Button, Container, Header, Input, Typography } from 'components'

import { initialValues, schema, useCredentialForm } from './useCredentialForm'
import * as S from './CredentialForm.styled'

export const adjustForUTCOffset = (date: Date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  )
}

export const CredentialForm: FC = () => {
  const { handleSubmit, validate } = useCredentialForm()

  return (
    <>
      <Header title="Enter details" />
      <Container>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
          {(formikProps) => (
            <S.Form id="form" onSubmit={formikProps.handleSubmit}>
              <Typography variant="p1">
                Please fill in the form below to issue a credential.
              </Typography>
              <Input label="Schema URL" value={schema} disabled />
              <S.Heading variant="h7">Event details</S.Heading>
              <S.FormSection>
                <S.LongInput
                  label="Event name*"
                  name="eventName"
                  maxLength={100}
                  value={formikProps.values.eventName}
                  onChange={formikProps.handleChange}
                  error={formikProps.touched.eventName ? formikProps.errors.eventName : ''}
                />
                <S.LongInput
                  label="Event location*"
                  name="eventLocation"
                  maxLength={500}
                  value={formikProps.values.eventLocation}
                  onChange={formikProps.handleChange}
                  error={formikProps.touched.eventLocation ? formikProps.errors.eventLocation : ''}
                />
                <S.LongInput
                  label="Event date*"
                  name="eventDate"
                  type="datetime-local"
                  value={formikProps.values.eventDate}
                  onChange={formikProps.handleChange}
                  error={formikProps.touched.eventDate ? formikProps.errors.eventDate : ''}
                />
                <S.LongInput
                  label="Event description"
                  name="eventDescription"
                  maxLength={1000}
                  value={formikProps.values.eventDescription}
                  onChange={formikProps.handleChange}
                  error={
                    formikProps.touched.eventDescription ? formikProps.errors.eventDescription : ''
                  }
                />
              </S.FormSection>
              <S.Heading variant="h7">Ticket holder information</S.Heading>
              <S.FormSection>
                <S.LongInput
                  label="Ticket holder name*"
                  name="name"
                  maxLength={100}
                  value={formikProps.values.name}
                  onChange={formikProps.handleChange}
                  error={formikProps.touched.name ? formikProps.errors.name : ''}
                />
                <S.LongInput
                  label="Ticket holder email*"
                  name="email"
                  type="email"
                  maxLength={100}
                  value={formikProps.values.email}
                  onChange={formikProps.handleChange}
                  error={formikProps.touched.email ? formikProps.errors.email : ''}
                />
              </S.FormSection>
              <Button type="submit" form="form">
                Issue credential
              </Button>
            </S.Form>
          )}
        </Formik>
      </Container>
    </>
  )
}
