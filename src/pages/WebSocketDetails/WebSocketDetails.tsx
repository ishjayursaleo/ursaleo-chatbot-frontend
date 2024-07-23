import React from 'react'
import { useParams } from 'react-router-dom'

import { ModalLayout } from '../../components'
import WebSocketModal from '../../components/WebSocketModal/WebSocketModal'

const WebSocketDetails = () => {
  const { downloadableUrl, name, extension } = useParams()

  return (
        <ModalLayout
            isFixedModal={true}
            activateBackArrow={false}
            headerText='Web Socket Response Details'
            handleClose={() => {}}
            open={true}
            contentLayout={
                <WebSocketModal
                  fileName={name as string}
                  uri={decodeURIComponent(downloadableUrl as string)}
                  fileType={extension as string}
                />
            }
        />
  )
}

export default WebSocketDetails
