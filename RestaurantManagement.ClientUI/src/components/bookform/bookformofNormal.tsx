import { DatePicker, Form, FormProps, Input, InputNumber, TimePicker } from "antd";
import { useState } from "react";

const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',


};
const formStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '600px',
};

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const BookFormOfNormal = () => {
    const [componentVariant, setComponentVariant] = useState<FormProps['variant']>('filled');

    const onFormVariantChange = ({ variant }: { variant: FormProps['variant'] }) => {
        setComponentVariant(variant);
    };
    return (
        <>
            <h2 className="text-center">Book For Table</h2>
            <div className="container" style={containerStyle}>


                <form {...formItemLayout}
                    // onVolumeChange={onFormVariantChange}
                    // variant={componentVariant}
                    style={formStyle}
                // initialValues={{ variant: componentVariant }}
                >
                    <Form.Item label="Fisrt Name" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last Name" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email @" name="Input" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="InputNumber"
                        rules={[{ required: true, message: 'Please input!' }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <div className="row">
                        <Form.Item
                            label="Day"
                            name="DatePicker"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <DatePicker />
                        </Form.Item>

                        <Form.Item
                            label="Time"
                            name="TimePicker"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <TimePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Note"
                        name="TextArea"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </form>
            </div >
        </>
    );
}

export default BookFormOfNormal;