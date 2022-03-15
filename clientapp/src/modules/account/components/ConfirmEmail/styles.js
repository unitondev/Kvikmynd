const styles = (theme) => ({
  rootPaper: {
    padding: 30,
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarBlock: {
    backgroundColor: theme.palette.secondary.main,
  },
  avatarBlockSucceeded: {
    backgroundColor: theme.palette.success.main,
  },
  avatarBlockFailure: {
    backgroundColor: theme.palette.error.main,
  },
})

export default styles
