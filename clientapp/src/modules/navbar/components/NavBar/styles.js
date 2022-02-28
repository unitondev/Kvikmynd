const styles = (theme) => ({
  appbar: {
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.72)' : 'rgba(0,0,0,0.72)',
    backdropFilter:'saturate(180%) blur(20px)'
  },
  avatarBlock: {
    width: 24,
    height: 24,
  },
  menuAvatar: {
    width: 24,
    height: 24,
  },
  search: {
    marginRight: 15,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.1)'
    },
  },
  input: {
    transition: theme.transitions.create('width'),
    width: '12ch !important',
    '&:focus': {
      width: '20ch !important',
    },
  }
})

export default styles
