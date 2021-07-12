const styles = {
    mainBlock: {
        display: 'flex',
    },
    profileBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flexGrow: '1',
    },
    profileInfoBlock: {
        display: 'flex',
        flexDirection: 'column',
    },
    profileSectionsBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: '1',
        maxWidth: '500px'
    },
    navigationLink: {
        display: 'block',
        textDecoration: 'none',
        color: 'black',
        padding: '8px 16px',
        minWidth: '100%',
    },
    listItemText: {
        textAlign: 'center',
    },
    profileInfoString: {
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '20px 0',
    },
    buttonBlock:{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
    },
    updateButton: {
        maxWidth: '40%',
        textTransform: 'none',
    },
    profileInfoStringKey: {
        marginRight: '20px',
    },
    cardBlock: {
        minWidth: '400px'
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-around',
    }
}

export default styles;