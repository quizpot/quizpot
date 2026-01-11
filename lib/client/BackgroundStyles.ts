export const getBackgroundStyles = (background: string) => {
  if (background.startsWith('/img')) {
    return {
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }
  else {
    return {
      backgroundColor: background,
    }
  }
}