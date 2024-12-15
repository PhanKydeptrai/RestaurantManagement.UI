import { Result } from "antd"
import { FrownOutlined } from "@ant-design/icons"

const DeleteAccountResultPage = () => {
    return (
        <>
            <Result
                icon={<FrownOutlined />}
                title="Xóa tài khoản thành công! Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi."
            />
        </>
    )
}

export default DeleteAccountResultPage