export function Style(item) {
  let styles
  if (item < 3) {
    styles = { border: '2px solid #E90000' }
  } else if (item >= 3 && item < 5) {
    styles = { border: '2px solid #E97E00' }
  } else if (item >= 5 && item < 7) {
    styles = { border: '2px solid #E9D100' }
  } else if (item >= 7) {
    styles = { border: '2px solid #66E900' }
  }
  return styles
}
