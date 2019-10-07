import React from 'react'
import { withAuth } from 'components/withAuth'

export const Content = withAuth(() => {

    return (
        <div>
            Content Page
        </div>
    )

})