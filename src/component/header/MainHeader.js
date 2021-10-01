

const MainHeader = ({ title }) => {
    return (
        <div style={{ height: '50px', paddingTop: '10px', textAlign: 'center', backgroundColor: '#232a47', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
            <span style={{ marginRight: 'auto', color: 'white', fontFamily: 'IRANSans' }}>{title}</span>
            <br />
        </div>
    )
}

export default MainHeader;