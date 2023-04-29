const styles = (theme) => ({
  rootBox: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footerBlock: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 'auto',
    backgroundColor:
      theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
})

export default styles
