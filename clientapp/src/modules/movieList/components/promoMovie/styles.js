const styles = {
  promoRoot: {
    height: 440,
    width: '100%',
    maxWidth: 1250,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
  },
  linearBlock: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    width: '70%',
    height: '100%',
    backgroundImage: 'linear-gradient(90deg,#0c0c0c 65%,hsla(0,0%,5%,.5),rgba(31,31,31,0))',
  },
  videoBlock: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    marginLeft: 316,
    zIndex: 2,
    transition: 'opacity 1s ease-out',
  },
  video: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    height: '100%',
  },
  contentPromoParent: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    width: '60%',
    height: '100%',
    padding: '40px',
  },
  contentPromo: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
}

export default styles
