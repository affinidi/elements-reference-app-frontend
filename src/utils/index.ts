import UrlPattern from 'url-pattern'

export type SharedVcParams = {
  vcURL: string | null
  onboardingLink: string | null
}

// eslint-disable-next-line import/prefer-default-export
export const pxToRem = (px: number) => `${px / 8}rem`

export const extractHashAndKeyFromVSShareUrl = (
  url: string,
): { hash: string; key: string } | null => {
  const urlWithPathParam = url.split('?').shift()
  if (!urlWithPathParam) {
    return null
  }

  const parser = new UrlPattern(
    '(http(s)\\://):subdomain.:environment.:domain.:tld(/api/v1/share/:hash)',
  )

  const key = url.split('?').pop()?.slice(4) || ''

  const hash = parser.match(urlWithPathParam).hash
  return { hash, key }
}

export const JSON_SCHEMA_URL = 'https://schema.affinidi.com/EventEligibilityV1-0.json'
