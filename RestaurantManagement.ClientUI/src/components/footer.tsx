import { Footer } from "antd/es/layout/layout";

const footerStyle: React.CSSProperties = {
    textAlign: 'center'
};

const FooterComponent = () => {
    return (
        <Footer style={footerStyle}>
            3TK Steal ©{new Date().getFullYear()} Created by 3TK Team
        </Footer>
    );
}

export default FooterComponent;