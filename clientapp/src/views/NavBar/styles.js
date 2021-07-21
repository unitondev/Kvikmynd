const styles = {
    navBarLink: {
        textDecoration: 'none',
        padding: '0 20px',
        color: 'black',
        height: '100%',
        display: 'block',
        '&:hover': {
            backgroundColor: 'rgba(145, 145, 120, 0.16)',
            transition: '500ms ease',
        },
        '&:focus': {
            backgroundColor: 'rgba(145, 145, 120, 0.16)',
            transition: '500ms ease',
        }
    },
    navBarButton: {
        backgroundColor: 'white',
        border: '0px',
        textTransform: 'none',
        fontFamily: 'Roboto',
        color: 'black',
        fontSize: '16px',
        fontWeight: '400',
        '&:hover': {
            backgroundColor: 'rgba(145, 145, 120, 0.16)',
            borderRadius: '0px',
        },
        '&:focus': {
            backgroundColor: 'rgba(145, 145, 120, 0.16)',
            borderRadius: '0px',
        },
    },
    activeNavBarLink: {
        backgroundColor: 'rgba(145, 145, 120, 0.16)',
    },
    avatarBlock: {
        marginRight: '10px',
        maxWidth: '30px',
        maxHeight: '30px',
    },
    navbarBlock:{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        minHeight: "50px",
    },
    profileSectionsBlock: {
        display: 'flex',
        alignItems: 'center',
    },
    listItemText: {
        textAlign: 'center',
    },
    profileNavBlock:{
        display: 'flex',
    },
};

export default styles;