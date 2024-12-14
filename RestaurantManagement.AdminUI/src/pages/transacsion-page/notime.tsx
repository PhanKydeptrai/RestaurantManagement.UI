import { Result } from "antd";

const NoTimePage = () => {
    return (
        <>
            <Result
                status="warning"
                title="Đường dẫn đã hết hạn!"
                subTitle="Quý khách vui lòng tạo mới lại yêu cầu."
            />

        </>
    )
}

export default NoTimePage;