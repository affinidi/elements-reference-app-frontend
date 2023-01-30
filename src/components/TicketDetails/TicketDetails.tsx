import { Box, Container, Typography } from 'components'

import { FC } from 'react'

import * as S from './TicketDetails.styled'

export type TicketDetailsProps = {
  eventName: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  qrCode: string
  location: string
}

export const TicketDetails: FC<TicketDetailsProps> = ({
  eventName,
  startDate,
  startTime,
  endDate,
  endTime,
  location,
  qrCode,
}) => {
  return (
    <>
      <Container fullWidthCenter>
        <Box direction="row">
          <S.TicketDetailsCardLeft>
            <Box direction="column" justifyContent="space-between" gap={20}>
              <Box direction="row" gap={50}>
                <Box direction="column" alignItems="start">
                  <Typography variant="c1"> Start Date</Typography>
                  <S.Data variant="p4">{startDate} </S.Data>
                </Box>
                <Box direction="column" alignItems="start">
                  <Typography variant="c1"> End Date</Typography>
                  <S.Data variant="p4">{endDate} </S.Data>
                </Box>
              </Box>
              <Box direction="row" gap={50}>
                <Box direction="column" alignItems="start">
                  <Typography variant="c1"> Start Time</Typography>
                  <S.Data variant="p4">{startTime} </S.Data>
                </Box>
                <Box direction="column" alignItems="start">
                  <Typography variant="c1"> End Time</Typography>
                  <S.Data variant="p4">{endTime} </S.Data>
                </Box>
              </Box>
              <Box direction="column">
                <Typography variant="c1"> Location</Typography>
                <S.Data variant="p4">{location} </S.Data>
              </Box>
              <Box>
                <S.Data variant="p1">
                  {`This is your event ticket for ${eventName}. This ticket will be scanned upon entry. This QR code can only be used one time.`}
                </S.Data>
              </Box>
            </Box>
          </S.TicketDetailsCardLeft>
          <S.TicketDetailsCardRight>
            <img src={qrCode} alt="QR Code" />
          </S.TicketDetailsCardRight>
        </Box>
      </Container>
    </>
  )
}

export default TicketDetails
