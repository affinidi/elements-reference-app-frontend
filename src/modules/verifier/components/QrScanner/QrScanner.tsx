import { FC, useCallback, useState } from 'react'
import { Exception, Result } from '@zxing/library'
import { useNavigate } from 'react-router'
import { PATHS } from 'router/paths'
import { extractHashAndKeyFromVSShareUrl } from 'utils'
import { useScanner } from 'modules/verifier/hooks/useScanner'
import { Typography } from '../../../../components'

type QrScannerProps = {}

const videoElementId = 'video-renderer'

const QrScanner: FC<QrScannerProps> = () => {
  const [scanError, setScanError] = useState('')
  const navigate = useNavigate()

  const onScanned = useCallback(
    async (result: Result | undefined): Promise<void> => {
      const text = result?.getText()
      if (!text) {
        return
      }
      try {
        const hashAndKey = extractHashAndKeyFromVSShareUrl(text)
        if (!hashAndKey) {
          setScanError('The QR code was not recognized')
          return
        }
        const { hash, key } = hashAndKey
        navigate(PATHS.VERIFIER.RESULT, { replace: true, state: { hash, key } })
      } catch (error) {
        setScanError('The QR-Code has not been recognized.')
      }
    },
    [navigate],
  )

  const onError = useCallback((err: Exception) => {
    setScanError(err.message)
  }, [])

  useScanner({
    onError,
    onScanned,
    videoElementId,
  })

  return (
    <>
      <video muted id={videoElementId}></video>
      {!!scanError && <Typography variant="e1">{scanError}</Typography>}
    </>
  )
}

export default QrScanner
