import { Result } from "antd"

const NoTimeRequestPage = () => {
    return (
        <>
            <Result
                status="warning"
                title="Đường dẫn đã hết hạn!"
                subTitle="Quý khách kiểm tra lại email và tạo mới yêu cầu."
            />
        </>
    )
}

export default NoTimeRequestPage