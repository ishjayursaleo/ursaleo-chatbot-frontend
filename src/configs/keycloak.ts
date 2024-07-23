import Keycloak from 'keycloak-js'

const KeyClockConfig = new Keycloak({
  url: 'https://sso.portal.ursaleo.com/',
  realm: 'Ursaleo-Dev',
  clientId: 'ursaleo-portal-frontend'

})

export default KeyClockConfig
