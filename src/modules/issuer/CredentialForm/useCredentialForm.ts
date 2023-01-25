import { useNavigate } from 'react-router'
import { format } from 'date-fns'
import { useCallback } from 'react'
import * as EmailValidator from 'email-validator'

import { parseSchemaURL } from 'services/issuance/parse.schema.url'
import {
  CreateIssuanceInput,
  CreateIssuanceOfferInput,
  VerificationMethod,
} from 'services/issuance/issuance.api'
import { issuanceService } from 'services/issuance'
import { PATHS } from 'router/paths'
import moment from 'moment'

import { adjustForUTCOffset } from './CredentialForm'

export type EventSubjectData = {
  eventName: string
  eventLocation: string
  eventDate: string
  eventTime: string
  eventDescription: string
  name: string
  email: string
}

export const initialValues: EventSubjectData = {
  eventName: '',
  eventLocation: '',
  eventDate: '',
  eventTime: '',
  eventDescription: '',
  name: '',
  email: '',
}

export const schema = 'https://schema.affinidi.com/EventElegibilityV1-0.json'

export const useCredentialForm = () => {
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (values: EventSubjectData) => {
      const walletUrl = `${window.location.origin}/holder/claim`
      const issuerDid = import.meta.env.VITE_PROJECT_DID || ''
      const projectId = import.meta.env.VITE_PROJECT_ID || ''

      const apiKeyHash = import.meta.env.VITE_API_KEY || ''
      const { schemaType, jsonSchema, jsonLdContext } = parseSchemaURL(schema)

      const issuanceJson: CreateIssuanceInput = {
        template: {
          walletUrl,
          verification: {
            method: VerificationMethod.Email,
          },
          schema: {
            type: schemaType,
            jsonLdContextUrl: jsonLdContext.toString(),
            jsonSchemaUrl: jsonSchema.toString(),
          },
          issuerDid,
        },
        projectId,
      }

      const offerInput: CreateIssuanceOfferInput = {
        verification: {
          target: {
            email: values.email,
          },
        },
        credentialSubject: {
          date: format(new Date(values.eventDate), 'yyyy-MM-dd'),
          time: values.eventTime,
          place: values.eventLocation,
          eventName: values.eventName,
          eventDescription: values.eventDescription,
          name: values.name,
          email: values.email,
        },
      }

      const issuanceId = await issuanceService.createIssuance(apiKeyHash, issuanceJson)
      await issuanceService.createOffer(apiKeyHash, issuanceId.id, offerInput)

      navigate(PATHS.ISSUER.RESULT)
    },
    [navigate],
  )

  const validate = useCallback((values: EventSubjectData) => {
    const errors = {} as Partial<EventSubjectData>

    if (!values.eventName) {
      errors.eventName = 'Mandatory field'
    }

    if (!values.eventDate) {
      errors.eventDate = 'Mandatory field'
    } else if (!moment(values.eventDate, 'MM/DD/YYYY', true).isValid()) {
      errors.eventDate = 'Please enter a valid date'
    }

    if (!values.eventTime) {
      errors.eventTime = 'Mandatory field'
    }

    if (!values.eventLocation) {
      errors.eventLocation = 'Mandatory field'
    }

    if (!values.name) {
      errors.name = 'Mandatory field'
    }

    if (!values.email) {
      errors.email = 'Mandatory field'
    }

    if (!EmailValidator.validate(values.email)) {
      errors.email = 'Invalid email'
    }

    return errors
  }, [])

  return {
    handleSubmit,
    validate,
  }
}
