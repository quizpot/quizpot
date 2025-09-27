export const getBackgroundStyles = (background: string) => {
  if (background.startsWith('data:image/')) {
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