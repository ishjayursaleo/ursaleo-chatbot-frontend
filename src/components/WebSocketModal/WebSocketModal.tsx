import React from 'react'
import { Grid } from '@mui/material'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'

const WebSocketModal: React.FC<{ fileName: string, uri: string, fileType: string }
> = ({ fileName, uri, fileType }) => {
  return (
    <Grid
      sm={12}
      container
      display='flex'
      justifyContent='center'
      alignItems='center'
      padding={3}
      style={{ height: '100%' }}
    >
      <DocViewer
        style={{ height: '100%', borderRadius: 12 }}
        documents={[{ fileName, uri, fileType }]}
        pluginRenderers={DocViewerRenderers}
      />
    </Grid>
  )
}

export default WebSocketModal
