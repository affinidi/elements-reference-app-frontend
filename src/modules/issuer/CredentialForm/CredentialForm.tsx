import { FC } from 'react'
import { Formik } from 'formik'

import { Button, Container, Header, Input, Textarea, Typography } from 'components'

import { initialValues, useCredentialForm } from './useCredentialForm'
import * as S from './CredentialForm.styled'

import { JSON_SCHEMA_URL } from 'utils'

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
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-3">
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
              {(formikProps) => (
                <form id="form" onSubmit={formikProps.handleSubmit}>
                  <Typography variant="p1">
                    Please fill in the form below to issue a credential.
                  </Typography>
                  <Input label="Schema URL" value={JSON_SCHEMA_URL} disabled />
                  <S.Heading variant="h7">Event details</S.Heading>

                  <div className="grid lg:grid-cols-2 lg:gap-x-8">
                    <Input
                      label="Event name"
                      placeholder="Enter event name"
                      name="eventName"
                      maxLength={100}
                      value={formikProps.values.eventName}
                      onChange={formikProps.handleChange}
                      error={formikProps.touched.eventName ? formikProps.errors.eventName : ''}
                    />
                    <Input
                      label="Event location"
                      placeholder="Enter event location"
                      name="eventLocation"
                      maxLength={500}
                      value={formikProps.values.eventLocation}
                      onChange={formikProps.handleChange}
                      error={
                        formikProps.touched.eventLocation ? formikProps.errors.eventLocation : ''
                      }
                    />
                    <Input
                      label="Start date & time"
                      name="eventStartDateTime"
                      type="datetime-local"
                      value={formikProps.values.eventStartDateTime}
                      onChange={formikProps.handleChange}
                      error={
                        formikProps.touched.eventStartDateTime
                          ? formikProps.errors.eventStartDateTime
                          : ''
                      }
                    />
                    <Input
                      label="End date & time"
                      name="eventEndDateTime"
                      type="datetime-local"
                      value={formikProps.values.eventEndDateTime}
                      onChange={formikProps.handleChange}
                      error={
                        formikProps.touched.eventEndDateTime
                          ? formikProps.errors.eventEndDateTime
                          : ''
                      }
                    />
                    <Textarea
                      label="Event description"
                      name="eventDescription"
                      placeholder="Enter event description"
                      maxLength={1000}
                      value={formikProps.values.eventDescription}
                      onChange={(value, e) => formikProps.handleChange(e)}
                      hasError={!!formikProps.errors.eventDescription}
                      helpText={formikProps.errors.eventDescription}
                    />
                  </div>

                  <S.Heading variant="h7">Ticket holder information</S.Heading>

                  <div className="grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
                    <Input
                      label="Ticket holder name"
                      name="name"
                      maxLength={100}
                      placeholder="Enter ticket holder name"
                      value={formikProps.values.name}
                      onChange={formikProps.handleChange}
                      error={formikProps.touched.name ? formikProps.errors.name : ''}
                    />
                    <Input
                      label="Ticket holder email"
                      name="email"
                      type="email"
                      placeholder="Enter ticket holder email"
                      maxLength={100}
                      value={formikProps.values.email}
                      onChange={formikProps.handleChange}
                      error={formikProps.touched.email ? formikProps.errors.email : ''}
                    />
                  </div>

                  <Button type="submit" form="form">
                    Issue ticket
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </>
  )
}
