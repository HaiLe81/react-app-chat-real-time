import React from 'react'
import { Result, Button } from 'antd'
import { useRouter } from '../../../hooks'

function NotFound({ 
    title = 'Sorry, the resource you visited does not exist.',
    status = '404',
    extra
}) {
    const {history} = useRouter()
    console.log('history', history)
    const onGoBack = () => {
        history.goBack()
    }

    return (
        <div className="inherit d-flex-center">
            <Result
                status={status}
                subTitle={title}
                extra={
                    extra ? extra : (
                        <Button onClick={onGoBack} type="primary">Back</Button>
                    )}
            />
        </div>
    )
}

export default NotFound