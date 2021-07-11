const styles = {
    navBarLinks: {
        fontFamily: 'Roboto',
        display: 'flex',
        justifyContent: 'flex-end',
        listStyle: 'none',
        paddingInlineStart: '0px',
        marginBlockStart: '0px',
    },
    navBarLink: {
        textDecoration: 'none',
        padding: '20px',
        color: 'black',
        display: 'block',
        '&:hover': {
            backgroundColor: 'rgba(145, 145, 120, 0.16)',
        },
        '&:focus': {
            backgroundColor: 'rgba(145, 145, 120, 0.16)',
        }
    },
    navBarButton: {
        padding: '20px',
        backgroundColor: 'white',
        verticalAlign: 'top',
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
};

export default styles;